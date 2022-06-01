import { VStack, Text, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crypto Colosseum: Badge of Assembly</title>
        <meta name="description" content="Generate badges for the warriors attending your events." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <VStack mt="50" spacing={5}>
          <Heading>Badge of Assembly</Heading>
          <Text>The way to show support for your community.</Text>
        </VStack>
      </Layout>
    </>
  )
}

export default Home
