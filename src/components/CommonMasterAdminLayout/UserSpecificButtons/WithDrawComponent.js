import {
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRole } from "../../../newStore";
import MobileViewUserDetails from "../../MobileViewUserDetails";
import StyledImage from "../../StyledImage";
import BoxButton from "../../BoxButton";
import { EyeIcon, EyeSlash } from "../../../admin/assets";
import ModalMUI from "@mui/material/Modal";

const WithDrawComponent = ({
  handleKeyDown,
  setShowUserModal,
  backgroundColor,
  userModal,
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  elementToUDM,
  dispatch,
  showDialogModal,
  getListOfUser,
  updatedUserProfile,
  selected,
  setSelected,
  titleBackgroundColor,
  setWalletAccountDetail,
}) => {
  const [showPass, setShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const matchesTablet = useMediaQuery(theme.breakpoints.down("tablet"));
  const [initialBalance, setInitialBalance] = useState(
    currentUser?.current_balance
  );
  const defaultWithDrawObj = {
    userId: userId,
    amount: "",
    trans_type: "withdraw",
    adminTransPassword: "",
    remark: "",
  };
  const [withDrawObj, setWithDrawObj] = useState(defaultWithDrawObj);
  const handleChange = (e) => {
    setWithDrawObj({
      ...withDrawObj,
      // amount: e.target.value < 0 ? 0 : Number(e.target.value),
      amount: e.target.value < 0 ? 0 : e.target.value,
      userId: userModal.id,
    });

    if (e.target.value) {
      const newUserbalance = {
        ...currentUser,
        current_balance: currentUser?.current_balance - Number(e.target.value),
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

  const UpdateAvailableBalance = async (body) => {
    let newBody = { ...body, userId: userId };
    const { axios } = setRole();
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await axios.post(
          `/fair-game-wallet/updateBalance`,
          newBody
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
  };

  const handleWithdrawAmount = (e) => {
    e.preventDefault();
    try {
      if (!loading) {
        setLoading(true);
        setWalletAccountDetail((prev) => {
          return {
            ...prev,
            balance: +prev?.balance - +withDrawObj?.amount,
            available_balance: +prev?.available_balance - +withDrawObj?.amount,
          };
        });
        UpdateAvailableBalance(withDrawObj)
          .then(({ bool, message }) => {
            toast.success(message);
            setSelected(e);
            setLoading(false);
            showDialogModal(true, true, message);
          })
          .catch(({ bool, message }) => {
            toast.error(message);
            setLoading(false);
          });
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser?.id);
    }
  }, [currentUser]);

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
          <form onSubmit={handleWithdrawAmount}>
            <MobileViewUserDetails
              elementToUDM={elementToUDM}
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
              setShowPass={setShowPass}
              showPass={showPass}
              onCancel={(e) => {
                setWithDrawObj(defaultWithDrawObj);
                setSelected(e);
                setShowUserModal(false);
              }}
              // onSubmit={}
              initialBalance={initialBalance}
              backgroundColor={backgroundColor}
              loading={loading}
              titleBackgroundColor={titleBackgroundColor}
            />
          </form>
        </ModalMUI>
      ) : (
        <form onSubmit={handleWithdrawAmount}>
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
                    Withdraw Amount
                  </Typography>
                </Box>

                <Box
                  sx={{
                    background: "#E32A2A",
                    width: { mobile: "100%", laptop: "43%", tablet: "43%" },
                    height: "45px",
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    borderRadius: "5px",
                    paddingX: "20px",
                  }}
                >
                  <TextField
                    required={true}
                    onKeyDown={handleKeyDown}
                    value={withDrawObj.amount}
                    onChange={handleChange}
                    variant="standard"
                    InputProps={{
                      placeholder: "Type Amount...",
                      disableUnderline: true,
                      autoFocus: true,
                      autoComplete: "new-password",
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

              {/* wallet */}
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
                    // background: "#FFECBC",
                    background: "#ECECEC",
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
                    backgroundColor == "#ECECEC" ? "#ECECEC" : "#FFECBC",
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
                    maxWidth: "150px !important",
                    height: "44px",
                  }}
                  isSelected={true}
                  type="submit"
                  title={"Submit"}
                />
                <BoxButton
                  color={"#E32A2A"}
                  containerStyle={{
                    maxWidth: "150px !important",
                    background: "#E32A2A",
                    border: "0px",
                    height: "44px",
                  }}
                  isSelected={true}
                  onClick={(e) => {
                    setWithDrawObj(defaultWithDrawObj);
                    setSelected(e);
                  }}
                  title={"Cancel"}
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
                visibility: "hidden",
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
                        UpdateAvailableBalance(withDrawObj)
                          .then(({ bool, message }) => {
                            toast.success(message);
                            updatedUserProfile();
                            getListOfUser();
                            setSelected(e);
                            setLoading(false);
                            showDialogModal(true, true, message);
                          })
                          .catch(({ bool, message }) => {
                            toast.error(message);
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
                  color={"#E32A2A"}
                  containerStyle={{
                    width: "150px",
                    background: "#E32A2A",
                    border: "0px",
                    height: "35px",
                  }}
                  isSelected={true}
                  onClick={(e) => {
                    setWithDrawObj(defaultWithDrawObj);
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

export default WithDrawComponent;
