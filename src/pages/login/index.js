import {
  Card,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { eye, eyeLock, mail } from "../../assets";
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
import { setAllRoles, signIn, logout } from "../../newStore/reducers/auth";
import { setRole } from "../../newStore";
import { removeSocket } from "../../components/helper/removeSocket";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import ChangePassword from "../../components/ChangePasswordComponent";
import { toast } from "react-toastify";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setConfirmAuth,
} from "../../newStore/reducers/matchDetails";
import { removeCurrentUser } from "../../newStore/reducers/currentUser";

// import ChangePasswordComponent from "./ChangePasswordComponent";

export default function Login(props) {
  const loginButtonRef = useRef(null);
  let { axios } = setRole();
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const { socket, socketMicro } = useContext(SocketContext);
  const { confirmAuth } = useSelector((state) => state?.matchDetails);
  const [loading, setLoading] = useState(false);
  const currroles = useSelector((state) => state?.auth?.allRole);
  const [loginDetail, setLoginDetail] = useState({
    1: { field: "username", val: "" },
    2: { field: "password", val: "" },
  });
  const [error, setError] = useState({
    1: { field: "username", val: false },
    2: { field: "password", val: false },
  });
  const [OTP, setOTP] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);

  const [loginError, setLoginError] = useState("");
  const [confirmPop, setConfirmPop] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);

  const [recaptchaToken, setRecaptchToken] = useState(null);

  useEffect(() => {
    if (!confirmAuth) {
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
    //handled if user already exists and tries open other role login page
    try {
      if (currentUser) {
        let roleDetail = currroles?.find(findThisRole);
        function findThisRole(role) {
          return role?.id === currentUser?.roleId;
        }
        if (["user"].includes(roleDetail?.roleName)) {
          navigate("/matches");
        } else if (
          ["admin", "master", "superAdmin", "supperMaster"]?.includes(
            roleDetail?.roleName
          )
        ) {
          navigate("/admin/list_of_clients");
        } else if (
          ["fairGameWallet", "fairGameAdmin"]?.includes(roleDetail?.roleName)
        ) {
          navigate("/wallet/list_of_clients");
        } else if (["expert"]?.includes(roleDetail?.roleName)) {
          navigate("/expert/match");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  const useHereHandle = async () => {
    let token = await localStorage.getItem("JWTuser");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${apiBasePath}fair-game-wallet/changeAuth`,
        config
      );
      const data = response.data;
      loginToAccountAuth(data?.data?.username, "pass");
      console.log(data);
    } catch (error) {
      // Handle any errors
      console.error("Error fetching data:", error);
    }
    setConfirmPop(false);
    // loginToAccountAuth(data?.data?.username, "pass");
  };

  // useEffect(() => {
  //   let checkLocalStorage;
  //   let checkSessionStorage;
  //   const mobileDevice =
  //     navigator.userAgent.match(/Android/i) ||
  //     navigator.userAgent.match(/webOS/i) ||
  //     navigator.userAgent.match(/iPhone/i) ||
  //     navigator.userAgent.match(/iPad/i) ||
  //     navigator.userAgent.match(/iPod/i) ||
  //     navigator.userAgent.match(/BlackBerry/i) ||
  //     navigator.userAgent.match(/Windows Phone/i);

  //   if (mobileDevice) {
  //     checkSessionStorage = sessionStorage.getItem("JWTuser");
  //     checkLocalStorage = localStorage.getItem("role4");
  //     if (checkSessionStorage == null && checkLocalStorage !== null) {
  //       localStorage.removeItem("role4", "role4");
  //     }
  //   }

  //   if (location.pathname === "/") {
  //     checkLocalStorage = localStorage.getItem("role4");
  //     checkSessionStorage = sessionStorage.getItem("JWTuser");
  //     if (checkSessionStorage && checkLocalStorage === null) {
  //       localStorage.setItem("role4", "role4");
  //     }
  //     let token = localStorage.getItem("JWTuser");
  //     // alert("ssss :" + token)
  //     localStorage.setItem("JWTuser", token);
  //   }
  // }, [location.pathname, localStorage]);

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
    try {
      if (user === "" && pass === "") {
        // toast.warning("Username and password required");
        setLoginError("Username and password required");
        setLoading(false);
        return false;
      } else {
        setLoading(true);
        let { data } = await axios.post(`/auth/login`, {
          username: user,
          password: pass,
          loginType: "user",
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
            removeSocket();
            setRole(data.data.access_token);
            dispatch(signIn(data.data));
            setLoading(false);
            if (["user"].includes(data.data.role.roleName)) {
              // localStorage.setItem("confirmAuth", true);
              localStorage.setItem("JWTuser", data.data.access_token);
              // dispatch(setConfirmAuth(false));
              setGlobalStore((prev) => ({
                ...prev,
                userJWT: data.data.access_token,
              }));
              handleNavigate("/matches", "user");
            } else {
              // toast.error("Incorrect username and password !");
              setLoginError("Incorrect username and password !");
              setLoading(false);
            }
          }
        } else {
          // toast.error("Incorrect username and password !");
          setLoginError("Incorrect username and password !");
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
      // toast.error(e?.response.data.message);
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }

  async function loginToAccount() {
    try {
      if (loginDetail[1].val === "" && loginDetail[2].val === "") {
        // toast.warning("Username and password required");
        setLoginError("Username and password required");
        setLoading(false);
        return false;
      } else
      // if (recaptchaToken === null) {
      //   setLoading(false);
      //   setLoginError("reCaptcha required ");
      //   return false;
      // } else 
      {
        setLoading(true);
        const token = await localStorage.getItem("role4");
        let { data } = await axios.post(`/auth/login`, {
          username: loginDetail[1].val,
          password: loginDetail[2].val,
          loginType: "user",
          // recaptchaToken: recaptchaToken,
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
            setRole(data.data.access_token);
            dispatch(signIn(data.data));
            setLoading(false);
            if (["user"].includes(data.data.role.roleName)) {
              localStorage.setItem("JWTuser", data.data.access_token);
              setGlobalStore((prev) => ({
                ...prev,
                userJWT: data.data.access_token,
              }));
              // alert(JSON.stringify(data.data?.isTransPasswordCreated))
              if (data?.data?.forceChangePassword) {
                // handleNavigate("/change_password", "user");
                setIsChangePassword(true);
              } else {
                handleNavigate("/matches", "user");
              }
            } else {
              setLoginError("Incorrect username and password !");
              setLoading(false);
            }
          }
        } else {
          setLoginError("Incorrect username and password !");
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
      // toast.error(e?.response.data.message);
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }

  const changePassword = async (value) => {
    try {
      const payload = {
        OldPassword: value[2].val,
        password: value[3].val,
        confirmpassword: value[4].val,
      };
      const { data } = await axios.post(
        `/fair-game-wallet/updateSelfPassword`,
        payload
      );

      dispatch(setConfirmAuth(false));
      sessionStorage.setItem("JWTuser", null);
      dispatch(removeCurrentUser());
      removeSocket();
      dispatch(logout({ roleType: "role4" }));
      setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
      dispatch(removeManualBookMarkerRates());
      dispatch(removeSelectedMatch());
      socket.disconnect();
      socketMicro.disconnect();
      await axios.get("auth/logout");
      localStorage.setItem("confirmAuth", false);
      setLoginError("");
      if (data.message === "Password update successfully.") {
        toast.success("Password update successfully.");
        setIsChangePassword(false);
      }
    } catch (e) {
      // console.log(e.response.data.message);
      toast.error(e.response.data.message);
    }
  };

  const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const handleEnterKeyPress = (e) => {
    setLoginError("");
    if (e.key === "Enter") {
      // Check if the Enter key is pressed
      e.preventDefault();
      // loginButtonRef.current.click(); // Trigger the click event on the CustomButton
      loginToAccount();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loading) {
      loginToAccount();
    } else {
      return false;
    }
  };

  const handleBlur = (event) => {
    setLoginDetail((prev) => ({
      ...prev,
      [event?.place]: {
        ...prev[event?.place],

        val: event?.val2,
      },
    }));
    // setInputValue(event.target.value);
  };

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

          {!isChangePassword ? (
            <form onSubmit={handleLogin} style={{ width: "75%" }}>
              <Box
                sx={{
                  width: {
                    laptop: "100%",
                    mobile: "100%",
                    marginTop: matchesMobile ? "100px" : "20px",
                  },
                  opacity: 1,
                }}
              >
                <Input
                  required={true}
                  onFocusOut={handleBlur}
                  toFoucs={true}
                  autoFocus
                  placeholder={"Enter Username"}
                  title={"Username"}
                  img={mail}
                  setDetail={setLoginDetail}
                  Detail={loginDetail}
                  setError={setError}
                  error={error}
                  place={1}
                />
                {error[1].val && (
                  <p style={{ color: "#fa1e1e" }}>Field Required</p>
                )}
                <Input
                  required={true}
                  placeholder={"Enter Password"}
                  inputProps={{ type: "password" }}
                  title={"Password"}
                  containerStyle={{ marginTop: "10px" }}
                  img={eye}
                  img1={eyeLock}
                  setDetail={setLoginDetail}
                  Detail={loginDetail}
                  setError={setError}
                  error={error}
                  place={2}
                  okButtonRef={"okButtonRef"}
                  onKeyDown={handleEnterKeyPress} // Handle "Enter" key press on the password field
                />
                {error[2].val && (
                  <p style={{ color: "#fa1e1e" }}>Field Required</p>
                )}
                {/* <Typography
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
            </Typography> */}
                {/* <ReCAPTCHACustom
                  containerStyle={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                  onSubmitWithReCAPTCHA={(token) => {
                    console.log(token, "token");
                    setRecaptchToken(token);
                    // apply to form data
                  }}
                /> */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginY: "1vh",
                    marginTop: "4vh",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                      width: "62%",
                      cursor: "pointer",
                      height: { mobile: "50px", laptop: "43px" },
                      borderRadius: "10px",
                      fontWeight: "500",
                      textTransform: "none",
                      fontSize: { laptop: "14px", mobile: "14px" },
                      background: theme.palette.button.main,
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        sx={{
                          color: "#FFF",
                        }}
                        size={20}
                        thickness={4}
                        value={60}
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  {/* <CustomButton
                ref={loginButtonRef}
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
              /> */}
                </Box>
                {loginError !== "" && (
                  <Alert severity="warning">{loginError}</Alert>
                )}
              </Box>
            </form>
          ) : (
            <ChangePassword width="300px" changePassword={changePassword} setRecaptchToken={setRecaptchToken}/>
          )}
        </Card>
      </Box>
      <Dialog
        open={confirmPop}
        // onClose={() => setConfirmPop((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            'User is open in another window. Click "Use Here" to use User in this window.'
          }
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmPop((prev) => !prev)}>Close</Button>
          <Button
            sx={{
              color: "#201f08",
              backgroundColor: "#fdf21b",
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
