import React, { memo, useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import StyledImage from "./StyledImage";
import { DownIcon } from "../assets";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { setRole } from "../newStore";

const NewBoxData = ({
  title,
  value,
  showDropDown,
  containerStyle,
  valueStyle,
  titleStyle,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const { axios } = setRole();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // useEffect(() => {
  //   // console.log(anchorEl)
  // }, [anchorEl]);

  const handleClose = () => {
    setAnchorEl(0);
  };

  return (
    <Box>
      <Box
        onClick={(event) => {
          if (title != "Exposure") {
            handleClick(event);
          }
        }}
        sx={[
          {
            backgroundColor: "white",
            minWidth: { laptop: "120px", mobile: "110px" },
            marginLeft: "1vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            height: { laptop: "35px", mobile: "33px" },
            overflow: "hidden",
            paddingX: "3px",
            borderRadius: "5px",
            cursor: "pointer",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={{
            marginLeft: { laptop: "5px", mobile: "5px" },
            justifyContent: { mobile: "center" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={[
              {
                fontSize: { laptop: "8px", mobile: "8px" },
                fontWeight: { mobile: "bold", laptop: "500px" },
                textTransform: showDropDown && "capitalize",
                whiteSpace: showDropDown && "nowrap",
                textOverflow: showDropDown && "ellipsis",
                maxWidth: showDropDown && "54px",
                overflow: showDropDown && "hidden",
                marginLeft: 0.5,
                color: "black",
              },
              titleStyle,
            ]}
          >
            {title}
          </Typography>
          <Typography
            sx={[
              {
                fontWeight: "bold",
                color: "#27AC1E",
                fontSize: { mobile: "12px", laptop: "12px" },
                marginLeft: 0.5,
              },
              valueStyle,
            ]}
          >
            {value}
          </Typography>
        </Box>
        {showDropDown && (
          <Box>
            <StyledImage
              src={DownIcon}
              sx={{ height: "10px", width: "10px", marginRight: "5px" }}
            />
          </Box>
        )}
      </Box>
      <DropdownMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
        axios={axios}
      />
    </Box>
  );
};

export default memo(NewBoxData);
