import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";

const colors = [
  "rgba(75,192,192,1)",
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

type Dataset = {
  label: string;
  data: number[];
  backgroundColor?: string[];
  hoverBackgroundColor?: string[];
};

interface PieChartProps {
  labels: string[];
  datasets: Dataset[];
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ labels, datasets, title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const enhancedDatasets: Dataset[] = datasets.map((dataset: Dataset) => ({
    ...dataset,
    backgroundColor: colors,
    hoverBackgroundColor: colors.map((color) => "red"),
  }));

  useEffect(() => {
    let chartInstance: Chart | null = null;
    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: enhancedDatasets,
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: title,
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [labels, datasets, title]);

  return <canvas ref={chartRef} style={{ height: "300px", width: "300px" }} />;
};

export default PieChart;