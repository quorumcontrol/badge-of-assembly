import { Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import { useBalance, useAccount } from 'wagmi'

const SKL_TOKEN_ADDRESS = "0x00c83aecc790e8a4453e5dd3b0b4b3680501a7a7"

const Browse: NextPage = () => {
  const { data:accountData, isError, isLoading } = useAccount()
  const { data } = useBalance({
    addressOrName: accountData?.address,
    token: SKL_TOKEN_ADDRESS
  })
  console.dir(data)
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
