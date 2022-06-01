import { Text, HStack } from "@chakra-ui/react";
import NFTCard from '../../components/NFTCard'
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { MetadataWithId, useUserBadges } from "../../hooks/BadgeOfAssembly";

const Browse: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { data } = useUserBadges(address as (string | undefined));

  return (
    <>
      <Head>
        <title>Badge of Assembly: Browse</title>
        <meta name="description" content="browse badges" />
      </Head>
      <Layout>
        <Text fontSize="sm">Badges held by: {address}</Text>
        <HStack>
          {data?.map((metadata:MetadataWithId, i) => {
            return <NFTCard metadata={metadata} key={`nftcard-${i}`} />;
          })}
        </HStack>
      </Layout>
    </>
  );
};

export default Browse;
