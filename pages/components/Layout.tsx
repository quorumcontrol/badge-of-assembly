import React from "react";
import {
  Container,
  Flex,
  Stack,
  VStack,
  Image
} from "@chakra-ui/react";
import Link from "next/link";
import logo from "../../assets/images/logo.svg";

const Layout: React.FC = ({ children }) => {
  return (
    <Container p={10} maxW="1200px">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Image src={logo} alt="Crypto Colosseum logo" />

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Link href="https://larvamaiorum.com/">
              Crypto Colosseum: Larva Maiorum
            </Link>
          </Stack>
        </Flex>
      </Flex>
      <VStack mt="50" spacing={5}>
        {children}
      </VStack>
    </Container>
  );
};

export default Layout
