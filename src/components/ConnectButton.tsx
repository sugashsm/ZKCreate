import { Button } from "@chakra-ui/react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function ConnectButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();

  return (
    <>
      {isConnected ? (
        <w3m-button size="sm" />
      ) : (
        <Button
          bgGradient="linear(to-r, #e94c91, #5555fb)"
          borderRadius={"100rem"}
          border={"none"}
          color={"#fff"}
          transition={"all .5s ease-in-out"}
          w={"150px"}
          _hover={{
            bgGradient: "linear(to-r, #e94c91, #5555fb)",
            border: "none",
          }}
          _focus={{ outline: "none" }}
          onClick={() => open()}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
