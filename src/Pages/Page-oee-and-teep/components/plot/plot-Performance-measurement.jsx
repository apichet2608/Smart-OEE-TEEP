import React from "react";
import Plot from "react-plotly.js";

const ChartComponent = ({ data, title }) => {
  const xData = data.map((item) => item.date_time);
  const percentAvailableData = data.map((item) => item.percent_available);
  const percentPerformanceData = data.map((item) => item.percent_performance);
  const percentOeeData = data.map((item) => item.percent_oee);
  const target_oee = data.map((item) => item.target_oee);

  const trace1 = {
    x: xData,
    y: percentAvailableData,
    type: "scatter",
    mode: "scatter",
    name: "Percent Available",
  };

  const trace2 = {
    x: xData,
    y: percentPerformanceData,
    type: "scatter",
    mode: "scatter",
    name: "Percent Performance",
  };

  const trace3 = {
    x: xData,
    y: percentOeeData,
    type: "scatter",
    mode: "scatter",
    name: "Percent OEE",
  };

  const trace4 = {
    x: xData,
    y: target_oee,
    type: "scatter",
    mode: "scatter",
    name: "Target OEE",
  };
  const chartData = [trace1, trace2, trace3, trace4];

  const layout = {
    title: `${title} Performance measurement from select date back 90 day`,
    xaxis: {
      // title: "Date/Time",
    },
    yaxis: {
      // title: "Percentage",
    },
    width: 1400,
    height: "100%",
  };

  return (
    <Plot data={chartData} layout={layout} config={{ responsive: true }} />
  );
};

export default ChartComponent;
