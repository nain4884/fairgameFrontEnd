import { Box, Typography } from "@mui/material";
import React from "react";
import { memo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const TeamsOdssData = ({
  input,
  title,
  value,
  containerStyle,
  valueContainerStyle,
  valueTextStyle,
  bet_condition,
  currentOdds,
  season,
  setCurrentOdds,
  isBack,
  name,
  isSessionYes,
}) => {
  const [oddValue, setOddValue] = useState(currentOdds || "0");
  const selectedColorBox = useSelector(
    (state) => state.selectedColorBox
  )?.value;
  // console.log(selectedColorBox, "selectedColorBox");
  return (
    <Box sx={[{ display: "flex", flexDirection: "column" }, containerStyle]}>
      <Box
        sx={{
          background: "#262626",
          border: "2px solid #C7B6B6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "25px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { mobile: "10px", tablet: "11px", laptop: "11px" },
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
      </Box>
      {!input && (
        <Box
          sx={[
            {
              background: "white",
              border: "1px solid #FFF",
              // border: "0px solid #C7B6B6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "32px",
              marginTop: "1px",
            },
            valueContainerStyle,
          ]}
        >
          <Typography
            sx={[
              {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: { laptop: "140px", mobile: "100px" },
                textTransform: "capitalize",

                maxWidth: "100px",
                margin: bet_condition && "auto",
                marginTop: bet_condition && "5px",
                color: "#262626",
                padding: "1px",
                fontSize: {
                  mobile:
                    title == "Back/Lay" || title == "Yes/No" ? "12px" : "12px",
                  tablet:
                    title == "Back/Lay" || title == "Yes/No" ? "10px" : "10px",
                  laptop:
                    title == "Back/Lay" || title == "Yes/No" ? "12px" : "12px",
                },
                textAlign: "center",
                fontWeight:
                  title === "Back/Lay" || title === "Yes/No" ? "600" : "600",
              },
              valueTextStyle,
            ]}
          >
            {title === "Back/Lay"
              ? isBack
                ? "Back"
                : "Lay"
              : title === "Team"
              ? name
              : bet_condition
              ? bet_condition
              : isSessionYes
              ? "Yes"
              : "No"}
          </Typography>
        </Box>
      )}
      {input && (
        <Box
          sx={[
            {
              // background: selectedColorBox,
              border: "1px solid #FFF",
              // border: "0px solid #C7B6B6",
              display: "flex",
              justifyContent: season ? "center" : "space-between",
              paddingX: "4px",
              alignItems: "center",
              height: "32px",
              marginTop: "1px",
            },
            valueContainerStyle,
          ]}
        >
          {!season && (
            <Box
              onClick={() => {
                setOddValue((i) => Number(i) - 1);
                setCurrentOdds((prev) => Number(prev) - 1);
              }}
              sx={{
                width: "18px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                borderRadius: "3px",
                height: "18px",
                background: "#319E5B",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                -
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              width: "30px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              borderRadius: "3px",
              height: "15px",
            }}
          >
            <Typography
              className="OddValue"
              sx={{
                color: "black",
                fontSize: { mobile: "12px", laptop: "12px" },
                fontWeight: { mobile: "700", laptop: "600" },
              }}
            >
              {oddValue}
            </Typography>
          </Box>
          {!season && (
            <Box
              onClick={() => {
                setOddValue((i) => Number(i) + 1);
                setCurrentOdds((prev) => Number(prev) + 1);
              }}
              sx={{
                width: "18px",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                borderRadius: "3px",
                height: "18px",
                background: "#319E5B",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                +
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(TeamsOdssData);
