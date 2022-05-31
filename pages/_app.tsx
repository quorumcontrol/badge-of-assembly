import type { AppProps } from 'next/app'
import Head from 'next/head'
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-sans"
import "@fontsource/zen-dots"

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      body: {
        fontSize: '22px',
        bg: 'brand.background',
      }
    },
  },
  fonts: {
    heading: 'Zen Dots, sans-serif',
    body: 'DM Sans, sans-serif',
  },
  colors: {
    brand: {
      background: '#030D20'
    },
  }
 })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta property="og:site_name" content="Crypto Colosseum: Badge of Assembly" key="ogsitename" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
