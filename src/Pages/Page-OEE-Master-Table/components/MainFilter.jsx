import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function MainFilter({
  processOptions,
  selectedProcess,
  setSelectedProcess,
}) {
  return (
    <div className="animate-fade">
      <Autocomplete
        id="status"
        options={processOptions}
        value={selectedProcess}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Process"
            placeholder="ALL"
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": {
                color: "#8c37e9", // or 'purple'
                fontWeight: "bold",
              },
              "& .MuiInput-input": {
                color: "#8c37e9", // Set the default text color
                fontWeight: "bold",
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#8c37e9", // Set the input bottom border
              },
              "& .MuiIconButton-root": {
                color: "#8c37e9", // Set the icon color
              },
            }}
          />
        )}
        sx={{ width: 300 }}
        onChange={(event, value) => {
          setSelectedProcess(value ? value : "");
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <div className="whitespace-pre-wrap font-semibold mr-10 text-purple-600">
              {option}
            </div>
          </li>
        )}
      />
    </div>
  );
}
