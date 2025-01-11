import { useCallback } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getVaultContract, getContentDAOContract } from "../constants/contract";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";
import { isSupportedChain } from "../utils";

const useVault = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const stake = useCallback(
    async (amount: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getVaultContract(signer);

      try {
        const transaction = await contract.stake(amount, signer.getAddress());
        // console.log("transaction: ", transaction);

        // const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);
      } catch (error: unknown) {
        // console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const tipCreator = useCallback(
    async (amount: number, creator: string) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getVaultContract(signer);

      try {
        const transaction = await contract.tipCreator(
          amount,
          signer.getAddress(),
          creator
        );
        // console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);
      } catch (error: unknown) {
        console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  const subscribe = useCallback(
    async (amount: number, creator: string) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getVaultContract(signer);

      try {
        const transaction = await contract.subscribe(
          amount,
          signer.getAddress(),
          creator
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

  const withdrawStake = useCallback(
    async (amount: number) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getVaultContract(signer);

      try {
        const transaction = await contract.withdrawStake(
          amount,
          signer.getAddress()
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

  const creatorPayout = useCallback(
    async (amount: number, creator: string) => {
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getVaultContract(signer);
      const daoContract = getContentDAOContract(signer);

      try {
        const transaction = await contract.CreatorPayout(amount, creator);
        // console.log("transaction: ", transaction);

        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);

        // Calculate DAO and developer share
        const daoShare = Math.floor(amount * 0.1); // 10% for DAO
        const developerShare = Math.floor(amount * 0.05); // 5% for developer

        // Transfer DAO share to DAO contract
        const daoTransferTx = await daoContract.receiveDAOShare(daoShare);
        // console.log("DAO transfer transaction: ", daoTransferTx);

        const daoTransferReceipt = await daoTransferTx.wait();
        // console.log("DAO transfer receipt: ", daoTransferReceipt);

        // Transfer developer share to developer address
        // Replace 'developerAddress' with the actual developer address
        const developerAddress = "0x..."; // Replace with the actual developer address
        const developerTransferTx = await contract.transfer(
          developerAddress,
          developerShare
        );
        // console.log("Developer transfer transaction: ", developerTransferTx);

        const developerTransferReceipt = await developerTransferTx.wait();
        // console.log("Developer transfer receipt: ", developerTransferReceipt);
      } catch (error: unknown) {
        // console.log(error);
      }
    },
    [chainId, walletProvider]
  );

  return { stake, tipCreator, subscribe, withdrawStake, creatorPayout };
};

export default useVault;
