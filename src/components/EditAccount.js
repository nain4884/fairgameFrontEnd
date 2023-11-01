import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Input from "./Input";
import { EyeIcon, EyeSlash } from "../admin/assets";
import DropDownSimple from "./DropdownSimple";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { setRole } from "../newStore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputMyPartnership from "./InputMypartnership";

const containerStyles = {
  marginTop: { mobile: "2px", laptop: "10px" },
};
const selectValueStyle = {
  fontSize: { mobile: "2px", laptop: "10px" },
};
const titleStyles = {
  color: "#202020",
  fontSize: { mobile: "10px", laptop: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const imputStyle = {
  fontSize: { mobile: "10px", laptop: "14px", fontWeight: "600" },
};
const inputContainerStyle = {
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

var matchComissionArray = [];

const EditAccount = () => {
  const formRef = useRef(null);
  const { axios, roleName } = setRole();
  const navigate = useNavigate();
  const { userWallet, allRole } = useSelector((state) => state.auth);
  const [errorShow, setErrorShow] = useState("");
  const [successShow, setSuccessShow] = useState("");
  const { state } = useLocation();
  const [myPartnershipsError] = useState(false);
  const [Detail, setDetail] = useState({
    1: { field: "userName", val: "" },
    2: { field: "password", val: "" },
    3: { field: "confirmPassword", val: "" },
    4: { field: "fullName", val: "" },
    5: { field: "city", val: "" },
    6: { field: "phoneNumber", val: 0 },
    7: { field: "accountType", val: "" },
    8: { field: "creditReference", val: 0 },
    9: { field: "roleId", val: "" },
    10: { field: "uplinePertnerShip", val: 0 },
    11: { field: "myPertnerShip", val: "" },
    12: { field: "downLinePertnerShip", val: 0 },
    13: { field: "remark", val: "" },
    14: { field: "adminTransPassword", val: "" },
    15: { field: "myPartnership", val: 0 },
    16: { field: "sessionComisssion", val: "" },
    17: { field: "matchTypeComission", val: "" },
    18: { field: "matchComission", val: "" },
  });
  const [error, setError] = useState({
    1: { field: "userName", val: false },
    2: { field: "password", val: false },
    3: { field: "confirmPassword", val: false },
    4: { field: "fullName", val: false },
    5: { field: "city", val: false },
    6: { field: "phoneNumber", val: false },
    7: { field: "accountType", val: false },
    8: { field: "creditReference", val: false },
    9: { field: "roleId", val: false },
    10: { field: "uplinePertnerShip", val: false },
    11: { field: "myPertnerShip", val: "" },
    12: { field: "downLinePertnerShip", val: false },
    13: { field: "remark", val: false },
    14: { field: "adminTransPassword", val: "error" },
    15: { field: "myPartnership", val: false },
    16: { field: "sessionComisssion", val: false },
    17: { field: "matchTypeComission", val: false },
    18: { field: "matchComission", val: false },
  });
  const [userAlreadyExist, setUserAlredyExist] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [downLinePar, setDownlinePar] = useState(0);
  const [isDisable, setIsDisable] = useState(false);

  const [typeToShow, setTypeToShow] = useState([
    "Select account type",
    "Fairgame Admin",
    "Super Admin",
    "Admin",
    "Super Master",
    "Master",
    "User",
  ]);

  const matchComissionTypes = ["0.00", "Total Loss", "Entry Wise"];

  console.log("Setting", error);
  const [profile, setProfile] = useState(currentUser);
  const types = [
    { role: "fairGameAdmin", val: "Fairgame Admin", level: 1 },
    { role: "superAdmin", val: "Super Admin", level: 2 },
    { role: "admin", val: "Admin", level: 3 },
    { role: "superMaster", val: "Super Master", level: 4 },
    { role: "master", val: "Master", level: 5 },
    { role: "user", val: "User", level: 7 },
  ];

  const [showMatchCommision, setShowMatchCommision] = useState(false);

  useEffect(() => {
    if (Detail[17].val === "BetLoss") {
      let local = [];
      for (let i = 0; i <= 1.5; i += 0.25) {
        local.push(i?.toFixed(2));
      }
      matchComissionArray = local;
    } else {
      let local = [];
      for (let i = 0; i <= 2; i += 0.25) {
        local.push(i?.toFixed(2));
      }
      matchComissionArray = local;
    }
    if (Detail[17].val !== null && Detail[17].val !== "0.00") {
      setShowMatchCommision(false);
      setTimeout(() => {
        setShowMatchCommision(true);
      }, 100); // 3 seconds
    } else {
      setShowMatchCommision(false);
    }
  }, [Detail[17].val]);
  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };
  const [mypar, setMypar] = useState("");
  const [uplineP, setUplineP] = useState(0);
  const setTypeForAccountType = () => {
    const typo =
      roleName === "fairGameWallet"
        ? types
        : types?.filter((type) => {
            const roleLevel = types?.find((t) => t?.role === roleName)?.level;
            return roleLevel && type?.level > roleLevel;
          });

    if (roleName === "fairGameAdmin") {
      typo.push({ role: "expert", val: "Expert", level: 6 });
    }

    setTypeToShow(typo?.map((v) => v.role));
  };

  const editAccount = async () => {
    try {
      let payload = {
        id: state?.id,
        adminTransPassword: Detail[14].val,
        sessionComisssion:
          Detail[16].val === "" || Detail[16].val === 0
            ? null
            : parseFloat(Detail[16].val),
        matchTypeComission: Detail[17].val === "0.00" ? null : Detail[17].val,
        matchComission: Detail[18].val === "0.00" ? null : Detail[18].val,
      };
      let response;
      response = await axios.post(`/fair-game-wallet/adduser`, payload);
      if (response.status == 200) {
        setSuccessShow(response.data.message);
        handleChangeShowModalSuccess(true);
        setIsDisable(true);
      }
    } catch (e) {
      console.log(e);
      setSuccessShow("");
      toast.error(e?.response?.data?.message);
      setErrorShow(e?.response?.data?.message);
    }
  };

  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");
      setProfile(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  const sessionComissionArray = [];
  for (let i = 0; i <= 3.5; i += 0.25) {
    sessionComissionArray.push(i?.toFixed(2));
  }
  function handleUpline() {
    const {
      a_partnership,
      sa_partnership,
      sm_partnership,
      fa_partnership,
      fw_partnership,
    } = profile;

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
    };

    const thisUplinePertnerShip = partnershipMap[roleName] || 0;

    return thisUplinePertnerShip;
  }
  useEffect(() => {
    if (profile && roleName) {
      const res = handleUpline(roleName);
      setUplineP(res);
      setDetail({
        ...Detail,
        10: {
          ...Detail[10],
          val: res,
        },
        12: {
          ...Detail[12],
          val: 100 - res,
        },
      });
      setDownlinePar(100 - res);
      setError({
        ...error,
        10: {
          ...error[10],
          val: false,
        },
      });
    }
  }, [profile, roleName]);

  useEffect(() => {
    if (currentUser === null) {
      getUserDetail();
    }
  }, []);
  useEffect(() => {
    setTypeForAccountType();
  }, [userWallet?.role?.roleName, Detail, error, showSuccessModal]);

  async function checkUserName({ val2 }) {
    if (/^\d+$/.test(val2)) {
      setDetail({
        ...Detail,
        1: {
          ...Detail[1],
          val: null,
        },
      });
      setError({
        ...error,
        1: {
          ...error[1],
          val: "only digits not allowed",
        },
      });

      return false;
    }

    try {
      let body = {
        userName: val2,
      };
      const { data } = await axios.post(
        `fair-game-wallet/checkUserExist`,
        body
      );
      if (data.data.exist) {
        setError({
          ...error,
          1: {
            ...error[1],
            val: true,
          },
        });
        setUserAlredyExist("User Already Exist With This Name");
      } else {
        setError({
          ...error,
          1: {
            ...error[1],
            val: false,
          },
        });
        setUserAlredyExist("");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleTransPass({ place, val, setError, error }) {
    if (isNaN(val) || val === "") {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "error",
        },
      });
    } else {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "",
        },
      });
    }
  }
  function CheckThisPosition({ place, val, val2, setError, error }) {
    const total = parseInt(val2) + Detail[10].val;
    if (isNaN(Detail[11].val) || Detail[11].val < 0) {
      return false;
    }
    const regex1 = /^[0-9]+$/; // Only allows whole numbers (no decimal)
    if (!regex1.test(val2) && place === 11) {
      setError({
        ...error,
        [place]: {
          ...Detail[place],
          val: "Only allows whole numbers (no decimal)",
        },
      });
      return false;
    }
    if (total <= 100) {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: "",
        },
      });
    }
    if (total > 101) {
      setError({
        ...error,
        [place]: {
          ...error[place],
          val: " sum of upline , downline and  my partnership should be not exceeding 100.",
        },
      });
    }
  }

  const getUserDetailEdit = async (id) => {
    try {
      const { data } = await axios.get(`users/profile/${id}`);
      if (data?.data?.matchTypeComission !== null) {
        setShowMatchCommision(true);
      } else {
        setShowMatchCommision(false);
      }
      const role = allRole.find((v) => v?.id === data?.data?.roleId);
      setDetail({
        ...Detail,
        1: {
          ...Detail[1],
          val: data?.data?.userName,
        },
        4: {
          ...Detail[4],
          val: data?.data?.fullName,
        },
        5: {
          ...Detail[5],
          val: data?.data?.city,
        },
        6: {
          ...Detail[6],
          val: parseInt(data?.data?.phoneNumber),
        },
        8: {
          ...Detail[8],
          val: data?.data?.credit_refer,
        },
        9: {
          ...Detail[9],
          val: role?.roleName,
        },
        10: {
          ...Detail[10],
          val: data?.data?.fw_partnership,
        },
        11: {
          ...Detail[11],
          val: data?.data?.fa_partnership,
        },
        12: {
          ...Detail[12],
          val: data?.data?.sa_partnership,
        },
        13: {
          ...Detail[13],
          val: data?.data?.remark,
        },
        15: {
          ...Detail[15],
          val: data?.data?.m_partnership,
        },
        16: {
          ...Detail[16],
          val: data?.data?.sessionComisssion,
        },
        17: {
          ...Detail[17],
          val:
            data?.data?.matchTypeComission === "Total Loss"
              ? "totalLoss"
              : data?.data?.matchTypeComission === "Entry Wise"
              ? "BetLoss"
              : data?.data?.matchTypeComission,
        },
        18: {
          ...Detail[18],
          val: data?.data?.matchComission,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.id) {
        getUserDetailEdit(state?.id);
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  return (
    <>
      <Box sx={{ margin: "1%" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: "4px",
          }}
        >
          Edit Account
        </Typography>
        <form
          ref={formRef}
          style={{ marginTop: "1%" }}
          onSubmit={(e) => {
            e?.preventDefault();
            editAccount();
          }}
        >
          <Box
            sx={{
              background: "#F8C851",
              minHeight: "60vh",
              borderRadius: "5px",
              padding: "16px",
              paddingTop: "3px",
              marginTop: "2px",
              display: "flex",
              flexDirection: { mobile: "column", laptop: "row", tablet: "row" },
              width: "100%",
              gap: { mobile: 0, laptop: 5, tablet: 4 },
              // flexWrap:"wrap",
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "auto auto",
                  gridColumnGap: "10px",
                }}
              >
                <div style={{ order: 1 }}>
                  <Input
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    placeholder={"Username (Required)"}
                    title={"Username*"}
                    setDetail={setDetail}
                    onKeyDown={(event) => {
                      if (event.code === "Space") {
                        event.preventDefault();
                      } else {
                        const regex = /^[a-zA-Z0-9]*$/;

                        if (!regex.test(event.key)) {
                          event.preventDefault();
                        }
                      }
                    }}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={1}
                    required={true}
                    value={Detail[1]?.val}
                    onFocusOut={checkUserName}
                    toFoucs={true}
                    disabled={true}
                  />
                  {error[1].val && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      {userAlreadyExist
                        ? userAlreadyExist
                        : error[1].val || "Field Required"}
                    </p>
                  )}
                </div>
                <div style={{ order: 2 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"Fullname (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"Fullname"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={4}
                    disabled={true}
                  />
                </div>
                <div style={{ order: 4 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    placeholder={"City (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"City"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    value={Detail[5]?.val}
                    place={5}
                    disabled={true}
                  />
                </div>
                <div style={{ order: 6 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    // placeholder={"Mobile (Optional)"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    title={"Mobile Number"}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    value={Detail[6]?.val}
                    place={6}
                    type="number"
                    disabled={true}
                  />
                </div>
              </Box>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <div style={{ order: 2 }}>
                  <DropDownSimple
                    dropStyle={{
                      filter:
                        "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                    }}
                    valueStyle={{ ...imputStyle, color: "white" }}
                    title={"Account Type*"}
                    valueContainerStyle={{
                      marginX: "0px",
                      background: "#0B4F26",
                      border: "1px solid #DEDEDE",
                      borderRadius: "5px",
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    containerStyle={{
                      width: "100%",
                      position: "relative",
                      marginTop: "5px",
                    }}
                    titleStyle={{ marginLeft: "0px" }}
                    data={typeToShow}
                    dropDownStyle={{
                      width: "100%",
                      marginLeft: "0px",
                      marginTop: "0px",
                      position: "absolute",
                    }}
                    dropDownTextStyle={imputStyle}
                    Detail={Detail}
                    setDetail={setDetail}
                    valued={Detail[9]?.val}
                    place={9}
                    disable={true}
                  />
                  {error[9]?.val && Detail[9]?.val === "" && (
                    <p className="validCommon" style={{ color: "#fa1e1e" }}>
                      Field Required
                    </p>
                  )}
                </div>
                {Detail[9].val !== "expert" && (
                  <div style={{ order: 1 }}>
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={imputStyle}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { laptop: "45px", mobile: "36px" },
                      }}
                      title={"Credit Reference*"}
                      setDetail={setDetail}
                      required={true}
                      Detail={Detail}
                      setError={setError}
                      error={error}
                      value={Detail[8]?.val}
                      place={8}
                      onKeyDown={(event) => {
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
                      }}
                      type="number"
                      disabled={true}
                    />
                    {error[8]?.val && (
                      <p style={{ color: "#fa1e1e" }}>{error[8]?.val}</p>
                    )}
                  </div>
                )}
              </Box>
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  containerStyle={{
                    ...containerStyles,
                    display: Detail[9].val === "user" ? "none" : "block",
                  }}
                  titleStyle={titleStyles}
                  inputStyle={imputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: "#DEDEDE",
                    height: { laptop: "45px", mobile: "36px" },
                  }}
                  title={"Upline Partnership"}
                  setDetail={setDetail}
                  Detail={Detail}
                  setError={setError}
                  error={error}
                  disabled={true}
                  place={10}
                  value={Detail[10]?.val}
                  autoMaticFillValue={`${Detail[10]?.val}`}
                />
                {error[10].val && (
                  <p style={{ color: "#fa1e1e" }}>Field Required</p>
                )}

                {Detail[9]?.val === "user" ? (
                  <InputMyPartnership
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    containerStyle={{
                      ...containerStyles,
                      display: Detail[9].val === "user" ? "none" : "block",
                    }}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    title={"My Partnership 1"}
                    setDetail={setDetail}
                    onFocusOut={CheckThisPosition}
                    toFoucs={true}
                    min={0}
                    max={100}
                    disabled={Detail[9].val === "user"}
                    setDownlinePar={setDownlinePar}
                    Detail={Detail}
                    value={Detail[11].val}
                    // placeholder={Detail[11].val}
                    setError={setError}
                    error={error}
                    place={11}
                    required={true}
                    type="number"
                  />
                ) : (
                  <Input
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      backgroundColor: Detail[9].val === "user" && "#DEDEDE",
                      height: { laptop: "45px", mobile: "36px" },
                    }}
                    containerStyle={{
                      ...containerStyles,
                      display: Detail[9].val === "user" ? "none" : "block",
                    }}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    title={"My Partnership"}
                    setDetail={setDetail}
                    onFocusOut={CheckThisPosition}
                    toFoucs={true}
                    // min={0}
                    setMypar={(val) => setMypar(val)}
                    max={100}
                    setDownlinePar={setDownlinePar}
                    Detail={Detail}
                    // placeholder={Detail[11].val}
                    setError={setError}
                    required={true}
                    disabled={true}
                    error={error}
                    place={11}
                    value={Detail[11]?.val}
                    type="number"
                    onKeyDown={(event) => {
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
                    }}
                  />
                )}

                {myPartnershipsError && (
                  <p style={{ color: "#fa1e1e" }}>
                    sum of upline , downline and my partnership should be not
                    exceeding 100.
                  </p>
                )}

                {error[11]?.val !== "" && (
                  <p style={{ color: "#fa1e1e" }}>{error[11]?.val}</p>
                )}
              </Box>
              <Input
                containerStyle={{
                  ...containerStyles,
                  display: Detail[9].val === "user" ? "none" : "block",
                }}
                titleStyle={titleStyles}
                inputStyle={imputStyle}
                disabled={true}
                inputContainerStyle={{
                  backgroundColor: "#DEDEDE",
                  ...inputContainerStyle,
                  height: { laptop: "45px", mobile: "36px" },
                }}
                title={"Downline partnership"}
                setDetail={setDetail}
                Detail={Detail}
                setError={setError}
                error={error}
                place={12}
                value={Detail[12]?.val}
                type="number"
                // placeholder={Detail[12].val}
                // autoMaticFillValue={Detail[12].val}
              />
              {error[12]?.val && (
                <p className="validCommon" style={{ color: "#fa1e1e" }}>
                  Field Required
                </p>
              )}

              {Detail[9]?.val !== "expert" && (
                <>
                  <Box
                    sx={{
                      display: {
                        laptop: "block",
                        tablet: "grid",
                        mobile: "grid",
                      },
                      // grid-template-columns: auto auto auto;
                      gridTemplateColumns: "50% 47%",
                      gridColumnGap: "10px",
                    }}
                  >
                    <DropDownSimple
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...imputStyle, color: "white" }}
                      title={"Match Commission Type"}
                      valueContainerStyle={{
                        marginX: "0px",
                        background: "#0B4F26",
                        border: "1px solid #DEDEDE",
                        borderRadius: "5px",
                        height: { laptop: "45px", mobile: "36px" },
                      }}
                      containerStyle={{
                        width: "100%",
                        position: "relative",
                        marginTop: "10px",
                      }}
                      titleStyle={{ marginLeft: "0px" }}
                      data={matchComissionTypes}
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                      }}
                      dropDownTextStyle={{ ...imputStyle, lineHeight: 1 }}
                      Detail={Detail}
                      value={Detail[17]?.val}
                      setDetail={setDetail}
                      place={17}
                    />
                    {error[17]?.val && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    )}
                    {Detail[17].val !== null && Detail[17].val !== "0.00" && (
                      <>
                        <DropDownSimple
                          //  openDrop={showMatchCommision}
                          dropStyle={{
                            filter:
                              "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          }}
                          valueStyle={{ ...imputStyle, color: "white" }}
                          title={"Match Commission (%)*"}
                          valueContainerStyle={{
                            height: "45px",
                            marginX: "0px",

                            background: "#0B4F26",
                            border: "1px solid #DEDEDE",
                            borderRadius: "5px",
                          }}
                          containerStyle={{
                            width: "100%",
                            position: "relative",
                            marginTop: "10px",
                          }}
                          titleStyle={{ marginLeft: "0px" }}
                          data={matchComissionArray}
                          dropDownStyle={{
                            width: "100%",
                            marginLeft: "0px",
                            marginTop: "0px",
                            position: "absolute",
                            maxHeight: "210px",
                            overflow: "scroll",
                          }}
                          Detail={Detail}
                          value={Detail[18]?.val}
                          setDetail={setDetail}
                          place={18}
                          selectValueStyle={{
                            selectValueStyle,
                          }}
                        />
                        {error[18].val && (
                          <p
                            className="validCommon"
                            style={{ color: "#fa1e1e" }}
                          >
                            Field Required
                          </p>
                        )}
                      </>
                    )}

                    <DropDownSimple
                      dropStyle={{
                        filter:
                          "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                      }}
                      valueStyle={{ ...imputStyle, color: "white" }}
                      title={"Session Commission (%)"}
                      valueContainerStyle={{
                        marginX: "0px",

                        background: "#0B4F26",
                        border: "1px solid #DEDEDE",
                        borderRadius: "5px",
                        height: { laptop: "45px", mobile: "36px" },
                      }}
                      containerStyle={{
                        width: "100%",
                        position: "relative",
                        marginTop: "10px",
                      }}
                      titleStyle={{ marginLeft: "0px" }}
                      data={sessionComissionArray}
                      dropDownStyle={{
                        width: "100%",
                        marginLeft: "0px",
                        marginTop: "0px",
                        position: "absolute",
                        maxHeight: "210px",
                        overflow: "scroll",
                      }}
                      dropDownTextStyle={{ ...imputStyle }}
                      Detail={Detail}
                      setDetail={setDetail}
                      value={Detail[16]?.val}
                      place={16}
                      selectValueStyle={{
                        selectValueStyle,
                      }}
                    />

                    {error[16]?.val && (
                      <p className="validCommon" style={{ color: "#fa1e1e" }}>
                        Field Required
                      </p>
                    )}
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ flex: 2 }} className="addAccountRemark">
              <Box
                sx={{
                  display: { laptop: "block", tablet: "grid", mobile: "grid" },
                  // grid-template-columns: auto auto auto;
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  titleStyle={titleStyles}
                  inputStyle={imputStyle}
                  inputProps={{
                    multiline: true,
                    rows: 10,
                    // rows: { laptop: 10, mobile: 2 },
                  }}
                  placeholder={"Remark (Optional)"}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { laptop: "205px", mobile: "70px" },
                    width: "100%",
                  }}
                  title={"Remark"}
                  setDetail={setDetail}
                  Detail={Detail}
                  setError={setError}
                  error={error}
                  value={Detail[13]?.val}
                  place={13}
                  disabled={true}
                />
                <div>
                  <Input
                    containerStyle={{ ...containerStyles, width: "100%" }}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={imputStyle}
                    inputContainerStyle={{ ...inputContainerStyle }}
                    title={"Admin Transaction Password*"}
                    // onKeyDown={(event) => {
                    //   if (
                    //     event.code === "Space" ||
                    //     (!(event.key >= "0" && event.key <= "9") &&
                    //       event.key !== "Backspace")
                    //   ) {
                    //     event.preventDefault();
                    //   }
                    // }}
                    placeholder={"Ex : 12345"}
                    required={true}
                    setDetail={setDetail}
                    Detail={Detail}
                    setError={setError}
                    error={error}
                    place={14}
                    onFocusOut={handleTransPass}
                    toFoucs={true}
                    // onKeyDown={handleEnterKey}
                    // okButtonRef={okButtonRef}
                    // onKeyDown={(e) => handleEnterKey(e, okButtonRef)}
                  />
                </div>
              </Box>
              <Button
                disabled={isDisable}
                className="cursor-pointer"
                sx={{
                  background: "#0B4F26",
                  width: "100%",
                  display: "flex",
                  justify: "center",
                  border: "2px solid black",
                  alignItems: "center",
                  borderRadius: "5px",
                  height: "45px",
                  marginTop: { mobile: "12px", laptop: "35px" },
                  color: "white",
                  fontSize: "18px",

                  "&:hover": {
                    background: "#0B4F26",
                  },
                }}
                type="submit"
              >
                Update
              </Button>

              {errorShow && !successShow && (
                <p style={{ color: "#fa1e1e" }}>{errorShow}</p>
              )}
              {successShow && <p style={{ color: "#0B4F26" }}>{successShow}</p>}
            </Box>
          </Box>
        </form>
        {errorShow ===
          "User need to first create the transaction password." && (
          <Button
            className="cursor-pointer"
            sx={{
              background: "#0B4F26",
              width: "50%",
              display: "flex",
              justify: "center",
              border: "2px solid black",
              alignItems: "center",
              borderRadius: "5px",
              height: "45px",
              marginTop: "35px",
              color: "white",
              fontSize: "18px",
            }}
            onClick={(e) => {
              navigate(
                `/${window.location.pathname.split("/")[1]}/createTransPassword`
              );
            }}
          >
            Create Trans Password
          </Button>
        )}
      </Box>
      {showSuccessModal && (
        <Modal
          message={successShow}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          activeTab={"Client list"}
          navigateTo={"list_of_clients"}
        />
      )}

      <style jsx="true" scoped>
        {`
          @media only screen and (max-width: 575px) {
            .addAccountRemark textarea {
              height: 60px !important;
            }
            .validCommon {
              font-size: 12px;
              line-height: 16px;
            }
          }
        `}
      </style>
    </>
  );
};

export default React.memo(EditAccount);
