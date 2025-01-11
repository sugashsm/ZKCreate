import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const Mission = () => {
  return (
    <Box py={"2rem"}>
      {" "}
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
        gap={"1rem"}
        textAlign={["center", "center", "center", "left"]}
      >
        <Box w={"100%"} display={"flex"} justifyContent={"center"}>
          <Image src="./images/mission_asset.png" alt="img" />
        </Box>
        <Box w={"100%"}>
          <Heading
            className="font"
            as="h1"
            size="xl"
            mb="30px"
            color={"#e9ecef"}
          >
            Our Mission
          </Heading>
          <Text color={"#b7b5c8"}>
            Our mission at Cre8ify is to revolutionize the way content is
            created, shared, and consumed in the digital era. We envision a
            world where creators have full ownership and control over their
            work, where audiences can discover and support their favorite
            creators directly, and where the content ecosystem is decentralized,
            transparent, and inclusive.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Mission;
