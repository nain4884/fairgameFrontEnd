import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../store/userdetail";
import StyledImage from "./StyledImage";
import { setDailogData } from "../store/dailogModal";
import {
  CircleBack,
  DeleteIcon,
  EyeIcon,
  EyeIconWhite,
  EyeSlash,
  EyeSlashWhite,
  LockClosed,
  LockIcon,
  LockOpen,
  UnLockIcon,
} from "../admin/assets";
import { onChangeKeyCheck } from "./helper/PassKeyCheck";
import { useNavigate } from "react-router-dom";
import { setRole } from "../newStore";
import { toast } from "react-toastify";
import { setCurrentUser } from "../newStore/reducers/currentUser";
import { debounce } from "lodash";
import { useEffect } from "react";
import ModalMUI from "@mui/material/Modal";
import MobileViewUserDetails from "./MobileViewUserDetails";
import BoxButton from "./BoxButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35vw",
  minWidth: "500px",
  overflow: "hidden",
  background: "white",
  border: "2px solid white",
  borderRadius: "10px",
};

export default function UserDetailModal({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  activeWalletAmount,
  elementToUDM,
  setElementToUDM,
  getListOfUser,
  showUserModal,
  updatedUserProfile,
  prevElement,
  selected,
  setSelected,
  element
}) {
  const isModalOpen = useSelector((state) => state.userdetail)?.isModalOpen;
  const { axios } = setRole();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [settalementModal, setSettalmentModal] = useState(false);
  function showDialogModal(isModalOpen, showRight, message) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      navigate(`/${window.location.pathname.split("/")[1]}/list_of_clients`);
    }, [2000]);
    setShowModalMessage(message);
    setShowUserModal(false);
  }

  const classes = {
    mainBox: {
      background: backgroundColor ?? "#F8C851",
      display: "flex",
      width: { mobile: "100%", laptop: "100%", tablet: "100%" },
      justifyContent: {
        mobile: "flex-start",
        tablet: "flex-start",
        laptop: "flex-start",
      },
      overflow: "hidden",
      paddingY: "20px",
      paddingTop: "10px",
      borderBottom: "2px solid white",
    },
    mainBoxSubsx: [
      {
        width: "11.5vw",
        display: "flex",

        height: "45px",
        paddingLeft: "10px",
        borderRight: "2px solid #0000",
      },
    ],
    BoxButtonStyledImage: { height: { mobile: "15px", laptop: "18px" }, width: { mobile: "15px", laptop: "17px" }, marginLeft: "5px" },
    BoxButtonContStyle: {
      background: "#E32A2A",
      flex: 1,
      marginX: { laptop: "10px", mobile: "0" },
      alignSelf: "center",
      borderColor: "white",
    },
  };

  const handleSettlement = async (val) => {
    try {
      const data = await axios.post(`/fair-game-wallet/comissionSettelment`, {
        userId: val,
      });
      if (data?.data?.data) {
        setSettalmentModal(false);
        toast.success(data?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err.message);
      setSettalmentModal(false);
    }
  };
  return (
    <Box sx={classes.mainBox}>
      {/* <Box onClick={() => {}} sx={classes.mainBoxSubsx}></Box> */}
      {selected != null && (
        <Box
          sx={{
            width: { mobile: "auto", tablet: "90%", laptop: "80%", marginLeft: "0" },
            padding: "5px",
          }}
        >
          {selected == 0 && (
            <DepositComponent
              element={element}
              backgroundColor={backgroundColor}
              selected={selected == 0}
              setSelected={(e) => {
                setSelected(null);
                setShowUserModal(false);
              }}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
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
            <NewCreditComponent
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
          {selected == 5 && (
            <SetExposureComponent
              selected={selected == 5}
              setSelected={(e) => {
                setSelected(null);
                setShowUserModal(false);
              }}
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              navigate={navigate}
              prevElement={prevElement}
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
            />
          )}
        </Box>
      )}

      {selected == null && (
        <Box
          sx={{
            // flex: 1,
            display: "flex",
            flexDirection: { mobile: "row", laptop: "row", tablet: "row" },
            gap: { mobile: 0.5 },
            flexWrap: "wrap",
            justifyContent: "center",
            width: { mobile: "90vw", laptop: "77%", tablet: "100%" },
            marginTop: "9px",
          }}
        >
          <BoxButton
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
              fontSize: { mobile: "12px" }
            }}
            labelStyle={{}}
          />
          <BoxButton
            onClick={() => {
              setSelected(1);
            }}
            containerStyle={{
              marginLeft: { laptop: "10px", mobile: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { mobile: "12px" }
            }}
            isSelected={selected == 1}
            title={"Withdraw"}
            labelStyle={{}}
          />
          {elementToUDM?.role?.roleName === "user" && (
            <BoxButton
              onClick={(e) => {
                e?.preventDefault();
                setSettalmentModal(true);
              }}
              title={"C_Settlement"}
              containerStyle={{
                marginLeft: { laptop: "10px", mobile: "0" },
                flex: 1,
                borderColor: "white",
              }}
              titleStyle={{
                fontSize: { mobile: "12px" }
              }}
              labelStyle={{}}
            />
          )}
          <BoxButton
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
              fontSize: { mobile: "12px" }
            }}
          />
          <BoxButton
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
              fontSize: { mobile: "12px" }
            }}
            isSelected={selected == 4}
          />
          <BoxButton
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
              fontSize: { mobile: "12px" }
            }}
          />
          <BoxButton
            onClick={() => {
              setSelected(5);
            }}
            containerStyle={{
              marginLeft: { laptop: "10px", mobile: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { mobile: "12px" }
            }}
            title={"Set Exposure Limit"}
            labelStyle={{}}
            isSelected={selected == 5}
          />
          <BoxButton
            deleteBtn={true}
            onClick={(e) => {
              setDeleteModal((prev) => !prev);
            }}
            title={"Delete User"}
            titleStyle={{
              fontSize: { mobile: "12px" }
            }}


            icon={
              <StyledImage src={DeleteIcon} sx={classes.BoxButtonStyledImage} />
            }
            containerStyle={classes.BoxButtonContStyle}
          />

          <Dialog
            open={settalementModal}
            onClose={() => setSettalmentModal((prev) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to settle this commission ?"}
            </DialogTitle>
            {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
            <DialogActions>
              <Button onClick={() => setSettalmentModal((prev) => !prev)}>
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

          <Dialog
            open={deleteModal}
            onClose={() => setDeleteModal((prev) => !prev)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure want to delete this user?"}
            </DialogTitle>
            {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
            <DialogActions>
              <Button onClick={() => setDeleteModal((prev) => !prev)}>
                Cancel
              </Button>
              <Button
                sx={{ color: "#E32A2A" }}
                onClick={(e) => {
                  if (
                    prevElement.credit_refer == 0 &&
                    prevElement.profit_loss == 0 &&
                    prevElement.available_balance == 0
                  ) {
                    UserDelete(userModal.id)
                      .then(({ bool, message }) => {
                        setDeleteModal(false);
                        showDialogModal(true, true, message);
                      })
                      .catch(({ bool, message }) => {
                        setDeleteModal(false);
                        showDialogModal(true, false, message);
                      });
                  } else {
                    let message = "First Settle Account to Delete The User";
                    toast.error(message);
                    setDeleteModal(false);
                    showDialogModal(true, false, message);
                  }
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
}

const BoxButtonWithSwitch = ({
  title,
  containerStyle,
  icon,
  onClick,
  isSelected,
  deleteBtn,
  titleStyle,
  val,
  setLockUnlockObj,
  lockUnlockObj,
  elementToUDM,
  setElementToUDM,
}) => {
  const [checked, setChecked] = useState(false);
  const classes = {
    mainBox: [
      {
        background: !val ? "#0B4F26" : "#E32A2A",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
      },
      containerStyle,
    ],
    mainBoxTypography: [
      {
        fontSize: { mobile: "3vw", laptop: "0.9vw", tablet: "0.9vw" },
        fontWeight: "600",
        textAlign: "right",
        color: "white",
        marginRight: "10px",
        minWidth: "80px",
      },
      titleStyle,
    ],
  };
  return (
    <Box onClick={onClick} sx={classes.mainBox}>
      <MaterialUISwitch
        checked={!val}
        onChange={(e) => {
          if (title === "User") {
            setLockUnlockObj({
              ...lockUnlockObj,
              all_blocked: !val === true ? 1 : 0,
            });
            setElementToUDM({
              ...elementToUDM,
              all_blocked: !val === true ? 1 : 0,
            });
          } else {
            setLockUnlockObj({
              ...lockUnlockObj,
              bet_blocked: !val === true ? 1 : 0,
            });
            setElementToUDM({
              ...elementToUDM,
              bet_blocked: !val === true ? 1 : 0,
            });
          }
          setChecked(!checked);
        }}
      />
      <Typography sx={classes.mainBoxTypography}>
        {title} {!val ? "Unlocked" : "Locked"}
      </Typography>
    </Box>
  );
};

const DepositComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  navigate,
  elementToUDM,
  setElementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
  updatedUserProfile,
  setSelected,
  selected,
  percent_profit_loss,
  element,
  titleBackgroundColor
}) => {
  const [showPass, setShowPass] = useState(false);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [initialBalance, setInitialBalance] = useState(
    currentUser?.current_balance
  );
  const defaultDepositObj = {
    userId: "",
    amount: "",
    trans_type: "add",
    adminTransPassword: "",
    remark: "",
  };
  const [loading, setLoading] = useState(false);
  const [depositObj, setDepositObj] = useState(defaultDepositObj);
  const activeWalletAmount = useSelector(
    (state) => state?.rootReducer?.user?.amount
  );

  const calculatePercentProfitLoss = (val, e) => {
    const rateToCalculatePercentage = val.rateToCalculatePercentage;
    const inputValue = Number(
      isNaN(Number(e.target.value)) ? 0 : e.target.value
    );
    const profitLoss = prevElement.profit_loss;

    let percent_profit_loss;

    if (rateToCalculatePercentage === 0) {
      percent_profit_loss = profitLoss;
    } else {
      const newVal = profitLoss + inputValue;
      percent_profit_loss = newVal * (rateToCalculatePercentage / 100);
    }
    return percent_profit_loss.toFixed(2);
  };

  const handleChange = (e) => {
    setDepositObj({
      ...depositObj,
      amount: e.target.value < 0 ? 0 : Number(e.target.value),
      userId: userModal.id,
    });

    setElementToUDM({
      ...elementToUDM,
      percent_profit_loss: calculatePercentProfitLoss(prevElement, e),
      profit_loss:
        prevElement.profit_loss +
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      balance:
        prevElement.balance +
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      available_balance:
        prevElement.available_balance +
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
    });
    if (e.target.value) {
      const newUserbalance = {
        ...currentUser,
        current_balance: currentUser?.current_balance - e.target.value,
      };

      setInitialBalance(newUserbalance?.current_balance);
    } else {
      const newUserbalance = {
        ...currentUser,
        current_balance: initialBalance,
      };

      setTimeout(() => {
        // dispatch(setCurrentUser(newUserbalance));
        setInitialBalance(currentUser?.current_balance);
      }, 51);
    }
  };

  return (
    <>
      {matchesMobile && matchesTablet ? (
        <ModalMUI
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={selected}
          onClose={setSelected}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MobileViewUserDetails
            elementToUDM={elementToUDM}
            element={element}
            userName={elementToUDM?.userName}
            title={"Deposit Amount"}
            setSelected={setSelected}
            selected={selected}
            handleAdminPass={(e) => {
              setDepositObj({
                ...depositObj,
                adminTransPassword: e.target.value,
              });
            }}
            handleChange={handleChange}
            handleReview={(e) => {
              setDepositObj({ ...depositObj, remark: e.target.value });
            }}
            amount={depositObj.amount}
            profit_loss={elementToUDM?.profit_loss}
            percent_profit_loss={elementToUDM?.percent_profit_loss}
            setShowPass={setShowPass}
            showPass={showPass}
            onCancel={(e) => {
              setDepositObj(defaultDepositObj);
              setElementToUDM({
                ...elementToUDM,
                profit_loss: prevElement.profit_loss,
                balance: prevElement.balance,
                available_balance: prevElement.available_balances,
              });
              setShowUserModal(false);
            }}
            onSubmit={(e) => {
              try {
                if (!loading) {
                  setLoading(true);
                  UpdateAvailableBalance(depositObj)
                    .then(({ bool, message }) => {
                      toast.success(message);
                      getListOfUser();
                      updatedUserProfile();
                      setLoading(false);
                      showDialogModal(true, true, message);
                    })
                    .catch(({ bool, message }) => {
                      toast.error(message);
                      setLoading(false);
                      showDialogModal(true, false, message);
                    });
                }
              } catch (e) {
                console.log(e?.message);
                setLoading(false);
              }
            }}
            initialBalance={initialBalance}
            backgroundColor={backgroundColor}
            loading={loading}
            titleBackgroundColor={titleBackgroundColor}
          />
        </ModalMUI>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            gap: 2,
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              width: { mobile: "100%", laptop: "100%", tablet: "100%" },
              gap: "1%",
              display: { mobile: "flex", laptop: "block" },
              flexDirection: "row-reverse",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: { mobile: "41%", laptop: "100%" },
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                  laptop: "row",
                },
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "60%",
                  flexDirection: {
                    mobile: "row",
                    tablet: "row",
                    laptop: "row",
                  },
                  justifyContent: "space-between",
                  position: { mobile: "relative", laptop: "static" },
                  marginTop: { mobile: "0", laptop: "0" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { mobile: "3vw", laptop: "20px", tablet: "20px" },
                    width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                    fontWeight: "600",
                    marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                  }}
                >
                  Deposit Amount
                </Typography>
                {/* <Typography
              sx={{
                fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                width: { mobile: "24vw", laptop: "100%", tablet: "40%" },
                fontWeight: "600",
                marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                textAlign: "center",
                background: "red",
                position: "absolute",
                right: "-11px",
                // marginRight: "-16px",
                height: "45px",
                display: { mobile:"flex", laptop: "none"},
                alignItems: "center",
                justifyContent: "center",
                color: "#fff"
              }}
            >
             100000
            </Typography> */}
              </Box>
              <Box
                sx={{
                  background: "#004A25",
                  width: { mobile: "100%", laptop: "43%", tablet: "43%" },
                  height: "45px",
                  borderRadius: "5px",
                  paddingX: "20px",
                  marginTop: { mobile: "0", laptop: "0" },
                }}
              >
                <TextField
                  value={depositObj.amount}
                  onChange={handleChange}
                  variant="standard"
                  InputProps={{
                    placeholder: "Type Amount...",
                    disableUnderline: true,
                    style: {
                      fontSize: "15px",
                      height: "45px",
                      fontWeight: "600",
                      color: "white",
                    },
                  }}
                  type={"Number"}
                />
              </Box>
              {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Predicted Wallet</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{activeWalletAmount- Number(isNaN(depositObj.amount)?0:depositObj.amount)}</Typography>
          </Box> */}
            </Box>


            <Box
              sx={{
                width: { mobile: "41%", laptop: "100%" },
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                  laptop: "row",
                },
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "3vw", laptop: "20px", tablet: "20px" },
                  width: { mobile: "100%", laptop: "60%", tablet: "60%" },
                  fontWeight: "600",
                  marginRight: { mobile: 0, laptop: "0", tablet: "20px" },
                }}
              >
                Wallet Balance
              </Typography>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "43%", tablet: "43%" },
                  height: "45px",
                  background: "#FFECBC",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "2px solid #26262633",
                  paddingX: "20px",
                }}
              >
                <TextField
                  value={initialBalance || 0}
                  sx={{ width: "100%", height: "45px" }}
                  variant="standard"
                  InputProps={{
                    disabled: true,
                    placeholder: "",
                    disableUnderline: true,
                    type: "text",
                    style: {
                      fontSize: "13px",
                      height: "45px",
                      fontWeight: "600",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: { mobile: "41%", laptop: "100%" },
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                justifyContent: "flex-end",
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                  laptop: "row",
                },
                marginTop: "10px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "60%",
                  flexDirection: {
                    mobile: "row",
                    tablet: "row",
                    laptop: "row",
                  },
                  justifyContent: "space-between",
                  position: { mobile: "relative", laptop: "static" },
                  marginTop: { mobile: "0", laptop: "0" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { mobile: "3vw", laptop: "20px", tablet: "20px" },
                    width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                    fontWeight: "600",
                    marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                  }}
                >
                  Transaction Password
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "43%", tablet: "43%" },
                  height: "45px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "2px solid #26262633",
                }}
              >
                <TextField
                  onChange={(e) => {
                    setDepositObj({
                      ...depositObj,
                      adminTransPassword: e.target.value,
                    });
                  }}
                  sx={{ width: "100%", height: "45px" }}
                  variant="standard"
                  InputProps={{
                    placeholder: "",
                    disableUnderline: true,
                    type: !showPass ? "password" : "text",
                    style: {
                      fontSize: "13px",
                      height: "45px",
                      fontWeight: "600",
                    },
                  }}
                />
                <Box
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  <StyledImage
                    src={showPass ? EyeIcon : EyeSlash}
                    sx={{ height: "14px", width: "20px" }}
                  />
                </Box>
              </Box>
              {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Profit/Loss</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{profitLoss + Number(isNaN(depositObj.amount)?0:depositObj.amount)}</Typography>
          </Box> */}
            </Box>
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              width: "100%",
              gap: "1%",
              display: { mobile: "flex", laptop: "block" },
              justifyContent: "flex-end",
              flexDirection: "row-reverse",
            }}
          >

            <Box
              sx={{
                borderRadius: "5px",
                flex: 1,
                background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                minHeight: "80px",
                maxHeight: "115px",
                marginTop: "0",
                paddingX: "10px",
                width: { mobile: "41%", laptop: "55%" },
              }}
            >
              <TextField
                onChange={(e) => {
                  setDepositObj({ ...depositObj, remark: e.target.value });
                }}
                rows={4}
                sx={{ width: "100%", minHeight: "40px" }}
                multiline={true}
                variant="standard"
                InputProps={{
                  placeholder: "Remark (Optional)",
                  disableUnderline: true,
                  style: {
                    fontSize: "13px",
                    minHeight: "45px",
                    fontWeight: "600",
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", width: "100%" , marginTop: "21px", gap: 1, flexDirection: "row-reverse", justifyContent: "flex-end"}}>
              <BoxButton
                loading={loading}
                containerStyle={{ 
                  height: "44px",  
                  maxWidth: "150px !important"  }}
                isSelected={true}
                onClick={(e) => {
                  try {
                    if (!loading) {
                      setLoading(true);
                      UpdateAvailableBalance(depositObj)
                        .then(({ bool, message }) => {
                          toast.success(message);
                          getListOfUser();
                          updatedUserProfile();
                          setLoading(false);
                          showDialogModal(true, true, message);
                        })
                        .catch(({ bool, message }) => {
                          toast.error(message);
                          setLoading(false);
                          showDialogModal(true, false, message);
                        });
                    }
                  } catch (e) {
                    console.log(e?.message);
                    setLoading(false);
                  }
                }}
                title={"Submit"}
              />
              <BoxButton
                containerStyle={{
                 
                  background: "#E32A2A",
                  border: "0px",
                  height: "44px",
                  maxWidth: "150px !important" 
                }}
                isSelected={true}
                onClick={(e) => {
                  setDepositObj(defaultDepositObj);
                  setElementToUDM({
                    ...elementToUDM,
                    profit_loss: prevElement.profit_loss,
                    balance: prevElement.balance,
                    available_balance: prevElement.available_balances,
                  });
                  setSelected(e);
                }}
                title={"Cancel"}
              />
            </Box>
           
          </Box>


          <Box
            sx={{
              display: "flex",
              visibility: "hidden",
              flexDirection: {
                mobile: "row",
                tablet: "column",
                laptop: "column",
              },
              justifyContent: "center",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", width: "150px" }}>
              <BoxButton
                loading={loading}
                containerStyle={{ width: "150px", height: "35px" }}
                isSelected={true}
                onClick={(e) => {
                  try {
                    if (!loading) {
                      setLoading(true);
                      UpdateAvailableBalance(depositObj)
                        .then(({ bool, message }) => {
                          toast.success(message);
                          getListOfUser();
                          updatedUserProfile();
                          setLoading(false);
                          showDialogModal(true, true, message);
                        })
                        .catch(({ bool, message }) => {
                          toast.error(message);
                          setLoading(false);
                          showDialogModal(true, false, message);
                        });
                    }
                  } catch (e) {
                    console.log(e?.message);
                    setLoading(false);
                  }
                }}
                title={"Submit"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "150px",
                marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
              }}
            >
              <BoxButton
                containerStyle={{
                  width: "150px",
                  background: "#E32A2A",
                  border: "0px",
                  height: "35px",
                }}
                isSelected={true}
                onClick={(e) => {
                  setDepositObj(defaultDepositObj);
                  setElementToUDM({
                    ...elementToUDM,
                    profit_loss: prevElement.profit_loss,
                    balance: prevElement.balance,
                    available_balance: prevElement.available_balances,
                  });
                  setSelected(e);
                }}
                title={"Cancel"}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

const WithDrawComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  elementToUDM,
  setElementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
  updatedUserProfile,
  selected,
  setSelected,
  element,
  titleBackgroundColor
}) => {
  const [showPass, setShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const [initialBalance, setInitialBalance] = useState(
    currentUser?.current_balance
  );
  const activeWalletAmount = useSelector(
    (state) => state?.rootReducer?.user?.amount
  );
  const defaultWithDrawObj = {
    userId: "",
    amount: "",
    trans_type: "withdraw",
    adminTransPassword: "",
    remark: "",
  };
  const [withDrawObj, setWithDrawObj] = useState(defaultWithDrawObj);
  const calculatePercentProfitLoss = (val, e) => {
    const rateToCalculatePercentage = val.rateToCalculatePercentage;
    const inputValue = Number(
      isNaN(Number(e.target.value)) ? 0 : e.target.value
    );
    const profitLoss = prevElement.profit_loss;

    let percent_profit_loss;

    if (rateToCalculatePercentage === 0) {
      percent_profit_loss = profitLoss;
    } else {
      const newVal = profitLoss - inputValue;
      percent_profit_loss = newVal * (rateToCalculatePercentage / 100);
    }
    return percent_profit_loss.toFixed(2);
  };
  const handleChange = (e) => {
    setWithDrawObj({
      ...withDrawObj,
      amount: e.target.value < 0 ? 0 : Number(e.target.value),
      userId: userModal.id,
    });
    setElementToUDM({
      ...elementToUDM,
      percent_profit_loss: calculatePercentProfitLoss(prevElement, e),
      profit_loss:
        prevElement.profit_loss -
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      balance:
        prevElement.balance -
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
      available_balance:
        prevElement.available_balance -
        Number(isNaN(Number(e.target.value)) ? 0 : e.target.value),
    });

    if (e.target.value) {
      const newUserbalance = {
        ...currentUser,
        current_balance: currentUser?.current_balance + Number(e.target.value),
      };

      setInitialBalance(newUserbalance?.current_balance);
    } else {
      const newUserbalance = {
        ...currentUser,
        current_balance: initialBalance,
      };

      setTimeout(() => {
        setInitialBalance(currentUser?.current_balance);
      }, 51);
    }
  };
  return (
    <>
      {matchesMobile && matchesTablet ? (
        <ModalMUI
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={selected}
          onClose={setSelected}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MobileViewUserDetails
            elementToUDM={elementToUDM}
            element={element}
            userName={elementToUDM?.userName}
            title={"Withdraw Amount"}
            setSelected={setSelected}
            selected={selected}
            handleAdminPass={(e) => {
              setWithDrawObj({
                ...withDrawObj,
                adminTransPassword: e.target.value,
              });
            }}
            handleChange={handleChange}
            handleReview={(e) => {
              setWithDrawObj({ ...withDrawObj, remark: e.target.value });
            }}
            amount={withDrawObj.amount}
            profit_loss={elementToUDM?.profit_loss}
            percent_profit_loss={elementToUDM?.percent_profit_loss}
            setShowPass={setShowPass}
            showPass={showPass}
            onCancel={(e) => {
              setWithDrawObj(defaultWithDrawObj);
              setElementToUDM({
                ...elementToUDM,
                profit_loss: prevElement.profit_loss,
                balance: prevElement.balance,
                available_balance: prevElement.available_balance,
              });
              setShowUserModal(false);
            }}
            onSubmit={(e) => {
              try {
                if (!loading) {
                  setLoading(true);
                  UpdateAvailableBalance(withDrawObj)
                    .then(({ bool, message }) => {
                      toast.success(message);
                      updatedUserProfile();
                      getListOfUser();

                      setLoading(false);
                      showDialogModal(true, true, message);
                    })
                    .catch(({ bool, message }) => {
                      toast.error(message);
                      setLoading(false);
                      showDialogModal(true, false, message);
                    });
                }
              } catch (e) {
                setLoading(false);
                console.log(e.message);
              }
            }}
            initialBalance={initialBalance}
            backgroundColor={backgroundColor}
            loading={loading}
            titleBackgroundColor={titleBackgroundColor}
          />
        </ModalMUI>
      ) : (
        <Box
          sx={{
            display: "flex",
            borderRadius: "5px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            borderRadius: "5px",
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                  laptop: "row",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                  width: { mobile: "100%", laptop: "40%", tablet: "40%" },
                  fontWeight: "600",
                  marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                }}
              >
                Withdraw Amount
              </Typography>
              <Box
                sx={{
                  background: "#E32A2A",
                  width: { mobile: "100%", laptop: "60%", tablet: "60%" },
                  height: "45px",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  borderRadius: "5px",
                  paddingX: "20px",
                }}
              >
                <TextField
                  value={withDrawObj.amount}
                  onChange={handleChange}
                  variant="standard"
                  InputProps={{
                    placeholder: "Type Amount...",
                    disableUnderline: true,
                    style: {
                      fontSize: "15px",
                      height: "45px",
                      fontWeight: "600",
                      color: "white",
                    },
                  }}
                  type={"Number"}
                />
              </Box>
              {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Predicted Wallet</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{activeWalletAmount+ Number(isNaN(withDrawObj.amount)?0:withDrawObj.amount)}</Typography>
          </Box> */}
            </Box>
            <Box
              sx={{
                width: "100%",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                  laptop: "row",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                  width: { mobile: "100%", laptop: "40%", tablet: "40%" },
                  fontWeight: "600",
                  marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                }}
              >
                Wallet Balance
              </Typography>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "60%", tablet: "60%" },
                  height: "45px",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "2px solid #26262633",
                  paddingX: "20px",
                }}
              >
                <TextField
                  value={initialBalance || 0}
                  sx={{ width: "100%", height: "45px" }}
                  variant="standard"
                  InputProps={{
                    disabled: true,
                    placeholder: "",
                    disableUnderline: true,
                    type: "text",
                    style: {
                      fontSize: "13px",
                      height: "45px",
                      fontWeight: "600",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ overflow: "hidden", width: "100%" }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                justifyContent: "flex-end",
                flexDirection: {
                  mobile: "column",
                  tablet: "row",
                  laptop: "row",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                  width: { mobile: "100%", laptop: "40%", tablet: "40%" },
                  fontWeight: "600",
                  marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                }}
              >
                Transaction Password
              </Typography>
              <Box
                sx={{
                  width: { mobile: "100%", laptop: "60%", tablet: "60%" },
                  height: "45px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                  border: "2px solid #26262633",
                }}
              >
                <TextField
                  onChange={(e) => {
                    setWithDrawObj({
                      ...withDrawObj,
                      adminTransPassword: e.target.value,
                    });
                  }}
                  sx={{ width: "100%", height: "45px" }}
                  variant="standard"
                  InputProps={{
                    placeholder: "",
                    disableUnderline: true,
                    type: !showPass ? "password" : "text",
                    style: {
                      fontSize: "13px",
                      height: "45px",
                      fontWeight: "600",
                    },
                  }}
                />
                <Box
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  <StyledImage
                    src={showPass ? EyeIcon : EyeSlash}
                    sx={{ height: "14px", width: "20px" }}
                  />
                </Box>
              </Box>
              {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Profit/Loss</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{profitLoss - Number(isNaN(withDrawObj.amount)?0:withDrawObj.amount)}</Typography>
          </Box> */}
            </Box>
            <Box
              sx={{
                borderRadius: "5px",
                flex: 1,
                background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                minHeight: "80px",
                maxHeight: "115px",
                marginTop: "10px",
                paddingX: "10px",
              }}
            >
              <TextField
                onChange={(e) => {
                  setWithDrawObj({ ...withDrawObj, remark: e.target.value });
                }}
                rows={4}
                sx={{ width: "100%", minHeight: "40px" }}
                multiline={true}
                variant="standard"
                InputProps={{
                  placeholder: "Remark (Optional)",
                  disableUnderline: true,
                  style: {
                    fontSize: "13px",
                    minHeight: "45px",
                    fontWeight: "600",
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                mobile: "row",
                tablet: "column",
                laptop: "column",
              },
              justifyContent: "center",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", width: "150px" }}>
              <BoxButton
                loading={loading}
                containerStyle={{ width: "150px", height: "35px" }}
                isSelected={true}
                onClick={(e) => {
                  try {
                    if (!loading) {
                      setLoading(true);
                      UpdateAvailableBalance(withDrawObj)
                        .then(({ bool, message }) => {
                          toast.success(message);
                          updatedUserProfile();
                          getListOfUser();

                          setLoading(false);
                          showDialogModal(true, true, message);
                        })
                        .catch(({ bool, message }) => {
                          toast.error(message);
                          setLoading(false);
                          showDialogModal(true, false, message);
                        });
                    }
                  } catch (e) {
                    setLoading(false);
                    console.log(e.message);
                  }
                }}
                title={"Submit"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "150px",
                marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
              }}
            >
              <BoxButton
                containerStyle={{
                  width: "150px",
                  background: "#E32A2A",
                  border: "0px",
                  height: "35px",
                }}
                isSelected={true}
                onClick={(e) => {
                  setWithDrawObj(defaultWithDrawObj);
                  setElementToUDM({
                    ...elementToUDM,
                    profit_loss: prevElement.profit_loss,
                    balance: prevElement.balance,
                    available_balance: prevElement.available_balance,
                  });
                  setSelected(e);
                }}
                title={"Cancel"}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

const NewCreditComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  elementToUDM,
  setElementToUDM,
  prevElement,
  dispatch,
  showDialogModal,
  getListOfUser,
  setSelected,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultNewCreditObj = {
    userId: "",
    amount: null,
    trans_type: "credit_refer",
    adminTransPassword: "",
    remark: "",
  };
  const [newCreditObj, setNewCreditObj] = useState(defaultNewCreditObj);
  const calculatePercentProfitLoss = (val, e) => {
    const rateToCalculatePercentage = val.rateToCalculatePercentage;
    const inputValue = Number(
      isNaN(Number(e.target.value)) ? 0 : e.target.value
    );
    const profitLoss = prevElement.profit_loss;

    let percent_profit_loss;

    if (rateToCalculatePercentage === 0) {
      percent_profit_loss = profitLoss;
    } else {
      const newVal = profitLoss - inputValue;
      percent_profit_loss = newVal * (rateToCalculatePercentage / 100);
    }
    return percent_profit_loss.toFixed(2);
  };
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            New Credit Limit
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              value={newCreditObj.amount}
              onChange={(e) => {
                setNewCreditObj({
                  ...newCreditObj,
                  amount: e.target.value < 0 ? 0 : Number(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({
                  ...elementToUDM,
                  percent_profit_loss: calculatePercentProfitLoss(
                    prevElement,
                    e
                  ),
                  credit_refer: isNaN(Number(e.target.value))
                    ? 0
                    : Number(e.target.value),
                  profit_loss:
                    prevElement.profit_loss +
                    prevElement.credit_refer -
                    Number(
                      isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                    ),
                });
              }}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setNewCreditObj({
                  ...newCreditObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid #26262633",
            minHeight: "80px",
            maxHeight: "115px",
            paddingX: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setNewCreditObj({ ...newCreditObj, remark: e.target.value });
            }}
            rows={4}
            sx={{ width: "100%", minHeight: "40px" }}
            multiline={true}
            variant="standard"
            InputProps={{
              placeholder: "Remark (Optional)",
              disableUnderline: true,
              style: { fontSize: "13px", minHeight: "45px", fontWeight: "600" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            loading={loading}
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              try {
                if (!loading) {
                  setLoading(true);
                  UpdateAvailableBalance(newCreditObj)
                    .then(({ bool, message }) => {
                      toast.success(message);
                      getListOfUser();
                      showDialogModal(true, true, message);
                      setLoading(false);
                    })
                    .catch(({ bool, message }) => {
                      toast.error(message);
                      showDialogModal(true, false, message);
                      setLoading(false);
                    });
                }
              } catch (e) {
                setLoading(false);
                console.log(e.message);
              }
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setNewCreditObj(defaultNewCreditObj);
              setElementToUDM({
                ...elementToUDM,
                credit_refer: prevElement.credit_refer,
                profit_loss: prevElement.profit_loss,
              });
              setSelected(e);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const SetExposureComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  navigate,
  prevElement,
  elementToUDM,
  setElementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
  setSelected,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultExposureObj = {
    userId: "",
    amount: null,
    trans_type: "exposure_limit",
    adminTransPassword: "",
    remark: "",
  };
  const [exposureObj, setExposureObj] = useState(defaultExposureObj);
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            New Exposure Limit
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setExposureObj({
                  ...exposureObj,
                  amount: Number(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({
                  ...elementToUDM,
                  exposure_limit: Number(
                    isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                  ),
                });
              }}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              type={"Number"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setExposureObj({
                  ...exposureObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px",
            border: "2px solid #26262633",
            minHeight: "80px",
            maxHeight: "115px",
            paddingX: "10px",
          }}
        >
          <TextField
            onChange={(e) => {
              setExposureObj({ ...exposureObj, remark: e.target.value });
            }}
            rows={4}
            sx={{ width: "100%", minHeight: "40px" }}
            multiline={true}
            variant="standard"
            InputProps={{
              placeholder: "Remark (Optional)",
              disableUnderline: true,
              style: { fontSize: "13px", minHeight: "45px", fontWeight: "600" },
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            loading={loading}
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              try {
                if (!loading) {
                  setLoading(true);
                  UpdateAvailableBalance(exposureObj)
                    .then(({ bool, message }) => {
                      toast.success(message);
                      getListOfUser();
                      showDialogModal(true, true, message);
                      setLoading(false);
                    })
                    .catch(({ bool, message }) => {
                      toast.error(message);
                      showDialogModal(true, false, message);
                      setLoading(false);
                    });
                }
              } catch (e) {
                setLoading(false);
                console.log(e.message);
              }
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setExposureObj(defaultExposureObj);
              setSelected(e);
              setElementToUDM({
                ...elementToUDM,
                exposure_limit: elementToUDM.exposure_limit,
              });
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const ChangePasswordComponent = ({
  setShowUserModal,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  navigate,
  dispatch,
  showDialogModal,
  setSelected,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const defaultChangePasswordObj = {
    userId: "",
    password: "",
    adminTransPassword: "",
  };
  const [changePasswordObj, setChangePasswordObj] = useState(
    defaultChangePasswordObj
  );
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            New Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "#0B4F26",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setChangePasswordObj({
                  ...changePasswordObj,
                  password: e.target.value,
                  userId: userModal.id,
                });
              }}
              sx={{ width: "100%", height: "45px", color: "white" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass1 ? "password" : "text",
                style: {
                  fontSize: "13px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
            />
            <Box
              onClick={() => {
                setShowPass1(!showPass1);
              }}
            >
              <StyledImage
                src={showPass1 ? EyeIconWhite : EyeSlashWhite}
                sx={{ height: "14px", width: "20px", fill: "white" }}
              />
            </Box>
          </Box>
        </Box>
        <p style={{ color: "#fa1e1e" }}>
          {changePasswordObj.password &&
            onChangeKeyCheck(changePasswordObj.password) !== false &&
            onChangeKeyCheck(changePasswordObj.password)}
        </p>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setChangePasswordObj({
                  ...changePasswordObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdatePassword(changePasswordObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setChangePasswordObj(defaultChangePasswordObj);
              setSelected(e);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const LockUnlockComponent = ({
  setShowUserModal,
  userModal,
  showDialogModal,
  elementToUDM,
  setElementToUDM,
  prevElement,
  setSelected,
}) => {
  const [showPass, setShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const defaultLockUnlockObj = {
    userId: currentUser?.id,
    all_blocked: userModal.all_blocked,
    adminTransPassword: "",
    bet_blocked: userModal.bet_blocked,
  };
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "5px",
        paddingRight: "10px",
        flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              mobile: "center",
              tablet: "flex-end",
              laptop: "flex-end",
            },
            height: "45px",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <BoxButtonWithSwitch
              title={"User"}
              val={lockUnlockObj.all_blocked}
              setLockUnlockObj={setLockUnlockObj}
              lockUnlockObj={lockUnlockObj}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
          >
            <BoxButtonWithSwitch
              title={"Bet"}
              val={lockUnlockObj.bet_blocked}
              setLockUnlockObj={setLockUnlockObj}
              lockUnlockObj={lockUnlockObj}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            justifyContent: "flex-end",
            marginTop: "10px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
              width: { mobile: "100%", laptop: "40%", tablet: "40%" },
              fontWeight: "600",
              marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
            }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: { mobile: "100%", laptop: "60%", tablet: "60%" },
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setLockUnlockObj({
                  ...lockUnlockObj,
                  adminTransPassword: e.target.value,
                  userId: prevElement?.userId,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { mobile: "row", tablet: "column", laptop: "column" },
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateLockUnlock(lockUnlockObj)
                .then(({ bool, message }) => {
                  toast.success(message);
                  showDialogModal(true, true, message);
                })
                .catch(({ bool, message }) => {
                  toast.error(message);
                  showDialogModal(true, false, message);
                });
            }}
            title={"Submit"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "150px",
            marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
          }}
        >
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              setSelected(e);
              console.log(
                "elementToUDM.bet_blocked, elementToUDM.all_blocked",
                elementToUDM.bet_blocked,
                elementToUDM.all_blocked
              );
              setElementToUDM({
                ...elementToUDM,
                bet_blocked: prevElement.bet_blocked,
                all_blocked: prevElement.all_blocked,
              });
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const LabelAndValue = ({
  label,
  value,
  containerStyle,
  icon,
  ticon,
  labelStyle,
  valueStyle,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      display={"flex"}
      sx={[
        {
          background: "#F8C851",
          height: "45px",
          border: "2px solid #0B4F2626",
          px: "10px",
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "space-between",
        },
        containerStyle,
      ]}
    >
      <Box sx={{ flexDirection: "column" }}>
        {Boolean(label) && (
          <Typography sx={[{ fontSize: "10px", color: "#303030" }, labelStyle]}>
            {label}
          </Typography>
        )}
        <Typography sx={[{ fontWeight: "600", fontSize: "15px" }, valueStyle]}>
          {value}
          {ticon}
        </Typography>
      </Box>
      {icon}
    </Box>
  );
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 72,
  height: 30,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    marginTop: "3px",
    marginRight: "1px",
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(40px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${LockOpen})`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#409963",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "white",
    width: 26,
    height: 26,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${LockClosed})`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#FF8484",
    borderRadius: 20,
  },
}));

const UpdateAvailableBalance = async (body) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `/fair-game-wallet/updateBalance`,
        body
      );
      resolve({
        bool: data.message === "Balance update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UpdateLockUnlock = (body) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `/fair-game-wallet/lockUnclockUser`,
        body
      );
      resolve({
        bool: data.message === "User update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UserDelete = (id) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.delete(`/users/deleteUser/${id}`);
      resolve({
        bool: data.message === "User update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UpdatePassword = (body) => {
  const { axios } = setRole();
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.post(
        `/fair-game-wallet/updatePassword`,
        body
      );
      resolve({
        bool: data.message === "User update successfully." || status == 200,
        message: data.message,
      });
    } catch (e) {
      console.log(e);
      reject({ bool: false, message: e.response.data.message });
    }
  });
};
