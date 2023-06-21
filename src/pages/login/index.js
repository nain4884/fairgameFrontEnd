import {
  Card, Typography, Box, useTheme, useMediaQuery, Dialog,
  DialogTitle, DialogActions,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
import { SocketContext } from "../../context/socketContext";
import axios from "axios";
import { setConfirmAuth } from "../../newStore/reducers/matchDetails";


export default function Login(props) {
  let { transPass, axios, role } = setRole();
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const { socket, socketMicro } = useContext(SocketContext);
  const { confirmAuth } = useSelector((state) => state?.matchDetails);
  const [loading, setLoading] = useState(false);
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
  const [confirmPop, setConfirmPop] = useState(false);

  // useEffect(() => {
  // }, [error, loginDetail])

  useEffect(() => {
    if (!confirmAuth) {
      // setConfirmPop(false);
      // alert("pop :" + confirmAuth)
    }
  }, [confirmAuth]);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.disconnect();
    }
    if (socketMicro && socketMicro.connected) {
      socketMicro.disconnect();
    }
  }, [socket, socketMicro]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        var value = await localStorage.getItem("role4");
        let token = await localStorage.getItem("JWTuser");
        // let confirmAuth = await localStorage.getItem("confirmAuth");
        // alert(value)
        // alert("pop 111:" + confirmAuth)
        if (value && !confirmAuth) {
          try {
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
            const response = await axios.get(`${apiBasePath}fair-game-wallet/changeAuth`, config);
            const data = response.data;
            loginToAccountAuth(data?.data?.username, "pass");
            console.log(data);
          } catch (error) {
            // Handle any errors
            console.error('Error fetching data:', error);
          }
          // setConfirmPop(true)
          // user--role4
          // expert---role3
          // wallet---role2
          // admin---role1
        } else {
          let checkSessionStorage = sessionStorage.getItem("JWTuser");
          if (checkSessionStorage) {
            setConfirmPop(true);
          } else {
            setConfirmPop(false);
          }
        }
        //  else {
        //   navigate(`/matches`);
        // }
      } catch (error) { }
    });
  }, []);

  // useEffect(() => {
  //   function onlineHandler() {
  //     alert(1111)
  //   }

  //   window.addEventListener("blur", onlineHandler);

  //   return () => {
  //     window.removeEventListener("blur", onlineHandler);
  //   };
  // }, []);

  const useHereHandle = async () => {
    let token = await localStorage.getItem("JWTuser");
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get(`${apiBasePath}fair-game-wallet/changeAuth`, config);
      const data = response.data;
      loginToAccountAuth(data?.data?.username, "pass");
      console.log(data);
    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
    }
    setConfirmPop(false);
    // loginToAccountAuth(data?.data?.username, "pass");
  }

  useEffect(() => {
    let checkLocalStorage;
    let checkSessionStorage;
    const mobileDevice =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i);

    if (mobileDevice) {
      checkSessionStorage = sessionStorage.getItem("JWTuser");
      checkLocalStorage = localStorage.getItem("role4");
      if (checkSessionStorage == null && checkLocalStorage !== null) {
        localStorage.removeItem("role4", "role4");
      }
    }

    if (location.pathname === "/") {
      checkLocalStorage = localStorage.getItem("role4");
      checkSessionStorage = sessionStorage.getItem("JWTuser");
      if (checkSessionStorage && checkLocalStorage === null) {
        localStorage.setItem("role4", "role4");
      }
      let token = localStorage.getItem("JWTuser");
      // alert("ssss :" + token)
      localStorage.setItem("JWTuser", token);
    }
    // alert(confirmPop)
    // if (checkLocalStorage && checkSessionStorage && confirmPop) {
    //   navigate(`/matches`);
    // }
  }, [location.pathname, localStorage]);

  // const getUseEffect = async () => {
  //   alert(checkLocalStorage)
  // }
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

  async function loginToAccountAuth(user, pass) {
    // changeErrors()
    // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "")
    try {
      if (user === "" && pass === "") {
        toast.warning("Username and password required");
        setLoading(false);
        return false;
      } else {
        setLoading(true);
        // const token = await localStorage.getItem("role4");

        // if (["role4"].includes(token)) {
        //   toast.warn("Please logout from previous session");
        //   setLoading(false);
        //   return false;
        // }
        let { data } = await axios.post(`/auth/login`, {
          username: user,
          password: pass,
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
            setLoading(false);
            if (["user"].includes(data.data.role.roleName)) {
              // localStorage.setItem("confirmAuth", true);
              localStorage.setItem("JWTuser", data.data.access_token);
              dispatch(setConfirmAuth(false));
              setGlobalStore((prev) => ({
                ...prev,
                userJWT: data.data.access_token,
              }));
              handleNavigate("/matches", "user");
            } else {
              toast.error("User Unauthorized !");
              setLoading(false);
            }
          }
        } else {
          toast.error("User Unauthorized !");
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
      toast.error(e?.response.data.message);
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }

  async function loginToAccount() {
    // changeErrors()
    // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "")
    try {
      if (loginDetail[1].val === "" && loginDetail[2].val === "") {
        toast.warning("Username and password required");
        setLoading(false);
        return false;
      } else {
        setLoading(true);
        const token = await localStorage.getItem("role4");

        // if (["role4"].includes(token)) {
        //   toast.warn("Please logout from previous session");
        //   setLoading(false);
        //   return false;
        // }
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
            setLoading(false);
            if (["user"].includes(data.data.role.roleName)) {
              // localStorage.setItem("confirmAuth", true);
              localStorage.setItem("JWTuser", data.data.access_token);
              dispatch(setConfirmAuth(false));
              setGlobalStore((prev) => ({
                ...prev,
                userJWT: data.data.access_token,
              }));
              handleNavigate("/matches", "user");
            } else {
              toast.error("User Unauthorized !");
              setLoading(false);
            }
          }
        } else {
          toast.error("User Unauthorized !");
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
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
                loading={loading}
                onClick={() => {
                  if (!loading) {
                    loginToAccount();
                  } else {
                    return false;
                  }
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
      <Dialog
        open={confirmPop}
        // onClose={() => setConfirmPop((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'User is open in another window. Click "Use Here" to use User in this window.'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmPop((prev) => !prev)}>
            Close
          </Button>
          <Button
            sx={{
              color: "#201f08", backgroundColor: "#fdf21b"
            }}
            onClick={useHereHandle}
          >
            User Here
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
