import React from "react";
import { Container, Flex, Stack, VStack, Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/logo.svg";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container p={10} maxW="1200px">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems='center'>
          <Image src={logo} alt="Crypto Colosseum logo" />
          <Heading size='sm' ml='5'>Badge of Assembly</Heading>
        </Flex>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Link href="/mint">mint</Link>
            <Link href="/browse">browse</Link>
            <Box ml="5">
              <ConnectButton />
            </Box>
          </Stack>
        </Flex>
      </Flex>
      <VStack mt="50" spacing={5}>
        {children}
      </VStack>
      <Box as='footer' mt="200">
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
