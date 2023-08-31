import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import { setCurrentUser } from "../newStore/reducers/currentUser";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import StyledImage from "./StyledImage";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../admin/assets";
import UserDetailModal from "./UserDetailModal";
import { setSubPage, setSubUserData } from "../newStore/reducers/auth";
import AccountListModal from "./AccountListModal";
import Modal from "./Modal";
import ModalMUI from "@mui/material/Modal";
import CommissionReportTable from "./CommissionReportTable";

const AccountListRow = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  profit,
  element,
  getListOfUser,
  showOptions,
  handleExport,
  showCReport,
  showUserDetails
}) => {
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const { axios } = setRole();
  const { allRole } = useSelector((state) => state.auth);

  const [showSubUsers, setSubSusers] = useState({
    value: false,
    id: "",
    title: "",
  });

  const [showCommissionReport, setShowCommissionReport] = useState({
    value: false,
    id: "",
  });

  function handleUpline() {
    const {
      a_partnership,
      sa_partnership,
      sm_partnership,
      fa_partnership,
      fw_partnership,
      m_partnership,
    } = element;

    const partnershipMap = {
      superMaster:
        a_partnership + sa_partnership + fa_partnership + fw_partnership,
      superAdmin: fa_partnership + fw_partnership,
      master:
        sm_partnership +
        a_partnership +
        sa_partnership +
        fa_partnership +
        fw_partnership,
      admin: sa_partnership + fa_partnership + fw_partnership,
      fairGameWallet: 0,
      fairGameAdmin: fw_partnership,
      user:
        a_partnership +
        sa_partnership +
        sm_partnership +
        fa_partnership +
        fw_partnership +
        m_partnership,
    };

    const thisUplinePertnerShip = partnershipMap[element.role] || 0;

    return thisUplinePertnerShip;
  }

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
    rateToCalculatePercentage: handleUpline(),
    totalCommissions: element?.TotalComission,
    role: allRole?.find((role) => role?.id === element?.roleId),
    userId: element?.id,
    matchTypeComission: element?.matchTypeComission,
    sessionComisssion: element?.sessionComisssion,
    matchComission: element?.matchComission,
  };

  const updatedUserProfile = async () => {
    try {
      const { data } = await axios.get("users/profile");
      dispatch(setCurrentUser(data.data));
    } catch (e) {
      console.log("Error", e);
    }
  };

  const [elementToUDM, setElementToUDM] = useState(prevElement);
  useEffect(() => {
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
      rateToCalculatePercentage: handleUpline(),
      totalCommissions: element?.TotalComission,
      role: allRole?.find((role) => role?.id === element?.roleId),
      userId: element?.id,
      matchTypeComission: element?.matchTypeComission,
      sessionComisssion: element?.sessionComisssion,
      matchComission: element?.matchComission,
    };
    setElementToUDM(prevElement);
  }, [element]);
  function handleSetUDM(val) {
    setElementToUDM(val);
  }
  function checkIfElementUpdated(val) {
    setElementToUDM(val);
  }
  useEffect(() => {
    checkIfElementUpdated(prevElement);
  }, [element?.userName]);
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };

  return (
    <>
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
          containerStyle,
        ]}
      >
        <Box
          sx={[
            {
              width: { laptop: "11.5vw", tablet: "20.5vw", mobile: "26.5vw" },
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
            onClick={() => {
              if (!["user", "expert"].includes(element?.role)) {
                setSubSusers({
                  value: true,
                  id: element?.id,
                  title: element?.userName,
                });
              } else {
                return false;
              }
            }}
            sx={[
              {
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                wordBreak: "break-all",
                textTransform: "capitalize",
              },
              fTextStyle,
            ]}
          >
            {element?.userName}
          </Typography>
          {showOptions && element?.role !== "expert" && (
            <StyledImage
              onClick={() => {
                if (!showUserModal) {
                  setUserModal(element);
                } else {
                  setSelected(null);
                  setUserModal();
                  handleSetUDM(prevElement);
                }
                setShowUserModal(!showUserModal);
              }}
              src={
                fContainerStyle.background == "#F8C851" ? DownGIcon : DownIcon
              }
              style={{ cursor: "pointer", width: "16px", height: "12px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { laptop: "10.5vw", tablet: "10.5vw", mobile: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM?.credit_refer}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {Number(elementToUDM?.balance) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {Number(elementToUDM?.balance)}
              </>
            ) : (
              Number(elementToUDM?.balance)
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background:
              Number(elementToUDM?.profit_loss) >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
          >
            {Number(elementToUDM?.profit_loss) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {elementToUDM?.profit_loss}
              </>
            ) : (
              elementToUDM?.profit_loss
            )}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background:
              Number(elementToUDM?.profit_loss) >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
          >
            {Number(elementToUDM?.percent_profit_loss) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {elementToUDM?.percent_profit_loss}
              </>
            ) : (
              elementToUDM?.percent_profit_loss
            )}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
            display: "flex",
            justifyContent: "space-between",
            paddingX: "10px",
            alignItems: "center",

            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM?.totalCommissions}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM?.exposure}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {Number(elementToUDM?.available_balance) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {Number(elementToUDM?.available_balance)}
              </>
            ) : (
              Number(elementToUDM?.available_balance)
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
          }}
        >
          <StyledImage
            src={elementToUDM?.bet_blocked == 0 ? UnLockIcon : LockIcon}
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
            src={elementToUDM?.all_blocked == 0 ? UnLockIcon : LockIcon}
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
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM?.exposure_limit}
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
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.role}
          </Typography>{" "}
        </Box>
      </Box>

      {showUserModal && element?.role !== "expert" && (
        
          <Box
            sx={[
              {
                width: "100%",
                display: "flex",
                height: "100%",
                background: "#0B4F26",
                alignItems: "center",
                overflow: "hidden",
                flexDirection: { mobile: "column", laptop: "row" },
              },
              containerStyle,
            ]}
          >
            <Box
              sx={[
                {
                  width: {
                    laptop: "11vw",
                    tablet: "25vw",
                    mobile: "96vw",
                  },
                  alignSelf: "stretch",
                  justifyContent: "space-between",
                  borderRight: "2px solid white",
                },
                fContainerStyle,
              ]}
            >
              <Box
                sx={{
                  width: "100% ",
                  height: "100%",
                  padding: "10px",
                  display: { laptop: "block", mobile: "flex" },
                  justifyContent: "space-between",
                  alignItems: selected === null && "center",
                  overflow: "hidden",
                  borderBottom: "2px solid white",
                }}
              >
                <Box sx={{ width: { laptop: "100%", mobile: "50%" } }}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: {
                        laptop: "flex-start",
                        mobile: "flex-start",
                      },
                    }}
                  >
                    {elementToUDM?.matchTypeComission ? (
                      <>
                        <Typography
                          sx={[
                            {
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "white",
                              textAlign: { laptop: "left", mobile: "left" },
                              width: { laptop: "100px", mobile: "100px" },
                            },
                            fTextStyle,
                          ]}
                        >
                          {elementToUDM?.matchTypeComission} Com
                        </Typography>
                        <Typography
                          sx={[
                            {
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "white",
                              textAlign: "center",
                              marginRight: "1px",
                            },
                            fTextStyle,
                          ]}
                        >
                          {":"}{" "}
                          {elementToUDM?.matchComission
                            ? elementToUDM?.matchComission
                            : 0}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          sx={[
                            {
                              fontSize: "12px",

                              fontWeight: "600",
                              color: "white",
                              textAlign: { laptop: "left", mobile: "left" },
                              width: { laptop: "100px", mobile: "100px" },
                            },
                            fTextStyle,
                          ]}
                        >
                          Match Com
                        </Typography>
                        <Typography
                          sx={[
                            {
                              fontSize: "12px",

                              fontWeight: "600",
                              color: "white",
                              textAlign: "left",
                            },
                            fTextStyle,
                          ]}
                        >
                          : 0
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={[
                          {
                            fontSize: "12px",

                            fontWeight: "600",
                            color: "white",
                            textAlign: { laptop: "left", mobile: "left" },
                            width: { laptop: "100px", mobile: "100px" },
                          },
                          fTextStyle,
                        ]}
                      >
                        Session Com
                      </Typography>
                      <Typography
                        sx={[
                          {
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "white",
                            textAlign: "center",
                            marginRight: "1px",
                          },
                          fTextStyle,
                        ]}
                      >
                        {": "}
                      </Typography>
                    </Box>
                    <Typography
                      sx={[
                        {
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "white",
                          textAlign: "left",
                          marginLeft: "3px",
                        },
                        fTextStyle,
                      ]}
                    >
                      {elementToUDM?.sessionComisssion
                        ? elementToUDM?.sessionComisssion
                        : 0}
                    </Typography>
                  </Box>
                </Box>
                {showCReport && (
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: { laptop: "10px", mobile: "0" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      marginRight: { laptop: "0", mobile: "5px" },
                      width: { desktop: "100%", mobile: "33%" },
                    }}
                    onClick={() => {
                      if (elementToUDM?.totalCommissions !== null) {
                        setShowCommissionReport({
                          value: true,
                          id: elementToUDM?.userId,
                        });
                      } else {
                        return false;
                      }
                    }}
                  >
                    <Typography
                      sx={[
                        {
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "white",
                          textAlign: "center",
                          alignItems: "center",
                          marginRight: { desktop: "0", mobile: "3px" },
                        },
                        fTextStyle,
                      ]}
                    >
                      Commission Details
                    </Typography>
                    <StyledImage
                      src={
                        fContainerStyle.background == "#F8C851"
                          ? DownGIcon
                          : DownIcon
                      }
                      sx={{
                        height: { laptop: "10px", mobile: "14px" },
                        cursor: "pointer",
                        width: { laptop: "15px", mobile: "23px" },
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>

         
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  visibility: !showUserDetails &&  "hidden",
                  // paddingX: "10px",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <UserDetailModal
                  selected={selected}
                  element={element}
                  setSelected={setSelected}
                  updatedUserProfile={updatedUserProfile}
                  getListOfUser={getListOfUser}
                  setShowUserModal={setShowUserModal}
                  backgroundColor={containerStyle?.background}
                  userModal={userModal}
                  setShowSuccessModal={handleChangeShowModalSuccess}
                  setShowModalMessage={setShowModalMessage}
                  elementToUDM={elementToUDM}
                  setElementToUDM={handleSetUDM}
                  prevElement={prevElement}
                />
              </Box>
          
          </Box>
      
      )}

      {/* {showUserModal && element?.role !== "user" && (
        <Box
          sx={[
            {
              width: "100%",
              display: "flex",
              height: "100%",
              background: "#0B4F26",
              alignItems: "center",
              overflow: "hidden",
              flexDirection: { mobile: "column", laptop: "row" },
            },
            containerStyle,
          ]}
        >
          <Box
            sx={[
              {
                width: {
                  laptop: "11vw",
                  tablet: "25vw",
                  mobile: "96vw",
                },
                visibility: "hidden",
                // display: "flex",
                alignSelf: "stretch",
                // height: "auto",
                justifyContent: "space-between",
                // alignItems: "center" ,
                borderRight: "2px solid white",
              },
              // fContainerStyle,
            ]}
          ></Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              // paddingX: "10px",
              alignItems: "center",
              height: "100%",
            }}
          >
            <UserDetailModal
              selected={selected}
              setSelected={setSelected}
              element={element}
              updatedUserProfile={updatedUserProfile}
              getListOfUser={getListOfUser}
              setShowUserModal={setShowUserModal}
              backgroundColor={containerStyle?.background}
              userModal={userModal}
              setShowSuccessModal={handleChangeShowModalSuccess}
              setShowModalMessage={setShowModalMessage}
              elementToUDM={elementToUDM}
              setElementToUDM={handleSetUDM}
              prevElement={prevElement}
            />
          </Box>
        </Box>
      )} */}

      <ModalMUI
        open={showSubUsers?.value}
        onClose={() => {
          setSubSusers({ value: false, id: "", title: "" });
          dispatch(setSubUserData([]));
          dispatch(setSubPage(1));
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AccountListModal
            id={showSubUsers?.id}
            show={showSubUsers?.value}
            setShow={setSubSusers}
            title={showSubUsers?.title}
            handleExport={handleExport}
          />
        </Box>
      </ModalMUI>

      <ModalMUI
        open={showCommissionReport?.value}
        onClose={() => {
          setShowCommissionReport({ value: false, id: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CommissionReportTable
            title={element?.userName}
            id={showCommissionReport?.id}
            show={showCommissionReport?.value}
            setShow={setShowCommissionReport}
          />
        </Box>
      </ModalMUI>
      {showSuccessModal && (
        <Modal
          message={showModalMessage}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"list_of_clients"}
        />
      )}
    </>
  );
};

export default AccountListRow;
