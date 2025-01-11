import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import "../../../../App.css";

const Hero = () => {
  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      direction={["column", "column", "column", "row"]}
      textAlign={["center", "center", "center", "left"]}
      pb={"3rem"}
    >
      <Box w={"100%"}>
        <Heading
          className="font"
          as="h1"
          size={["xl", "xl", "2xl", "2xl"]}
          noOfLines={2}
          mb="40px"
          color={"#e9ecef"}
        >
          About ZKCreate
        </Heading>
        <Text color={"#b7b5c8"}>
          Welcome to ZKCreate, the premier destination for content creators and
          enthusiasts in the decentralized space. At ZKCreate, we believe in
          empowering creators to take control of their content, connect with
          their audience, and monetize their creativity like never before.
        </Text>
      </Box>
      <Box w={"100%"} display={"flex"} justifyContent={"center"}>
        <Image src="./images/about_us_hero.png" alt="img" />
      </Box>
    </Flex>
  );
};

export default Hero;
