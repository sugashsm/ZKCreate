import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getAuthContract } from "../constants/contract";
import { getProvider } from "../constants/provider";
import { toast } from "react-toastify";

const useEditProfile = (newImage: string) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (chainId === undefined)
      return toast.error("Please connect your wallet first");
    if (!isSupportedChain(chainId)) return toast.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getAuthContract(signer);

    try {
      if (newImage === "") {
        toast.error("Please fill in details");
      } else {
        const transaction = await contract.editProfile(newImage);
        // console.log("transaction: ", transaction);
        const receipt = await transaction.wait();
        // console.log("receipt: ", receipt);

        if (!receipt.status) {
          toast.error("Update failed!");
          return;
        }

        toast.success("Updated!");
      }
    } catch (error: unknown) {
      // console.log(error);
    }
  }, [chainId, walletProvider, newImage]);
};

export default useEditProfile;
