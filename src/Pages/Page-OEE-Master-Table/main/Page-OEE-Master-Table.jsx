import { useEffect, useState } from "react";
import axios from "axios";

//!components
import MainDatagrid from "../components/MainDatagrid";
import MainFilter from "../components/MainFilter";
import { set } from "date-fns";

function OEEMasterTable() {
  //*filter selection
  const [selectedProcess, setSelectedProcess] = useState("");

  //*get data options
  const [processOptions, setProcessOptions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/oeemastertable/smart_machine_oee_master/master_table`
      )
      .then((response) => {
        const data = response.data;

        const getProcess = data.map((item) => {
          return item.process;
        });

        const uniqueProcess = [...new Set(getProcess)];

        // console.log(uniqueProcess);
        setProcessOptions(uniqueProcess);
      });
  }, []);

  //*Get data table
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/oeemastertable/smart_machine_oee_master/master_table?process=${selectedProcess}`
      )
      .then((response) => {
        const data = response.data;

        const rowsWithId = data.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setRows(rowsWithId);
      });
  }, [selectedProcess]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mc_code",
      headerName: "MC Code",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "process",
      headerName: "Process",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "building",
      headerName: "Building",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "table",
      headerName: "Table",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 500,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <>
      <div className="grid gap-y-2">
        <MainFilter
          processOptions={processOptions}
          selectedProcess={selectedProcess}
          setSelectedProcess={setSelectedProcess}
        />
        <MainDatagrid rows={rows} columns={columns} />
      </div>
    </>
  );
}

export default OEEMasterTable;
