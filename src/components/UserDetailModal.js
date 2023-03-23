import { useState } from "react";
import { Box, Typography, Switch, TextField, styled } from "@mui/material";
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
import adminAxios from "../axios/adminAxios";
import axios from "../axios/axios";

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
  getListOfUser,
}) {
  const isModalOpen = useSelector((state) => state.userdetail)?.isModalOpen;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);

  return (
    <Box
      sx={{
        background: backgroundColor ?? "#F8C851",
        display: "flex",
        width: "100%",
        overflow: "hidden",
        paddingY: "15px",
        paddingTop: "5px",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        onClick={() => {}}
        sx={[
          {
            width: "11.5vw",
            display: "flex",
            height: "45px",
            paddingLeft: "10px",
            borderRight: "2px solid #0000",
          },
        ]}
      ></Box>
      {selected != null && (
        <Box sx={{ width: "88.5vw" }}>
          {selected == 0 && (
            <DepositComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
            />
          )}
          {selected == 1 && (
            <WithDrawComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
            />
          )}
          {selected == 2 && (
            <NewCreditComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
            />
          )}
          {selected == 5 && (
            <SetExposureComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
            />
          )}
          {selected == 3 && (
            <ChangePasswordComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
            />
          )}
          {selected == 4 && (
            <LockUnlockComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              getListOfUser={getListOfUser}
            />
          )}
        </Box>
      )}

      {selected == null && (
        <Box sx={{ flex: 1, display: "flex" }}>
          <BoxButton
            onClick={() => {
              setSelected(0);
            }}
            title={"Deposit"}
            isSelected={selected == 0}
            containerStyle={{ flex: 1 }}
            labelStyle={{}}
          />
          <BoxButton
            onClick={() => {
              setSelected(1);
            }}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            isSelected={selected == 1}
            title={"Withdraw"}
            labelStyle={{}}
          />
          <BoxButton
            onClick={() => {
              setSelected(3);
            }}
            title={"Change Password"}
            isSelected={selected == 3}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
          />
          <BoxButton
            onClick={() => {
              setSelected(4);
            }}
            title={"Lock/Unlock"}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            isSelected={selected == 4}
          />
          <BoxButton
            onClick={() => {
              setSelected(2);
            }}
            title={"Set Credit Limit"}
            isSelected={selected == 2}
            labelStyle={{}}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
          />
          <BoxButton
            onClick={() => {
              setSelected(5);
            }}
            containerStyle={{ marginLeft: "10px", flex: 1 }}
            title={"Set Exposure Limit"}
            labelStyle={{}}
            isSelected={selected == 5}
          />
          <BoxButton
            deleteBtn={true}
            onClick={(e) => {
              dispatch(setModalOpen(false));
              setTimeout(() => {
                dispatch(
                  setDailogData({
                    isModalOpen: true,
                    showRight: false,
                    bodyText: "First Settle Account to Delete The User",
                  })
                );
              }, 500);
            }}
            title={"Delete User"}
            icon={
              <StyledImage
                src={DeleteIcon}
                sx={{ height: "18px", width: "17px", marginLeft: "5px" }}
              />
            }
            containerStyle={{
              background: "#E32A2A",
              flex: 1,
              marginLeft: "10px",
              marginRight: "10px",
              alignSelf: "center",
            }}
          />
        </Box>
      )}
    </Box>
  );
}

const BoxButton = ({
  title,
  containerStyle,
  icon,
  onClick,
  isSelected,
  deleteBtn,
  titleStyle,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={[
        {
          background: isSelected ? "#0B4F26" : "#0B4F26",
          border:
            isSelected || deleteBtn ? "2px solid #0B4F26" : "2px solid #303030",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          height: "45px",
          alignItems: "center",
          borderRadius: "5px",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={[
          {
            fontSize: "0.9vw",
            fontWeight: "600",
            color: isSelected || deleteBtn ? "white" : "white",
          },
          titleStyle,
        ]}
      >
        {title}
        {icon}
      </Typography>
    </Box>
  );
};

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
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <Box
      onClick={onClick}
      sx={[
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
      ]}
    >
      <MaterialUISwitch
        checked={!val}
        onChange={(e) => {
          title === "User"
            ? setLockUnlockObj({
                ...lockUnlockObj,
                all_blocked: !val === true ? 1 : 0,
              })
            : setLockUnlockObj({
                ...lockUnlockObj,
                bet_blocked: !val === true ? 1 : 0,
              });
          setChecked(!checked);
        }}
      />
      <Typography
        sx={[
          {
            fontSize: "0.9vw",
            fontWeight: "600",
            textAlign: "right",
            color: "white",
            marginRight: "10px",
            minWidth: "80px",
          },
          titleStyle,
        ]}
      >
        {title} {!val ? "Unlocked" : "Locked"}
      </Typography>
    </Box>
  );
};

const DepositComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const defaultDepositObj = {
    userId: "",
    amount: 0,
    trans_type: "add",
    adminTransPassword: "",
    remark: "",
  };
  const [depositObj, setDepositObj] = useState(defaultDepositObj);
  return (
    <Box sx={{ display: "flex", borderRadius: "5px" }}>
      <Box sx={{ width: "31.65vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            Deposit Amount
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: "50%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setDepositObj({
                  ...depositObj,
                  amount: parseInt(e.target.value),
                  userId: userModal.id,
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
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              width: "50%",
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
                setDepositObj({
                  ...depositObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "Donotopen|",
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
      <Box sx={{ display: "flex", overflow: "hidden", width: "19.1vw" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            marginLeft: "20px",
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
              setDepositObj({ ...depositObj, remark: e.target.value });
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
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(depositObj);
              getListOfUser();
              dispatch(
                setDailogData({
                  isModalOpen: true,
                  showRight: true,
                  bodyText: "Deposited Successfully",
                })
              );
              setShowUserModal(false);
            }}
            title={"Submit"}
          />
        </Box>
        <Box sx={{ display: "flex", width: "150px", marginTop: "10px" }}>
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
              // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposited Successfully" }))
              setShowUserModal(false);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const WithDrawComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const defaultWithDrawObj = {
    userId: "",
    amount: 0,
    trans_type: "withdraw",
    adminTransPassword: "",
    remark: "",
  };
  const [withDrawObj, setWithDrawObj] = useState(defaultWithDrawObj);
  return (
    <Box sx={{ display: "flex", borderRadius: "5px", paddingRight: "10px" }}>
      <Box sx={{ width: "31.65vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "1vw", fontWeight: "600" }}>
            Withdraw Amount
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: "50%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setWithDrawObj({
                  ...withDrawObj,
                  amount: parseInt(e.target.value),
                  userId: userModal.id,
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
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Typography sx={{ fontSize: "1vw", fontWeight: "600" }}>
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: "50%",
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
                setWithDrawObj({
                  ...withDrawObj,
                  adminTransPassword: e.target.value,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "Donotopen|",
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
      <Box sx={{ display: "flex", overflow: "hidden", width: "19.1vw" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            marginLeft: "20px",
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
              setWithDrawObj({ ...withDrawObj, remark: e.target.value });
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
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(withDrawObj);
              getListOfUser();
              dispatch(
                setDailogData({
                  isModalOpen: true,
                  showRight: true,
                  bodyText: "Withdraw Successfully",
                })
              );
              setShowUserModal(false);
            }}
            title={"Submit"}
          />
        </Box>
        <Box sx={{ display: "flex", width: "150px", marginTop: "10px" }}>
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
              // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposited Successfully" }))
              setShowUserModal(false);
            }}
            title={"Cancel"}
          />
        </Box>
      </Box>
    </Box>
  );
};

const NewCreditComponent = ({
  setShowUserModal,
  backgroundColor,
  userModal,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const defaultNewCreditObj = {
    userId: "",
    amount: 0,
    trans_type: "credit_limit",
    adminTransPassword: "",
    remark: "",
  };
  const [newCreditObj, setNewCreditObj] = useState(defaultNewCreditObj);
  return (
    <Box sx={{ display: "flex", borderRadius: "5px", paddingRight: "10px" }}>
      <Box sx={{ width: "31.65vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            New Credit Limit
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: "50%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setNewCreditObj({
                  ...newCreditObj,
                  amount: parseInt(e.target.value),
                  userId: userModal.id,
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
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: "50%",
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
                placeholder: "Donotopen|",
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
      <Box sx={{ display: "flex", overflow: "hidden", width: "19.1vw" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            marginLeft: "20px",
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
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(newCreditObj);
              getListOfUser();
              dispatch(
                setDailogData({
                  isModalOpen: true,
                  showRight: true,
                  bodyText: "New Credit Limit Done",
                })
              );
              setShowUserModal(false);
            }}
            title={"Submit"}
          />
        </Box>
        <Box sx={{ display: "flex", width: "150px", marginTop: "10px" }}>
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
              // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposited Successfully" }))
              setShowUserModal(false);
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
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const defaultExposureObj = {
    userId: "",
    amount: 0,
    trans_type: "exposure_limit",
    adminTransPassword: "",
    remark: "",
  };
  const [exposureObj, setExposureObj] = useState(defaultExposureObj);
  return (
    <Box sx={{ display: "flex", borderRadius: "5px", paddingRight: "10px" }}>
      <Box sx={{ width: "31.65vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            New Exposure Limit
          </Typography>
          <Box
            sx={{
              background: "#004A25",
              width: "50%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "20px",
            }}
          >
            <TextField
              onChange={(e) => {
                setExposureObj({
                  ...exposureObj,
                  amount: parseInt(e.target.value),
                  userId: userModal.id,
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
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: "50%",
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
                placeholder: "Donotopen|",
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
      <Box sx={{ display: "flex", overflow: "hidden", width: "19.1vw" }}>
        <Box
          sx={{
            borderRadius: "5px",
            flex: 1,
            background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
            marginLeft: "20px",
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
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(exposureObj);
              getListOfUser();
              dispatch(
                setDailogData({
                  isModalOpen: true,
                  showRight: true,
                  bodyText: "New Exposure Limit Done",
                })
              );
              setShowUserModal(false);
            }}
            title={"Submit"}
          />
        </Box>
        <Box sx={{ display: "flex", width: "150px", marginTop: "10px" }}>
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
              // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposited Successfully" }))
              setShowUserModal(false);
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
  backgroundColor,
  userModal,
  getListOfUser,
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
  const dispatch = useDispatch();
  return (
    <Box sx={{ display: "flex", borderRadius: "5px", paddingRight: "10px" }}>
      <Box sx={{ width: "31.65vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            New Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: "50%",
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
                placeholder: "Donotopen|",
                disableUnderline: true,
                type: !showPass ? "password" : "text",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: "50%",
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
                placeholder: "Donotopen|",
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
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(changePasswordObj);
              getListOfUser();
              dispatch(
                setDailogData({
                  isModalOpen: true,
                  showRight: true,
                  bodyText: "Password Changed Successfully",
                })
              );
              setShowUserModal(false);
            }}
            title={"Submit"}
          />
        </Box>
        <Box sx={{ display: "flex", width: "150px", marginTop: "10px" }}>
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
              // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposited Successfully" }))
              setShowUserModal(false);
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
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const defaultLockUnlockObj = {
    userId: "",
    all_blocked: userModal.all_blocked,
    adminTransPassword: "",
    bet_blocked: userModal.bet_blocked,
  };
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  return (
    <Box sx={{ display: "flex", borderRadius: "5px", paddingRight: "10px" }}>
      <Box sx={{ width: "31.65vw" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
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
          }}
        >
          <Typography
            sx={{ fontSize: "1vw", fontWeight: "600", marginRight: "20px" }}
          >
            Transaction Password
          </Typography>
          <Box
            sx={{
              borderRadius: "px",
              width: "50%",
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
                  userId: userModal.id,
                });
              }}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "Donotopen|",
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
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <Box sx={{ display: "flex", width: "150px" }}>
          <BoxButton
            containerStyle={{ width: "150px", height: "35px" }}
            isSelected={true}
            onClick={(e) => {
              UpdateAvailableBalance(lockUnlockObj);
              getListOfUser();
              dispatch(
                setDailogData({
                  isModalOpen: true,
                  showRight: true,
                  bodyText: "Task Done Successfully",
                })
              );
              setShowUserModal(false);
            }}
            title={"Submit"}
          />
        </Box>
        <Box sx={{ display: "flex", width: "150px", marginTop: "10px" }}>
          <BoxButton
            containerStyle={{
              width: "150px",
              background: "#E32A2A",
              border: "0px",
              height: "35px",
            }}
            isSelected={true}
            onClick={(e) => {
              // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposited Successfully" }))
              setShowUserModal(false);
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
  try {
    const { data } = await adminAxios.post(`/fair-game-wallet/updateBalance`, body);
  } catch (e) {
    console.log(e);
  }
};
