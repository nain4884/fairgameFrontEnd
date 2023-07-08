import { Box, Typography } from "@mui/material";
import { Input } from ".";
import { EyeIcon } from "../admin/assets";
import { Background, DailogModal } from ".";
import { setDailogData } from "../store/dailogModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { setRole } from "../newStore";
import { pageLimit } from "./helper/constants";
import { setUserData } from "../newStore/reducers/auth";
import { toast } from "react-toastify";

export default function DepositWallet() {
  const { axios } = setRole();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Detail, setDetail] = useState({
    1: { field: "Previous_Balance", val: "" },
    2: { field: "amount", val: 0 },
    3: { field: "Transaction_Password", val: "" },
    4: { field: "Remark", val: "" },
  });
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [userId, setUserId] = useState(currentUser?.id);
  const [balance, setBalance] = useState(currentUser?.current_balance);
  let defaultError = {
    1: { field: "Previous_Balance", val: true },
    2: { field: "amount", val: true },
    3: { field: "Transaction_Password", val: true },
    4: { field: "Remark", val: true },
  };
  const [error, setError] = useState({
    1: { field: "Previous_Balance", val: false },
    2: { field: "amount", val: false },
    3: { field: "Transaction_Password", val: false },
    4: { field: "Remark", val: false },
  });
  const [showModalMessage, setShowModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const roles = useSelector((state) => state?.auth?.allRole);
  const { currentPageNo } = useSelector((state) => state?.auth);
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };
  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");
      setUserId(data.data.id);
      setBalance(data.data.current_balance);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (showSuccessModal) {
      getUserDetail();
    }
  }, [showSuccessModal]);

  async function getListOfUser() {
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getAllUser?&page=${currentPageNo}&limit=${pageLimit}`
      );
      data?.data?.data.map((element) => {
        let roleDetail = roles.find(findThisRole);
        function findThisRole(role) {
          return role.id === element.roleId;
        }
        element.role = roleDetail?.roleName;
      });
      dispatch(setUserData(data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  }
  async function submit() {
    let trans_type;
    if (window.location.pathname.split("/")[2] === "deposit") {
      trans_type = "add";
    } else {
      trans_type = window.location.pathname.split("/")[2];
    }
    const defaultDepositObj = {
      userId,
      amount: Detail[2].val,
      trans_type,
      adminTransPassword: Detail[3].val,
      remark: Detail[4].val,
    };
    try {
      const { data } = await axios.post(
        `/fair-game-wallet/updateBalance`,
        defaultDepositObj
      );
      if (data.message === "Balance update successfully.") {
        getListOfUser();
        toast.success(data.message);
        setShowModalMessage(data.message);
        handleChangeShowModalSuccess(true);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      console.log(e);
    }
  }
  const CustomButton = ({ color, title, onClick }) => {
    return (
      <Box
        onClick={() => {
          onClick();
        }}
        sx={{
          width: "45%",
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: color,
          borderRadius: "5px",
          marginTop: "16px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "14px",
            color: "white",
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
      </Box>
    );
  };
  return (
    <>
      <Background>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            marginLeft: "0.5%",
            fontWeight: "600",
            paddingY: "0.5%",
            alignSelf: "start",
          }}
        >
          {window.location.pathname.split("/")[2] === "deposit" ? "Deposit to" : "Withdraw from"} Wallet
        </Typography>
        <Box
          sx={{
            margin: "0.5%",
            padding: "10px",
            paddingBottom: "20px",
            width: { mobile: "100%", laptop: "50%", tablet: "100%" },
            justifyContent: "center",
            display: "flex",
            gap: 1,
            flexDirection: {
              mobile: "column",
              tablet: "column",
              laptop: "column",
            },
            background: "#F8C851",
            minHeight: "200px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: { mobile: "row", tablet: "row", laptop: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  border: "2px solid #FFFFFF4D",
                  paddingLeft: "5px",
                  height: "35px",
                  background: "#262626",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "12px", fontWeight: "500" }}
                >
                  Main Balance
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  background: "#0B4F26",
                  marginTop: "2px",
                  display: "flex",
                  paddingLeft: "5px",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "2px solid #FFFFFF4D",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "12px", fontWeight: "400" }}
                >
                  Previous Balance
                </Typography>
                <Typography sx={{ color: "white", fontWeight: "600" }}>
                  {balance}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginLeft: "2px", flex: 1 }}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  paddingLeft: "5px",
                  border: "2px solid #FFFFFF4D",
                  height: "35px",
                  background: "#262626",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "12px", fontWeight: "500" }}
                >
                  New Balance
                </Typography>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  background: "#0B4F26",
                  marginTop: "2px",
                  display: "flex",
                  paddingLeft: "5px",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "2px solid #FFFFFF4D",
                }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "12px", fontWeight: "400" }}
                >
                  New Balance
                </Typography>
                <Typography sx={{ color: "#10DC61", fontWeight: "600" }}>
                  {isNaN(Detail[2].val)
                    ? balance
                    : window.location.pathname.split("/")[2] === "withdraw" &&
                      (Detail[2].val !== 0 || isNaN(Detail[2].val))
                      ? -Detail[2].val + balance
                      : Detail[2].val + balance}
                </Typography>
              </Box>{" "}
              {/**{(window.location.pathname.split("/")[2] === 'withdraw' && (Detail[2].val !== 0 || isNaN(Detail[2].val))) && '-'}{isNaN(Detail[2].val) ? 0 : Detail[2].val}  */}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: "100%",
              flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
              alignItems: "center",
              justifyContent: {
                mobile: "flex-start",
                tablet: "flex-start",
                laptop: "flex-start",
              },
            }}
          >
            <Box sx={{width: "50%"}}>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  marginTop: "10px",
                  gap: 1,
                  flexDirection: {
                    mobile: "column",
                    tablet: "row",
                    laptop: "row",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { mobile: "18px", tablet: "45px", laptop: "45px" },
                    display: "flex",
                    alignItems: "center",

                    // justifyContent: {
                    //   mobile: "flex-start",
                    //   tablet: "flex-start",
                    //   laptop: "flex-start",
                    // },
                  }}
                >
                  <Typography
                    sx={{ color: "black", fontSize: "14px", fontWeight: "600" }}
                  >
                    {(
                      window.location.pathname.split("/")[2] + " Points"
                    ).toUpperCase()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    placeholder="Type Amount..."
                    titleStyle={{ display: "none" }}
                    inputStyle={{
                      paddingTop: 0,
                      marginTop: 0,
                      color: "white",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                    inputProps={{ color: "white", padding: 0, margin: 0 }}
                    inputContainerStyle={{
                      minHeight: "45px",
                      width: "100%",
                      background: "#0B4F26",
                      border: "2px solid #FFFFFF4D",
                      borderRadius: "5px",
                      marginTop: 0,
                    }}
                    title={"Remark (Optional)"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={2}
                    type={"Number"}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  marginTop: "10px",
                  gap: 1,
                  flexDirection: {
                    mobile: "column",
                    tablet: "row",
                    laptop: "row",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: "10px",
                    gap: 1,
                    flexDirection: {
                      mobile: "column",
                      tablet: "row",
                      laptop: "row",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: { mobile: "18px", tablet: "45px", laptop: "45px" },
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: {
                      //   mobile: "flex-start",
                      //   tablet: "flex-start",
                      //   laptop: "flex-end",
                      // },
                    }}
                  >
                    <Typography
                      sx={{ color: "black", fontSize: "14px", fontWeight: "600" }}
                    >
                      Transaction Password
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    placeholder=""
                    imgstyle={{ marginRight: 0 }}
                    img={EyeIcon}
                    titleStyle={{ display: "none" }}
                    inputStyle={{
                      paddingTop: 0,
                      marginTop: 0,
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                    inputProps={{ color: "white", padding: 0, margin: 0 }}
                    inputContainerStyle={{
                      minHeight: "45px",
                      width: "100%",
                      background: "#FFFFFF",
                      border: "2px solid #26262633",
                      borderRadius: "5px",
                      marginTop: 0,
                    }}
                    title={"Admin Transaction Password"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={3}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{width: "50%"}}>
              <Input
                placeholder="Remark (Optional)"
                titleStyle={{ display: "none" }}
                inputStyle={{
                  paddingTop: "10px",
                  width: "100%",
                  fontWeight: "600",
                  color: "black",
                  maxHeight: "120px"
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  color: "black",

                  fontSize: "600",
                }}
                inputContainerStyle={{
                  minHeight: "110px",
                  width: "100%",
                  background: "#FFECBC",
                  border: "2px solid #26262633",
                  borderRadius: "5px",
                }}
                title={"Remark (Optional)"}
                setDetail={setDetail}
                Detail={Detail}
                setError={setError}
                error={error}
                place={4}
              />
            </Box>

          </Box>

          <Box sx={{ width: "100%" }}>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <CustomButton
                onClick={() => {
                  navigate(
                    `/${window.location.pathname.split("/")[1]}/list_of_clients`
                  ); //${window.location.pathname.split("/")[1]}/list_of_clients
                }}
                title={"Cancel"}
                color={"#E32A2A"}
              />
              <CustomButton
                onClick={() => {
                  submit();
                  // dispatch(setDailogData({ isModalOpen: true, showRight: true, bodyText: "Deposit Sucessfully" }))
                }}
                title={"Submit"}
                color={"#0B4F26"}
              />
            </Box>
          </Box>
        </Box>

        <DailogModal />
      </Background>
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
}
