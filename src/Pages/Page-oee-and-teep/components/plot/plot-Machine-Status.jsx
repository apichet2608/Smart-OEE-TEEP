import React from "react";
import Plot from "react-plotly.js";

const ChartComponent = ({ data, title }) => {
  const xData = data.map((item) => item.date_time);
  const powerOnData = data.map((item) => item.power_on);
  const powerOffData = data.map((item) => item.power_off);
  const autoRunData = data.map((item) => item.auto_run);

  const trace1 = {
    x: xData,
    y: powerOnData,
    type: "scatter",
    mode: "scatter",
    name: "Power On",
  };

  const trace2 = {
    x: xData,
    y: powerOffData,
    type: "scatter",
    mode: "scatter",
    name: "Power Off",
  };

  const trace3 = {
    x: xData,
    y: autoRunData,
    type: "scatter",
    mode: "scatter",
    name: "Auto Run",
  };

  const chartData = [trace1, trace2, trace3];

  const layout = {
    title: `${title} Machine Status from select date back 90 day`,
    xaxis: {
      // title: "",
    },
    yaxis: {
      title: "min",
    },
    width: 1400,
    height: "100%",
  };

  return (
    <Plot data={chartData} layout={layout} config={{ responsive: true }} />
  );
};

export default ChartComponent;
