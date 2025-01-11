import {
  Text,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Icon,
  Box,
} from "@chakra-ui/react";
import { menu } from "../../../../constants/data";
import { NavLink, useNavigate } from "react-router-dom";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import "../../../../App.css";
import { useEffect } from "react";
import ConnectButton from "../../../../components/ConnectButton";
import { RegisterCreator } from "../../../../components/RegisterCreator.tsx";
import useGetUserDetails from "../../../../hooks/useGetUserDetails.ts";
import ProfileDetails from "../../../../components/ProfileDetails.tsx";
import { HiMenuAlt4 } from "react-icons/hi";

const DashboardMenu = () => {
  const { data: userDetails } = useGetUserDetails();

  const { isConnected } = useWeb3ModalAccount();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to "/feed" if the wallet is connected
    if (isConnected === false) {
      navigate("/");
    }
  }, [isConnected]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Text
        display={["block", "block", "block", "none"]}
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Icon as={HiMenuAlt4} fontSize={"1.5rem"} />
      </Text>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={"#1d1a27"} className="font">
          <DrawerCloseButton fontSize={"1.2rem"} _focus={{ outline: "none" }} />
          <DrawerBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={"5rem"}
            alignItems={"center"}
          >
            <Box
              mb={"5rem"}
              display={"flex"}
              alignItems={"start"}
              flexDirection={"column"}
              justifyContent={"space-between"}
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
              <ConnectButton />
            </Box>

            <Flex flexDirection={"column"} justify={"space-between"} h={"69%"}>
              <Flex flexDirection={"column"} gap={"1rem"}>
                {menu.map((item, index) => (
                  <NavLink
                    to={item.link}
                    key={index}
                    className="activeClassName"
                  >
                    <Flex align={"center"} px={"1rem"}>
                      <Icon as={item.icon} />
                      <Text fontSize={".9rem"} p={".8rem"}>
                        {item.title}
                      </Text>
                    </Flex>
                  </NavLink>
                ))}
              </Flex>

              {userDetails?.username ? <ProfileDetails /> : <RegisterCreator />}
              {/* {error && <Text>Error: {error}</Text>} */}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DashboardMenu;
