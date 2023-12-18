//TODO : Import React and other required modules

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import formatDate from "date-fns/format";
import DataTable from "../components/DataTable";
import NewDataTable from "../components/NewDataTable";
import { set } from "date-fns";

//TODO : Set up the initial state of the component and style

const QuickPlan = () => {
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
    <>
      <div>
        <ThemeProvider theme={theme}>
          <div className="flex flex-row gap-3">
            <div className="grid grid-cols-1 shadow-xl py-3 rounded-3xl hover:scale-105 duration-300 hover:shadow-none">
              <NewDataTable />
            </div>
            <div className="grid grid-cols-1 shadow-xl py-3 rounded-3xl hover:scale-105 duration-300 hover:shadow-none">
              <NewDataTable />
            </div>
            <div className="grid grid-cols-1 shadow-xl py-3 rounded-3xl hover:scale-105 duration-300 hover:shadow-none">
              <NewDataTable />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};

export default QuickPlan;
