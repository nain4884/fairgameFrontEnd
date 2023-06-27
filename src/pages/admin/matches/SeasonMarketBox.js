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
        }}
      >
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
              setData={setData}
            /> :
              <PlaceBetComponentWeb
                // amount={index == 2}
                newData={newData}
                setData={setData}
              />
          }
          {/* <SeperateBox color={"white"} />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox color={"white"} /> */}
          <SeperateBox
            session={true}
            back={true}
            value={newData?.no_rate}
            value2={formatNumber(newData?.rate_percent?.split("-")[0])}
            lock={newData?.suspended === "suspended"}
            color={"#F6D0CB"}
          />
          <Box
            sx={{ width: "3px", display: "flex", background: "pink" }}
          ></Box>
          <SeperateBox
            session={true}
            value={newData?.yes_rate}
            value2={formatNumber(newData?.rate_percent?.split("-")[1])}
            lock={newData?.suspended === "suspended"}
            color={"#B3E0FF"}
          />
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
          {/* {index == 1 && (
            <Box
              sx={{
                width: "10.2vw",
                right: "2px",
                display: "flex",
                position: "absolute",
                height: "100%",
                background: "rgba(0,0,0,1)",
                justifyContent: "center ",
                alignItems: "center",
              }}
            >
              <img src={BallStart} style={{ width: "60px", height: "17px" }} />
            </Box>
          )} */}
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default SeasonMarketBox;
