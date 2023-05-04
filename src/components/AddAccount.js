import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Input from "./Input";
import { EyeIcon } from "../admin/assets";
import DropDownSimple from "./DropdownSimple";
import { useNavigate } from "react-router-dom";

import { doSendErrorForPassword } from "./helper/doCheckErrorForPassword";
import Modal from "./Modal";
import { setRole } from "../newStore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const containerStyles = {
  marginTop: "10px",
};

const titleStyles = {
  color: "#202020",
  fontSize: { mobile: "12px", laptop: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const imputStyle = {
  fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" },
};
const inputContainerStyle = {
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};
const AddAccount = () => {
  const { axios, locPath,JWT } = setRole();
  const navigate = useNavigate();
  const { userAdmin, allRole } = useSelector((state) => state.auth);
  const [roleOfUser, setRoleOfUser] = useState("");
  const [errorShow, setErrorShow] = useState("");
  const [successShow, setSuccessShow] = useState("");
  const [locationPath, setLocationPath] = useState(locPath);
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
    11: { field: "myPertnerShip", val: 0 },
    12: { field: "downLinePertnerShip", val: 0 },
    13: { field: "remark", val: "" },
    14: { field: "adminTransPassword", val: "" },
    15: { field: "myPartnership", val: 0 },
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
    11: { field: "myPertnerShip", val: false },
    12: { field: "downLinePertnerShip", val: false },
    13: { field: "remark", val: false },
    14: { field: "adminTransPassword", val: false },
    15: { field: "myPartnership", val: false },
  });
  const [roles, setRoles] = useState(
    allRole?.map((v) => ({ role: v.roleName, roleId: v.id }))
  );
  const [userAlreadyExist, setUserAlredyExist] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {currentUser} = useSelector((state) => state?.currentUser);

  const [typeToShow, setTypeToShow] = useState([
    "Select your account type",
    "Fairgame Admin",
    "Super Admin",
    "Admin",
    "Super Master",
    "Master",
    "User",
  ]);

  const [profile, setProfile] = useState({});
  const [uplineP, setUplineP] = useState(0);

  const types = [
    { role: "fairGameAdmin", val: "Fairgame Admin", level: 1 },
    { role: "superAdmin", val: "Super Admin", level: 2 },
    { role: "admin", val: "Admin", level: 3 },
    { role: "superMaster", val: "Super Master", level: 4 },
    { role: "master", val: "Master", level: 5 },
    { role: "expert", val: "Expert", level: 6 },
    { role: "user", val: "User", level: 7 },
  ];

  const handleChangeShowModalSuccess = (val) => {
    setShowSuccessModal(val);
  };

  const setTypeForAccountType = () => {
    let typo = [];
    let k = 8;
    if (userAdmin?.role?.roleName === "fairGameWallet") k = 0;
    types.map((element) => {
      if (element.role === userAdmin?.role?.roleName) {
        k = element.level;
      }
      if (k < element.level) {
        if (element.level === 6) {
          if (userAdmin?.role?.roleName === "fairGameAdmin")
            typo.push(element.val);
        } else {
          typo.push(element.val);
        }
      }
    });
    setTypeToShow(typo);
  };

  console.log(Detail, "Detail", allRole);

  const addAccount = async () => {

    let payload = {
      userName: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      city: "",
      phoneNumber: 0,
      roleId: "",
      remark: "",
      adminTransPassword: "",
      myPartnership: 0,
      credit_refer: 0,
    };
    if (["master", "admin"].includes(locationPath)) {
      // payload.a_partnership=Detail[10].val
      payload = {
        ...payload,
        sm_partnership: Detail[11].val,
        m_partnership: Detail[12].val,
      };
    }
    try {
      function checkRoleId(age) {
        return (
          age.role.split(" ").join("").toLowerCase() ===
          Detail[9].val.split(" ").join("").toLowerCase()
        );
      }
      if (
        !(
          Detail[3].val === 0 ||
          Detail[3].val === "" ||
          Detail[9].val === 0 ||
          Detail[9].val === "" ||
          Detail[14].val === 0 ||
          Detail[14].val === ""
        )
      ) {
        //Detail[2].val === 0 || Detail[2].val === "" ||
        payload = {
          ...payload,
          userName: Detail[1].val,
          password: Detail[2].val,
          confirmPassword: Detail[3].val,
          fullName: Detail[4].val,
          city: Detail[5].val,
          phoneNumber: Detail[6].val,
          roleId: roles.filter(checkRoleId)[0].roleId,
          remark: Detail[13].val,
          adminTransPassword: Detail[14].val,
          myPartnership: Detail[11].val,
          credit_refer: Detail[8].val,
        };
        let response;
        response = await axios.post(`/fair-game-wallet/adduser`, payload);
        if (response.status == 200) {
          setSuccessShow(response.data.message);
          handleChangeShowModalSuccess(true);
        }
      }
    } catch (e) {
      console.log(e);
      setSuccessShow("");
      toast.error(e?.response?.data?.message);
      setErrorShow(e?.response?.data?.message);
    }
  };

  const setDownParterShipVal = (val1, val2) => {
    let val3 = 100 - val1 - val2;
    setDetail({
      ...Detail,
      12: {
        ...Detail[12],
        val: parseInt(val3),
      },
    });
  };

  async function getUserDetail() {
    try {
      const { data } = await axios.get("users/profile");
      setProfile(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleUpline() {
    let thisUplinePertnerShip = 0;
    switch (locationPath) {
      case "super_master":
        thisUplinePertnerShip =
          profile.a_partnership +
          profile.sa_partnership +
          profile.fa_partnership +
          profile.fw_partnership;
        break;
      case "super_admin":
        thisUplinePertnerShip = profile.fa_partnership + profile.fw_partnership;
        break;
      case "master":
        thisUplinePertnerShip =
          profile.sm_partnership +
          profile.a_partnership +
          profile.sa_partnership +
          profile.fa_partnership +
          profile.fw_partnership;
        break;
      case "admin":
        thisUplinePertnerShip =
          profile.sa_partnership +
          profile.fa_partnership +
          profile.fw_partnership;
        break;
      case "fairgame_wallet":
        break;
      case "fairgame_admin":
        thisUplinePertnerShip = profile.fw_partnership;
        break;
    }
    setDetail({
      ...Detail,
      10: {
        ...Detail[10],
        val: thisUplinePertnerShip,
      },
    });
    setError({
      ...error,
      10: {
        ...error[10],
        val: false,
      },
    });
    setUplineP(thisUplinePertnerShip);
  }

  useEffect(() => {
  }, [currentUser]);

  useEffect(() => {
    if (JWT) {
      getUserDetail();
    }
  }, [JWT]);
  useEffect(() => {
    setTypeForAccountType();
  }, [userAdmin?.role?.roleName, Detail, error, showSuccessModal]);

  async function checkUserName({ val }) {
    try {
      let body = {
        userName: val,
      };
      const { data } = await axios.post(
        `fair-game-wallet/checkUserExist`,
        body
      );
      if (data.data.exist === true) {
        setError({
          ...error,
          1: {
            ...error[1],
            val: true,
          },
        });
        setUserAlredyExist("User Already Exist With This Name");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function CheckThisPosition({ place, val, setError, error }) {
    console.log("val.toString().length>0", val.toString().length > 0);
    setError({
      ...error,
      [place]: {
        ...error[place],
        val: !val.toString().length > 0,
      },
    });
  }

  useEffect(() => {
    setDownParterShipVal(Detail[10].val, Detail[11].val);
  }, [Detail[10].val, Detail[11].val]);

  return (
    <>
      <Box sx={{ paddingY: "20px", paddingTop: "10px", marginX: "1%" }}>
        <Typography
          sx={{ color: "white", fontSize: "18px", fontWeight: "600" }}
        >
          Add Account
        </Typography>
        <Box
          sx={{
            background: "#F8C851",
            minHeight: "60vh",
            borderRadius: "5px",
            padding: "20px",
            paddingTop: "10px",
            marginTop: "10px",
            display: "flex",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Input
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={inputContainerStyle}
              placeholder={"Username (Required)"}
              title={"Username"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={1}
              onFocusOut={checkUserName}
              toFoucs={true}
            />
            {error[1].val && (
              <p style={{ color: "#fa1e1e" }}>
                {userAlreadyExist ? userAlreadyExist : "Field Required"}
              </p>
            )}
            <Input
              containerStyle={containerStyles}
              img={EyeIcon}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={inputContainerStyle}
              title={"User Password*"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={2}
              onFocusOut={doSendErrorForPassword}
              toFoucs={true}
            />{" "}
            {/** handleError={handleError} checkMesasge={true} */}
            {/* {error[2].val && <p style={{ color: "#fa1e1e" }}>{error[2].val}</p>} */}
            <Input
              containerStyle={containerStyles}
              img={EyeIcon}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={inputContainerStyle}
              title={"Confirm User Password*"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={3}
            />
            {Detail[2].val !== Detail[3].val && (
              <p style={{ color: "#fa1e1e" }}>Password Doesn't Match</p>
            )}
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              placeholder={"Fullname (Optional)"}
              inputContainerStyle={inputContainerStyle}
              title={"Fullname"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={4}
            />
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              placeholder={"City (Optional)"}
              inputContainerStyle={inputContainerStyle}
              title={"City"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={5}
            />
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              placeholder={"Mobile (Optional)"}
              inputContainerStyle={inputContainerStyle}
              title={"Mobile Number"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={6}
              type={"Number"}
            />
          </Box>
          <Box sx={{ flex: 1, marginX: "20px" }}>
            <DropDownSimple
              dropStyle={{
                filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              }}
              valueStyle={{ ...imputStyle, color: "white" }}
              title={"Account Type"}
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
              place={9}
            />
            {error[9].val ||
              (Detail[9].val === "" && (
                <p style={{ color: "#fa1e1e" }}>Field Required</p>
              ))}
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={inputContainerStyle}
              title={"Credit Reference"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={8}
              type={"Number"}
            />
            {error[9].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={{
                ...inputContainerStyle,
                backgroundColor: "#DEDEDE",
              }}
              title={"Upline Partnership"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={10}
              autoMaticFillValue={`${Detail[10].val}`}
            />
            {error[10].val && (
              <p style={{ color: "#fa1e1e" }}>Field Required</p>
            )}
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={inputContainerStyle}
              title={"My Partnership"}
              setDetail={setDetail}
              onFocusOut={CheckThisPosition}
              toFoucs={true}
              Detail={Detail}
              setError={setError}
              error={error}
              place={11}
              type={"Number"}
            />
            {error[11].val && (
              <p style={{ color: "#fa1e1e" }}>Field Required</p>
            )}
            <Input
              containerStyle={containerStyles}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={{
                backgroundColor: "#DEDEDE",
                ...inputContainerStyle,
              }}
              title={"Downline partnership"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={12}
              type={"Number"}
              autoMaticFillValue={Detail[12].val}
            />
            {error[12].val && (
              <p style={{ color: "#fa1e1e" }}>Field Required</p>
            )}
          </Box>
          <Box sx={{ flex: 1.5 }}>
            <Input
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputProps={{ multiline: true, rows: 10 }}
              placeholder={"Remark (Optional)"}
              inputContainerStyle={{
                ...inputContainerStyle,
                height: { laptop: "205px", mobile: "205px" },
                width: "50%",
              }}
              title={"Remark"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={13}
            />
            <Input
              containerStyle={{ ...containerStyles, width: "50%" }}
              titleStyle={titleStyles}
              inputStyle={imputStyle}
              inputContainerStyle={{ ...inputContainerStyle }}
              title={"Admin Transaction Password"}
              setDetail={setDetail}
              Detail={Detail}
              setError={setError}
              error={error}
              place={14}
            />
            {!error[14].val ||
              (Detail[14].val && (
                <p style={{ color: "#fa1e1e" }}>Field Required</p>
              ))}
            <Button
              className="cursor-pointer"
              sx={{
                background: "#0B4F26",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                border: "2px solid black",
                alignItems: "center",
                borderRadius: "5px",
                height: "45px",
                marginTop: "35px",
                color: "white",
                fontSize: "18px",
              }}
              onClick={(e) => {
                addAccount();
              }}
            >
              Create
            </Button>
            {errorShow && !successShow && (
              <p style={{ color: "#fa1e1e" }}>{errorShow}</p>
            )}
            {successShow && <p style={{ color: "#0B4F26" }}>{successShow}</p>}
            {errorShow ===
              "User need to first create the transaction password." && (
              <Button
                className="cursor-pointer"
                sx={{
                  background: "#0B4F26",
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
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
                    `/${
                      window.location.pathname.split("/")[1]
                    }/createTransPassword`
                  );
                }}
              >
                Create Trans Password
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {showSuccessModal && (
        <Modal
          message={successShow}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"list_of_clients"}
        />
      )}
    </>
  );
};

export default AddAccount;
