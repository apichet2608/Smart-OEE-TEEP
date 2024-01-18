import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function MainFilter({
  processOptions,
  selectedProcess,
  setSelectedProcess,
}) {
  return (
    <div className="bg-slate-100 px-2 py-1 rounded-lg w-fit">
      <Autocomplete
        id="status"
        options={processOptions}
        value={selectedProcess}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Status"
            placeholder="ALL"
            variant="standard"
          />
        )}
        sx={{ width: 200 }}
        onChange={(event, value) => {
          setSelectedProcess(value ? value : "");
        }}
      />
    </div>
  );
}
