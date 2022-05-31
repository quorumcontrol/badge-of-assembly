import { Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from './components/Layout'

const Mint: NextPage = () => {
  return (
    <>
      <Head>
        <title>Badge of Assembly: Mint</title>
        <meta name="description" content="Mint a new badge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Text>mint</Text>
      </Layout>

    </>
  )
}

export default Mint
