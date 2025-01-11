import { useEffect, useState } from "react";
// import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getAuthContract } from "../constants/contract";
import { readOnlyProvider } from "../constants/provider";

const useGetRegUsers = () => {
  const [users, setUsers] = useState([]);
  //   const { address } = useWeb3ModalAccount();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const contract = getAuthContract(readOnlyProvider);
        const users = await contract.getAllUsers();
        setUsers(users);
      } catch (err: any) {
        setUsers(err.message);
      }
    };

    fetchUsers();
  }, []);

  return users;
};

export default useGetRegUsers;
