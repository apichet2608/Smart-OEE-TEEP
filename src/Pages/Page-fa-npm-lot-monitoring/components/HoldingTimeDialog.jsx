import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

export default function HoldingTimeDialog({
  lotNo,
  openHoldingTime,
  setOpenHoldingTime,
  StyledDataGrid,
}) {
  const [holdingRows, setHoldingRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_IP_API
        }/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_holding?lot_no=${lotNo}`
      )
      .then((response) => {
        console.log("holding data", response.data);

        const rowsWithid = response.data.map((row, index) => {
          return { ...row, id: index + 1 };
        });

        setHoldingRows(rowsWithid);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lotNo]);

  const holdingColumns = [
    {
      field: "prc_group",
      headerName: "PRC Group",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "process",
      headerName: "Process",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lot_no",
      headerName: "Lot No",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="text-amber-500 font-bold drop-shadow-sm">
            {params.value}
          </div>
        );
      },
    },
    {
      field: "holding_time",
      headerName: "Holding Time",
      width: 150,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === null ? "text-blue-500" : "text-slate-500"
            } font-bold drop-shadow-sm`}
          >
            {params.value === null ? "N/A" : params.value}
          </div>
        );
      },
    },
    {
      field: "in_setup",
      headerName: "In Setup",
      width: 150,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === null ? "text-blue-500" : "text-slate-500"
            } font-bold drop-shadow-sm`}
          >
            {params.value === null ? "N/A" : params.value}
          </div>
        );
      },
    },
    {
      field: "processing_time",
      headerName: "Processing Time",
      width: 150,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === null ? "text-blue-500" : "text-slate-500"
            } font-bold drop-shadow-sm`}
          >
            {params.value === null ? "N/A" : params.value}
          </div>
        );
      },
    },
    {
      field: "out_setup",
      headerName: "Out Setup",
      width: 150,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === null ? "text-blue-500" : "text-slate-500"
            } font-bold drop-shadow-sm`}
          >
            {params.value === null ? "N/A" : params.value}
          </div>
        );
      },
    },
    {
      field: "transport_time",
      headerName: "Transport Time",
      width: 150,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === null ? "text-blue-500" : "text-slate-500"
            } font-bold drop-shadow-sm`}
          >
            {params.value === null ? "N/A" : params.value}
          </div>
        );
      },
    },
  ];

  return (
    <Dialog open={openHoldingTime} maxWidth="xl" maxHeight="80vh">
      <DialogTitle>
        <div className="font-bold drop-shadow-md text-blue-500">Cal Time</div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="font-bold drop-shadow-sm mb-2">
            Lot No : <span className="text-amber-500">{lotNo}</span>
          </div>
        </DialogContentText>
        <StyledDataGrid
          rows={holdingRows}
          columns={holdingColumns}
          pageSize={5}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          sx={{
            maxHeight: "75vh",
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #999999",
              borderBottom: "1px solid #999999",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <button
          onClick={() => {
            setOpenHoldingTime(false);
          }}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
}
