import { Card, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { eye, logo, mail } from "../../assets";
import {
  Input,
  CustomButton,
  AuthLogo,
  AuthBackground,
  ReCAPTCHACustom,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  apiBasePath,
  LoginServerError,
} from "../../components/helper/constants";
import OTPInput from "otp-input-react";
import { setAllRoles, signIn } from "../../newStore/reducers/auth";
import { setCurrentUser } from "../../newStore/reducers/currentUser";
import UseTokenUpdate from "../../useTokenUpdate";
import { setRole } from "../../newStore";
import { removeSocket } from "../../components/helper/removeSocket";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { GlobalStore } from "../../context/globalStore";

export default function Login(props) {
  let { transPass, axios, role } = setRole();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [loginDetail, setLoginDetail] = useState({
    1: { field: "username", val: "" },
    2: { field: "password", val: "" },
  });
  const [error, setError] = useState({
    1: { field: "username", val: false },
    2: { field: "password", val: false },
  });
  const [OTP, setOTP] = useState("");

  const [loginError, setLoginError] = useState();

  // useEffect(() => {
  // }, [error, loginDetail])

  async function getToken(val) {
    try {
      const token = await sessionStorage.getItem(val);
      return token;
    } catch (error) {
      console.log("Error fetching token from local storage:", error);
    }
  }
  const handleNavigate = async (path, type) => {
    // Set a timeout for 2 seconds before navigating

    let token = "";
    switch (type) {
      case "admin":
        token = getToken("JWTwallet");
        break;
      case "expert":
        token = getToken("JWTexpert");
        break;
      case "user":
        token = getToken("JWTuser");
        break;
      case "wallet":
        token = getToken("JWTwallet");
        break;
    }
    if (token !== "") {
      navigate(path);
    }
  };

  async function loginToAccount() {
    // changeErrors()
    // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "")
    try {
      const token = await localStorage.getItem("role4");

      if (["role4"].includes(token)) {
        toast.warn("Please logout from previous session");
        return false;
      }
      let { data } = await axios.post(`/auth/login`, {
        username: loginDetail[1].val,
        password: loginDetail[2].val,
      });

      if (props.allowedRole.includes(data.data.role)) {
        let foundRoles = await axios.get(`/role`);
        let roles = foundRoles.data;
        dispatch(setAllRoles(roles));
        let roleDetail = roles.find(findThisRole);
        function findThisRole(role) {
          return role.id === data.data.roleId;
        }
        if (roleDetail) data.data.role = roleDetail;
        if (data.message === "User login successfully.") {
          // getUserDetail();
          removeSocket();
          // dispatch(setActiveRole(foundRoles.data));
          // dispatch(stateActions.setUser(data.data.role.roleName, data.data.access_token, data.data.isTransPasswordCreated));
          setRole(data.data.access_token);
          dispatch(signIn(data.data));
          if (["user"].includes(data.data.role.roleName)) {
            setGlobalStore((prev) => ({
              ...prev,
              userJWT: data.data.access_token,
            }));
            handleNavigate("/matches", "user");
          } else {
            toast.error("User Unauthorized !");
          }
        }
      } else {
        toast.error("User Unauthorized !");
      }
    } catch (e) {
      console.log(e?.message);
      toast.error(e?.response.data.message);
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }

  const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"));

  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          justifyContent: "flex-end",
        }}
      >
        <Card
          sx={[
            {
              display: "flex",
              height: "100%",
              flexDirection: "column",
              py: "10px",
              alignItems: "center",
              justifyContent: matchesMobile ? "flex-start" : "center",
              width: { laptop: "380px", tablet: "43%", mobile: "100%" },
            },
            (theme) => ({
              background: `${theme.palette.primary.mainGradient}`,
            }),
          ]}
        >
          <AuthLogo />

          <Box
            sx={{
              width: {
                laptop: "55%",
                mobile: "75%",
                marginTop: matchesMobile ? "100px" : "20px",
              },
              opacity: 1,
            }}
          >
            <Input
              placeholder={"Enter Username"}
              title={"Username"}
              img={mail}
              setDetail={setLoginDetail}
              Detail={loginDetail}
              setError={setError}
              error={error}
              place={1}
            />
            {error[1].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
            <Input
              placeholder={"Enter Password"}
              inputProps={{ type: "password" }}
              title={"Password"}
              containerStyle={{ marginTop: "10px" }}
              img={eye}
              setDetail={setLoginDetail}
              Detail={loginDetail}
              setError={setError}
              error={error}
              place={2}
            />
            {error[2].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
            <Typography
              onClick={() => {
                navigate("/forget_password");
              }}
              sx={{
                color: theme.palette.button.main,
                fontSize: { laptop: "10px", mobile: "12px" },
                textAlign: "right",
                marginRight: "10px",
                marginTop: ".5em",
                fontWeight: "600",
              }}
            >
              Forgot Password?
            </Typography>
            <ReCAPTCHACustom containerStyle={{ marginTop: "20px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: "1vh",
                marginTop: "4vh",
              }}
            >
              <CustomButton
                onClick={() => {
                  loginToAccount();
                }}
                buttonStyle={{ background: theme.palette.button.main }}
                title="Login"
              />
            </Box>
            {loginError && (
              <p style={{ color: "#f50c0c" }} className={"text-center"}>
                {loginError}
              </p>
            )}
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
