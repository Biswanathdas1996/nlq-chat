import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { registerables } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

const zoomOptions = {
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "xy" as const,
    scaleMode: "xy" as const,
  },
  pan: {
    enabled: true,
    mode: "xy" as const,
    scaleMode: "xy" as const,
  },
};

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
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
};

interface LineChartProps {
  labels: string[];
  datasets: Dataset[];
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const LineChart: React.FC<LineChartProps> = ({
  labels,
  datasets,
  title,
  xAxisLabel,
  yAxisLabel,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets.map((dataset) => ({
              ...dataset,
              fill: false,
              tension: 0.1,
            })),
          },
          options: {
            responsive: true,
            plugins: {
              zoom: zoomOptions,
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: title,
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: xAxisLabel,
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: yAxisLabel,
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
          },
        });
      }
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, datasets, title, xAxisLabel, yAxisLabel]);

  return <canvas ref={chartRef} style={{ height: "300px", width: "300px" }} />;
};

export default LineChart;
