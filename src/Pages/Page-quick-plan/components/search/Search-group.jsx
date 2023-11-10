// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import Box from "@mui/material/Box";
// import { useState, useEffect } from "react";
// import axios from "axios";

// function SearchGroup({ onSearch }) {
//   const [error, setError] = useState(null);

//   //Set Dropdown List
//   const [selectedFacUnit, setSelectedFacUnit] = useState({
//     facUnit: "ALL",
//   });
//   const [selectedProcDisp, setSelectedProcDisp] = useState({
//     procDisp: "ALL",
//   });

//   //Set Parameter from API
//   const [distinctFacUnit, setDistinctFacUnit] = useState([]);
//   const [distinctProcDisp, setDistinctProcDisp] = useState([]);

//   const fetchFacUnit = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime"
//       );
//       const dataFacUnit = response.data;
//       setDistinctFacUnit(dataFacUnit);
//       console.log(dataFacUnit);
//     } catch (error) {
//       console.error(`Error fetching distinct data division List: ${error}`);
//     }
//   };

//   const fetchProcDisp = async (facUnit) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/smart_oee_teep/quick_plan/smart_product_lot_wip_holdingtime/smart_product_lot_wip_holdingtime?fac_unit_desc=${facUnit}`
//       );
//       const dataProcDisp = response.data;
//       console.log("Proc Disp", dataProcDisp);
//       setDistinctProcDisp(dataProcDisp);
//     } catch (error) {
//       console.error(`Error fetching distinct data Department List: ${error}`);
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   //สร้าง Function selection change
//   const handleFacUnitChange = (event, newValue) => {
//     setSelectedFacUnit(newValue);
//     setSelectedProcDisp({ procDisp: "ALL" });

//     if (newValue === null || newValue === undefined) {
//       setSelectedFacUnit({ facUnit: "ALL" });
//       setSelectedProcDisp({ procDisp: "ALL" });
//     }
//   };

//   const handleProcDispChange = (event, newValue) => {
//     setSelectedProcDisp(newValue);
//     if (newValue === null || newValue === undefined) {
//       setSelectedProcDisp({ procDisp: "ALL" });
//     }
//   };

//   const handleSearch = () => {
//     const queryParams = {
//       facUnit: selectedFacUnit.facUnit,
//       procDisp: selectedProcDisp.procDisp,
//     };
//     // console.log("Query Params:", queryParams);
//     onSearch(queryParams);
//   };

//   useEffect(() => {
//     fetchFacUnit();
//     if (selectedFacUnit.facUnit) {
//       fetchProcDisp(selectedFacUnit.facUnit);
//     }
//   }, [selectedFacUnit]);

//   return (
//     <>
//       <Box maxWidth="xl" sx={{ width: "100%", height: 50, mb: 1 }}>
//         <div className="container">
//           <div className="flex flex-col gap-4 lg:flex-row animate-fade">
//             <div className="flex items-center shadow-md w-fit">
//               <Autocomplete
//                 disablePortal
//                 id="facUnit"
//                 options={distinctFacUnit}
//                 getOptionLabel={(option) => option && option.facUnit}
//                 value={selectedFacUnit}
//                 onChange={handleFacUnitChange}
//                 className="w-96 h-auto"
//                 renderInput={(params) => (
//                   <TextField {...params} label="Fac Unit" />
//                 )}
//                 renderOption={(props, option) => {
//                   return (
//                     <li
//                       {...props}
//                       style={{ textAlign: "left" }} // Add this style to justify to the left
//                     >
//                       <span>{option.facUnit}</span>
//                     </li>
//                   );
//                 }}
//                 isOptionEqualToValue={(option, value) =>
//                   option && value && option.division === value.division
//                 }
//               />
//             </div>

//             <div className="flex items-center shadow-md w-fit">
//               <Autocomplete
//                 disablePortal
//                 id="procDisp"
//                 options={distinctProcDisp}
//                 getOptionLabel={(option) => option && option.procDisp}
//                 value={selectedProcDisp}
//                 onChange={handleProcDispChange}
//                 className="w-96 h-auto"
//                 renderInput={(params) => (
//                   <TextField {...params} label="Proc Disp" />
//                 )}
//                 renderOption={(props, option) => {
//                   return (
//                     <li
//                       {...props}
//                       style={{ textAlign: "left" }} // Add this style to justify to the left
//                     >
//                       <span>{option.procDisp}</span>
//                     </li>
//                   );
//                 }}
//                 isOptionEqualToValue={(option, value) =>
//                   option && value && option.dep_unit === value.dep_unit
//                 }
//               />
//             </div>

//             <div className="flex flex-row gap-4">
//               <button
//                 className="bg-blue-500 w-24 h-12 font-bold rounded-lg px-4 shadow-lg text-white hover:bg-blue-700 ease-linear transition-colors duration-300 transform hover:scale-105 motion-reduce:transform-none transfrom active:scale-95 motion-reduce:transfrom-none lg:w-fit lg:h-full animate-fade"
//                 onClick={handleSearch}
//               >
//                 Search
//               </button>

//               <button className="bg-green-500 w-36 h-12 font-bold rounded-lg px-4 shadow-lg text-white hover:bg-green-700 ease-linear transition-colors duration-300 transform hover:scale-105 motion-reduce:transform-none transfrom active:scale-95 motion-reduce:transfrom-none lg:w-fit lg:h-full whitespace-nowrap animate-fade">
//                 Request SE
//               </button>
//             </div>
//           </div>
//         </div>
//       </Box>
//     </>
//   );
// }

// export default SearchGroup;
