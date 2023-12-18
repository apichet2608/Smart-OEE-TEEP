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

export default function NewDataTable() {
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

  //TODO : Data Grid
  //*selected options
  const [selectedFacUnitDesc, setSelectedFacUnitDesc] = useState("ALL");
  const [selectedProcGrpName, setSelectedProcGrpName] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  console.log("selectedFacUnitDesc", selectedFacUnitDesc);
  console.log("selectedProcGrpName", selectedProcGrpName);

  const encodedFacUnitDesc = encodeURIComponent(selectedFacUnitDesc);
  const encodedProcGrpName = encodeURIComponent(selectedProcGrpName);

  //*rows and columns
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime_table?fac_unit_desc=${encodedFacUnitDesc}&proc_grp_name=${encodedProcGrpName}`
      )
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedProcGrpName, selectedFacUnitDesc]);

  //?rows
  const [rows, setRows] = useState([]);

  //?columns
  const columns = [
    {
      field: "product_name",
      headerName: "Product Name",
      width: 160,
      headerAlign: "center",
      renderCell: (params) => {
        return <div className="font-bold">{params.value}</div>;
      },
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 100,
      headerAlign: "center",
    },
    {
      field: "fac_unit_desc",
      headerName: "Fac Unit",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (selectedFacUnitDesc !== "ALL") {
          return (
            <div className="text-violet-500 font-bold animate-pulse">
              {params.value}
            </div>
          );
        }
      },
    },
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
            className={`w-full h-fit flex items-center justify-center py-1 drop-shadow-md rounded-full text-white ${bgColor} font-bold`}
          >
            {Math.floor(params.value)}
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
      headerName: "Process Group",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (selectedProcGrpName !== "") {
          return (
            <div className="text-violet-500 font-bold animate-pulse">
              {params.value}
            </div>
          );
        }
      },
    },
    {
      field: "scan_in",
      headerName: "Scan In",
      width: 170,
      headerAlign: "center",
      valueFormatter: (params) =>
        formatDate(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
  ];

  //*filter options
  const [facUnitDescOptions, setFacUnitDescOptions] = useState([]);
  const [procGrpNameOptions, setProcGrpNameOptions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime_table`
      )
      .then((response) => {
        console.log(response.data);
        setRows(response.data);

        const facUnitDesc = response.data.map((item) => item.fac_unit_desc);
        const uniqueFacUnitDesc = [...new Set(facUnitDesc)];
        setFacUnitDescOptions(uniqueFacUnitDesc);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime_table?fac_unit_desc=${selectedFacUnitDesc}`
      )
      .then((response) => {
        console.log(response.data);
        setRows(response.data);

        const procGrpName = response.data.map((item) => item.proc_grp_name);
        const uniqueProcGrpName = [...new Set(procGrpName)];
        setProcGrpNameOptions(uniqueProcGrpName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedFacUnitDesc]);

  //*if autocomplete change
  useEffect(() => {
    if (selectedFacUnitDesc === null || selectedFacUnitDesc === "ALL") {
      setSelectedProcGrpName("");
    } else if (selectedFacUnitDesc !== currentValue) {
      setSelectedProcGrpName("");
    }
  }, [selectedFacUnitDesc, currentValue]);

  //   console.log("facUnitDescOptions", facUnitDescOptions);
  //   console.log("procGrpNameOptions", procGrpNameOptions);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container">
          <div className="flex gap-2">
            <div className="shadow-md px-3 py-1 rounded-2xl w-full animate-fade bg-violet-50">
              <Autocomplete
                disablePortal
                id="fac_unit_desc"
                options={facUnitDescOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Fac Unit Desc"
                    variant="standard"
                    sx={{
                      "& .MuiInput-input": {
                        color: "#8c37e9",
                        fontWeight: "bold",
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div className="whitespace-pre-wrap font-semibold mr-10 text-purple-600">
                      {option}
                    </div>
                  </li>
                )}
                onChange={(event, value) => {
                  setSelectedFacUnitDesc(value ? value : "ALL");
                }}
              />
            </div>
            <div className="shadow-md px-3 py-1 rounded-2xl w-full animate-fade bg-violet-50">
              <Autocomplete
                disablePortal
                id="proc_grp_name"
                options={procGrpNameOptions}
                value={selectedProcGrpName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proc Grp Name"
                    variant="standard"
                    sx={{
                      "& .MuiInput-input": {
                        color: "#8c37e9",
                        fontWeight: "bold",
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div className="whitespace-pre-wrap font-semibold mr-10 text-purple-600">
                      {option}
                    </div>
                  </li>
                )}
                onChange={(event, value) => {
                  setSelectedProcGrpName(value ? value : "");
                }}
              />
            </div>
          </div>
          <div className="mt-2 animate-delay">
            <StyledDataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              slots={{ toolbar: GridToolbar }}
              slotProps={{ toolbar: { showQuickFilter: true } }}
              sx={{ height: "75vh", width: "100%" }}
            />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
