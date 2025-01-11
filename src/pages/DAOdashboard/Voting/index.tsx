import React, { useState, useEffect } from "react";
import useContentDAO from "../../../hooks/useDAO";
import { ProposalView, ProposalStatus } from "../../../hooks/types";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

const ContentDAOInterface: React.FC = () => {
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
  const [proposals, setProposals] = useState<ProposalView[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
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

  return (
    <div className="container mx-auto p-4 pt-6 bg-black text-white">
      <h2 className="text-3xl font-bold mb-4">Content DAO Interface</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-darkGreen p-4 rounded shadow">
          <h3 className="text-2xl font-bold mb-2">Join DAO</h3>
          <input
            type="number"
            placeholder="Stake Amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full p-2 pl-10 text-sm bg-black text-white"
          />
          <Button onClick={handleJoinDAO} colorScheme="green" mt={2}>
            Join DAO
          </Button>
        </div>
        <div className="bg-darkGreen p-4 rounded shadow">
          <h3 className="text-2xl font-bold mb-2">Leave DAO</h3>
          <Button onClick={handleLeaveDAO} colorScheme="green">
            Leave DAO
          </Button>
        </div>
        <div className="bg-darkGreen p-4 rounded shadow">
          <h3 className="text-2xl font-bold mb-2">Create Proposal</h3>
          <Button onClick={() => setIsModalOpen(true)} colorScheme="green">
            Create Proposal
          </Button>
        </div>
      </div>
      <div className="bg-darkGreen p-4 rounded shadow mt-4">
        <h3 className="text-2xl font-bold mb-2">Proposals</h3>
        <table className="w-full text-sm text-white">
          <thead>
            <tr className="bg-black">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Votes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((proposal, index) => (
              <tr key={index} className="bg-black">
                <td className="px-4 py-2">{proposal.name}</td>
                <td className="px-4 py-2">{proposal.description}</td>
                <td className="px-4 py-2">{ProposalStatus[proposal.status]}</td>
                <td className="px-4 py-2">{proposal.totalVotes.toString()}</td>
                <td className="px-4 py-2">
                  <Button
                    onClick={() => handleVoteForProposal(index)}
                    colorScheme="green"
                    mr={2}
                    leftIcon={<i className="fas fa-thumbs-up"></i>}
                  >
                    Vote For
                  </Button>
                  <Button
                    onClick={() => handleVoteAgainstProposal(index)}
                    colorScheme="red"
                    mr={2}
                    leftIcon={<i className="fas fa-thumbs-down"></i>}
                  >
                    Vote Against
                  </Button>
                  <Button
                    onClick={() => handleExecuteProposal(index)}
                    colorScheme="blue"
                    // isDisabled={proposal.status !== ProposalStatus.Active}
                  >
                    Execute
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg="darkGreen" color="white">
          <ModalHeader>Create Proposal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="text"
              placeholder="Proposal Name"
              value={proposalName}
              onChange={(e) => setProposalName(e.target.value)}
              className="w-full p-2 pl-10 text-sm bg-black text-white"
            />
            <input
              type="text"
              placeholder="Proposal Description"
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              className="w-full p-2 pl-10 text-sm bg-black text-white"
            />
            <input
              type="number"
              placeholder="Proposal Duration (min)"
              value={proposalDuration}
              onChange={(e) => setProposalDuration(e.target.value)}
              className="w-full p-2 pl-10 text-sm bg-black text-white"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleCreateProposal}>
              Create Proposal
            </Button>
            <Button
              variant="ghost"
              color="white"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ContentDAOInterface;
