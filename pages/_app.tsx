import type { AppProps } from "next/app";
import Head from "next/head";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-sans";
import "@fontsource/zen-dots";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { QueryClient, QueryClientProvider } from "react-query";
import { skaleTestnet } from "../hooks/utils/SkaleChains";

const { chains, provider } = configureChains(
  [skaleTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== skaleTestnet.id) return null
        return { http: chain.rpcUrls.default }
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Badge of Assembly',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        fontSize: "22px",
        bg: "brand.background",
      },
    },
  },
  fonts: {
    heading: "Zen Dots, sans-serif",
    body: "DM Sans, sans-serif",
  },
  colors: {
    brand: {
      background: "#030D20",
    },
  },
});

const queryClient = new QueryClient()


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({
        ...darkTheme.accentColors.orange,
        fontStack: 'system',
        })}>
      <ChakraProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta
            property="og:site_name"
            content="Crypto Colosseum: Badge of Assembly"
            key="ogsitename"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
