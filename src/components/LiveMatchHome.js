import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ArrowDown, DownArrow, ARROWUP } from "../assets";
import { apiBasePath } from "./helper/constants";
import StyledImage from "./StyledImage";

const LiveMatchHome = ({ currentMatch }) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
    <Box
       sx={[
        {
          width: { tablet: "98%", mobile: "98%", laptop: "100%" },
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          marginX: { laptop: "0vw", mobile: "0px", tablet: "0px" },
          marginY: { laptop: ".5vh", mobile: "0px" },
          borderRadius: "2px",
          background: "white",
          padding: '1px',
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
          },
        },
      ]}
    >
      <Box 
         sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Box
           sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography 
             sx={{
              fontSize: { laptop: "13px", tablet: "12px", mobile: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Live Match 
          </Typography>
        </Box>
        <Box
            sx={{
              flex: 0.1,
              background: "#262626",
              // '#262626'
            }}
          >
            <div className="slanted"></div>
          </Box>

          <Box
          sx={{
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          >
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "16px",
              height: "16px",
              marginRight: "3px",
              marginLeft: "5px",
            }}
            alt={"Banner"}
          />
        </Box>

        {visible && currentMatch?.matchImage && (
          <StyledImage
            src={`${apiBasePath}/${currentMatch?.matchImage}`}
            sx={{
              height: "auto",
              width: { mobile: "100%", laptop: "100%", alignSelf: "center" },
            }}
          />
        )}
      </Box>
    </Box>

    {/* -------- */}
    {/* <Box
      sx={{
        minWidth: "10%",
        background: "white",
        padding: 0.2,
        marginY: { laptop: "1vh", mobile: ".2vh" },
        width: { mobile: "98%", laptop: "100%" },
      }}
    >
      <Box sx={{ background: "#F1C550" }}>
        <Box
          sx={{
            height: "35px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "5px",
            paddingRight: "0px",
            width: { mobile: "100%", laptop: "100%" },
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
            Live Match 456
          </Typography>

          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={DownArrow}
            style={{
              transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "16px",
              height: "16px",
              marginRight: "3px",
              marginLeft: "5px",
            }}
            alt={"Banner"}
          />
        </Box>
        {visible && currentMatch?.matchImage && (
          <StyledImage
            src={`${apiBasePath}/${currentMatch?.matchImage}`}
            sx={{
              height: "auto",
              width: { mobile: "100%", laptop: "100%", alignSelf: "center" },
            }}
          />
        )}
      </Box>
    </Box> */}
    </>
  );
};

export default LiveMatchHome;
