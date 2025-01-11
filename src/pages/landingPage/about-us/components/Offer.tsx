import {
  Box,
  Flex,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import { offer } from "../../../../constants/data";
import { useState } from "react";

const Offer = () => {
  const [desc, setDesc] = useState(offer);
  const [descId, setDescId] = useState(desc[0]);
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const handleDesc = (e: any) => {
    setDescId(e);

    setDesc((prev) => prev);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  return (
    <Box py={"3rem"}>
      <Heading
        className="font"
        textAlign={"center"}
        as="h1"
        size="xl"
        mb="40px"
        color={"#e9ecef"}
      >
        What We Offer
      </Heading>

      <Flex
        justifyContent={"center"}
        align={"center"}
        gap={"2rem"}
        direction={["column", "column", "column", "row"]}
        textAlign={["center", "center", "center", "left"]}
      >
        {offer.map((item, index) => (
          <Box
            key={index}
            bg="#1d1a27"
            boxShadow="0 5px 14px 0 #0001"
            transition={"all .5s ease-in-out"}
            py={"1.5rem"}
            px={"1rem"}
            w={"300px"}
            h={"200px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
              handleDesc(item);
            }}
          >
            <Text
              className="font"
              fontWeight={"600"}
              fontSize={"1.3rem"}
              color={"#e9ecef"}
            >
              {item.name}
            </Text>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              {overlay}
              <ModalContent bg={"#1d1a27"} className="font">
                <ModalCloseButton
                  _focus={{ outline: "none" }}
                  _hover={{ border: "1px solid #9f51c6" }}
                />
                <ModalHeader color={"#e9ecef"}>{descId.name}</ModalHeader>
                <ModalBody>
                  <Text mb={"1rem"} color={"#b7b5c8"}>
                    {descId.desc}
                  </Text>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Offer;
