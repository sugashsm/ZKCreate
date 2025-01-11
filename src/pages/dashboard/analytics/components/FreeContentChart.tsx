import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {
  GET_ALL_FREE_CONTENT,
  queryContentUrl,
} from "../../../../constants/graphQueries";
import { Box, Text } from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

interface ContentData {
  timestamp: number;
}

interface FreeContentData {
  FreeCreatedInterval: ContentData[];
}

interface ChartData {
  series: { name: string; data: number[] }[];
  options: any;
}

const FreeContentChart = (): JSX.Element => {
  const { address } = useWeb3ModalAccount();

  const [chartData, setChartData] = useState<ChartData>({
    series: [{ name: "Monthly Content Count", data: [] }],
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
          show: true,
          style: {
            colors: Array(12).fill("#fff"),
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-xaxis-label apexcharts-xaxis-texts-g",
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: { show: false },
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: false,
        },
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
      const { data } = await contentClient.query<FreeContentData>({
        query: GET_ALL_FREE_CONTENT,
        variables: {
          startTimestamp: Math.floor(new Date().setMonth(0) / 1000),
          endTimestamp: Math.floor(Date.now() / 1000),
          nowInSeconds: Math.floor(Date.now() / 1000),
          creator: address,
        },
      });

      try {
        const monthlyContentCount = Array(12).fill(0);

        for (const content of data.FreeCreatedInterval) {
          const month = new Date(content.timestamp * 1000).getMonth();
          monthlyContentCount[month]++;
        }

        setChartData({
          ...chartData,
          series: [
            { name: "Monthly Content Count", data: monthlyContentCount },
          ],
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
          No of Free Content Created
        </Text>{" "}
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

export default FreeContentChart;
