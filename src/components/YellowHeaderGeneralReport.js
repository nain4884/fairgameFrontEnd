import { Box, Typography } from "@mui/material";
import CustomButtonAdmin from "./CustomButtonAdmin";
import DropDownSimple from "./DropdownSimple";

const YellowHeaderGeneralReport = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "1vh",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "0.5%",
          fontWeight: "600",
          marginY: "0.5%",
          alignSelf: "start",
        }}
      >
        General Report
      </Typography>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          flexDirection: "column",
          width: "99%",
          height: "90px",
          background: "#F8C851",
          alignSelf: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "10px" }}></Box>
          <DropDownSimple
            title={"Select Type"}
            data={["General Report", "Credit Refrance Report"]}
          />
          <Box sx={{ width: "30px" }}></Box>
          <CustomButtonAdmin />
        </Box>
      </Box>
    </Box>
  );
};
export default YellowHeaderGeneralReport;
