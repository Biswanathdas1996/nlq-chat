import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

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
type Dataset = {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
};

interface BarChartProps {
  labels: string[];
  datasets: Dataset[];
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  datasets,
  title,
  xAxisLabel,
  yAxisLabel,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  const enhancedDatasets: Dataset[] = datasets.map(
    (dataset: Dataset, index: number) => ({
      ...dataset,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
      hoverBackgroundColor: "red",
      hoverBorderColor: "red",
    })
  );

  useEffect(() => {
    let chartInstance: Chart | null = null;

    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: enhancedDatasets,
        },
        options: {
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

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [labels]);

  return <canvas ref={chartRef} style={{ height: "300px", width: "300px" }} />;
};

export default BarChart;
