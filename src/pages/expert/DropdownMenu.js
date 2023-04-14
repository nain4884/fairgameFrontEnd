import React from "react";
import { StyledImage } from "../../components";
import { Box, Menu, Typography } from "@mui/material";

const DropdownMenu = ({ anchorEl, open, handleClose }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        sx: {
          paddingY: "0px",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: "5px",
          border: "1px solid #306A47",
        },
      }}
    >
      <Box
        sx={{
          minHeight: "100px",
          flexDirection: "column",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <Box sx={{ display: "flex", height: "25px" }}>
          <Box
            sx={{
              width: "60px",
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
              width: "90px",
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
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              40
            </Typography>
          </Box>
          <Box
            sx={{
              width: "90px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#10DC61",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              41
            </Typography>
          </Box>
          <Box
            sx={{
              width: "90px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#10DC61",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              42
            </Typography>
          </Box>
          <Box
            sx={{
              width: "90px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#F8C851",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              43
            </Typography>
          </Box>
          <Box
            sx={{
              width: "90px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#F8C851",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "25px",
            borderTop: "1px solid #306A47",
          }}
        >
          <Box
            sx={{
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#306A47", fontWeight: "bold", fontSize: "12px" }}
            >
              44
            </Typography>
          </Box>
          <Box
            sx={{
              width: "90px",
              display: "flex",
              borderLeft: "1px solid #306A47",
              background: "#DC3545",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#306A47",
                fontWeight: "500",
                fontSize: "12px",
                color: "white",
              }}
            >
              4,02,350
            </Typography>
            <StyledImage
              src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
              sx={{
                height: "15px",
                marginLeft: "5px",
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                width: "15px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Menu>
  );
};

export default DropdownMenu;
