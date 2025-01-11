import * as React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" pb="4">
      <Flex direction="column" align="center">
        <Text fontSize="sm">© 2024 ZKCreate. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
