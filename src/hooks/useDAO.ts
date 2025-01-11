import { useCallback } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getContentDAOContract } from "../constants/contract";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";
import { ProposalView } from "./types"; // Assuming you have a ProposalView type defined

const useContentDAO = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const joinDAO = useCallback(
    async (stakeAmount: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContentDAOContract(signer);

      try {
        const transaction = await contract.joinDAO(stakeAmount);
        // console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);
      } catch (error: unknown) {
        // console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const leaveDAO = useCallback(async () => {
    if (chainId === undefined)
      return toast.error("Please connect your wallet first.");
    if (!isSupportedChain(chainId)) return toast.error("Wrong network");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getContentDAOContract(signer);

    try {
      const transaction = await contract.leaveDAO();
      //  console.log("transaction: ", transaction);

      const receipt = await transaction.wait();
      //  console.log("receipt: ", receipt);
    } catch (error: unknown) {
      //  console.log(error);
    }
  }, [chainId, walletProvider]);

  const createProposal = useCallback(
    async (name: string, description: string, duration: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContentDAOContract(signer);

      try {
        const transaction = await contract.createProposal(
          name,
          description,
          duration
        );
        // console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);
      } catch (error: unknown) {
        // console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const voteForProposal = useCallback(
    async (proposalIndex: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContentDAOContract(signer);

      try {
        const transaction = await contract.voteForProposal(proposalIndex);
        //  console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        //  console.log("receipt: ", receipt);
      } catch (error: unknown) {
        //  console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const voteAgainstProposal = useCallback(
    async (proposalIndex: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContentDAOContract(signer);

      try {
        const transaction = await contract.voteAgainstProposal(proposalIndex);
        //  console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        //  console.log("receipt: ", receipt);
      } catch (error: unknown) {
        //  console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const executeProposal = useCallback(
    async (proposalIndex: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContentDAOContract(signer);

      try {
        const transaction = await contract.executeProposal(proposalIndex);
        // console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);
      } catch (error: unknown) {
        // console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const getProposals = useCallback(async () => {
    if (chainId === undefined) {
      toast.error("Please connect your wallet first");
      return [];
    }
    if (!isSupportedChain(chainId)) {
      toast.error("Wrong network");
      return [];
    }

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    const contract = getContentDAOContract(signer);

    try {
      const proposalCount = await contract.getProposalCount();
      const proposals: ProposalView[] = [];

      for (let i = 0; i < proposalCount; i++) {
        const proposal = await contract.getProposal(i);
        proposals.push(proposal);
      }

      return proposals;
    } catch (error: unknown) {
      // console.log(error);
      return [];
    }
  }, [chainId, walletProvider]);

  return {
    joinDAO,
    leaveDAO,
    createProposal,
    voteForProposal,
    voteAgainstProposal,
    executeProposal,
    getProposals,
  };
};

export default useContentDAO;
