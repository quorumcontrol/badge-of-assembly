import { VStack, Text, Heading, Button, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crypto Colosseum: Badge of Assembly</title>
        <meta
          name="description"
          content="Generate badges for the warriors attending your events."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <VStack mt="50" spacing={5}>
          <Heading>Badge of Assembly</Heading>
          <Text>Show support for your community.</Text>
          <Box pt="16">
            <Link href="/claim">
              <Button variant="solid">Claim your Antiqui Posessor</Button>
            </Link>
          </Box>
        </VStack>
      </Layout>
    </>
  );
};

export default Home;
