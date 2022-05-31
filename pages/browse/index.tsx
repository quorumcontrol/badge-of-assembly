import { HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { useAccount } from "wagmi";
import { useAllTokens } from "../hooks/BadgeOfAssembly";
import React from "react";
import NFTCard from "../components/NFTCard";

const SKL_TOKEN_ADDRESS = "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7";

const Browse: NextPage = () => {
  const { data: accountData, isError, isLoading } = useAccount();
  const { data, isFetching } = useAllTokens();
  return (
    <>
      <Head>
        <title>Badge of Assembly: Browse</title>
        <meta name="description" content="browse badges" />
      </Head>
      <Layout>
        <Text>All Badges</Text>
        <HStack>
        {data?.pages.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {group.metadata.map((meta, i) => {
                return <NFTCard metadata={meta} key={`nftcard-${i}`} />;
              })}
            </React.Fragment>
          );
        })}
        </HStack>

      </Layout>
    </>
  );
};

export default Browse;
