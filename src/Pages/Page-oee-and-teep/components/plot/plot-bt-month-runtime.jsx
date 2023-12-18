import React from "react";
import Plot from "react-plotly.js";

const ChartComponent = ({ data }) => {
  const xData = data.map((item) => item.process_group);
  const powerOnData = data.map((item) => item.p_on);
  const powerOffData = data.map((item) => item.p_off);
  const autoRunData = data.map((item) => item.p_run);

  const trace1 = {
    x: xData,
    y: powerOnData,
    type: "bar",
    mode: "scatter",
    name: "Power On",
    text: powerOnData.map(String),
    marker: {
      color: "rgba(237, 224, 105, 1)",
      line: {
        color: "rgba(237, 224, 105, 1)",
        width: 2,
      },
    },
  };

  const trace2 = {
    x: xData,
    y: powerOffData,
    type: "bar",
    mode: "scatter",
    name: "Power Off",
    text: powerOffData.map(String),
    marker: {
      color: "rgba(225, 225, 225, 1)",
      line: {
        color: "rgba(225, 225, 225, 1)",
        width: 2,
      },
    },
  };

  const trace3 = {
    x: xData,
    y: autoRunData,
    type: "bar",
    mode: "scatter",
    name: "Auto Run",
    text: autoRunData.map(String),
    marker: {
      color: "rgba(143, 197, 87, 1)",
      line: {
        color: "rgba(143, 197, 87, 1)",
        width: 2,
      },
    },
  };

  const chartData = [trace3, trace1, trace2];

  const layout = {
    barmode: "relative",
    title: `% Machine Status by Process`,
    xaxis: {
      tickangle: -45,
      automargin: true,
      // title: "",
    },
    yaxis: {
      title: "%",
    },
    showlegend: true,
    // width: 1400,
    // height: "100%",
    // width: 1450,
    // height: 350,
    autosize: true,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 30,
      pad: 4,
    },
  };

  return (
    <Plot
      data={chartData}
      layout={layout}
      // config={{ responsive: true }}
      style={{ width: "100%", height: "320px" }}
      useResizeHandler={true}
    />
  );
};

export default ChartComponent;
