import React from "react";
import Plot from "react-plotly.js";

const ChartComponent = ({ data }) => {
  const xData = data.map((item) => item.process_group);
  const avialableData = data.map((item) => item.p_avialable);

  const trace1 = {
    x: xData,
    y: avialableData,
    type: "bar",
    mode: "scatter",
    name: "Avialable",
    text: avialableData.map(String),
    marker: {
      color: "rgba(143, 197, 87, 1)",
      line: {
        color: "rgba(143, 197, 87, 1)",
        width: 2,
      },
    },
  };

  const chartData = [trace1];

  const layout = {
    barmode: "relative",
    title: `%Available by Process`,
    xaxis: {
      // title: "",
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "%",
    },
    // width: 1400,
    // height: "100%",
    // width: 1450,
    // height: 350,
    showlegend: true,
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
