import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 35,
      }}
    >
      <CircularProgress size={80} color="primary" />
    </Box>
  );
};

export default LoadingPage;
