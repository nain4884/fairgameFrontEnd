import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../../admin/assets";
import StyledImage from "../../components/StyledImage";
import ListHeaderT from "../ListHeaderT";

const DropdownMenu2 = ({
  anchorEl,
  open,
  handleClose,
  menutItems2,
  title,
  walletAccountDetail,
  fContainerStyle,
  fTextStyle,
  getWalletAccountDetails,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    getWalletAccountDetails();
  }, [open]);

  const classes = {
    Menusx: {
      marginTop: { mobile: "15px", laptop: "30px", tablet: "18px" },
      marginLeft: { mobile: "5px", laptop: "0", tablet: "0" },
      paddingY: "0px",
      padding: "0px",
      width: { mobile: "105%", laptop: "100%", tablet: "100%" },
    },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: {
      sx: {
        // border: "1px solid #fff",
        paddingY: "0px",
        padding: "0px",
        // width: "96.25%",
        width: "100%",
        left: "1px !important",
        minHeight: "220px",
        background: "url(/static/media/back.00d2deda3616019e96ee.png)",
        boxShadow: "none",
        // background: "none"
        // left: "27px !important",
      },
    },
    MenuItemsx: {
      width: "100%",
      fontSize: { laptop: "16px", mobile: "10px" },
      fontWeight: "600",
      marginX: "0px",
      // width: { laptop: "140px", mobile: "170px" },
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      // paddingY: "-10px",
      marginTop: "0px",
      borderStyle: "solid",
      // marginLeft: "-10px",
      minHeight: "40px",
      lineHeight: "18px",
      color: "black",
      "&:hover": {
        backgroundColor: "#e5b744",
        // color: "white",
        border: 0,

        // transform: "scale(1.02)",
      },
    },
  };
  return (
    <>
      <Box sx={{ width: "80%" }}>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={classes.Menusx}
          MenuListProps={classes.MenuListProps}
          PaperProps={classes.MenuPaperProps}
        >
          <Box sx={{}}>
            <Typography
              sx={[
                {
                  fontSize: { laptop: "18px", mobile: "10px" },
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  padding: "10px 37px",
                  paddingBottom: "15px",
                  color: "#fff",
                  textTransform: "uppercase",
                },
              ]}
            >
              {title}
            </Typography>
            {/* <Box sx={{ height: "1px", background: "#ddd" }}></Box> */}
          </Box>
          <Box
            sx={{
              background: "#F8C851",
              marginLeft: "37px",
              marginRight: "20px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {menutItems2.map((x, index) => (
              <MenuItem
                key={index}
                dense={true}
                sx={classes.MenuItemsx}
                onClick={() => {
                  navigate(x.link, {
                    state: {
                      activeTab: "Reports",
                    },
                  });
                  handleClose();
                }}
              >
                {x.title}
              </MenuItem>
            ))}
            <Box
              sx={{
                background: "#F8C851",
                marginLeft: "6px",
                padding: "10px",
              }}
            >
              <ListHeaderT userName={"User Name"} />
              <Box
                sx={[
                  {
                    width: "100%",
                    display: "flex",
                    height: "45px",
                    background: "#0B4F26",
                    alignItems: "center",
                    overflow: "hidden",
                    borderBottom: "2px solid white",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: {
                        laptop: "11.5vw",
                        tablet: "20.5vw",
                        mobile: "26.5vw",
                      },
                      display: "flex",
                      paddingX: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: "45px",
                      borderRight: "2px solid white",
                    },
                    fContainerStyle,
                  ]}
                >
                  <Typography
                    sx={[
                      {
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        textTransform: "capitalize",
                        wordBreak: "break-all",
                        textTransform: "capitalize",
                        color: "white",
                      },
                      fTextStyle,
                    ]}
                  >
                    {walletAccountDetail?.userName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "10.5vw",
                      tablet: "10.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    paddingX: "10px",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                    color: "white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {walletAccountDetail?.credit_refer}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "9.5vw",
                      tablet: "9.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    paddingX: "10px",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                    color: "white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {Number(walletAccountDetail?.balance) >= 0 ? (
                      <>
                        <span style={{ visibility: "hidden" }}>-</span>
                        {Number(walletAccountDetail?.balance)}
                      </>
                    ) : (
                      Number(walletAccountDetail?.balance)
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "11.5vw",
                      tablet: "11.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    paddingX: "10px",
                    justifyContent: "space-between",
                    background:
                      Number(walletAccountDetail?.profit_loss) >= 0
                        ? "#27AC1E"
                        : "#E32A2A",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
                  >
                    {Number(walletAccountDetail?.profit_loss) >= 0 ? (
                      <>
                        <span style={{ visibility: "hidden" }}>-</span>
                        {walletAccountDetail?.profit_loss}
                      </>
                    ) : (
                      walletAccountDetail?.profit_loss
                    )}
                  </Typography>
                  <StyledImage
                    src={
                      Number(walletAccountDetail?.profit_loss) >= 0
                        ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                        : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                    }
                    sx={{
                      height: "15px",
                      marginLeft: "5px",
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      width: "15px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "11.5vw",
                      tablet: "11.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    paddingX: "10px",
                    justifyContent: "space-between",
                    background:
                      Number(walletAccountDetail?.profit_loss) >= 0
                        ? "#27AC1E"
                        : "#E32A2A",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
                  >
                    {Number(walletAccountDetail?.percent_profit_loss) >= 0 ? (
                      <>
                        <span style={{ visibility: "hidden" }}>-</span>
                        {walletAccountDetail?.percent_profit_loss}
                      </>
                    ) : (
                      walletAccountDetail?.percent_profit_loss
                    )}
                  </Typography>
                  <StyledImage
                    src={
                      Number(walletAccountDetail?.profit_loss) >= 0
                        ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                        : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                    }
                    sx={{
                      height: "15px",
                      marginLeft: "5px",
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      width: "15px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "9.5vw",
                      tablet: "9.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    paddingX: "10px",
                    alignItems: "center",
                    color: "white",
                    height: "45px",
                    borderRight: "2px solid white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {walletAccountDetail?.TotalComission}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "9.5vw",
                      tablet: "9.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    paddingX: "10px",
                    alignItems: "center",
                    height: "45px",
                    color: "white",
                    borderRight: "2px solid white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {walletAccountDetail?.exposure}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: {
                      laptop: "9.5vw",
                      tablet: "9.5vw",
                      mobile: "26.5vw",
                    },
                    display: "flex",
                    paddingX: "10px",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                    color: "white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {Number(walletAccountDetail?.available_balance) >= 0 ? (
                      <>
                        <span style={{ visibility: "hidden" }}>-</span>
                        {Number(walletAccountDetail?.available_balance)}
                      </>
                    ) : (
                      Number(walletAccountDetail?.available_balance)
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: { laptop: "5vw", tablet: "5vw", mobile: "14vw" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                    paddingX: "10px",
                    color: "white",
                  }}
                >
                  <StyledImage
                    src={
                      walletAccountDetail?.bet_blocked == 0
                        ? UnLockIcon
                        : LockIcon
                    }
                    sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { laptop: "5vw", tablet: "5vw", mobile: "14vw" },
                    display: "flex",
                    paddingX: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                  }}
                >
                  <StyledImage
                    src={
                      walletAccountDetail?.all_blocked == 0
                        ? UnLockIcon
                        : LockIcon
                    }
                    sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
                  />
                </Box>
                <Box
                  sx={{
                    width: { laptop: "8vw", tablet: "8vw", mobile: "26.5vw" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                    paddingX: "10px",
                    color: "white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {walletAccountDetail?.exposure_limit}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: { laptop: "10vw", tablet: "10vw", mobile: "26.5vw" },
                    display: "flex",
                    paddingX: "10px",
                    alignItems: "center",
                    height: "45px",
                    borderRight: "2px solid white",
                    color: "white",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    {walletAccountDetail?.fullName}
                  </Typography>{" "}
                </Box>
              </Box>
            </Box>
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default DropdownMenu2;
