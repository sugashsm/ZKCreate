import { useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getAuthContract } from "../constants/contract";
import { readOnlyProvider } from "../constants/provider";

// interface UserDetails {
//   username: string;
//   walletAddress: string;
//   profileImage: string;
// }

// interface State {
//   loading: boolean;
//   data?: UserDetails;
//   error?: string;
// }

const useCheckRegUser = () => {
  const { address } = useWeb3ModalAccount();

  return useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const contract = getAuthContract(readOnlyProvider);
        const response = await contract.checkRegisteredUsers(address);

        // console.log(response);
      } catch (err: any) {
        // console.log(err.message);
      }
    };

    fetchUserDetails();
  }, [address]);
};

export default useCheckRegUser;
