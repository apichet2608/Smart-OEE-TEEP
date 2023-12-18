import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    color: "#3371ff",
    fontSize: "15px",
    textAlign: "center",
    FontFace: "Poppins",
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
});

//TODO: <---------------------------------------- Main Component ---------------------------------------->

const PageFaNpmLotMonitoring = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0, // breakpoint xs
        sm: 600, // breakpoint sm
        md: 960, // breakpoint md
        lg: 1280, // breakpoint lg
        xl: 1900, // breakpoint xl
      },
    },
  });

  const [productName, setProductName] = useState("ALL");

  useEffect(() => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring`
      )
      // .get(
      //   `http://localhost:3001/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring`
      // )
      .then((res) => {
        console.log(res.data);

        const productName = Array.from(
          new Set(res.data.map((item) => item.product_name))
        );

        setProductNameOption(productName);
      });
  }, []);

  //*Options for Autocomplete
  const [productNameOption, setProductNameOption] = useState([]);

  const [filterModel, setFilterModel] = useState({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [""],
  });

  //*Dialog

  //Dialog for Lot
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  //Dialog for +Product
  const [openProduct, setOpenProduct] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleOpenDialogProduct = () => {
    setOpenProduct(true);
    fetchProduct();
  };

  const handleCloseDialogProduct = () => {
    setOpenProduct(false);
  };

  //+Product dialog create
  const handleOpenDialogCreate = () => {
    setOpenCreate(true);
    setOpenProduct(false);
  };

  const handleCloseDialogCreate = () => {
    setOpenCreate(false);
    setOpenProduct(true);
  };

  const handleOpenDialogUpdate = (data) => {
    console.log("Data in handleOpenDialogUpdate:", data);

    setPatchProductName(data["product_name"]);
    setPatchLot(data["lot"]);
    setPatchCusName(data["cus_name"]);
    setPatchBuild(data["build"]);
    setPatchInputBuild(data["input_build"]);

    setOpenUpdate(true);
    setOpenProduct(false);
  };

  const handleCloseDialogUpdate = () => {
    setOpenUpdate(false);
  };

  //*rows and columns

  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring?product_name=${productName}`
      )
      // .get(
      //   `http://localhost:3001/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring?product_name=${productName}`
      // )
      .then((response) => {
        const rowsWithKey = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setRows(rowsWithKey);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productName]);

  const columns = [
    {
      field: "input_build",
      headerName: "Input Build",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "build",
      headerName: "Build",
      width: 150,
      headerAlign: "center",
    },
    {
      field: "cus_name",
      headerName: "Customer Name",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => <div className="font-bold">{params.value}</div>,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <div className="font-bold text-purple-500">{params.value}</div>
      ),
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 100,
      headerAlign: "center",

      renderCell: (params) => (
        <div
          className="cursor-pointer hover:scale-105 duration-200 active:scale-95 font-bold text-blue-500 hover:text-cyan-500"
          onClick={() => {
            setLotNo(params.value);
            handleOpenDialog();
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "fac_unit_desc",
      headerName: "Fac Unit",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "proc_grp_name",
      headerName: "Proc Grp Name",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "proc_disp",
      headerName: "Proc Disp",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "scan_desc",
      headerName: "Scan Desc",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "input_qty",
      headerName: "Input Qty",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "holding_time_mins",
      headerName: "Holding (mins)",
      width: 140,
      headerAlign: "center",
      align: "right",
      renderCell: (params) => (
        <div className="font-bold text-amber-500">
          {Math.floor(params.value)}
        </div>
      ),
    },
    {
      field: "scan_in",
      headerName: "Scan In",
      width: 180,
      headerAlign: "center",

      valueFormatter: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date
          .getDate()
          .toString()
          .padStart(2, "0")} ${date
          .getHours()
          .toString()
          .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
        return formattedDate;
      },
    },
  ];

  //?Lot dialog data

  const [lotRows, setLotRows] = useState([]);
  const [lotNo, setLotNo] = useState("ALL");
  useEffect(() => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_lot?lot_no=${lotNo}`
      )
      .then((response) => {
        const rowsWithKey = response.data.map((row, index) => ({
          ...row,
          id: index + 1,
        }));

        setLotRows(rowsWithKey);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lotNo]);

  const lotColumns = [
    {
      field: "prc_group",
      headerName: "Product Group",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <div className="font-bold">{params.value}</div>,
    },
    {
      field: "process",
      headerName: "Process",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <div className="font-bold">{params.value}</div>,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 140,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lot_no",
      headerName: "Lot No",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          className="font-bold text-cyan-500"
          onClick={() => {
            setLotNo(params.value);
            handleOpenDialog();
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "scan_desc",
      headerName: "Scan Desc",
      width: 140,
      headerAlign: "center",
      renderCell: (params) => <div className="font-bold">{params.value}</div>,
    },
    {
      field: "plan_date",
      headerName: "Plan Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "scan_date",
      headerName: "Scan Date",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return (
          <span
            className="font-bold text-green-100 px-2 py-1 rounded-xl"
            style={{
              backgroundColor:
                new Date(params.row.scan_date) >
                new Date(
                  new Date(params.row.plan_date).setDate(
                    new Date(params.row.plan_date).getDate() + 1
                  )
                )
                  ? "red"
                  : "green",
            }}
          >
            {formattedDate}
          </span>
        );
      },
    },
  ];

  const fetchProduct = () => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_dialog?product_name=ALL&lot=ALL`
      )
      .then((response) => {
        const data = response.data;

        setProductRows(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //*Create function

  const [addProductName, setAddProductName] = useState("");
  const [addLot, setAddLot] = useState("");
  const [addCusName, setAddCusName] = useState("");
  const [addBuild, setAddBuild] = useState("");
  const [addInputBuild, setAddInputBuild] = useState("");

  const handleCreate = () => {
    handleCloseDialogCreate();
    handleCloseDialogProduct();

    const params = {
      product_name: addProductName,
      lot: addLot,
      cus_name: addCusName,
      build: addBuild,
      input_build: addInputBuild,
    };

    Swal.fire({
      title: "Create Data?",
      text: "The data will be created to database",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Create",
      confirmButtonColor: "#10b981",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3983f4",
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("create");
        handleCloseDialogProduct();
        axios
          .post(
            "http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_dialog_insert",
            params
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});

        Swal.fire({
          title: "Created",
          text: "Data has been created.",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          onClose: () => {
            // Perform any additional actions after the alert is closed
            // For example, you can redirect to another page
            // window.location.href = "/another-page";
          },
        });
      } else {
        handleOpenDialogCreate();
      }
    });
  };

  //*Update function

  const [updateId, setUpdateId] = useState("");
  console.log("updateId", updateId);

  const [patchProductName, setPatchProductName] = useState("");
  const [patchLot, setPatchLot] = useState("");
  const [patchCusName, setPatchCusName] = useState("");
  const [patchBuild, setPatchBuild] = useState("");
  const [patchInputBuild, setPatchInputBuild] = useState("");

  const handleUpdate = () => {
    handleCloseDialogUpdate();

    Swal.fire({
      title: "Update?",
      text: "The data will be updated",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#9f5af6",
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3983f4",
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Update");
        handleCloseDialogProduct();
        axios
          .put(
            `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_dialog_update/${updateId}?product_name=${patchProductName}&lot=${patchLot}&cus_name=${patchCusName}&build=${patchBuild}&input_build=${patchInputBuild}`
          )
          .then((response) => {
            console.log(response);

            Swal.fire({
              title: "Updated",
              text: "Data has been updated.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setPatchProductName("");
            setPatchLot("");
            setPatchCusName("");
            setPatchBuild("");
            setPatchInputBuild("");

            setUpdateId("");
          });
      }
    });
  };

  //*Delete function

  const [deleteId, setDeleteId] = useState("");
  // console.log("deleteId", deleteId);

  const handleDelete = async () => {
    try {
      // Close the dialog (assuming handleCloseDialogProduct actually does that)
      handleCloseDialogProduct();

      const result = await Swal.fire({
        title: `Deleted data ID <span style="color: orange;"> ${deleteId} </span> ?`,
        text: "Data will be deleted permanently",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#e94648",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#3983f4",
        reverseButtons: false,
      });

      if (result.isConfirmed) {
        console.log("delete");

        const response = await axios.delete(
          `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_dialog_delete?id=${deleteId}`
        );

        console.log(response);

        Swal.fire({
          title: "Deleted",
          text: `Data ID ${deleteId} has been deleted.`,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Reset the deleteId
      setDeleteId("");
    }
  };

  useEffect(() => {
    if (deleteId !== "") {
      handleDelete();
    }
  }, [deleteId]);

  const [productRows, setProductRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://10.17.66.242:3000/smart_oee_teep/fa_npm_lot_monitoring/smart_product_lot_fa_npi_master/smart_fa_npm_lot_monitoring_dialog?product_name=ALL&lot=ALL`
      )
      .then((response) => {
        const data = response.data;

        setProductRows(data);

        const lot = Array.from(new Set(data.map((item) => item.lot)));

        localStorage.setItem("Product_lot", JSON.stringify(lot));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const productColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="font-bold text-amber-500">{params.value}</div>
      ),
    },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <div className="font-bold text-purple-500">{params.value}</div>
      ),
    },
    {
      field: "lot",
      headerName: "Lot",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cus_name",
      headerName: "Customer Name",
      width: 260,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "build",
      headerName: "Build",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "input_build",
      headerName: "Input Build",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "update_action",
      headerName: "Update",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="cursor-pointer hover:scale-110 duration-150 active:scale-95 font-bold bg-green-500 hover:text-emerald-200 p-1 rounded-xl">
          <button
            onClick={() => {
              setUpdateId(params.row.id);
              handleOpenDialogUpdate(params.row);
            }}
          >
            <EditIcon />
          </button>
        </div>
      ),
    },
    {
      field: "delete_action",
      headerName: "Delete",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div className="cursor-pointer hover:scale-110 duration-200 bg-red-500 p-1 rounded-xl active:scale-95 font-bold hover:text-pink-200">
          <button
            onClick={() => {
              setDeleteId(params.row.id);
              handleDelete();
            }}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      ),
    },
  ];

  let existingLots = JSON.parse(localStorage.getItem("Product_lot")) || [];

  const isDuplicateLot = (lotNumber) => {
    return existingLots.includes(lotNumber);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className="grid grid-cols-2 animate-fade">
              <Autocomplete
                disablePortal
                id="product_name"
                options={productNameOption}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Name"
                    variant="standard"
                    sx={{
                      "& .MuiInput-input": {
                        color: "#8c37e9",
                        fontWeight: "bold",
                      },
                    }}
                  />
                )}
                onChange={(event, newValue) => {
                  newValue === null
                    ? setProductName("ALL")
                    : setProductName(newValue);
                  console.log(newValue);
                }}
                renderOption={(props, option) => {
                  return (
                    <li {...props}>
                      <div className="font-bold text-purple-500">
                        <div>{option}</div>
                      </div>
                    </li>
                  );
                }}
              />
              <div className="absolute right-6">
                <button
                  className="btn btn-ghost drop-shadow-lg shadow-md hover:scale-105 active:scale-95 duration-150"
                  onClick={handleOpenDialogProduct}
                >
                  {" "}
                  <AddIcon /> Product
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 animate-fade mt-2 shadow-xl">
              <StyledDataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                slots={{ toolbar: GridToolbar }}
                onFilterModelChange={(newModel) => setFilterModel(newModel)}
                filterModel={filterModel}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                sx={{
                  "& .MuiDataGrid-cell": {
                    borderRight: "1px solid #e0e0e0",
                    // borderTop: "1px solid #e0e0e0",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    borderRight: "1px solid #e0e0e0",
                    borderTop: "1px solid #e0e0e0",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  maxHeight: "75vh",
                }}
              />
            </div>

            {/* lot dialog */}
            <Dialog open={open} maxWidth="xl" maxHeight="80vh">
              <DialogTitle>
                <div className="font-bold drop-shadow-md text-blue-500">
                  History Lot
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div className="font-bold drop-shadow-sm mb-2">
                    Lot No : <span className="text-cyan-500">{lotNo}</span>
                  </div>
                </DialogContentText>
                <StyledDataGrid
                  rows={lotRows}
                  columns={lotColumns}
                  pageSize={5}
                  slots={{ toolbar: GridToolbar }}
                  onFilterModelChange={(newModel) => setFilterModel(newModel)}
                  filterModel={filterModel}
                  slotProps={{ toolbar: { showQuickFilter: true } }}
                  sx={{ maxHeight: "75vh" }}
                />
              </DialogContent>
              <DialogActions>
                <button onClick={handleCloseDialog}>Close</button>
              </DialogActions>
            </Dialog>

            {/* product dialog */}
            <Dialog open={openProduct} maxWidth="xl" maxHeight="80vh">
              <DialogTitle>
                <div className="font-bold">
                  + Product
                  <span className="absolute right-6">
                    <button
                      className="btn btn-success drop-shadow-lg shadow-md hover:scale-105 active:scale-95 duration-150"
                      onClick={handleOpenDialogCreate}
                    >
                      {" "}
                      <AddIcon /> Add
                    </button>
                  </span>
                </div>
              </DialogTitle>
              <DialogContent>
                <StyledDataGrid
                  className="shadow-md"
                  rows={productRows}
                  columns={productColumns}
                  pageSize={5}
                  slots={{ toolbar: GridToolbar }}
                  onFilterModelChange={(newModel) => setFilterModel(newModel)}
                  filterModel={filterModel}
                  slotProps={{ toolbar: { showQuickFilter: true } }}
                  sx={{ maxHeight: "75vh", marginTop: "1rem" }}
                />
              </DialogContent>
              <DialogActions>
                <button
                  className="font-bold bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 duration-150 text-white px-3 py-1 rounded-xl"
                  onClick={handleCloseDialogProduct}
                >
                  X
                </button>
              </DialogActions>
            </Dialog>

            {/* +Product dialog create */}
            <Dialog open={openCreate} maxWidth="xl" maxHeight="80vh">
              <DialogTitle>
                <div className="font-bold animate-fade text-emerald-500 drop-shadow-md">
                  Create Product
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div
                    className=" grid grid-cols-1 gap-3 w-full my-2 animate-delay"
                    style={{ width: 400 }}
                  >
                    <TextField
                      id="product_name"
                      label="Product Name"
                      onChange={(e) => setAddProductName(e.target.value)}
                      variant="filled"
                    />

                    <TextField
                      id="lot"
                      label="Lot"
                      type="number"
                      onChange={(e) => setAddLot(e.target.value)}
                      variant="filled"
                      error={
                        isNaN(addLot) || addLot === "" || isDuplicateLot(addLot)
                      }
                      helperText={
                        isNaN(addLot) || addLot === ""
                          ? "Type number only"
                          : isDuplicateLot(addLot)
                          ? "Lot number already exists. Type a different lot number."
                          : ""
                      }
                    />

                    <TextField
                      id="cus_name"
                      label="Customer Name"
                      onChange={(e) => setAddCusName(e.target.value)}
                      variant="filled"
                    />

                    <TextField
                      id="build"
                      label="Build"
                      onChange={(e) => setAddBuild(e.target.value)}
                      variant="filled"
                    />
                    <TextField
                      id="input_build"
                      label="Input Build"
                      onChange={(e) => setAddInputBuild(e.target.value)}
                      variant="filled"
                    />
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="font-bold bg-emerald-500 px-3 py-1 rounded-xl text-white hover:bg-emerald-600 hover:scale-105 active:scale-95 duration-150"
                  onClick={handleCreate}
                >
                  + Create
                </button>
                <button
                  className="font-bold bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 duration-150 text-white px-3 py-1 rounded-xl"
                  onClick={handleCloseDialogCreate}
                >
                  X
                </button>
              </DialogActions>
            </Dialog>

            <Dialog open={openUpdate}>
              <DialogTitle>
                <div className="font-bold animate-fade drop-shadow-md text-violet-500">
                  Update Product ID :{" "}
                  <span className="text-amber-500">{updateId}</span>
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <div
                    className=" grid grid-cols-1 gap-3 w-full my-4 animate-delay"
                    style={{ width: 400 }}
                  >
                    <TextField
                      id="product_name"
                      label="Product Name"
                      onChange={(e) => setPatchProductName(e.target.value)}
                      value={patchProductName}
                      variant="filled"
                    />
                    <TextField
                      id="lot"
                      label="Lot"
                      onChange={(e) => setPatchLot(e.target.value)}
                      type="number"
                      value={patchLot}
                      variant="filled"
                      error={isNaN(patchLot) || patchLot === ""}
                      helperText={
                        isNaN(patchLot) || patchLot === ""
                          ? "Type number only"
                          : ""
                      }
                    />
                    <TextField
                      id="cus_name"
                      label="Customer Name"
                      onChange={(e) => setPatchCusName(e.target.value)}
                      value={patchCusName}
                      variant="filled"
                    />
                    <TextField
                      id="build"
                      label="Build"
                      onChange={(e) => setPatchBuild(e.target.value)}
                      value={patchBuild}
                      variant="filled"
                    />
                    <TextField
                      id="input_build"
                      label="Input Build"
                      onChange={(e) => setPatchInputBuild(e.target.value)}
                      value={patchInputBuild}
                      variant="filled"
                    />
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  className="font-bold bg-violet-500 px-3 py-1 rounded-xl text-white hover:bg-violet-600 hover:scale-105 active:scale-95 duration-150"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="font-bold bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 duration-150 text-white px-3 py-1 rounded-xl"
                  onClick={handleCloseDialogUpdate}
                >
                  X
                </button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default PageFaNpmLotMonitoring;
