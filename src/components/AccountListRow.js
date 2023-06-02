import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../newStore";
import { useRef } from "react";
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
  showChildModal,
}) => {
  const dispatch = useDispatch();
  const [userModal, setUserModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { axios } = setRole();
  const hasUpdatedUserProfile = useRef(false);
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
    credit_refer: element.credit_refer,
    balance: element.balance,
    profit_loss: element.profit_loss,
    exposure: element.exposure,
    available_balance: element.available_balance,
    exposure_limit: element.exposure_limit,
    userName: element.userName,
    percent_profit_loss: element.percent_profit_loss || 0,
    bet_blocked: element.bet_blocked,
    all_blocked: element.all_blocked,
    rateToCalculatePercentage: handleUpline(),
    totalCommissions: element.TotalComission,
    role: allRole?.find((role) => role?.id === element?.roleId),
    userId: element?.id,
  };

  console.log("hand", prevElement);
  const updatedUserProfile = async () => {
    try {
      const { data } = await axios.get("users/profile");
      dispatch(setCurrentUser(data.data));
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    if (showUserModal === false) {
      updatedUserProfile();
    }
  }, [showUserModal]);

  const [elementToUDM, setElementToUDM] = useState(prevElement);
  function handleSetUDM(val) {
    setElementToUDM(val);
  }
  function checkIfElementUpdated(val) {
    setElementToUDM(val);
  }
  useEffect(() => {
    checkIfElementUpdated(prevElement);
  }, [element.userName]);
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };
  // checkIfElementUpdated()
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
              width: { laptop: "11.5vw", tablet: "20.5vw", mobile: "42.5vw" },
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
              { fontSize: "12px", fontWeight: "600", cursor: "pointer" },
              fTextStyle,
            ]}
          >
            {element.userName}
          </Typography>
          {showOptions && (
            <StyledImage
              onClick={() => {
                if (!showUserModal) {
                  setUserModal(element);
                } else {
                  setUserModal();
                  handleSetUDM(prevElement);
                }
                setShowUserModal(!showUserModal);
              }}
              src={
                fContainerStyle.background == "#F8C851" ? DownGIcon : DownIcon
              }
              style={{ height: "10px", cursor: "pointer", width: "15px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { laptop: "10.5vw", tablet: "10.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.credit_refer}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.balance}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "42.5vw" },
            display: "flex",
            paddingLeft: "10px",
            background: elementToUDM.profit_loss >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
          >
            {elementToUDM.profit_loss}
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
            width: { laptop: "11.5vw", tablet: "11.5vw", mobile: "42.5vw" },
            display: "flex",
            paddingLeft: "10px",
            background: elementToUDM.profit_loss >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
          >
            {elementToUDM.percent_profit_loss}
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
          onClick={() => {
            if (elementToUDM.totalCommissions !== null) {
              setShowCommissionReport({ value: true, id: elementToUDM.userId });
            } else {
              return false;
            }
          }}
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            cursor: elementToUDM.totalCommissions !== null  && "pointer",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.totalCommissions}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.exposure}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "9.5vw", tablet: "9.5vw", mobile: "28.5vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.available_balance}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "5vw", tablet: "5vw", mobile: "24vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={elementToUDM.bet_blocked == 0 ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { laptop: "5vw", tablet: "5vw", mobile: "24vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={elementToUDM.all_blocked == 0 ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { laptop: "8vw", tablet: "8vw", mobile: "42vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {elementToUDM.exposure_limit}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { laptop: "8vw", tablet: "8vw", mobile: "42vw" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
            {element.role}
          </Typography>{" "}
          {/** {element.role} */}
        </Box>
      </Box>
      {showUserModal && (
        <UserDetailModal
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
      )}

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
