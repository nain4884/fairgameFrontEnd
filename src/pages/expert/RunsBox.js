import { Box, Typography } from "@mui/material";
import React from "react";
import { StyledImage } from "../../components";
import { CANCEL } from "../../assets";

const RunsBox = ({ item ,setData}) => {
  return (
    <Box
      sx={{
        height: "354px",
        flexDirection: "column",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        width: "19.5%",
        marginX: "1px",
        border: "3px solid #0B4F26",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingX:"2px",
          height: "36px",
          background: "#0B4F26",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "12px", color: "white", fontWeight: "600" ,lineHeight:"1"}}>
          {item?.bet_condition}
        </Typography>
        <img 
            onClick={(e) => {
              setData((prev) => {
                const updatedArray = prev?.filter((v) => v?.id !== item?.id);
                return updatedArray;
              });
            }}
          src={CANCEL}
          alt="close"
          style={{ width: "18px", height: "18px",cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ display: "flex", height: "25px" }}>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
          >
            Runs
          </Typography>
        </Box>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            borderLeft: "1px solid #306A47",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
          >
            Amount
          </Typography>
        </Box>
      </Box>
      <Box sx={{ height: "350px", overflowY: "scroll" }}>
        {item?.profitLoss?.betData?.length > 0 ? (
          item?.profitLoss?.betData?.map((v) => {
            const getColor = (value) => {
              if (value > 1) {
                return "#10DC61";
              } else if (value === v?.profit_loss && value > 1) {
                return "#F8C851";
              } else {
                return "#DC3545";
              }
            };
            const getSVG = (value) => {
              if (value > 1) {
                return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
              } else if (value === v?.profit_loss && value > 1) {
                return "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg";
              } else {
                return "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg";
              }
            };
            return (
              <Box
                key={v?.odds}
                sx={{
                  display: "flex",
                  height: "25px",
                  borderTop: "1px solid #306A47",
                }}
              >
                <Box
                  sx={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#306A47",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                  >
                    {v?.odds}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    borderLeft: "1px solid #306A47",
                    background: getColor(v?.profit_loss),

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    {v?.profit_loss}
                  </Typography>
                  <StyledImage
                    src={getSVG(v?.profit_loss)}
                    sx={{
                      height: "15px",
                      marginLeft: "5px",
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      width: "15px",
                    }}
                  />
                </Box>
              </Box>
            );
          })
        ) : (
          <>
            {" "}
            <Box
              sx={{
                display: "flex",
                height: "25px",
                borderTop: "1px solid #306A47",
              }}
            ></Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default RunsBox;
