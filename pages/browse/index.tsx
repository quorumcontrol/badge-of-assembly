import { Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'

const Browse: NextPage = () => {
  return (
    <>
      <Head>
        <title>Badge of Assembly: Browse</title>
        <meta name="description" content="browse badges" />
      </Head>
      <Layout>
        <Text>browse</Text>
      </Layout>
    </>
  )
}

export default Browse
