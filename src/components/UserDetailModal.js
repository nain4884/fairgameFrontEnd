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
import { onChangeKeyCheck } from "./PassKeyCheck";
import { setRole } from "./SetRole";
import { useNavigate } from "react-router-dom";

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
  prevElement
}) {
  const isModalOpen = useSelector((state) => state.userdetail)?.isModalOpen;
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate()
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
        onClick={() => { }}
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
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              activeWalletAmount={activeWalletAmount}
              prevElement={prevElement}
              navigate={navigate}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          )}
          {selected == 1 && (
            <WithDrawComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              activeWalletAmount={activeWalletAmount}
              prevElement={prevElement}
              navigate={navigate}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          )}
          {selected == 2 && (
            <NewCreditComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              prevElement={prevElement}
              navigate={navigate}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          )}
          {selected == 5 && (
            <SetExposureComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              navigate={navigate}
              prevElement={prevElement}
              elementToUDM={elementToUDM}
              setElementToUDM={setElementToUDM}
            />
          )}
          {selected == 3 && (
            <ChangePasswordComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              navigate={navigate}
            />
          )}
          {selected == 4 && (
            <LockUnlockComponent
              backgroundColor={backgroundColor}
              setShowUserModal={setShowUserModal}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
              navigate={navigate}
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
            title={"set credit reference"}
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
              if (prevElement.credit_refer == 0 && prevElement.profit_loss == 0 && prevElement.available_balance == 0) {
                UserDelete(userModal.id).then(({ bool, message }) => {
                  setShowSuccessModal(true)
                  setShowModalMessage(message)
                  setShowUserModal(false);
                }).catch(({ bool, message }) => {
                  setShowSuccessModal(true)
                  setShowModalMessage(message)
                  setShowUserModal(false);
                })
              } else {
                setShowSuccessModal(true)
                setShowModalMessage("Empty User Balance To Delete This Account")
                setShowUserModal(false);
              }
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
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  navigate,
  elementToUDM,
  setElementToUDM
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
  const activeWalletAmount = useSelector(state => state?.rootReducer?.user?.amount)
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
              value={depositObj.amount}
              onChange={(e) => {
                setDepositObj({
                  ...depositObj,
                  amount: e.target.value < 0 ? 0 : parseInt(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({ ...elementToUDM, profit_loss: prevElement.profit_loss + parseInt(isNaN(parseInt(e.target.value)) ? 0 : e.target.value), balance: prevElement.balance + parseInt(isNaN(parseInt(e.target.value)) ? 0 : e.target.value), available_balance: prevElement.available_balance + parseInt(isNaN(parseInt(e.target.value)) ? 0 : e.target.value) })
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
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Predicted Wallet</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{activeWalletAmount- parseInt(isNaN(depositObj.amount)?0:depositObj.amount)}</Typography>
          </Box> */}
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
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Profit/Loss</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{profitLoss + parseInt(isNaN(depositObj.amount)?0:depositObj.amount)}</Typography>
          </Box> */}
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
              UpdateAvailableBalance(depositObj).then(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              }).catch(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              })
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
              console.log('prevElement.available_balances', prevElement.available_balances, elementToUDM.available_balances)
              setElementToUDM({ ...elementToUDM, profit_loss: prevElement.profit_loss, balance: prevElement.balance, available_balance: prevElement.available_balances })
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
  setShowSuccessModal,
  setShowModalMessage,
  prevElement,
  elementToUDM,
  setElementToUDM
}) => {
  const [showPass, setShowPass] = useState(false);
  const activeWalletAmount = useSelector(state => state?.rootReducer?.user?.amount)
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
              value={withDrawObj.amount}
              onChange={(e) => {
                setWithDrawObj({
                  ...withDrawObj,
                  amount: e.target.value < 0 ? 0 : parseInt(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({ ...elementToUDM, profit_loss: prevElement.profit_loss - parseInt(isNaN(parseInt(e.target.value)) ? 0 : e.target.value), balance: prevElement.balance - parseInt(isNaN(parseInt(e.target.value)) ? 0 : e.target.value), available_balance: prevElement.available_balance - parseInt(isNaN(parseInt(e.target.value)) ? 0 : e.target.value) })
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
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Predicted Wallet</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{activeWalletAmount+ parseInt(isNaN(withDrawObj.amount)?0:withDrawObj.amount)}</Typography>
          </Box> */}
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
          {/* <Box sx={{ flex: 1, minWidth:'110px', height:'50px', background: "#0B4F26", marginTop: "2px", display: "flex", marginLeft:'10px', paddingLeft: "5px", flexDirection: "column", justifyContent: "center", border: "2px solid #FFFFFF4D", borderRadius:'5px' }}>
            <Typography sx={{ color: "white", fontSize: "12px", fontWeight: '400' }}>Profit/Loss</Typography>
            <Typography sx={{ color: "#10DC61", fontWeight: '600', fontSize: '0.8rem', lineHeight: 1, wordBreak: 'break-all' }}>{profitLoss - parseInt(isNaN(withDrawObj.amount)?0:withDrawObj.amount)}</Typography>
          </Box> */}
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
              UpdateAvailableBalance(withDrawObj).then(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              }).catch(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setElementToUDM({ ...elementToUDM, profit_loss: prevElement.profit_loss, balance: prevElement.balance, available_balance: prevElement.available_balance })
                setShowUserModal(false);
              })
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
              setElementToUDM({ ...elementToUDM, profit_loss: prevElement.profit_loss, balance: prevElement.balance, available_balance: prevElement.available_balance })
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
  setShowSuccessModal,
  setShowModalMessage,
  elementToUDM,
  setElementToUDM,
  prevElement
}) => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const defaultNewCreditObj = {
    userId: "",
    amount: 0,
    trans_type: "credit_refer",
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
              value={newCreditObj.amount}
              onChange={(e) => {
                setNewCreditObj({
                  ...newCreditObj,
                  amount: e.target.value < 0 ? 0 : parseInt(e.target.value),
                  userId: userModal.id,
                });
                setElementToUDM({ ...elementToUDM, credit_refer: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value), profit_loss: prevElement.profit_loss + prevElement.credit_refer - parseInt(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) })
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
              UpdateAvailableBalance(newCreditObj).then(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              }).catch(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              })
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
              setElementToUDM({ ...elementToUDM, credit_refer: prevElement.credit_refer, profit_loss: prevElement.profit_loss })
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
  setShowSuccessModal,
  setShowModalMessage,
  navigate,
  prevElement,
  elementToUDM,
  setElementToUDM
}) => {
  const [showPass, setShowPass] = useState(false);
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
                setElementToUDM({ ...elementToUDM, exposure_limit: parseInt(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) })
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
              UpdateAvailableBalance(exposureObj).then(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              }).catch(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              })
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
              setShowUserModal(false);
              setElementToUDM({ ...elementToUDM, exposure_limit: elementToUDM.exposure_limit })
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
  navigate
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
        <p style={{ color: "#fa1e1e" }}>{changePasswordObj.password && onChangeKeyCheck(changePasswordObj.password) !== false && onChangeKeyCheck(changePasswordObj.password)}</p>
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
              UpdatePassword(changePasswordObj).then(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              }).catch(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              })
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
  setShowModalMessage,
  setShowSuccessModal,
  navigate
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
              UpdateLockUnlock(lockUnlockObj).then(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              }).catch(({ bool, message }) => {
                setShowSuccessModal(true)
                setShowModalMessage(message)
                setShowUserModal(false);
              })
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
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await adminAxios.post(`/fair-game-wallet/updateBalance`, body);
      resolve({ bool: data.message === 'Balance update successfully.' || status == 200, message: data.message })
    } catch (e) {
      console.log(e)
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UpdateLockUnlock = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await adminAxios.post(`/fair-game-wallet/lockUnclockUser`, body);
      resolve({ bool: data.message === 'User update successfully.' || status == 200, message: data.message })
    } catch (e) {
      console.log(e)
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UserDelete = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await adminAxios.delete(`/users/deleteUser/${id}`);
      resolve({ bool: data.message === 'User update successfully.' || status == 200, message: data.message })
    } catch (e) {
      console.log(e)
      reject({ bool: false, message: e.response.data.message });
    }
  });
};

const UpdatePassword = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await adminAxios.post(`/fair-game-wallet/updatePassword`, body);
      resolve({ bool: data.message === 'User update successfully.' || status == 200, message: data.message })
    } catch (e) {
      console.log(e)
      reject({ bool: false, message: e.response.data.message });
    }
  });
};