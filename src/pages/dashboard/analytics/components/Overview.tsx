import { Box, Grid, GridItem } from "@chakra-ui/react";
import FreeLike from "./OverviewComponents/FreeLike";
import FreeDislike from "./OverviewComponents/FreeDislike";
import FreeContent from "./OverviewComponents/FreeContent";
import ExclusiveDislike from "./OverviewComponents/ExclusiveDislike";
import ExclusiveLike from "./OverviewComponents/ExclusiveLike";
import ExclusiveContent from "./OverviewComponents/ExclusiveContent";

const Overview = () => {
  // Queries to fetch data

  return (
    <Box>
      <Grid
        templateColumns={["1fr", "1fr", "repeat(3, 1fr)", "repeat(3, 1fr)"]}
        gap={6}
        mb={"5rem"}
      >
        <GridItem>
          <FreeLike />
        </GridItem>

        <GridItem>
          <FreeDislike />
        </GridItem>

        <GridItem>
          <FreeContent />
        </GridItem>

        <GridItem>
          <ExclusiveLike />
        </GridItem>

        <GridItem>
          <ExclusiveDislike />
        </GridItem>

        <GridItem>
          <ExclusiveContent />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Overview;
