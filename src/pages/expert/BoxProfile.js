import { Box, Typography, useMediaQuery } from "@mui/material";
import { StyledImage } from "../../components";
import { ArrowDown } from "../../assets";
import { useEffect, useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import { setRole } from "../../newStore";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const BoxProfile = ({ image, value, containerStyle, value1 }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
      // console.log(anchorEl);
    }, [anchorEl]);
    const handleClose = (val) => {
      setAnchorEl(0);
      typeof val == "string" &&
        navigate(`/${window.location.pathname.split("/")[1]}/${val}`);
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
            onClick={handleClick}
            sx={[
              {
                backgroundColor: "primary.main",
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
            <StyledImage
              src={image}
              sx={{
                height: { laptop: "33px", mobile: "27px" },
                width: { laptop: "33px", mobile: "27px" },
                borderRadius: "150px",
              }}
            />
            <Box style={{ flex: 1, marginLeft: "5px" }}>
              <Typography
                sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}
              >
                {value}
              </Typography>
              <Typography
                sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}
              >
                {value1}
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
  

  export default BoxProfile