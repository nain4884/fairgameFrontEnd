import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import MobileViewUserDetails from "../../MobileViewUserDetails";
import BoxButton from "../../BoxButton";
import { toast } from "react-toastify";
import { setRole } from "../../../newStore";
import { EyeIcon, EyeSlash } from "../../../admin/assets";
import StyledImage from "../../StyledImage";

const DepositComponent = ({
  handleKeyDown,
  setShowUserModal,
  backgroundColor,
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
  titleBackgroundColor,
}) => {
  const [showPass, setShowPass] = useState(false);
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [userId, setUserId] = useState(currentUser?.id);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const [initialBalance, setInitialBalance] = useState(
    currentUser?.current_balance
  );
  const defaultDepositObj = {
    userId: userId,
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
    try {
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
    } catch (e) {
      console.log(e);
    }
  };

  const UpdateAvailableBalance = async (body) => {
    try {
      const { axios } = setRole();
      return new Promise(async (resolve, reject) => {
        try {
          const { data, status } = await axios.post(
            `/fair-game-wallet/updateBalance`,
            body
          );
          resolve({
            bool:
              data.message === "Balance update successfully." || status == 200,
            message: data.message,
          });
        } catch (e) {
          console.log(e);
          reject({ bool: false, message: e.response.data.message });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    try {
      setDepositObj({
        ...depositObj,
        amount: e.target.value < 0 ? 0 : e.target.value,
      });

      setElementToUDM({
        ...elementToUDM,
        percent_profit_loss: calculatePercentProfitLoss(prevElement, e),
        profit_loss:
          Number(prevElement?.profit_loss) +
          Number(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)),
        // balance:
        //   Number(prevElement.balance) +
        //   Number(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)),
        available_balance:
          Number(prevElement.available_balance) +
          Number(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)),
      });
      if (e.target.value) {
        const newUserbalance = {
          ...currentUser,
          current_balance: currentUser?.current_balance + +e.target.value,
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
    } catch (e) {
      console.log(e);
    }
  };

  const handleDepositeSubmit = (e) => {
    e.preventDefault();
    try {
      let payload = depositObj;
      payload.amount = parseFloat(payload.amount);
      if (!loading) {
        setLoading(true);
        UpdateAvailableBalance(depositObj)
          .then(({ bool, message }) => {
            toast.success(message);
            // getListOfUser();
            // updatedUserProfile();
            setLoading(false);
            showDialogModal(true, true, message);
            setDepositObj(defaultDepositObj);
            setSelected(e);
          })
          .catch(({ bool, message }) => {
            toast.error(message);
            // setSelected(e);
            setLoading(false);
            // showDialogModal(true, false, message);

            setElementToUDM({
              ...elementToUDM,
              profit_loss: prevElement?.profit_loss,
              balance: prevElement.balance,

              percent_profit_loss: prevElement?.percent_profit_loss,
              available_balance: prevElement?.available_balances,
            });
          });
      }
    } catch (e) {
      console.log(e?.message);
      // setSelected(e);
      setElementToUDM({
        ...elementToUDM,
        profit_loss: prevElement?.profit_loss,
        balance: prevElement.balance,
        percent_profit_loss: prevElement.percent_profit_loss,
        available_balance: prevElement.available_balances,
      });
      setLoading(false);
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
          <form onSubmit={handleDepositeSubmit}>
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
                  profit_loss: prevElement?.profit_loss,
                  balance: prevElement?.balance,
                  available_balance: prevElement?.available_balance,
                  percent_profit_loss: prevElement?.percent_profit_loss,
                });
                setShowUserModal(false);
                setSelected(e);
              }}
              // onSubmit={handle}
              initialBalance={initialBalance}
              backgroundColor={backgroundColor}
              loading={loading}
              titleBackgroundColor={titleBackgroundColor}
            />
          </form>
        </ModalMUI>
      ) : (
        <form onSubmit={handleDepositeSubmit}>
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
                      fontSize: {
                        mobile: "3vw",
                        laptop: "16px",
                        tablet: "16px",
                      },
                      width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                      fontWeight: "600",
                      marginRight: {
                        mobile: 0,
                        laptop: "20px",
                        tablet: "20px",
                      },
                    }}
                  >
                    Deposit Amount
                  </Typography>
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
                    required={true}
                    onKeyDown={handleKeyDown}
                    value={depositObj.amount}
                    onChange={handleChange}
                    variant="standard"
                    InputProps={{
                      placeholder: "Type Amount...",
                      disableUnderline: true,
                      autoComplete: "new-password",
                      autoFocus: true,
                      inputProps: { min: "0", step: "0.01" },
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
                    fontSize: { mobile: "3vw", laptop: "16px", tablet: "16px" },
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
                  marginTop: "10px",
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
                      fontSize: {
                        mobile: "3vw",
                        laptop: "16px",
                        tablet: "16px",
                      },
                      width: { mobile: "100%", laptop: "100%", tablet: "100%" },
                      fontWeight: "600",
                      marginRight: {
                        mobile: 0,
                        laptop: "20px",
                        tablet: "20px",
                      },
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
                    required={true}
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
                      autoComplete: "new-password",
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
              {/* Remark */}

              <Box
                sx={{
                  borderRadius: "5px",
                  flex: 1,
                  background:
                    backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
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

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  marginTop: "21px",
                  gap: 1,
                  flexDirection: "row-reverse",
                  justifyContent: "flex-end",
                }}
              >
                <BoxButton
                  color={"#0B4F26"}
                  loading={loading}
                  containerStyle={{
                    height: "44px",
                    maxWidth: "150px !important",
                  }}
                  isSelected={true}
                  type="submit"
                  title={"Submit"}
                />
                <BoxButton
                  color={"#E32A2A"}
                  containerStyle={{
                    background: "#E32A2A",
                    border: "0px",
                    height: "44px",
                    maxWidth: "150px !important",
                  }}
                  isSelected={true}
                  onClick={(e) => {
                    setDepositObj(defaultDepositObj);
                    setElementToUDM({
                      ...elementToUDM,
                      profit_loss: prevElement?.profit_loss,
                      balance: prevElement?.balance,
                      percent_profit_loss: prevElement?.percent_profit_loss,
                      available_balance: prevElement?.available_balances,
                    });
                    setSelected(e);
                  }}
                  title={"Cancel"}
                />
              </Box>
            </Box>

            {/* V hidden */}
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
                  color={"#0B4F26"}
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
                            setSelected(e);
                            updatedUserProfile();
                            setLoading(false);
                            showDialogModal(true, true, message);
                          })
                          .catch(({ bool, message }) => {
                            setElementToUDM({
                              ...elementToUDM,
                              profit_loss: prevElement.profit_loss,
                              balance: prevElement.balance,
                              available_balance: prevElement.available_balances,
                            });
                            setSelected(e);
                            toast.error(message);
                            setLoading(false);
                            // showDialogModal(true, false, message);
                          });
                      }
                    } catch (e) {
                      console.log(e?.message);
                      setElementToUDM({
                        ...elementToUDM,
                        profit_loss: prevElement.profit_loss,
                        balance: prevElement.balance,
                        available_balance: prevElement.available_balances,
                      });
                      setSelected(e);
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
                  color={"#E32A2A"}
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
                      profit_loss: prevElement?.profit_loss,
                      balance: prevElement?.balance,
                      available_balance: prevElement?.available_balances,
                    });
                    setSelected(e);
                  }}
                  title={"Cancel"}
                />
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </>
  );
};

export default DepositComponent;
