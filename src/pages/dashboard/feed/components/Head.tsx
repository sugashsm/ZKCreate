import { Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import "../../../../App.css";
import { useEffect } from "react";
import DashboardMenu from "./DashboardMenu";

const Head = () => {
  const { isConnected } = useWeb3ModalAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/feed" if the wallet is connected
    if (isConnected === false) {
      navigate("/");
    }
  }, [isConnected]);

  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      mb={"3rem"}
      // flexDirection={["column", "column", "row", "row"]}
    >
      <Text fontSize={"1.5rem"} fontWeight={"600"} color={"#e9ecef"}>
        <DashboardMenu />
        Feed
      </Text>
      <Flex
        align={"center"}
        border={"1.5px solid #313133"}
        px={"1rem"}
        borderRadius={"1rem"}
      >
        <IconButton
          minWidth={"0"}
          bg={"none"}
          aria-label={"Search Content"}
          icon={<IoSearchOutline color="#fff" fontWeight={"900"} />}
          px={"0"}
          border={"none"}
          _hover={{ background: "none", border: "none" }}
          _focus={{ outline: "none" }}
        />
        <Input
          placeholder="Search Content"
          _placeholder={{ color: "#767677" }}
          size="md"
          w={["100%", "100%", "300px", "300px"]}
          border={"none"}
          outline={"none"}
          _focus={{ boxShadow: "none" }}
          px={".5rem"}
        />
      </Flex>
    </Flex>
  );
};

export default Head;
