import { Button, Spinner, Text, Box } from "@chakra-ui/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useMutation } from "react-query";
import { useAccount, useWaitForTransaction } from "wagmi";
import Layout from "../components/Layout";
import useIsClientSide from "../hooks/useIsClientSide";
import useSKLBalance from "../hooks/useSKLBalance";

const threshold = parseEther("1000");

const ClaimButton: React.FC<{ address: string }> = ({ address }) => {
  const [transactionId, setTransactionId] = useState('');
  const mutation = useMutation<Response, unknown, { address: string }, unknown>("claim-badge", ({ address }) => {
    return fetch("/api/claim", {
      body: JSON.stringify({ address }),
      method: "post",
    });
  }, {
    onSuccess: async (data) => {
      console.log(data)
      const parsedResponse = await data.json()
      setTransactionId(parsedResponse.transactionId)
    }
  });

  const txStatus = useWaitForTransaction({ hash: transactionId, enabled: !!transactionId, onSettled: (data) => { console.log('settled', data) }})

  if (mutation.isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (mutation.isError || txStatus.isError) {
    return (
      <Box>
        <Text>something went wrong.</Text>
      </Box>
    );
  }

  if (mutation.isSuccess) {
    if (txStatus.isLoading) {
      return (
        <Box>
          <Text>Transaction: {transactionId}</Text>
          <Spinner />
        </Box>
      );
    }
    if (txStatus.isSuccess) {
      return (
        <Box>
          <Text>Done!</Text>
        </Box>
      );
    }
  }

  return (
    <Button variant="outline" onClick={() => mutation.mutate({ address })}>
      Claim
    </Button>
  );
};

const Mint: NextPage = () => {
  const { data: accountData, isFetched } = useAccount();
  const { data } = useSKLBalance(accountData?.address);
  console.log(data);
  const isDomReady = useIsClientSide();
  const canClaim = data && data.total.gte(threshold);

  if (!isDomReady) {
    return (
      <>
        <Head>
          <title>Badge of Assembly: Claim</title>
          <meta name="description" content="Claim your Antiqui Posessor" />
        </Head>
        <Layout>
          <Spinner />
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Badge of Assembly: Claim</title>
        <meta name="description" content="Claim your Antiqui Posessor" />
      </Head>
      <Layout>
        <Text>Unstaked SKL Balance: {data && formatEther(data.liquid)}</Text>
        <Text>Staked SKL Balance: {data && formatEther(data.staked)}</Text>
        {canClaim && isFetched && accountData && (
          <ClaimButton address={accountData.address!} />
        )}
      </Layout>
    </>
  );
};

export default Mint;
