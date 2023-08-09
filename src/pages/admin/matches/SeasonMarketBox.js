import { Box, Typography, useMediaQuery } from "@mui/material";
import SeperateBox from "./SeperateBox";
import { BallStart } from "../../../assets";
import Divider from "../../../components/helper/Divider";
import { useTheme } from "@emotion/react";
import PlaceBetComponentWeb from "./PlaceBetComponentWeb";
import PlaceBetComponent from "./PlaceBetComponent";
import { formatNumber } from "../../../components/helper/helper";

const SeasonMarketBox = ({ index, setMatchSessionData, newData, setData }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
          position:"relative"
        }}
      >
     {newData?.betStatus === 0 && (
        <Box
          sx={{
            margin: "1px",
            width: "100%",
            height: "100%",
            position: "absolute",
            right: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        ></Box>
      )}
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "11px", tablet: "10px", mobile: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {newData?.bet_condition}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            background: "white",
            height: "38px",
            width: { laptop: "60%", mobile: "80%" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {
            matchesMobile ? <PlaceBetComponent
              // amount={index == 2}
              newData={newData}
              // setData={setData}
              setData={setData}
            /> :
              <PlaceBetComponentWeb
                // amount={index == 2}
                newData={newData}
                // setData={setData}
                setData={setData}
              />
          }
          <SeperateBox
            session={true}
            back={true}
            value={newData?.no_rate}
            value2={formatNumber(newData?.rate_percent?.split("-")[0])}
            lock={newData?.suspended === "suspended" || [0,"0"].includes(newData?.no_rate)}
            color={"#F6D0CB"}
          />
          <Box
            sx={{ width: "3px", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            session={true}
            value={newData?.yes_rate}
            value2={formatNumber(newData?.rate_percent?.split("-")[1])}
            lock={newData?.suspended === "suspended" || [0,"0"].includes(newData?.yes_rate)}
            color={"#B3E0FF"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default SeasonMarketBox;
