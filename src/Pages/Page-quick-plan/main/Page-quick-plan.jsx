//TODO : Import React and other required modules

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import formatDate from "date-fns/format";

//TODO : Set up the initial state of the component and style

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    color: "#3371ff",
    fontSize: "15px",
    textAlign: "center",
    FontFace: "Poppins",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& ::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#ffffff",
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "4px",

    backgroundColor: "#3b82f6",
  },
});

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

  //*Filter Model
  const [filterModel, setFilterModel] = React.useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });

  //TODO : Data Grid

  //*rows and columns

  //?rows
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime`
      )
      .then((response) => {
        setRows(response.data);

        const facUnit = Array.from(
          new Set(response.data.map((item) => item.fac_unit_desc))
        );
        setFacUnitOption(facUnit);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //?columns
  const columns = [
    {
      field: "prd_name_nov",
      headerName: "Product Nov",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "proc_id",
      headerName: "Proc ID",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fac_unit_desc",
      headerName: "Fac Unit Desc",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "factory_desc",
      headerName: "Factory",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "proc_disp",
      headerName: "Proc Disp",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "scan_code",
      headerName: "Scan Code",
      width: 90,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lot_status",
      headerName: "Lot Status",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "input_qty",
      headerName: "Input Qty",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "scan_desc",
      headerName: "Scan Desc",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "scan_in",
      headerName: "Scan In",
      width: 160,
      headerAlign: "center",
      valueFormatter: (params) =>
        formatDate(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
    {
      field: "holding_time_hrs",
      headerName: "Holding Time Hrs",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "holding_time_mins",
      headerName: "Holding Time Mins",
      width: 160,
      headerAlign: "center",
    },
    {
      field: "update_date",
      headerName: "Update Date",
      width: 160,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) =>
        formatDate(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
  ];

  //?Filter Option State
  const [facUnitOption, setFacUnitOption] = useState({ facUnitDesc: "ALL" });
  const [procDispOption, setProcDispOption] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    facUnitDesc: "ALL",
    procDisp: "ALL",
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime`
      )
      .then((response) => {
        // Assuming your response.data is an array of objects
        const filteredRows = response.data.filter((item) => {
          return (
            (filterOptions.facUnitDesc === "ALL" ||
              item.fac_unit_desc === filterOptions.facUnitDesc) &&
            (filterOptions.procDisp === "ALL" ||
              item.proc_disp === filterOptions.procDisp)
          );
        });

        setRows(filteredRows);
        // ... rest of your code
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterOptions]);

  console.log("Filter Fac Options", filterOptions.facUnitDesc);

  //*Handle Input Change Option
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${filterOptions.facUnitDesc}`
      )
      .then((response) => {
        const uniqueProcDisp = [
          ...new Set(response.data.map((item) => item.proc_disp)),
        ];
        setProcDispOption(uniqueProcDisp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterOptions.facUnitDesc]);

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <div className="grid grid-cols-4 gap-3">
            {/* first grid */}

            <div className="1st">
              <div className="animate-fade grid grid-cols-2 h-fit gap-3">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={2}
                  className="shadow-md"
                >
                  <Item>
                    <Autocomplete
                      disablePortal
                      id="fac_unit_desc"
                      options={facUnitOption}
                      value={filterOptions.facUnitDesc}
                      onChange={(event, newValue) => {
                        setFilterOptions((prevOptions) => ({
                          ...prevOptions,
                          facUnitDesc: newValue || "ALL",
                          procDisp: "ALL", // Reset procDisp to 'ALL' when facUnitDesc changes
                        }));
                      }}
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Fac Unit" />
                      )}
                    />
                  </Item>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={2}
                  className="shadow-md"
                >
                  <Item>
                    <Autocomplete
                      disablePortal
                      id="proc_disp"
                      options={procDispOption}
                      value={filterOptions.procDisp}
                      onChange={(event, newValue) =>
                        setFilterOptions((prevOptions) => ({
                          ...prevOptions,
                          procDisp: newValue || "ALL",
                        }))
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Proc Disp" />
                      )}
                    />
                  </Item>
                </Grid>
              </div>

              <div className="grid grid-cols-1 shadow-xl animate-delay">
                <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                  <Item className="flex flex-col h-75vh mt-3">
                    <StyledDataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      slots={{ toolbar: GridToolbar }}
                      onFilterModelChange={(newModel) =>
                        setFilterModel(newModel)
                      }
                      filterModel={filterModel}
                      slotProps={{ toolbar: { showQuickFilter: true } }}
                    />
                  </Item>
                </Grid>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};

export default QuickPlan;
