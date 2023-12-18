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

//TODO : Set up the initial state of the component and style

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

const DataTable = () => {
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
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    axios
      // .get(
      //   `http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=BLK&proc_disp=ZBLK`
      // )
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${
          filterOptions.facUnitDesc
        }&proc_grp_name=${filterOptions.procGrp}`
      )
      .then((response) => {
        // console.log("Data fetched!", response.data);
        setRows(response.data);

        //get unique fac_unit_desc options
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
    // {
    //   field: "prd_name_nov",
    //   headerName: "Product Nov",
    //   width: 120,
    //   headerAlign: "center",
    // },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 101,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "proc_id",
    //   headerName: "Proc ID",
    //   width: 80,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "fac_unit_desc",
      headerName: "Fac Unit Desc",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "factory_desc",
    //   headerName: "Factory",
    //   width: 80,
    //   headerAlign: "center",
    //   align: "center",
    // },

    // {
    //   field: "scan_code",
    //   headerName: "Scan Code",
    //   width: 90,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "lot_status",
    //   headerName: "Lot Status",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "input_qty",
    //   headerName: "Input Qty",
    //   width: 120,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "proc_disp",
      headerName: "Process",
      width: 80,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "holding_time_mins",
      headerName: "Holding(min)",
      width: 120,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        let bgColor = "bg-yellow-500";
        if (params.value < 720) {
          bgColor = "bg-green-500";
        } else if (params.value > 1440) {
          bgColor = "bg-red-500";
        }
        return (
          <div
            className={`w-full h-fit flex items-center justify-center py-1 rounded-full text-white ${bgColor} font-bold`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "scan_desc",
      headerName: "Status",
      width: 135,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "proc_grp_name",
      headerName: "Proc Group Name",
      width: 160,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "scan_in",
      headerName: "Scan In",
      width: 170,
      headerAlign: "center",
      valueFormatter: (params) =>
        formatDate(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
    // {
    //   field: "holding_time_hrs",
    //   headerName: "Holding Time Hrs",
    //   width: 160,
    //   headerAlign: "center",
    // },

    // {
    //   field: "update_date",
    //   headerName: "Update Date",
    //   width: 160,
    //   headerAlign: "center",
    //   align: "center",
    //   valueFormatter: (params) =>
    //     formatDate(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    // },
  ];

  //?Filter Option State
  const [facUnitOption, setFacUnitOption] = useState({ facUnitDesc: "ALL" });
  const [procGrpOption, setProcGrpOption] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    facUnitDesc: "ALL",
    procGrp: "ALL",
  });

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${
          filterOptions.facUnitDesc
        }&proc_grp_name=${filterOptions.procGrp}`
      )
      .then((response) => {
        const filteredRows = response.data.filter((item) => {
          return (
            (filterOptions.facUnitDesc === "ALL" ||
              item.fac_unit_desc === filterOptions.facUnitDesc) &&
            (filterOptions.procGrp === "ALL" ||
              item.proc_grp_name === filterOptions.procGrp)
          );
        });

        setRows(filteredRows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterOptions, realTimeData]);

  // console.log("Filter Fac Options", filterOptions.facUnitDesc);

  //*Handle Input Change Option
  useEffect(() => {
    axios
      // .get(
      //   `http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${filterOptions.facUnitDesc}`
      // )
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${
          filterOptions.facUnitDesc
        }&proc_grp_name=${filterOptions.procGrp}`
      )
      //get unique proc_grp_name options based on fac_unit_desc selected
      .then((response) => {
        const uniqueProcGrp = [
          ...new Set(response.data.map((item) => item.proc_grp_name)),
        ];
        setProcGrpOption(uniqueProcGrp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterOptions.facUnitDesc]);

  //*Real-time fetching
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    console.log("Fetching data..."); // this will log every minute if real-time fetching is working
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${
          filterOptions.facUnitDesc
        }&proc_grp_name=${filterOptions.procGrp}`
      )
      .then((res) => {
        console.log("Data fetched!", res.data);
        setRealTimeData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // console.log("facUnitOption", facUnitOption)

  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          {/* <div className="grid grid-cols-4 gap-3"> */}
          {/* first grid */}

          <div className="card px-1.5 py-1.5 bg-white rounded-lg shadow-lg animate-fade">
            <div className="animate-fade grid grid-cols-2 h-fit gap-3">
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={2}
                className="shadow-sm"
              >
                <Autocomplete
                  disablePortal
                  id="fac_unit_desc"
                  options={facUnitOption}
                  onChange={(event, newValue) => {
                    setFilterOptions((prevOptions) => ({
                      ...prevOptions,
                      facUnitDesc: newValue || "ALL",
                      procGrp: "ALL", // Reset procGrp to 'ALL' when facUnitDesc changes
                    }));
                  }}
                  sx={{ width: "100%", backgroundColor: "#d3e6fd" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Fac Unit" />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={2}
                className="shadow-sm"
              >
                <Autocomplete
                  disablePortal
                  id="proc_grp_name"
                  options={procGrpOption}
                  onChange={(event, newValue) =>
                    setFilterOptions((prevOptions) => ({
                      ...prevOptions,
                      procGrp: newValue || "ALL",
                    }))
                  }
                  sx={{ width: "100%", backgroundColor: "#e5fafe" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Proc Group" />
                  )}
                />
              </Grid>
            </div>

            <div className="grid grid-cols-1 animate-delay">
              <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                <div className="flex flex-col h-75vh mt-3">
                  <StyledDataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    slots={{ toolbar: GridToolbar }}
                    onFilterModelChange={(newModel) => setFilterModel(newModel)}
                    filterModel={filterModel}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                  />
                </div>
              </Grid>
            </div>
          </div>
          {/* </div> */}
        </ThemeProvider>
      </div>
    </>
  );
};

export default DataTable;
