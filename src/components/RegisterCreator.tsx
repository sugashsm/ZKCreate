import {
  Button,
  Flex,
  Icon,
  Text,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  Img,
  Modal,
  useDisclosure,
  Box,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useRegister from "../hooks/useRegister";

export const RegisterCreator = () => {
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const [username, setUsername] = useState<string>("");
  const [cid, setCid] = useState<string>("");

  const { address } = useWeb3ModalAccount();

  const handleRegister = useRegister(
    username,
    `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`
  );

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      await handleSubmission(selectedFile);
    }
  };

  const handleSubmission = async (fileToUpload: string | Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();

      setCid(resData.IpfsHash);
      console.log(resData.IpfsHash);
    } catch (e) {
      console.log(e);
      alert("Trouble uploading file");
    }
  };
  return (
    <Box>
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
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <Text>Register</Text>
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent bg={"#1d1a27"} className="font">
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton
            _focus={{ outline: "none" }}
            _hover={{ border: "1px solid #15AB99" }}
          />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                type="file"
                border={"none"}
                id="selectFile"
                onChange={changeHandler}
                accept="image/png, image/jpeg, image/JPG, image/avif, img/svg"
                hidden
              />
              <Flex align={"end"} justify={"space-between"} mb={"1rem"}>
                <FormLabel htmlFor="selectFile">
                  <Flex
                    borderRadius={".5rem"}
                    align={"center"}
                    justify={"center"}
                    color={"#B7B7B6"}
                    w={"200px"}
                    h={"150px"}
                    bg={"#13111a"}
                  >
                    {cid ? (
                      <Img
                        src={`https://${
                          import.meta.env.VITE_GATEWAY_URL
                        }/ipfs/${cid}`}
                        alt="image"
                        w={"200px"}
                        h={"150px"}
                        objectFit={"cover"}
                        borderRadius={".5rem"}
                      />
                    ) : (
                      <Flex flexDirection={"column"} align={"center"}>
                        <Icon as={FaImage} fontSize={"3rem"} />
                        <Text fontSize={"1rem"}>Upload Profile Image</Text>
                      </Flex>
                    )}
                  </Flex>
                </FormLabel>
              </Flex>
            </FormControl>
            <FormControl isRequired={true}>
              <FormLabel>Username</FormLabel>
              <Input
                required
                placeholder="Username"
                value={username}
                _placeholder={{ color: "#767677" }}
                size="md"
                border={"1px solid #535354"}
                outline={"none"}
                _hover={{ outline: "none" }}
                _focus={{ boxShadow: "none" }}
                px={".5rem"}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input
                size="md"
                border={"1px solid #535354"}
                outline={"none"}
                _hover={{ outline: "none" }}
                _focus={{ boxShadow: "none" }}
                px={".5rem"}
                value={address}
                disabled
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
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
              onClick={() => {
                handleRegister();
              }}
            >
              <Text>Register</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
