import {
  Box,
  Flex,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import ConnectButton from "../../components/ConnectButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../pages/landingPage/home/components/Footer";
import { HiMenuAlt4 } from "react-icons/hi";

export default function HomeLayout(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useWeb3ModalAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/feed" if the wallet is connected
    if (isConnected) {
      navigate("/feed");
    }
  }, [isConnected]);
  return (
    <Box>
      <Flex
        gap={"4"}
        p={"1rem 2rem"}
        align={"center"}
        justify={"space-between"}
        w={"100%"}
      >
        <Text
          className="fontOne"
          fontSize={"1.5rem"}
          fontWeight={"500"}
          bgGradient="linear(to-r, #e94c91, #5555fb)"
          bgClip={"text"}
        >
          ZK
          <Text as={"span"} fontSize={"1.8rem"} color={"#e9ecef"}>
            C
          </Text>
          reate
        </Text>
        <Flex gap={"2rem"} display={["none", "none", "flex"]}>
          <NavLink className={"activeClassName c_p"} to={"/"}>
            Home
          </NavLink>
          <NavLink className={"activeClassName c_p"} to={"/about-us"}>
            About Us
          </NavLink>
          <NavLink className={"activeClassName c_p"} to={"/support"}>
            Support
          </NavLink>
        </Flex>
        <Box display={["none", "none", "block"]}>
          <ConnectButton />
        </Box>
        <Box
          display={["block", "block", "none"]}
          onClick={onOpen}
          cursor={"pointer"}
        >
          <Icon as={HiMenuAlt4} fontSize={"2rem"} />
        </Box>
        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg={"#1d1a27"} className="font">
            <DrawerCloseButton
              fontSize={"1.2rem"}
              _focus={{ outline: "none" }}
            />
            <DrawerBody
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={"5rem"}
              alignItems={"center"}
            >
              <Flex gap={"2rem"} direction={"column"} align={"center"}>
                <NavLink className={"activeClassName c_p"} to={"/"}>
                  Home
                </NavLink>
                <NavLink className={"activeClassName c_p"} to={"/about-us"}>
                  About Us
                </NavLink>
                <NavLink className={"activeClassName c_p"} to={"/support"}>
                  Support
                </NavLink>
              </Flex>
              <Box>
                <ConnectButton />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      <Box px={["1rem", "1rem", "2rem", "2rem"]} py={"3rem"}>
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
}
