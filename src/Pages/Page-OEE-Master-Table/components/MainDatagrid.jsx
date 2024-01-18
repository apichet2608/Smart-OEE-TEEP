import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styled from "styled-components";

//*Styled Components
const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    color: "#3371ff",
    fontSize: "15px",
    textAlign: "center",
    fontFace: "Poppins", // Note: Corrected property name to lowercase 'fontFace'
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
  borderRadius: "16px", // Set the border radius for the entire DataGrid
});

export default function MainDatagrid({ rows, columns }) {
  return (
    <div>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        sx={{ maxHeight: 700, width: "100%" }}
      />
    </div>
  );
}
