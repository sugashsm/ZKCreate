import { Box, Text, Tooltip } from "@chakra-ui/react";
import useGetRegUsers from "../../../../hooks/useGetRegUsers";
import "../../../../App.css";

const Users = () => {
  const getRegUsers = useGetRegUsers();
  return (
    <Box
      w="500px"
      h="100vh"
      py={"2rem"}
      px={"1rem"}
      bg={"#171717"}
      overflowY={"auto"}
      overflowX={"hidden"}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#1C1C1E",
        },
      }}
    >
      <Text mb={"1rem"} fontSize={"1.5rem"} fontWeight={"500"}>
        Users
      </Text>
      <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
        {getRegUsers.map((item) => (
          <Tooltip className="font" label={item} aria-label="A tooltip">
            <Box
              p={"1rem"}
              bg={"#262628"}
              boxShadow={"0px 0px 0px 1px #2f2f30"}
              borderRadius={"0.5rem"}
              key={item}
            >
              <Text noOfLines={1}>{item}</Text>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Users;
