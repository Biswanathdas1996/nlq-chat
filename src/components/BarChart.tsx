import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  Label,
  LineChart,
  Line,
} from "recharts";
import { Card } from "@mui/material";

const limit = [1000, 1000000, 1000000000, 1000000000000];
const unit = ["K", "M", "B", "T"];
const colors = [
  "#D04A02",
  "rgb(153, 102, 255)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)",
];

export function formatNumber(value: number) {
  for (let i = limit.length - 1; i >= 0; i--) {
    const scaled = value / limit[i];
    if (scaled > 1) return `${scaled.toFixed(1)}${unit[i]}`;
  }
  return value.toFixed(1);
}

// Define the data type for better type safety
type ChartData = {
  name: string;
  Sales: number;
  Revenue: number;
};

type MyBarChartProps = {
  chatData: any;
  chartConfig: any;
};

const MyBarChart: React.FC<MyBarChartProps> = ({ chatData, chartConfig }) => {
  console.log("Bar chart data----------->", chatData, chartConfig);

  type DataType = {
    [key: string]: any;
  };

  type ConfigType = {
    "x-axis": string;
    "y-axis": string[];
  };

  function groupAndSumData(data: DataType[], config: ConfigType) {
    const { "x-axis": xAxis, "y-axis": yAxis } = config;

    // Group data by x-axis key
    const groupedData = data.reduce((acc, item) => {
      const key = item[xAxis];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as { [key: string]: DataType[] });

    // Sum the y-axis values for each group
    const result = Object.entries(groupedData).map(([groupKey, items]) => {
      const yAxisSums = yAxis.reduce((sumAcc, yKey) => {
        sumAcc[yKey] = items.reduce(
          (sum: number, item: DataType) => sum + (item[yKey] || 0),
          0
        );
        return sumAcc;
      }, {} as { [key: string]: number });

      return {
        [xAxis]: groupKey,
        ...yAxisSums,
      };
    });

    return result;
  }

  console.log(
    "magic result=======>",
    groupAndSumData(chatData?.result, chartConfig)
  );

  return (
    <Card style={{ padding: 10, margin: 10 }}>
      <ResponsiveContainer width={300} height={300}>
        <BarChart data={groupAndSumData(chatData?.result, chartConfig)}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            stroke="var(--textColor)"
            dataKey={chartConfig["x-axis"]}
            tick={{ fontSize: 8 }}
          >
            {/* <Label
              value={chartConfig["x-axis"]}
              offset={-5}
              position="insideBottom"
            /> */}
          </XAxis>
          <YAxis
            stroke="var(--textColor)"
            // tickFormatter={formatNumber}
            tick={{ fontSize: 10 }}
          >
            <Label
              value={`X Axis =  ${chartConfig["x-axis"]}`}
              angle={90}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip />
          <Legend style={{ marginTop: 20 }} />

          {chartConfig["y-axis"].map((valueKey: any, index: number) => (
            <Bar key={index} dataKey={valueKey} fill={colors[index]} />
          ))}

          {/* <Brush dataKey="x" height={30} stroke="#8884d8" /> */}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MyBarChart;
