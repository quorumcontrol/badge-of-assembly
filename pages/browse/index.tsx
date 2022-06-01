import { HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useAccount } from "wagmi";
import { useAllTokens } from "../../hooks/BadgeOfAssembly";
import React from "react";
import NFTCard from "../../components/NFTCard";

const Browse: NextPage = () => {
  const { data, isFetching } = useAllTokens();
  return (
    <>
      <Head>
        <title>Badge of Assembly: Browse</title>
        <meta name="description" content="All badges currently in circulation." />
      </Head>
      <Layout>
        <Text>All Badges</Text>
        <HStack spacing="10">
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
