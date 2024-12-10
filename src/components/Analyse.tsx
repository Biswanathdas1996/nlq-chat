import React, { Component, useState } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PirChart from "./PirChart";
import RadarChart from "./RadarChart";
import Table from "./Table";
import { Chart } from "chart.js";
import { registerables } from "chart.js/auto";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { QueryData } from "../types/LLM";

const chartMap = [
  {
    type: "Line Chart",
    component: LineChart,
  },
  {
    type: "Bar Chart",
    component: BarChart,
  },
  {
    type: "Pie Chart",
    component: PirChart,
  },
  {
    type: "Stacked Bar Chart",
    component: RadarChart,
  },
  {
    type: "Scatter Plot",
    component: RadarChart,
  },
];

Chart.register(...registerables);

interface HomeProps {
  data: QueryData;
}

const Home: React.FC<HomeProps> = ({ data }) => {
  if (!Array.isArray(data?.analitics)) {
    return "Some Error Occured, switch back to table view";
  }

  const [responseData, setResponseData] = useState<QueryData>(data);

  const getXaxisValues = (data: Record<string, any>[], item: string): any[] => {
    const groupedValues: Record<string, number> = {};

    data.forEach((dataItem) => {
      const key = dataItem[item];
      //   console.log("key============>", key, item);
      if (groupedValues[key]) {
        groupedValues[key] += 1;
      } else {
        groupedValues[key] = 1;
      }
    });
    return Object.values(groupedValues);
  };

  const getYaxisValues = (
    data: Record<string, any>[],
    item: string
  ): number[] => {
    return data.map((dataItem) => {
      if (typeof dataItem[item] === "string") {
        return dataItem[item].slice(0, 10);
      } else {
        return dataItem[item];
      }
    });
  };

  const generateChartData = (
    data: Record<string, any>[],
    analitics: { "x-axis": string; "y-axis": string[]; type: string }[]
  ) => {
    if (analitics.length > 0)
      return analitics?.map((combination) => {
        const xAxisValues = getXaxisValues(data, combination["x-axis"]);
        const datasets = combination["y-axis"].map((yAxis, i) => {
          return {
            label: yAxis,
            data: getYaxisValues(data, combination["y-axis"][i]),
            xAxisLabel: combination["x-axis"],
            yAxisLabel: yAxis,
          };
        });

        return {
          type: combination.type,
          data: {
            labels: xAxisValues,
            datasets: datasets,
          },
        };
      });
  };

  const chartData = generateChartData(
    Array.isArray(responseData?.result) ? responseData.result : [],
    responseData?.analitics || []
  );

  const getChartComponent = (type: string): React.FC<any> | null => {
    const chart = chartMap.find((chart) => chart.type === type);
    return chart ? chart.component : null;
  };

  return (
    <div>
      {responseData && (
        <>
          <div
            style={{ display: "flex", gridColumn: "span 4", flexWrap: "wrap" }}
          >
            {chartData?.map((chart, index) => {
              // console.log("============>", chart);
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card style={{ padding: "10px", margin: "10px" }}>
                    {getChartComponent(chart.type) &&
                      React.createElement(
                        getChartComponent(chart.type) as React.FC<any>,
                        {
                          labels: chart.data.labels.map(String),
                          datasets: chart.data.datasets,
                          title: chart.type,
                          xAxisLabel: chart.data.datasets[0].xAxisLabel,
                          yAxisLabel: chart.data.datasets[0].yAxisLabel,
                        }
                      )}
                  </Card>
                </Grid>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
