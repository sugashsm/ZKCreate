import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
} from "@chakra-ui/react";
import useGetMySubscribers from "../../../../hooks/useGetMySubscribers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

interface subscriberInfo {
  username: string;
  addr: `0x${string}` | undefined;
}

const MySubscribers = () => {
  const { address } = useWeb3ModalAccount();
  const {
    data: subscribersInfo = [],
    loading,
    error,
  } = useGetMySubscribers(address);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Box
        p={"1rem"}
        bgGradient="linear(to-r, #1d1a27, #1d1a27)"
        color="#e9ecef"
        boxShadow="0 5px 14px 0 #0001"
      >
        <Text className="font" fontWeight={"600"} fontSize={"1.4rem"}>
          My Subscribers
        </Text>
        <TableContainer>
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th>Address</Th>
                <Th>Username</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(subscribersInfo as subscriberInfo[]).map((info, index) => (
                <Tr key={index}>
                  <Td noOfLines={1}>{info.addr}</Td>
                  <Td>{info.username}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MySubscribers;
