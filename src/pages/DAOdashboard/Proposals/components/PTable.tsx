import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { GoArrowUpRight } from "react-icons/go";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import useContentDAO from "../../../../hooks/useDAO";
import { ProposalView, ProposalStatus } from "../../../../hooks/types";

const PTable: React.FC = () => {
  const {
    joinDAO,
    leaveDAO,
    createProposal,
    voteForProposal,
    voteAgainstProposal,
    executeProposal,
    getProposals,
  } = useContentDAO();
  const [stakeAmount, setStakeAmount] = useState("");
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalDuration, setProposalDuration] = useState("");
  const [proposals, setProposals] = useState<ProposalView[]>([]); // Initialize with an empty array of ProposalView

  useEffect(() => {
    const fetchProposals = async () => {
      const fetchedProposals = await getProposals();
      setProposals(fetchedProposals);
    };
    fetchProposals();
  }, [getProposals]);

  const handleJoinDAO = async () => {
    await joinDAO(parseFloat(stakeAmount));
    setStakeAmount("");
  };

  const handleLeaveDAO = async () => {
    await leaveDAO();
  };

  const handleCreateProposal = async () => {
    await createProposal(
      proposalName,
      proposalDescription,
      parseInt(proposalDuration)
    );
    setProposalName("");
    setProposalDescription("");
    setProposalDuration("");
  };

  const handleVoteForProposal = async (proposalIndex: number) => {
    await voteForProposal(proposalIndex);
  };

  const handleVoteAgainstProposal = async (proposalIndex: number) => {
    await voteAgainstProposal(proposalIndex);
  };

  const handleExecuteProposal = async (proposalIndex: number) => {
    await executeProposal(proposalIndex);
  };
  const handleOpenStakeModal = () => {
    setIsStakeModalOpen(true);
  };

  const handleCloseStakeModal = () => {
    setIsStakeModalOpen(false);
    setStakeAmount("");
  };

  const handleOpenCreateProposalModal = () => {
    setIsCreateProposalModalOpen(true);
  };

  const handleCloseCreateProposalModal = () => {
    setIsCreateProposalModalOpen(false);
    setProposalName("");
    setProposalDescription("");
    setProposalDuration("");
  };

  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isCreateProposalModalOpen, setIsCreateProposalModalOpen] =
    useState(false);

  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  return (
    <>
      <Button
        colorScheme="teal"
        size="md"
        mb="20px"
        onClick={handleOpenCreateProposalModal}
      >
        Create Proposal
      </Button>

      <Button
        colorScheme="teal"
        size="md"
        mb="20px"
        onClick={handleOpenStakeModal}
      >
        Join DAO
      </Button>

      <Button colorScheme="red" size="md" mb="20px" onClick={handleLeaveDAO}>
        Leave DAO
      </Button>

      <Modal isOpen={isStakeModalOpen} onClose={handleCloseStakeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join DAO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Stake Amount</FormLabel>
              <Input
                type="number"
                placeholder="Enter stake amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseStakeModal}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleJoinDAO}>
              Join DAO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isCreateProposalModalOpen}
        onClose={handleCloseCreateProposalModal}
        leastDestructiveRef={cancelRef}
        size="lg"
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg="gray.800" color="white">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Create Proposal
          </AlertDialogHeader>
          <AlertDialogBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Proposal Name"
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                bg="gray.700"
                color="white"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                placeholder="Proposal Description"
                value={proposalDescription}
                onChange={(e) => setProposalDescription(e.target.value)}
                bg="gray.700"
                color="white"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Duration</FormLabel>
              <Input
                type="number"
                placeholder="Proposal Duration (seconds)"
                value={proposalDuration}
                onChange={(e) => setProposalDuration(e.target.value)}
                bg="gray.700"
                color="white"
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleCloseCreateProposalModal}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleCreateProposal}
              ml={3}
              bg="blue.600"
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TableContainer>
        <Table variant="striped" colorScheme="">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th isNumeric>Total Votes</Th>

              <Th isNumeric>Vote</Th>
              <Th isNumeric>Execute</Th>
            </Tr>
          </Thead>
          <Tbody>
            {proposals.map((proposal, index) => (
              <Tr key={index}>
                <Td>
                  {proposal.name}
                  <GoArrowUpRight />
                </Td>
                <Td>{proposal.description}</Td>

                <Td>{ProposalStatus[proposal.status]}</Td>
                <Td isNumeric>{proposal.totalVotes.toString()}</Td>
                <Td isNumeric>
                  <HStack spacing={2}>
                    <LuThumbsUp
                      style={{ marginRight: "10px" }}
                      onClick={() => handleVoteForProposal(index)}
                    />
                    <LuThumbsDown
                      onClick={() => handleVoteAgainstProposal(index)}
                    />
                  </HStack>
                </Td>
                <Td>
                  <button onClick={() => handleExecuteProposal(index)}>
                    Execute
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PTable;
// const [isCreateProposalModalOpen, setIsCreateProposalModalOpen] =
//   useState(false);

//  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
