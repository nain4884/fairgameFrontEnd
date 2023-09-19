import React from "react";
import SeperateBox from "./SeperateBox";
import { Box, Typography } from "@mui/material";
import Divider from "../../../components/helper/Divider";

const UserProfitLossListComp = ({ element, showTeamC }) => {
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
          position: "relative",
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
            {element?.userName}
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
          <>
            <SeperateBox
              value={element?.teamA_rate ?? "N/A"}
              color={"#ffffff"}
              widthh={10}
            />
            <Box
              sx={{ width: "3px", display: "flex", background: "#ffffff" }}
            ></Box>
            <SeperateBox
              value={element?.teamB_rate ?? "N/A"}
              color={"#ffffff"}
              widthh={10}
            />
            {showTeamC && (
                <>
                  <Box
                    sx={{
                      width: "3px",
                      display: "flex",
                      background: "#ffffff",
                    }}
                  ></Box>
                  <SeperateBox
                    value={element?.teamC_rate ?? "N/A"}
                    color={"#ffffff"}
                    widthh={10}
                  />
                </>
              )}
          </>
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default UserProfitLossListComp;
