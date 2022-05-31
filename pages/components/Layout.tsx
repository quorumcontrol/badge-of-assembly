import React, { useEffect } from "react";
import { Container, Flex, Stack, VStack, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.svg";

const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    console.log(logo);
  }, []);
  return (
    <Container p={10} maxW="1200px">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Image src={logo} alt="Crypto Colosseum logo" />

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Link href="/mint">mint</Link>
            <Link href="/browse">browse</Link>
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
