import Hero from "./components/Hero";
import Card from "./components/Card";
import HomeLayout from "../../../layout/homeLayout";
import { Box } from "@chakra-ui/react";
function Home() {
  return (
    <Box>
      <HomeLayout>
        <Hero />
        {/* <Card /> */}
      </HomeLayout>
    </Box>
  );
}

export default Home;
