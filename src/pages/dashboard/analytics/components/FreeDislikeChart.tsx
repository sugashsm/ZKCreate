import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  GET_ALL_FREE_DISLIKE,
  queryContentUrl,
} from "../../../../constants/graphQueries";
import { Box, Text } from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

interface ContentData {
  timestamp: number;
}

interface FreeDislikeData {
  FreeContentDislikedInterval: ContentData[];
}

interface ChartData {
  series: { name: string; data: number[] }[];
  options: any;
}

const FreeDislikeChart = (): JSX.Element => {
  const { address } = useWeb3ModalAccount();

  const [chartData, setChartData] = useState<ChartData>({
    series: [{ name: "Monthly Dislikes", data: [] }],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { borderRadius: 5, dataLabels: { position: "top" } },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val;
        },
        offsetY: -20,
        style: { fontSize: "12px", colors: ["#fff"] },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        labels: {
          style: {
            colors: Array(12).fill("#fff"),
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: { show: false },
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
      legend: { show: false },
      tooltip: { enabled: false },
    },
  });

  useEffect(() => {
    const contentClient = new ApolloClient({
      uri: queryContentUrl,
      cache: new InMemoryCache(),
    });

    const fetchAll = async () => {
      const nowInSeconds = Math.floor(Date.now() / 1000);

      const currentYear = new Date().getFullYear();
      const januaryFirst = new Date(currentYear, 0, 1);

      const startTimeInMilliseconds = Math.floor(januaryFirst.getTime());
      const endTimeInMilliseconds = Date.now();

      const startTimestamp = Math.floor(startTimeInMilliseconds / 1000);
      const endTimestamp = Math.floor(endTimeInMilliseconds / 1000);

      const variables = {
        startTimestamp,
        endTimestamp,
        nowInSeconds,
        creator: address,
      };

      try {
        const { data } = await contentClient.query<FreeDislikeData>({
          query: GET_ALL_FREE_DISLIKE,
          variables,
        });

        const monthlyDislikesCount = Array(12).fill(0);

        for (const content of data.FreeContentDislikedInterval) {
          const month = new Date(content.timestamp * 1000).getMonth();
          monthlyDislikesCount[month]++;
        }

        setChartData({
          ...chartData,
          series: [{ name: "Monthly Dislikes", data: monthlyDislikesCount }],
        });
      } catch (error) {
        console.error("Could not fetch data", error);
      }
    };

    fetchAll();
  }, [address, chartData]);

  return (
    <Box>
      <Box
        id="chart"
        bgGradient="linear(to-r, #1d1a27, #1d1a27)"
        color="#e9ecef"
        boxShadow="0 5px 14px 0 #0001"
        transition={"all .5s ease-in-out"}
        py={"1.5rem"}
        px={"1rem"}
      >
        <Text className="font" fontWeight={"600"} fontSize={"1.4rem"}>
          No of Free Disliked Content
        </Text>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </Box>
      <Box id="html-dist"></Box>
    </Box>
  );
};

export default FreeDislikeChart;
