import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PageFormat1 from "./Pages/Page-Format/main/page-format.jsx";
import Navbar from "./Components/common/Navbar/navbar.jsx";
import OeeTeep from "./Pages/Page-oee-and-teep/Page-oee-and-teep.jsx";
import QuickPlan from "./Pages/Page-quick-plan/main/Page-quick-plan.jsx";
import FaNpmLotMonitoring from "./Pages/Page-fa-npm-lot-monitoring/main/Page-fa-npm-lot-monitoring.jsx";
import OEEMasterTable from "./Pages/Page-OEE-Master-Table/main/Page-OEE-Master-Table.jsx";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  return (
    <Router>
      <Box sx={{ display: "fixed" }}>
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<OeeTeep />} />

            <Route path="/oee-master-table" element={<OEEMasterTable />} />

            <Route path="/quick-plan" element={<QuickPlan />} />
            <Route
              path="/fa-npm-lot-monitoring"
              element={<FaNpmLotMonitoring />}
            />
            <Route path="/oee-and-teep" element={<OeeTeep />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
