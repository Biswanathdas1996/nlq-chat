// import React, { Component, useState } from "react";
// import LineChart from "../components/LineChart";
// import BarChart from "../components/BarChart";
// import PirChart from "../components/PirChart";
// import RadarChart from "../components/RadarChart";
// import Table from "../components/Table";
// import { Chart } from "chart.js";
// import { registerables } from "chart.js/auto";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import Grid from "@mui/material/Grid";

// import query from "../mock/query.json";

// const chartMap = [
//   {
//     type: "Line Chart",
//     component: LineChart,
//   },
//   {
//     type: "Bar Chart",
//     component: BarChart,
//   },
//   {
//     type: "Pie Chart",
//     component: PirChart,
//   },
//   {
//     type: "Stacked Bar Chart",
//     component: RadarChart,
//   },
//   {
//     type: "Scatter Plot",
//     component: RadarChart,
//   },
// ];

// Chart.register(...registerables);

// const Home: React.FC = () => {
//   const [responseData, setResponseData] = useState<{
//     result: any[];
//     analitics: { "x-axis": string; "y-axis": string[]; type: string }[];
//   } | null>(query);

//   const getXaxisValues = (data: Record<string, any>[], item: string): any[] => {
//     const groupedValues: Record<string, number> = {};

//     data.forEach((dataItem) => {
//       const key = dataItem[item];
//       console.log("key============>", key, item);
//       if (groupedValues[key]) {
//         groupedValues[key] += 1;
//       } else {
//         groupedValues[key] = 1;
//       }
//     });
//     return Object.values(groupedValues);
//   };

//   const getYaxisValues = (
//     data: Record<string, any>[],
//     item: string
//   ): number[] => {
//     return data.map((dataItem) => {
//       if (typeof dataItem[item] === "string") {
//         return dataItem[item].slice(0, 10);
//       } else {
//         return dataItem[item];
//       }
//     });
//   };

//   const generateChartData = (
//     data: Record<string, any>[],
//     analitics: { "x-axis": string; "y-axis": string[]; type: string }[]
//   ) => {
//     if (analitics.length > 0)
//       return analitics?.map((combination) => {
//         const xAxisValues = getXaxisValues(data, combination["x-axis"]);
//         const datasets = combination["y-axis"].map((yAxis, i) => {
//           return {
//             label: yAxis,
//             data: getYaxisValues(data, combination["y-axis"][i]),
//             xAxisLabel: combination["x-axis"],
//             yAxisLabel: yAxis,
//           };
//         });

//         return {
//           type: combination.type,
//           data: {
//             labels: xAxisValues,
//             datasets: datasets,
//           },
//         };
//       });
//   };

//   const chartData = generateChartData(
//     responseData?.result || [],
//     responseData?.analitics || []
//   );

//   const getChartComponent = (type: string): React.FC<any> | null => {
//     const chart = chartMap.find((chart) => chart.type === type);
//     return chart ? chart.component : null;
//   };

//   return (
//     <div>
//       <h1 style={{ gridColumn: "span 4" }}>Welcome to the Home Page</h1>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const formData = new FormData(e.currentTarget);
//           const query = formData.get("query");

//           const myHeaders = new Headers();
//           myHeaders.append("Content-Type", "application/json");

//           const raw = JSON.stringify({
//             question: query,
//           });

//           const requestOptions: RequestInit = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow" as RequestRedirect,
//           };

//           fetch("http://127.0.0.1:5000/query", requestOptions)
//             .then((response) => response.json())
//             .then((result) => {
//               console.log(result);
//               setResponseData(result);
//             })
//             .catch((error) => console.error(error));
//         }}
//         style={{ gridColumn: "span 4", marginBottom: "20px" }}
//       >
//         <TextField
//           id="query"
//           name="query"
//           label="Enter your query:"
//           variant="outlined"
//           required
//         />
//         <br />
//         <br />
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//       </form>

//       {!responseData && <div>Loading...</div>}

//       {responseData && (
//         <>
//           {typeof responseData?.result === "string" ||
//           typeof responseData?.result === "number" ? (
//             <div style={{ gridColumn: "span 4" }}>{responseData.result}</div>
//           ) : (
//             <Table data={responseData?.result || []} loadingUi={false} />
//           )}
//           <div
//             style={{ display: "flex", gridColumn: "span 4", flexWrap: "wrap" }}
//           >
//             {chartData?.map((chart, index) => {
//               // console.log("============>", chart);
//               return (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Card style={{ padding: "10px", margin: "10px" }}>
//                     {getChartComponent(chart.type) &&
//                       React.createElement(
//                         getChartComponent(chart.type) as React.FC<any>,
//                         {
//                           labels: chart.data.labels.map(String),
//                           datasets: chart.data.datasets,
//                           title: chart.type,
//                           xAxisLabel: chart.data.datasets[0].xAxisLabel,
//                           yAxisLabel: chart.data.datasets[0].yAxisLabel,
//                         }
//                       )}
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
