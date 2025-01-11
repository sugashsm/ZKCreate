import { Flex, Text } from "@chakra-ui/react";
import DashboardMenu from "../../feed/components/DashboardMenu";

const Head = () => {
  return (
    <Flex align={"center"} justify={"space-between"} mb={"3rem"}>
      <Text fontSize={"1.5rem"} fontWeight={"600"} color="#e9ecef">
        <DashboardMenu />
        Subscription
      </Text>
    </Flex>
  );
};

export default Head;
