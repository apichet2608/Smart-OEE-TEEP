import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Navbuttton({ open, sidebarItems, activeButton, handleButtonClick }) {
  return (
    <div>
      {" "}
      {open ? (
        <ListItem disablePadding sx={{ display: "block", mt: 1, pl: 1 }}>
          <ListItemText
            primary={
              <Typography
                component="div"
                variant="subtitle2"
                fontWeight="bold"
                sx={{
                  opacity: open ? 1 : 0,
                  color: "#616161",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "16px",
                }}
              >
                Report
              </Typography>
            }
          />
        </ListItem>
      ) : null}
      <List>
        {sidebarItems.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                bgcolor: activeButton === text.name ? "#42a5f5" : "transparent",
                m: 0.5,
                borderRadius: "10px",
              }}
              component={Link}
              to={`${text.link.toLowerCase().split(" ").join("-")}`}
              onClick={() => handleButtonClick(text.name)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "24px", height: "24px" }}
                  src={text.icon}
                />
              </ListItemIcon>
              {/* <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
              <ListItemText
                primary={
                  <Typography
                    component="div"
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "#616161",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      // fontSize: 15,
                      // fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                      // textOverflow: "ellipsis",
                      // whiteSpace: "nowrap",
                      // overflow: "hidden",
                    }}
                  >
                    {text.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Navbuttton;
