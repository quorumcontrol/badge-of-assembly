import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { MetadataWithId } from "../hooks/BadgeOfAssembly";

function typeFromUrl(animationUrl: string) {
  if (animationUrl.includes(".mp4")) {
    return "video/mp4";
  }
  if (animationUrl.includes(".webm")) {
    return "video/webm";
  }
  return undefined;
}

const Video: React.FC<{ animationUrl: string }> = ({ animationUrl }) => {
  return (
    <video
      controls
      autoPlay
      loop
      muted
      style={{
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        objectFit: "contain",
      }}
    >
      <source src={animationUrl} type={typeFromUrl(animationUrl)} />
    </video>
  );
};

const NFTCard: React.FC<{ metadata: MetadataWithId }> = ({
  metadata: { name, description, image, animationUrl },
}) => {
  return (
    <Box
      borderRadius="lg"
      borderWidth="1px"
      w="sm"
      h="md"
      overflow="hidden"
    >
      <Box h="70%" backgroundColor="#000">
        {typeFromUrl(animationUrl) ? (
          <Video animationUrl={animationUrl} />
        ) : (
          <Image
            src={image}
            alt={`image of ${name}`}
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              minHeight: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </Box>
      <Box p="5" mb="5">
        <Text
          mt="4"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {name}
        </Text>
        <Text noOfLines={[2, 3, 5]} fontSize="sm">
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export default NFTCard;
