import { Box, Typography } from "@mui/material";
import CustomButtonAdmin from "./CustomButtonAdmin";
import DropDownSimple from "./DropdownSimple";

const YellowHeaderBets = () => {
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
        Current Bets
      </Typography>

      <Box
        sx={{
          display: "none",
          borderRadius: "5px",
          flexDirection: "column",
          width: "99%",
          minHeight: { laptop: "90px", mobile: "75px" },
          background: "#F8C851",
          alignSelf: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ width: "10px" }}></Box>

          <DropDownSimple
            dropDownStyle={{
              width: { laptop: "100px", mobile: "100px" },
              right: 0,
            }}
            containerStyle={{
              position: "relative",
              width: { mobile: "60%", tablet: "60%", laptop: "19%" },
            }}
            title={"Choose Type"}
            data={["Matched Bet", "Unmatched Bet", "Deleted Bet"]}
          />
          <Box sx={{ width: "20px" }}></Box>
          <CustomButtonAdmin />
        </Box>
      </Box>
    </Box>
  );
};
export default YellowHeaderBets;
