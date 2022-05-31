import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { MetadataWithId } from "../hooks/BadgeOfAssembly";

const NFTCard: React.FC<{ metadata: MetadataWithId }> = ({
  metadata: { name, description, image, id },
}) => {
  return (
    <Box p="5" borderRadius="lg" borderWidth="1px">
      <Image src={image} alt="nft image" />
      <Text
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        noOfLines={1}
      >
        {name}
      </Text>
      <Text noOfLines={[2, 3, 5]} fontSize="sm">{description}</Text>
    </Box>
  );
};

export default NFTCard;
