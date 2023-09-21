import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../../admin/assets";
import StyledImage from "../../components/StyledImage";
import ListHeaderT from "../ListHeaderT";
import BoxButton from "../BoxButton";
import LockUnlockComponent from "./UserSpecificButtons/LockUnlockComponent";
import ChangePasswordComponent from "./UserSpecificButtons/ChangePasswordComponent";
import SetCreditReferenceComponent from "./UserSpecificButtons/SetCreditReferenceComponent";
import DepositComponent from "./UserSpecificButtons/DepositComponent";
import WithDrawComponent from "./UserSpecificButtons/WithDrawComponent";
import { useDispatch, useSelector } from "react-redux";
import { setDailogData } from "../../store/dailogModal";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";

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
  currentUser,
  activeWalletAmount,
  backgroundColor,
  getListOfUser,
  updatedUserProfile,
  element,
}) => {
  const navigate = useNavigate();
  const { axios } = setRole();
  const [selected, setSelected] = useState(null);
  const [userModal, setUserModal] = useState({});
  const [showModalMessage, setShowModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { allRole } = useSelector((state) => state.auth);
  const [settlementUserModal, setSettlementUserModal] = useState(false);

  // function handleUpline() {
  //   const {
  //     a_partnership,
  //     sa_partnership,
  //     sm_partnership,
  //     fa_partnership,
  //     fw_partnership,
  //     m_partnership,
  //   } = element;

  //   const partnershipMap = {
  //     superMaster:
  //       a_partnership + sa_partnership + fa_partnership + fw_partnership,
  //     superAdmin: fa_partnership + fw_partnership,
  //     master:
  //       sm_partnership +
  //       a_partnership +
  //       sa_partnership +
  //       fa_partnership +
  //       fw_partnership,
  //     admin: sa_partnership + fa_partnership + fw_partnership,
  //     fairGameWallet: 0,
  //     fairGameAdmin: fw_partnership,
  //     user:
  //       a_partnership +
  //       sa_partnership +
  //       sm_partnership +
  //       fa_partnership +
  //       fw_partnership +
  //       m_partnership,
  //   };

  //   const thisUplinePertnerShip = partnershipMap[element.role] || 0;

  //   return thisUplinePertnerShip;
  // }

  const prevElement = {
    credit_refer: element?.credit_refer,
    balance: element?.balance,
    profit_loss: element?.profit_loss,
    exposure: element?.exposure,
    available_balance: element?.available_balance,
    exposure_limit: element?.exposure_limit,
    userName: element?.userName,
    percent_profit_loss: element?.percent_profit_loss || 0,
    bet_blocked: element?.bet_blocked,
    all_blocked: element?.all_blocked,
    // rateToCalculatePercentage: handleUpline(),
    totalCommissions: element?.TotalComission,
    role: allRole?.find((role) => role?.id === element?.roleId),
    userId: element?.id,
    matchTypeComission: element?.matchTypeComission,
    sessionComisssion: element?.sessionComisssion,
    matchComission: element?.matchComission,
  };

  const [elementToUDM, setElementToUDM] = useState(prevElement);
  const dispatch = useDispatch();
  const [showUserModal, setShowUserModal] = useState(false);
  useEffect(() => {
    if (currentUser?.userName === "FAIRGAMEWALLET") {
      getWalletAccountDetails();
    }
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

  function showDialogModal(isModalOpen, showRight, message) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      // navigate(`/${window.location.pathname.split("/")[1]}/list_of_clients`);
    }, [2000]);
    setShowModalMessage(message);
    setShowUserModal(false);
  }

  const handleSettlement = async (val) => {
    try {
      const data = await axios.post(`/fair-game-wallet/comissionSettelment`, {
        userId: val,
      });
      if (data?.data?.data) {
        setSettlementUserModal(false);
        getListOfUser();
        toast.success(data?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err.message);
      setSettlementUserModal(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "c" || event.key === "v")
    ) {
      return;
    }

    if (
      event.code === "Space" ||
      (!(event.key >= "0" && event.key <= "9") &&
        event.key !== "Backspace" &&
        event.code !== "ArrowUp" &&
        event.code !== "ArrowDown" &&
        event.code !== "Enter" &&
        event.code !== "Tab" && // Allow Tab key
        event.code !== "ArrowRight" && // Allow Right Arrow key
        event.code !== "ArrowLeft" &&
        event.code !== "Delete")
    ) {
      event.preventDefault();
    }
  };

  const handleKeyDown1 = (event) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "c" || event.key === "v")
    ) {
      return;
    }
    if (
      event.code === "Space" ||
      (!(event.key >= "0" && event.key <= "9") &&
        event.key !== "Backspace" &&
        event.code !== "ArrowUp" &&
        event.code !== "ArrowDown" &&
        event.code !== "Enter" &&
        event.code !== "Tab" && // Allow Tab key
        event.code !== "ArrowRight" && // Allow Right Arrow key
        event.code !== "ArrowLeft" &&
        event.code !== "Delete" &&
        event.key !== ".")
    ) {
      event.preventDefault();
    }
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
            {selected != null && (
              <Box
                sx={{
                  width: {
                    mobile: "auto",
                    tablet: "90%",
                    laptop: "80%",
                    marginLeft: "0",
                  },
                  padding: "5px",
                }}
              >
                {selected == 0 && (
                  <DepositComponent
                    handleKeyDown={handleKeyDown1}
                    element={element}
                    backgroundColor={backgroundColor}
                    selected={selected == 0}
                    setSelected={(e) => {
                      setSelected(null);
                      setShowUserModal(false);
                    }}
                    setShowUserModal={setShowUserModal}
                    updatedUserProfile={updatedUserProfile}
                    getListOfUser={getListOfUser}
                    setShowSuccessModal={setShowSuccessModal}
                    setShowModalMessage={setShowModalMessage}
                    activeWalletAmount={activeWalletAmount}
                    prevElement={prevElement}
                    navigate={navigate}
                    elementToUDM={elementToUDM}
                    setElementToUDM={setElementToUDM}
                    dispatch={dispatch}
                    showDialogModal={showDialogModal}
                    titleBackgroundColor="#27AC1E"
                  />
                )}
                {selected == 1 && (
                  <WithDrawComponent
                    handleKeyDown={handleKeyDown1}
                    element={element}
                    selected={selected == 1}
                    setSelected={(e) => {
                      setSelected(null);
                      setShowUserModal(false);
                    }}
                    backgroundColor={backgroundColor}
                    setShowUserModal={setShowUserModal}
                    userModal={userModal}
                    updatedUserProfile={updatedUserProfile}
                    setShowSuccessModal={setShowSuccessModal}
                    setShowModalMessage={setShowModalMessage}
                    activeWalletAmount={activeWalletAmount}
                    prevElement={prevElement}
                    navigate={navigate}
                    elementToUDM={elementToUDM}
                    getListOfUser={getListOfUser}
                    setElementToUDM={setElementToUDM}
                    dispatch={dispatch}
                    showDialogModal={showDialogModal}
                    titleBackgroundColor="#ff0000"
                  />
                )}
                {selected == 2 && (
                  <SetCreditReferenceComponent
                    handleKeyDown={handleKeyDown}
                    selected={selected == 2}
                    setSelected={(e) => {
                      setSelected(null);
                      setShowUserModal(false);
                    }}
                    backgroundColor={backgroundColor}
                    setShowUserModal={setShowUserModal}
                    userModal={userModal}
                    setShowSuccessModal={setShowSuccessModal}
                    setShowModalMessage={setShowModalMessage}
                    prevElement={prevElement}
                    navigate={navigate}
                    getListOfUser={getListOfUser}
                    elementToUDM={elementToUDM}
                    dispatch={dispatch}
                    setElementToUDM={setElementToUDM}
                    showDialogModal={showDialogModal}
                  />
                )}
                {selected == 3 && (
                  <ChangePasswordComponent
                    selected={selected == 3}
                    setSelected={(e) => {
                      setSelected(null);
                      setShowUserModal(false);
                    }}
                    backgroundColor={backgroundColor}
                    setShowUserModal={setShowUserModal}
                    userModal={userModal}
                    setShowSuccessModal={setShowSuccessModal}
                    setShowModalMessage={setShowModalMessage}
                    dispatch={dispatch}
                    navigate={navigate}
                    showDialogModal={showDialogModal}
                  />
                )}
                {selected == 4 && (
                  <LockUnlockComponent
                    selected={selected == 4}
                    setSelected={(e) => {
                      setSelected(null);
                      setShowUserModal(false);
                    }}
                    backgroundColor={backgroundColor}
                    setShowUserModal={setShowUserModal}
                    userModal={userModal}
                    setShowSuccessModal={setShowSuccessModal}
                    setShowModalMessage={setShowModalMessage}
                    dispatch={dispatch}
                    navigate={navigate}
                    prevElement={prevElement}
                    elementToUDM={elementToUDM}
                    setElementToUDM={setElementToUDM}
                    showDialogModal={showDialogModal}
                    getListOfUser={getListOfUser}
                  />
                )}
              </Box>
            )}
            {selected === null && (
              <Box
                sx={{
                  // flex: 1,
                  display: "flex",
                  flexDirection: {
                    mobile: "row",
                    laptop: "row",
                    tablet: "row",
                  },
                  gap: { mobile: 0.5 },
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: { mobile: "90vw", laptop: "77%", tablet: "100%" },
                  marginTop: "9px",
                }}
              >
                <BoxButton
                  color={"#0B4F26"}
                  onClick={() => {
                    setSelected(0);
                  }}
                  title={"Deposit"}
                  isSelected={selected == 0}
                  containerStyle={{
                    marginLeft: { laptop: "10px", mobile: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { mobile: "12px" },
                  }}
                  labelStyle={{}}
                />
                <BoxButton
                  color={"#0B4F26"}
                  onClick={() => {
                    setSelected(1);
                  }}
                  containerStyle={{
                    marginLeft: { laptop: "10px", mobile: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { mobile: "12px" },
                  }}
                  // isSelected={selected == 1}
                  title={"Withdraw"}
                  labelStyle={{}}
                />
                <BoxButton
                  color={"#0B4F26"}
                  onClick={(e) => {
                    e?.preventDefault();
                    // setSettalmentModal(true);
                  }}
                  title={"C_Settlement"}
                  containerStyle={{
                    marginLeft: { laptop: "10px", mobile: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { mobile: "12px" },
                  }}
                  labelStyle={{}}
                />
                <BoxButton
                  color={"#0B4F26"}
                  onClick={() => {
                    setSelected(3);
                  }}
                  title={"Change Password"}
                  isSelected={selected == 3}
                  containerStyle={{
                    marginLeft: { laptop: "10px", mobile: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { mobile: "12px" },
                  }}
                />
                <BoxButton
                  color={"#0B4F26"}
                  onClick={() => {
                    setSelected(4);
                  }}
                  title={"Lock/Unlock"}
                  containerStyle={{
                    marginLeft: { laptop: "10px", mobile: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { mobile: "12px" },
                  }}
                  isSelected={selected == 4}
                />
                <BoxButton
                  color={"#0B4F26"}
                  onClick={() => {
                    setSelected(2);
                  }}
                  title={"set Credit Reference"}
                  isSelected={selected == 2}
                  labelStyle={{}}
                  containerStyle={{
                    marginLeft: { laptop: "10px", mobile: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { mobile: "12px" },
                  }}
                />
                <Dialog
                  open={settlementUserModal}
                  onClose={() => setSettlementUserModal((prev) => !prev)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure want to settle this commission ?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button
                      onClick={() => setSettlementUserModal((prev) => !prev)}
                    >
                      No
                    </Button>
                    <Button
                      sx={{ color: "#E32A2A" }}
                      onClick={(e) => {
                        handleSettlement(elementToUDM?.userId);
                      }}
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export default DropdownMenu2;
