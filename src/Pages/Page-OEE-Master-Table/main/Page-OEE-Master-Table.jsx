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
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_smart_oee_master
        }/master_table`
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
        `${import.meta.env.VITE_IP_API}/${
          import.meta.env.VITE_smart_oee_master
        }/master_table?process=${encodeURIComponent(selectedProcess)}`
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
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "type",
      headerName: "Type",
      width: 50,
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
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <p
              className={`${
                selectedProcess ? "text-violet-600 font-bold" : ""
              }`}
            >
              {params.value}
            </p>
          </div>
        );
      },
    },
    {
      field: "building",
      headerName: "Building",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "table",
      headerName: "Table",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      // width: 500,
      flex: 1,
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
