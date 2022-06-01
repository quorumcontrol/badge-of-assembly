import { Spinner, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { chain, useAccount, useBalance } from "wagmi";
import Layout from "../components/Layout";
import useIsClientSide from "../hooks/useIsClientSide";
import useSKLBalance from "../hooks/useSKLBalance";

const Mint: NextPage = () => {
  const { data: accountData, isFetched } = useAccount();
  const { data } = useSKLBalance(accountData?.address)
  console.log(data)
  const isDomReady = useIsClientSide();

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
      </Layout>
    </>
  );
};

export default Mint;
