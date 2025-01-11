import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getContentContract } from "../constants/contract";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";

const useDelete = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (id: number) => {
      // console.log(id);
      if (chainId === undefined)
        return toast.error("Please connect your wallet first");
      if (!isSupportedChain(chainId)) return toast.error("Wrong network");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getContentContract(signer);

      try {
        const transaction = await contract.deleteFreeContent(id);
        // console.log("transaction: ", transaction);
        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);

        if (!receipt.status) {
          toast.error("Deletion failed!");
          return;
        }

        toast.success("Deleted!");
      } catch (error: any) {
        // console.log(error);
        if ((error.message = "You are not the creator")) {
          toast.error("You're not the creator");
        }
      }
    },
    [chainId, walletProvider]
  );
};

export default useDelete;
