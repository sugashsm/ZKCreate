import {
  Button,
  Text,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  ModalOverlay,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";
import { useState } from "react";
import useSetSubAmt from "../../../../hooks/useSetSubAmt";

export const SetSubAmt = () => {
  const [amount, setAmount] = useState<number | undefined>();

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const handleSubAmt = useSetSubAmt(amount || 0);

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent bg={"#1d1a27"} className="font">
          <ModalHeader>Set Subscription Amount</ModalHeader>
          <ModalCloseButton
            _focus={{ outline: "none" }}
            _hover={{ border: "1px solid #9f51c6" }}
          />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                size="md"
                border={"1px solid #535354"}
                outline={"none"}
                _hover={{ outline: "none" }}
                _focus={{ boxShadow: "none" }}
                px={".5rem"}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bgGradient="linear(to-r, #e94c91, #5555fb)"
              borderRadius={".7rem"}
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
                handleSubAmt();
              }}
            >
              <Text>Submit</Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button
        bgGradient="linear(to-r, #e94c91, #5555fb)"
        borderRadius={".7rem"}
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
        <Text>Set Sub Amount</Text>
      </Button>
    </>
  );
};
