import { Flex, Text } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
  const { isConnected } = useWeb3ModalAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/feed" if the wallet is connected
    if (isConnected) {
      navigate("/feed");
    }
  }, [isConnected]);
  return (
    <Flex
      gap={"4"}
      p={"2rem"}
      align={"center"}
      justify={"space-between"}
      w={"100%"}
    >
      <Text
        className="fontOne"
        fontSize={"1.5rem"}
        fontWeight={"500"}
        color={"#04A67D"}
      >
        ZK
        <Text as={"span"} fontSize={"1.8rem"} color={"#fff"}>
          C
        </Text>
        reate
      </Text>
      <ConnectButton />
    </Flex>
  );
}
