import { Box, Typography, useMediaQuery } from "@mui/material";
import { StyledImage } from "../../components";
import { ArrowDown } from "../../assets";
import HeaderDropdown from "./HeaderDropdown";
import { setRole } from "../../newStore";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

const ActiveUsers = ({ image, value, containerStyle }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    // console.log(anchorEl)
  }, [anchorEl]);
  const handleClose = () => {
    setAnchorEl(0);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minWidth: { laptop: "120px" },
        }}
      >
        <Box
          onClick={(event) => {}}
          sx={[
            {
              backgroundColor: "white",
              minWidth: { laptop: "120px", mobile: "90px" },
              marginLeft: "1vw",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 3px 10px #B7B7B726",
              justifyContent: "space-between",
              height: { laptop: "40px", mobile: "35px" },
              overflow: "hidden",
              paddingX: "2px",
              borderRadius: "35px",
            },
            containerStyle,
          ]}
        >
          <Box
            sx={{
              height: "35px",
              width: "35px",
              borderRadius: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#175731",
            }}
          >
            <StyledImage src={image} sx={{ height: "20px", width: "20px" }} />
          </Box>
          <Box style={{ flex: 1, marginLeft: "5px" }}>
            <Typography
              sx={{ fontSize: "8px", color: "text.primary", fontWeight: "500" }}
            >
              Active Users
            </Typography>
            <Typography
              sx={{ fontSize: "14px", color: "#27AC1E", fontWeight: "700" }}
            >
              {value}
            </Typography>
          </Box>
          <StyledImage
            src={ArrowDown}
            sx={{ height: "6px", width: "10px", marginRight: "5px" }}
          />
        </Box>
      </Box>
      <HeaderDropdown
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
};

export default ActiveUsers;
