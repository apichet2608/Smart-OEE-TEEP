import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Page1 = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0, // breakpoint xs
        sm: 600, // breakpoint sm
        md: 960, // breakpoint md
        lg: 1280, // breakpoint lg
        xl: 1900, // breakpoint xl
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <div className="container mx-auto"> */}
        {/* <h1>Welcome to Real Time Parametor Dashboard</h1> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className=" bg-blue-400 mx-auto">
              <Item>test</Item>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className=" bg-blue-400 mx-auto">
              {" "}
              <Item>test</Item>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className=" bg-blue-400 mx-auto">
              {" "}
              <Item>test</Item>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className=" bg-blue-400 mx-auto">
              {" "}
              <Item>test</Item>
            </div>
          </Grid>
        </Grid>
        {/* <h4>Overall Energy Monitoring</h4> */}
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
};

export default Page1;
