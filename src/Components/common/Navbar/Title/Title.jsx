import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";

export default function Title() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/":
          return "OEE-and-TEEP";
        case "/oee-and-teep":
          return "OEE-and-TEEP";
        case "/quick-plan":
          return "Quick Plan";

        default:
          return "";
      }
    };
    const title = getPageTitle();
    setPageTitle(title);
  }, [location.pathname]);

  return (
    <>
      <div className="animate-rtl">
        <Typography variant="h6" noWrap component="div">
          {pageTitle}
        </Typography>
      </div>
    </>
  );
}
