import React, { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Stack,
  VStack,
  Box,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useIsClientSide from "../hooks/useIsClientSide";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isSuccess } = useAccount();
  const isClientReady = useIsClientSide()

  return (
    <Container p={10} maxW="1200px">
      <HStack spacing="5">
        <Flex alignItems="center">
          <Image src={logo} alt="Crypto Colosseum logo" />
          <Heading size="sm" ml="5">
            Badge of Assembly
          </Heading>
        </Flex>
        <Spacer />
        <Link href="/mint">mint</Link>
        <Link href="/browse">all</Link>
        {isClientReady && isSuccess && (
          <Box pr="5">
          <Link href={`/browse/${data?.address}`}>mine</Link>
          </Box>
        )}
        <ConnectButton showBalance={false} />
      </HStack>

      <VStack mt="10" spacing={5}>
        {children}
      </VStack>
      <Box as="footer" mt="200">
        <VStack spacing={5}>
          <Link href="https://larvamaiorum.com/">
            Crypto Colosseum: Larva Maiorum
          </Link>
        </VStack>
      </Box>
    </Container>
  );
};

export default Layout;
