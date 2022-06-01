import { Button, Spinner, Text, Box } from "@chakra-ui/react";
import { formatEther, parseEther } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useMutation } from "react-query";
import { useAccount } from "wagmi";
import Layout from "../components/Layout";
import useIsClientSide from "../hooks/useIsClientSide";
import useSKLBalance from "../hooks/useSKLBalance";

const threshold = parseEther("1000");

const ClaimButton: React.FC<{ address: string }> = ({ address }) => {
  const mutation = useMutation<Response, unknown, { address: string }, unknown>("claim-badge", ({ address }) => {
    return fetch("/api/claim", {
      body: JSON.stringify({ address }),
      method: "post",
    });
  });

  if (mutation.isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (mutation.isSuccess) {
    return (
      <Box>
        <Text>Done!</Text>
      </Box>
    );
  }

  if (mutation.isError) {
    return (
      <Box>
        <Text>something went wrong.</Text>
      </Box>
    );
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
  const canClaim = data && data.gte(threshold);

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
        <Text>SKL Balance: {data && formatEther(data)}</Text>
        {canClaim && isFetched && accountData && (
          <ClaimButton address={accountData.address!} />
        )}
      </Layout>
    </>
  );
};

export default Mint;
