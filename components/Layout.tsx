import React from "react";
import {
  Container,
  VStack,
  Box,
  Heading,
  Stack,
  Spacer,
  Text,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import logo from "../assets/images/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import useIsClientSide from "../hooks/useIsClientSide";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isSuccess } = useAccount();
  const isClientReady = useIsClientSide();

  return (
    <Container p={10} maxW="1200">
      <Stack direction={["column", "row"]} spacing="5">
        <LinkBox>
          <NextLink href="/" passHref>
            <LinkOverlay flexDir="row" display="flex" alignItems="center">
              <Image src={logo} alt="Crypto Colosseum logo" />
              <Heading size="sm" ml="5">
                Badge of Assembly
              </Heading>
            </LinkOverlay>
          </NextLink>
        </LinkBox>
        <Spacer />
        <NextLink href="/mint" passHref>
          <Link>mint</Link>
        </NextLink>
        <NextLink href="/claim" passHref>
          <Link>claim</Link>
        </NextLink>
        {isClientReady && isSuccess && data?.address && (
          <NextLink href={`/browse/${data?.address}`} passHref>
            <Link>mine</Link>
          </NextLink>
        )}
        <Box ml="5">
          <ConnectButton showBalance={false} />
        </Box>
      </Stack>

      <VStack mt="10" spacing={5}>
        {children}
      </VStack>
      <Box as="footer" mt="200" textAlign="center">
        <Text fontSize="sm">
          <Link href="https://larvamaiorum.com/">
            Provided by Crypto Colosseum: Larva Maiorum
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Layout;
