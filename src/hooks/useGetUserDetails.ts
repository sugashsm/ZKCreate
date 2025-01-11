import { useEffect, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getAuthContract } from "../constants/contract";
import { readOnlyProvider } from "../constants/provider";

interface UserDetails {
  username: string;
  walletAddress: string;
  profileImage: string;
}

interface State {
  loading: boolean;
  data?: UserDetails;
  error?: string;
}

const useGetUserDetails = (): State => {
  const [userDetails, setUserDetails] = useState<State>({
    loading: true,
    data: undefined,
    error: undefined,
  });
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const contract = getAuthContract(readOnlyProvider);
        const [userName, userAddress, userImage] =
          await contract.getUserDetails(address);
        setUserDetails({
          loading: false,
          data: {
            username: userName,
            walletAddress: userAddress,
            profileImage: userImage,
          },
          error: undefined,
        });
      } catch (err: any) {
        setUserDetails({
          loading: false,
          data: undefined,
          error: err.message,
        });
      }
    };

    fetchUserDetails();
  }, [address]);

  return userDetails;
};

export default useGetUserDetails;
