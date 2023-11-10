import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { format } from "date-fns";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PLOT1 from "./components/plot/plot-Performance-measurement";
import PLOT2 from "./components/plot/plot-Machine-Status";
import LoadingPage from "../Page-Loading/LoadingPage";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingplot, setisLoadingplot] = useState(false);

  const [selectedBuild, setSelectedBuild] = React.useState({
    buiding: "ALL",
  });
  const [BuildOptions, setBuildOptions] = React.useState([]);
  const handleBuildChange = (event, value) => {
    setSelectedBuild(value || { buiding: "ALL" });
  };
  const [selectedProcess, setSelectedProcess] = React.useState({
    process_group: "ALL",
  });
  const [ProcessOptions, setProcessOptions] = React.useState([]);
  const handleProcessChange = (event, value) => {
    setSelectedProcess(value || { process_group: "ALL" });
    console.log(value.process_group);
  };
  const [apiData, setApiData] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null);
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  useEffect(() => {}, []);
  useEffect(() => {
    if (startDate) {
      axios
        .get(
          `${import.meta.env.VITE_IP_API}${
            import.meta.env.VITE_smart_machine_oee
          }/distinct-build?date=${startDate}`
        )
        .then((response) => {
          const data = response.data;
          if (data.length > 0) {
            setBuildOptions([...data, { buiding: "ALL" }]);
          } else {
            setBuildOptions([{ buiding: "NO-DATA" }]);
          }
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [startDate]);

  useEffect(() => {
    if (startDate && selectedBuild)
      axios
        .get(
          `${import.meta.env.VITE_IP_API}${
            import.meta.env.VITE_smart_machine_oee
          }/distinct-process?date=${startDate}&build=${selectedBuild.buiding}`
        )
        .then((response) => {
          const mccodeData = response.data;
          setProcessOptions(mccodeData);
          console.log(mccodeData);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [startDate, selectedBuild]);

  useEffect(() => {
    const encodedProcessGroup = encodeURIComponent(
      selectedProcess.process_group
    );
    if (startDate && selectedBuild && selectedProcess) {
      setisLoading(true);

      axios
        .get(
          `${import.meta.env.VITE_IP_API}${
            import.meta.env.VITE_smart_machine_oee
          }/data-table?date=${startDate}&build=${
            selectedBuild.buiding
          }&process=${encodedProcessGroup}`
        )
        .then((response) => {
          const data = response.data;
          setApiData(data);
          console.log(data);
          setisLoading(false);

          // Perform any further processing or state updates based on the fetched data
        })
        .catch((error) => {
          console.log(error);
          setisLoading(false);
        });
    }
  }, [startDate, selectedBuild, selectedProcess]);
  // useEffect(() => {

  //   if (selectedDate.date_time !== "ALL" && selectedBuild.buiding !== "ALL") {
  //     axios
  //       .get(
  //         `${import.meta.env.VITE_IP_API}${import.meta.env.VITE_smart_machine_oee}/distinct-process?date=${selectedDate.date_time}&build=${selectedBuild.buiding}`
  //       )
  //       .then((response) => {
  //         const data = response.data;
  //         setProcessOptions([...data, { process: "ALL" }]);
  //         console.log(data);
  //         // ทำอะไรกับข้อมูลเช่นการอัปเดต state หรืออื่น ๆ ตามที่คุณต้องการ
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [selectedDate, selectedBuild]);

  // useEffect(() => {
  //   if (
  //     selectedDate.date_time !== "ALL" &&
  //     selectedBuild.building !== "ALL" &&
  //     selectedProcess.process !== "ALL"
  //   ) {
  //     axios
  //       .get(
  //         `${import.meta.env.VITE_IP_API}${import.meta.env.VITE_smart_machine_oee}/fetch-data?date=${selectedDate.date_time}&build=${selectedBuild.building}&process=${selectedProcess.process}`
  //       )
  //       .then((response) => {
  //         const data = response.data;
  //         setApiData(data);
  //         console.log(data);
  //         // Perform any further processing or state updates based on the fetched data
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, [selectedDate, selectedBuild, selectedProcess]);

  // const columns = [
  //   //{ field: "id", headerName: "ID" },
  //   //{ field: "date_time", headerName: "Date/Time" },
  //   { field: "mc_code", headerName: "MC Code", width: 100 },
  //   { field: "buiding", headerName: "Building", width: 80 },
  //   { field: "auto_run", headerName: "Auto Run(min)", width: 150 },
  //   { field: "power_on", headerName: "Power On(min)", width: 150 },
  //   { field: "power_off", headerName: "Power Off(min)", width: 150 },
  //   //{ field: "meeting", headerName: "Meeting" },
  //   //{ field: "break", headerName: "Break" },
  //   //{ field: "plan_stop", headerName: "Plan Stop" },
  //   //{ field: "kpr_percent", headerName: "KPR Percent" },
  //   //{ field: "yield", headerName: "Yield" },
  //   { field: "target_oee", headerName: "Target %OEE", width: 150 },
  //   //{ field: "one_dya_time_on", headerName: "One Day Time On" },
  //   //{ field: "available_time", headerName: "Available Time" },
  //   { field: "percent_performance", headerName: "%Performance", width: 150 },
  //   { field: "percent_available", headerName: "%Available", width: 150 },
  //   { field: "percent_oee", headerName: "%OEE", width: 150 },
  //   //{ field: "factory_utilize", headerName: "Factory Utilize" },
  //   { field: "percent_teep", headerName: "%TEEP", width: 150 },
  // ];

  // const columns = [
  //   { field: "mc_code", headerName: "MC Code", width: 100 },
  //   { field: "building", headerName: "Building", width: 80 },
  //   { field: "auto_run", headerName: "Auto Run(min)", width: 150 },
  //   { field: "power_on", headerName: "Power On(min)", width: 150 },
  //   { field: "power_off", headerName: "Power Off(min)", width: 150 },
  //   {
  //     field: "target_oee",
  //     headerName: "Target %OEE",
  //     width: 150,
  //     valueFormatter: (params) => Math.round(params.value),
  //   },
  //   {
  //     field: "percent_performance",
  //     headerName: "%Performance",
  //     width: 150,
  //     valueFormatter: (params) => Math.round(params.value),
  //   },
  //   {
  //     field: "percent_available",
  //     headerName: "%Available",
  //     width: 150,
  //     valueFormatter: (params) => Math.round(params.value),
  //   },
  //   {
  //     field: "percent_oee",
  //     headerName: "%OEE",
  //     width: 150,
  //     valueFormatter: (params) => Math.round(params.value),
  //   },
  //   {
  //     field: "percent_teep",
  //     headerName: "%TEEP",
  //     width: 150,
  //     valueFormatter: (params) => Math.round(params.value),
  //   },
  // ];

  const [apiDataPlot, setApiDataPlot] = React.useState([]);
  const [mccode, setmccode] = React.useState(null);
  const handleButtonClick = (mcCode) => {
    setmccode(mcCode);
    const encodedProcessGroup = encodeURIComponent(
      selectedProcess.process_group
    );
    // Call the API with the specific parameters
    setisLoadingplot(true);
    axios
      .get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smart_machine_oee
        }/data-plot?date=${startDate}&build=${
          selectedBuild.buiding
        }&process=${encodedProcessGroup}&mc_code=${mcCode}`
      )
      .then((response) => {
        const data = response.data;
        // Perform any further processing or state updates based on the fetched data
        setApiDataPlot(data);
        console.log(data);
        setisLoadingplot(false);
      })
      .catch((error) => {
        console.log(error);
        setisLoadingplot(false);
      });
  };

  const columns = [
    {
      field: "process_group",
      headerName: "Process",
      width: 100,
      renderCell: (params) => params.value,
    },
    {
      field: "mc_code",
      headerName: "MC Code",
      width: 130,
      renderCell: (params) => (
        <Button onClick={() => handleButtonClick(params.value)}>
          {params.value}
        </Button>
      ),
    },
    {
      field: "buiding",
      headerName: "Building",
      width: 80,
      renderCell: (params) => params.value,
    },

    {
      field: "target_oee",
      headerName: "%OEE Target",
      width: 110,
      renderCell: (params) => Math.round(params.value),
    },
    {
      field: "percent_performance",
      headerName: "%Performance",
      width: 150,
      renderCell: (params) => {
        const roundedValue = Math.round(params.value);
        const targetOee = params.row.target_oee;
        // const percentage = (roundedValue / targetOee) * 100;

        let variant = "success";
        if (roundedValue > targetOee) {
          variant = "success";
        } else if (roundedValue > targetOee - 10) {
          variant = "warning";
        } else if (roundedValue < targetOee) {
          variant = "danger";
        }

        return (
          <ProgressBar
            now={roundedValue}
            variant={variant}
            label={`${roundedValue}%`}
            style={{ width: 150 }}
          />
        );
      },
    },
    // {
    //   field: "yield",
    //   headerName: "% Yield",
    //   width: 120,
    //   renderCell: (params) => {
    //     const roundedValue = Math.round(params.value);
    //     // const targetOee = params.row.target_oee;
    //     // const percentage = (roundedValue / targetOee) * 100;

    //     let variant = "success";
    //     if (roundedValue > 99) {
    //       variant = "success";
    //     } else if (roundedValue >= 97 || roundedValue <= 99) {
    //       variant = "warning";
    //     } else if (roundedValue < 97) {
    //       variant = "danger";
    //     }

    //     return (
    //       <ProgressBar
    //         now={roundedValue}
    //         variant={variant}
    //         label={`${roundedValue}%`}
    //         style={{ width: 120 }}
    //       />
    //     );
    //   },
    // },
    {
      field: "percent_available",
      headerName: "%Available",
      width: 150,
      renderCell: (params) => {
        const roundedValue = Math.round(params.value);
        const targetOee = params.row.target_oee;
        // const percentage = (roundedValue / targetOee) * 100;

        let variant = "success";
        if (roundedValue > targetOee) {
          variant = "success";
        } else if (roundedValue > targetOee - 10) {
          variant = "warning";
        } else if (roundedValue < targetOee) {
          variant = "danger";
        }

        return (
          <ProgressBar
            now={roundedValue}
            variant={variant}
            label={`${roundedValue}%`}
            style={{ width: 150 }}
          />
        );
      },
    },
    {
      field: "percent_oee",
      headerName: "%OEE",
      width: 150,
      renderCell: (params) => {
        const roundedValue = Math.round(params.value);
        const targetOee = params.row.target_oee;
        // const percentage = (roundedValue / targetOee) * 100;

        let variant = "success";
        if (roundedValue > targetOee) {
          variant = "success";
        } else if (roundedValue > targetOee - 10) {
          variant = "warning";
        } else if (roundedValue < targetOee) {
          variant = "danger";
        }

        return (
          <ProgressBar
            now={roundedValue}
            variant={variant}
            label={`${roundedValue}%`}
            style={{ width: 150 }}
          />
        );
      },
    },
    {
      field: "percent_teep",
      headerName: "%TEEP",
      width: 150,
      renderCell: (params) => {
        const roundedValue = Math.round(params.value);
        const targetOee = params.row.target_oee;
        // const percentage = (roundedValue / targetOee) * 100;

        let variant = "success";
        if (roundedValue > targetOee) {
          variant = "success";
        } else if (roundedValue > targetOee - 10) {
          variant = "warning";
        } else if (roundedValue < targetOee) {
          variant = "danger";
        }

        return (
          <ProgressBar
            now={roundedValue}
            variant={variant}
            label={`${roundedValue}%`}
            style={{ width: 150 }}
          />
        );
      },
    },
    {
      field: "auto_run",
      headerName: "Run(min)",
      width: 110,
      renderCell: (params) => params.value,
    },
    {
      field: "power_on",
      headerName: "ON(min)",
      width: 110,
      renderCell: (params) => params.value,
    },
    {
      field: "power_off",
      headerName: "OFF(min)",
      width: 110,
      renderCell: (params) => params.value,
    },
  ];

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Container maxWidth="xl"> */}
        <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Item>
                <TextField
                  id="start-date"
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Item>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Item>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={BuildOptions}
                  value={selectedBuild}
                  onChange={handleBuildChange}
                  getOptionLabel={(option) => option.buiding}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Build : " />
                  )}
                />
              </Item>
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              <Item>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={ProcessOptions}
                  value={selectedProcess}
                  onChange={handleProcessChange}
                  getOptionLabel={(option) => option.process_group}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Process : " />
                  )}
                />
              </Item>
            </Grid>
          </Grid>
          <Box maxWidth="xl" sx={{ height: 800, width: "100%" }}>
            {apiData.length > 0 ? (
              <Grid container spacing={2}>
                {/* <Grid item xl={2} sx={{ mt: 2 }}>
                  <Item>
                    <Typography variant="body1">
                      Displaying {apiData.length} data entries.
                    </Typography>
                  </Item>
                </Grid> */}
                {/* <Grid item xl={12} sx={{ mt: 2 }}> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{ mt: 2 }}
                >
                  <Item>
                    <DataGrid
                      rows={apiData}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 100,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      // checkboxSelection
                      disableRowSelectionOnClick
                      sx={{ height: 650, width: "100%" }}
                    />
                  </Item>
                </Grid>
                {/* <Grid item xl={12} sx={{ mt: 5 }}> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{ mt: 5 }}
                >
                  {apiDataPlot.length > 0 ? (
                    <>
                      <Item>
                        <PLOT1 data={apiDataPlot} title={mccode} />
                      </Item>
                    </>
                  ) : (
                    <>
                      {isLoadingplot ? <LoadingPage /> : <Item>No Data</Item>}
                    </>
                  )}
                </Grid>
                {/* <Grid item xl={12} sx={{ mt: 5 }}> */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  sx={{ mt: 5 }}
                >
                  {apiDataPlot.length > 0 ? (
                    <>
                      <Item>
                        <PLOT2 data={apiDataPlot} title={mccode} />
                      </Item>
                    </>
                  ) : (
                    <>
                      {isLoadingplot ? <LoadingPage /> : <Item>No Data</Item>}
                    </>
                  )}
                </Grid>
              </Grid>
            ) : (
              <>{isLoading ? <LoadingPage /> : <Item>No Data</Item>}</>
            )}
          </Box>
        </Box>
        {/* </Container> */}
      </ThemeProvider>
    </React.Fragment>
  );
}
