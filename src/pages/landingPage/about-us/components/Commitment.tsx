import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import ConnectButton from "../../../../components/ConnectButton";

const Commitment = () => {
  return (
    <Box py={"2rem"}>
      {" "}
      <Flex
        justify={"space-between"}
        align={"center"}
        direction={["column", "column", "column", "row"]}
        textAlign={["center", "center", "center", "left"]}
        gap={"1rem"}
      >
        <Box w={"100%"}>
          <Heading
            className="font"
            as="h1"
            size="xl"
            mb="30px"
            color={"#e9ecef"}
          >
            Our Commitment
          </Heading>
          <Text mb={"1rem"} color={"#b7b5c8"}>
            At ZKCreate, we are committed to fostering trust, creativity,
            diversity, and collaboration in the digital content space. We strive
            to create an inclusive and supportive environment where all voices
            are heard, all ideas are valued, and all creators have the
            opportunity to thrive.
            <br />
            <br />
            Join us on our journey to reshape the future of content creation.
            Together, we can unlock new possibilities, inspire innovation, and
            build a more connected and empowered digital community.
          </Text>
          <ConnectButton />
        </Box>
        <Box w={"100%"} display={"flex"} justifyContent={"center"}>
          <Image src="./images/commitment_asset.png" alt="img" />
        </Box>
      </Flex>
    </Box>
  );
};

export default Commitment;
