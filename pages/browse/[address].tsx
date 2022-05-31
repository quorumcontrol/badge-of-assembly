import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Browse: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <>
      <Head>
        <title>Badge of Assembly: Browse</title>
        <meta name="description" content="browse badges" />
      </Head>
      <Layout>
        <Text>browse: {address}</Text>
      </Layout>
    </>
  );
};

export default Browse;
