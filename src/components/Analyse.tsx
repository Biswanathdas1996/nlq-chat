import React, { Component, useState } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PirChart from "./PirChart";
import RadarChart from "./RadarChart";
import Table from "./Table";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { QueryData } from "../types/LLM";
import { ANALITICS } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addAnalitics } from "../redux/slices/chatSlices";

import { Chart } from "chart.js";
import { registerables } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);
Chart.register(...registerables);

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
    component: LineChart,
  },
  {
    type: "Stacked Bar Chart",
    component: BarChart,
  },
  {
    type: "Scatter Plot",
    component: BarChart,
  },
];

interface HomeProps {
  data: QueryData;
  chatId: number;
}

const Home: React.FC<HomeProps> = ({ data, chatId }) => {
  // if (!Array.isArray(data?.analitics)) {
  //   return "Some Error Occured, switch back to table view";
  // }

  const dispatch = useDispatch<AppDispatch>();
  const chatHistory = useSelector((state: RootState) => state.chat.value);

  const chatData: any = chatHistory.find((chat) => chat.id === chatId);

  // console.log("chatData======>", chatData);
  const allData = chatData?.message?.result;

  React.useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      result_json: chatData?.message?.result,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    fetch(ANALITICS, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        dispatch(
          addAnalitics({
            chatId,
            analitics: result?.analitics,
          })
        );
      })
      .catch((error) => console.error(error));
  }, []);

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
    Array.isArray(data?.result) ? data.result : [],
    data?.analitics || []
  );

  const getChartComponent = (type: string): React.FC<any> | null => {
    const chart = chartMap.find((chart) => chart.type === type);
    return chart ? chart.component : null;
  };

  return (
    <div>
      {data && (
        <>
          <div
            style={{ display: "flex", gridColumn: "span 4", flexWrap: "wrap" }}
          >
            {data?.analitics?.map((chart, index) => {
              const ChartComponent = getChartComponent(chart.type);
              return ChartComponent ? (
                <ChartComponent
                  key={index}
                  chatData={chatData?.message}
                  chartConfig={chart}
                />
              ) : null;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
