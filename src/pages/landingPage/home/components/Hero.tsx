import { Flex, Box, Text, Image, Heading } from "@chakra-ui/react";
import "../../../../App.css";

// const heroImage = "./assets/heroImage.jpg";
// const image5 = "./assets/image5.jpg";

export default function Hero() {
  return (
    <>
      <Flex
        direction={["column", "column", "column", "row"]}
        textAlign={["center", "center", "center", "left"]}
        gap={["5", "5", "5", "10"]}
        px={["0", "0", "5rem", "5rem"]}
        pb={"3rem"}
        align={"center"}
        justify={"space-between"}
        w={"100%"}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          top={"2rem"}
          right={"-2rem"}
          bgGradient="linear(to-r, #e94c91, #5555fb)"
          w={"200px"}
          h={"200px"}
          zIndex={"-10"}
          filter={"blur(100px)"}
        ></Box>
        <Box w={"100%"}>
          <Heading
            className="font"
            as="h1"
            size={["xl", "xl", "2xl", "2xl"]}
            mb="30px"
            color={"#e9ecef"}
          >
            Unleash Your Creativity with Full Control
          </Heading>
          <Text color={"#b7b5c8"}>
            ZKCreate is a Web3 platform built for creators to monetize their
            content and secure their digital rights. Step into the future of
            content creation. Our platform leverages blockchain to ensure that
            you have full ownership of your content and transparent monetization
            options.
          </Text>
        </Box>
        <Box
          w={"100%"}
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          transition="transform 0.3s"
        >
          <Image
            src="./images/stream_image1.jpeg"
            alt="Description of the image"
            w="100%"
            h="100%"
            transform={"scale(1.2)"}
            objectFit="cover"
          />
        </Box>
      </Flex>
      <Flex
        direction={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
        textAlign={["center", "center", "center", "left"]}
        gap={["0", "0", "0", "8"]}
        px={["0", "0", "5rem", "5rem"]}
        py={"4rem"}
        align={"center"}
        justify={"space-between"}
        w={"100%"}
        position={"relative"}
      >
        <Box
          position={"absolute"}
          top={"70%"}
          left={"20%"}
          bgGradient="linear(to-t, #e94c91, #5555fb)"
          w={"300px"}
          h={"300px"}
          zIndex={"-10"}
          filter={"blur(200px)"}
        ></Box>
        <Box
          w={"100%"}
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          transition="transform 0.3s"
        >
          <Image
            src="./images/why_asset.png"
            alt="Description of the image"
            w="100%"
            h="100%"
            objectFit="cover"
            transform={"scale(1.1)"}
          />
        </Box>
        <Box w={"100%"}>
          <Heading
            className="font"
            as="h1"
            size={["xl", "xl", "2xl", "2xl"]}
            noOfLines={2}
            mb={6}
          >
            Why Choose Us
          </Heading>
          <Text color={"#b7b5c8"}>
            We are a Decentralised Content Creator platform where creatives get
            paid for their work without the presence of a middle man. Feel free
            to speak your mind without restrictions and regulations. Your voice
            is heard!
          </Text>
        </Box>
      </Flex>
    </>
  );
}
