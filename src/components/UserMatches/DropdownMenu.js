import { useTheme } from '@emotion/react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react'
import StyledImage from '../StyledImage';

const DropdownMenu = ({ anchorEl, open, handleClose, list }) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  
    return (
      <Box
        sx={{
          borderRadius: "5px",
          border: "1px solid #306A47",
          zIndex: 1001,
          overflow: "hidden",
          top: "35px",
          left: matchesMobile ? "-13%" : "0%",
          position: "absolute",
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
          <Box sx={{ maxHeight: "200px", overflowY: "scroll" }}>
            {list?.length > 0 ? (
              list?.map((v) => {
                const getColor = (value) => {
                  if (value > 1) {
                    return "#306A47";
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
                        width: "60px",
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
                        width: "90px",
                        display: "flex",
                        borderLeft: `1px solid #306A47`,
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
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
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
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
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
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
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
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
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
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
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
                      4,02,350f
                    </Typography>
                    <StyledImage
                      src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
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
                      sx={{
                        color: "#306A47",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
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
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                        width: "15px",
                      }}
                    />
                  </Box>
                </Box>{" "}
              </>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

export default DropdownMenu