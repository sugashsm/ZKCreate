import { Card, Box, Flex } from "@chakra-ui/react";
import "../../../../App.css";
import { Subscribe } from "./Subscribe";
import { SetSubAmt } from "./SetSubAmt";
import { Approve } from "./Approve";
import MySubscribers from "./MySubscribers";
import SubscribedTo from "./SubscribedTo";
import CreatorsList from "./CreatorsList";

const SubscriptionComponent = () => {
  return (
    <Box
      color="#e9ecef"
      boxShadow="2xl"
      transition={"all .5s ease-in-out"}
      p={5}
    >
      <Flex flexDirection={"column"} gap={"3rem"}>
        <Card
          bgGradient="linear(to-r, #1d1a27, #1d1a27)"
          color="#e9ecef"
          boxShadow="0 5px 14px 0 #0001"
          transition={"all .5s ease-in-out"}
          p={"1rem"}
        >
          <Flex gap={"1rem"} flexDirection={["column", "column", "row", "row"]}>
            <Approve />
            <Subscribe />
            <SetSubAmt />
          </Flex>
        </Card>
        <Box>
          <MySubscribers />
        </Box>
        <Box>
          <SubscribedTo />
        </Box>
        <Box>
          <CreatorsList />
        </Box>
      </Flex>
    </Box>
  );
};

export default SubscriptionComponent;
