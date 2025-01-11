import {
  Box,
  Input,
  Text,
  Textarea,
  Flex,
  Icon,
  Button,
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaImage, FaMusic } from "react-icons/fa";
import { RiFileVideoFill } from "react-icons/ri";
import useCreateFreeContent from "../../../../hooks/useCreateFreeContent";
import { ChangeEvent, useState } from "react";
import useGetUserDetails from "../../../../hooks/useGetUserDetails";
import "../../../../App.css";
import useCreateExclContent from "../../../../hooks/useCreateExclContent";
import useCheckRegUser from "../../../../hooks/useCheckRegUser";

const CreateInput = () => {
  const [title, setTitle] = useState<string>("");
  const [ipfsHash, setIpfsHash] = useState<string>("");
  const [contentType, setContentType] = useState("");
  const { data: userDetails } = useGetUserDetails();
  const [exclusive, setExclusive] = useState(false);
  const regUser = useCheckRegUser();
  // console.log(regUser);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const handleExclusive = () => {
    if (exclusive === false) {
      setExclusive(true);
    } else {
      setExclusive(false);
    }
  };

  const handleCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    // console.log(title);
  };

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      await handleSubmission(selectedFile);

      const fileExtension = selectedFile.name.split(".").pop();
      setContentType(fileExtension || "");
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

      setIpfsHash(resData.IpfsHash);
      console.log(resData.IpfsHash);
    } catch (e) {
      // console.log(e);
      alert("Trouble uploading file");
    }
  };

  const handleCreateFreeContent = useCreateFreeContent(
    title,
    `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${ipfsHash}`,
    contentType,
    userDetails?.username || "",
    userDetails?.profileImage || "" // Use optional chaining to access username
  );

  const handleCreateExclusiveContent = useCreateExclContent(
    title,
    `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${ipfsHash}`,
    contentType,
    userDetails?.username || "",
    userDetails?.profileImage || "" // Use optional chaining to access username
  );

  return (
    <Box mb={"3rem"}>
      <Text fontSize={"2rem"} fontWeight={"600"} mb={"1rem"} color={"#e9ecef"}>
        What will you create today, {userDetails?.username || "Username"}?
      </Text>
      <Box
        w={["100%", "100%", "550px", "550px"]}
        boxShadow={"0 0 0 1px #2f2f30"}
        py={".6rem"}
        px={".8rem"}
        borderRadius={"full"}
        transition={"all .2s"}
        color={"#B7B7B6"}
        fontSize={".9rem"}
        cursor={"pointer"}
        _hover={{ bg: "#1d1a27" }}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        What's on your mind?
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
        {overlay}
        <ModalContent bg={"#1d1a27"} className="font" pt={"1.8rem"}>
          <ModalHeader
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>
              {exclusive ? "Create Exclusive Content" : "Create Free Content"}
            </Text>
            <Button
              onClick={handleExclusive}
              _focus={{ outline: "none" }}
              _hover={{ bg: "none", border: "1px solid #9f51c6" }}
              bg={"none"}
              border={"1px solid #9f51c6"}
            >
              <Text bgGradient="linear(to-r, #e94c91, #5555fb)" bgClip={"text"}>
                {exclusive ? "Switch to Free" : "Switch to Exclusive"}
              </Text>
            </Button>
          </ModalHeader>
          <ModalCloseButton
            _focus={{ outline: "none" }}
            _hover={{ border: "1px solid #9f51c6" }}
          />
          <ModalBody pb={"1.7rem"}>
            {exclusive ? (
              <Box
                boxShadow={"0 0 0 1px #2f2f30"}
                py={"1rem"}
                px={".8rem"}
                borderRadius={".8rem"}
                transition={"all 1s"}
              >
                <Textarea
                  placeholder="What's on your mind?"
                  value={title}
                  resize={"none"}
                  border={"none"}
                  _focus={{ boxShadow: "none" }}
                  _placeholder={{ color: "#B7B7B6", fontSize: ".9rem" }}
                  p={"0"}
                  mb={"0.5"}
                  onChange={handleCaption}
                />
                <Box mb={"1rem"}>
                  {(contentType === "mp4" ||
                    contentType === "avi" ||
                    contentType === "mov") && (
                    <video width={"500"} controls>
                      <source
                        src={`https://${
                          import.meta.env.VITE_GATEWAY_URL
                        }/ipfs/${ipfsHash}`}
                      />
                    </video>
                  )}
                  {(contentType === "jpeg" ||
                    contentType === "jpg" ||
                    contentType === "png" ||
                    contentType === "gif") && (
                    <Img
                      src={`https://${
                        import.meta.env.VITE_GATEWAY_URL
                      }/ipfs/${ipfsHash}`}
                      alt="image"
                      w={"300px"}
                      h={"300px"}
                      objectFit={"cover"}
                      borderRadius={".5rem"}
                    />
                  )}

                  {(contentType === "mp3" ||
                    contentType === "wav" ||
                    contentType === "ogg") && (
                    <audio controls>
                      <source
                        src={`https://${
                          import.meta.env.VITE_GATEWAY_URL
                        }/ipfs/${ipfsHash}`}
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </Box>
                <Flex
                  justify={"space-between"}
                  gap={"1rem"}
                  align={["baseline", "baseline", "end", "end"]}
                  flexDirection={["column", "column", "row", "row"]}
                >
                  <Flex gap={"1rem"}>
                    <Flex>
                      <Input
                        onChange={changeHandler}
                        accept="image/jpg, image/jpeg, image/png, image/gif"
                        type="file"
                        border={"none"}
                        id="image"
                        hidden
                      />
                      <Flex align={"end"} justify={"space-between"}>
                        <label style={{ cursor: "pointer" }} htmlFor="image">
                          <Flex
                            color={"#B7B7B6"}
                            align={"center"}
                            gap={".2rem"}
                          >
                            <Icon as={FaImage} fontSize={".7rem"} />
                            <Text fontSize={".8rem"}>Photo</Text>
                          </Flex>
                        </label>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Input
                        onChange={changeHandler}
                        accept="video/mp4, video/avi, video/mov"
                        type="file"
                        border={"none"}
                        id="video"
                        hidden
                      />
                      <Flex align={"end"} justify={"space-between"}>
                        <label style={{ cursor: "pointer" }} htmlFor="video">
                          <Flex
                            color={"#B7B7B6"}
                            align={"center"}
                            gap={".2rem"}
                          >
                            <Icon as={RiFileVideoFill} fontSize={".8rem"} />
                            <Text fontSize={".8rem"}>Video</Text>
                          </Flex>
                        </label>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Input
                        onChange={changeHandler}
                        accept="audio/mp3, audio/wav, audio/ogg"
                        type="file"
                        border={"none"}
                        id="audio"
                        hidden
                      />
                      <Flex align={"end"} justify={"space-between"}>
                        <label style={{ cursor: "pointer" }} htmlFor="audio">
                          <Flex
                            color={"#B7B7B6"}
                            align={"center"}
                            gap={".2rem"}
                          >
                            <Icon as={FaMusic} fontSize={".7rem"} />
                            <Text fontSize={".8rem"}>Audio</Text>
                          </Flex>
                        </label>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Button
                    bgGradient="linear(to-r, #e94c91, #5555fb)"
                    border={"none"}
                    color={"#fff"}
                    transition={"all .5s ease-in-out"}
                    w={["100%", "100%", "150px", "150px"]}
                    _hover={{
                      bgGradient: "linear(to-r, #e94c91, #5555fb)",
                      border: "none",
                    }}
                    _focus={{ outline: "none" }}
                    onClick={() => {
                      handleCreateExclusiveContent();
                    }}
                  >
                    <Text>Create</Text>
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Box
                boxShadow={"0 0 0 1px #2f2f30"}
                py={"1rem"}
                px={".8rem"}
                borderRadius={".8rem"}
                transition={"all 1s"}
              >
                <Textarea
                  placeholder="What's on your mind?"
                  value={title}
                  resize={"none"}
                  border={"none"}
                  _focus={{ boxShadow: "none" }}
                  _placeholder={{ color: "#B7B7B6", fontSize: ".9rem" }}
                  p={"0"}
                  mb={"0.5rem"}
                  onChange={handleCaption}
                />
                <Box mb={"1rem"}>
                  {(contentType === "mp4" ||
                    contentType === "avi" ||
                    contentType === "mov") && (
                    <video width={"500"} controls>
                      <source
                        src={`https://${
                          import.meta.env.VITE_GATEWAY_URL
                        }/ipfs/${ipfsHash}`}
                      />
                    </video>
                  )}
                  {(contentType === "jpeg" ||
                    contentType === "jpg" ||
                    contentType === "png" ||
                    contentType === "gif") && (
                    <Img
                      src={`https://${
                        import.meta.env.VITE_GATEWAY_URL
                      }/ipfs/${ipfsHash}`}
                      alt="image"
                      w={"300px"}
                      h={"300px"}
                      objectFit={"cover"}
                      borderRadius={".5rem"}
                    />
                  )}

                  {(contentType === "mp3" ||
                    contentType === "wav" ||
                    contentType === "ogg") && (
                    <audio controls>
                      <source
                        src={`https://${
                          import.meta.env.VITE_GATEWAY_URL
                        }/ipfs/${ipfsHash}`}
                      />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </Box>
                <Flex
                  justify={"space-between"}
                  gap={"1rem"}
                  align={["baseline", "baseline", "end", "end"]}
                  flexDirection={["column", "column", "row", "row"]}
                >
                  <Flex gap={"1rem"}>
                    <Flex>
                      <Input
                        onChange={changeHandler}
                        accept="image/jpg, image/jpeg, image/png, image/gif"
                        type="file"
                        border={"none"}
                        id="image"
                        hidden
                      />
                      <Flex align={"end"} justify={"space-between"}>
                        <label style={{ cursor: "pointer" }} htmlFor="image">
                          <Flex
                            color={"#B7B7B6"}
                            align={"center"}
                            gap={".2rem"}
                          >
                            <Icon as={FaImage} fontSize={".7rem"} />
                            <Text fontSize={".8rem"}>Photo</Text>
                          </Flex>
                        </label>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Input
                        onChange={changeHandler}
                        accept="video/mp4, video/avi, video/mov"
                        type="file"
                        border={"none"}
                        id="video"
                        hidden
                      />
                      <Flex align={"end"} justify={"space-between"}>
                        <label style={{ cursor: "pointer" }} htmlFor="video">
                          <Flex
                            color={"#B7B7B6"}
                            align={"center"}
                            gap={".2rem"}
                          >
                            <Icon as={RiFileVideoFill} fontSize={".8rem"} />
                            <Text fontSize={".8rem"}>Video</Text>
                          </Flex>
                        </label>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Input
                        onChange={changeHandler}
                        accept="audio/mp3, audio/wav, audio/ogg"
                        type="file"
                        border={"none"}
                        id="audio"
                        hidden
                      />
                      <Flex align={"end"} justify={"space-between"}>
                        <label style={{ cursor: "pointer" }} htmlFor="audio">
                          <Flex
                            color={"#B7B7B6"}
                            align={"center"}
                            gap={".2rem"}
                          >
                            <Icon as={FaMusic} fontSize={".7rem"} />
                            <Text fontSize={".8rem"}>Audio</Text>
                          </Flex>
                        </label>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Button
                    bgGradient="linear(to-r, #e94c91, #5555fb)"
                    border={"none"}
                    color={"#fff"}
                    transition={"all .5s ease-in-out"}
                    w={["100%", "100%", "150px", "150px"]}
                    _hover={{
                      bgGradient: "linear(to-r, #e94c91, #5555fb)",
                      border: "none",
                    }}
                    _focus={{ outline: "none" }}
                    onClick={() => {
                      handleCreateFreeContent();
                    }}
                  >
                    <Text>Create</Text>
                  </Button>
                </Flex>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateInput;
