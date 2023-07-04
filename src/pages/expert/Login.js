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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { eye, logo, mail } from "../../assets";
import { Input, CustomButton, AuthLogo } from "../../components";
import AuthBackground from "../../components/AuthBackground";
import { ReCAPTCHACustom } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../store/activeUser";
import { GlobalStore } from "../../context/globalStore";
import { setCurrentUser } from "../../newStore/reducers/currentUser";
import { setRole } from "../../newStore";

import jwtDecode from "jwt-decode";
import {
  setAllRoles,
  setUpdatedTransPasswords,
  signIn,
} from "../../newStore/reducers/auth";
import { removeSocket } from "../../components/helper/removeSocket";
import { toast } from "react-toastify";
import {
  LoginServerError,
  SuperMaster,
  apiBasePath,
} from "../../components/helper/constants";
import { SocketContext } from "../../context/socketContext";
import {
  setEConfirmAuth,
  setWConfirmAuth,
  setAConfirmAuth,
} from "../../newStore/reducers/expertMatchDetails";

var newtoken = "";
export default function Login(props) {
  const theme = useTheme();
  let { transPass, axios, role } = setRole();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"));
  const location = useLocation();
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => {
    return state?.activeUser?.activeUser;
  });
  const { eConfirmAuth, wConfirmAuth, aConfirmAuth } = useSelector(
    (state) => state?.expertMatchDetails
  );
  const [loading, setLoading] = useState(false);

  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [loginDetail, setLoginDetail] = useState({
    1: { field: "username", val: "" },
    2: { field: "password", val: "" },
  });
  const [error, setError] = useState({
    1: { field: "username", val: false },
    2: { field: "password", val: false },
  });
  const [confirmPop, setConfirmPop] = useState(false);
  const [userType, setUserType] = useState("");

  const { socket, socketMicro } = useContext(SocketContext);

  //handled if user already exists and tries open other role login page
  const { currentUser } = useSelector((state) => state?.currentUser);
  const currroles = useSelector((state) => state?.auth?.allRole);

  useEffect(() => {
    try {
      if (currentUser) {
        let roleDetail = currroles?.find(findThisRole);
        function findThisRole(role) {
          return role?.id === currentUser?.roleId;
        }
        if (["user"]?.includes(roleDetail?.roleName)) {
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
      console.log(err?.message);
    }
  }, []);

  useEffect(() => {
    if (socket && socket.connected) {
      socket.disconnect();
    }
    if (socketMicro && socketMicro.connected) {
      socketMicro.disconnect();
    }
  }, [socket, socketMicro]);

  useEffect(() => {
    // alert(eConfirmAuth)
    if (!eConfirmAuth) {
    }
  }, [eConfirmAuth]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const url = window.location.href;
        let value = "";
        let token = "";
        // alert("ddd :" + validLoginURLs.includes(url))
        // if (validLoginURLs.includes(url)) {
        if (url.includes("expert")) {
          value = await localStorage.getItem("role3");
          token = await localStorage.getItem("JWTexpert");
          if (value && !eConfirmAuth) {
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
              // alert(JSON.stringify(data))
              loginToAccountAuth(data?.data?.username, "pass");
              console.log(data);
            } catch (error) {
              // Handle any errors
              console.error("Error fetching data:", error);
            }
          } else {
            let checkSessionStorage = sessionStorage.getItem("JWTexpert");
            if (checkSessionStorage) {
              navigate("/expert");
              setUserType("Expert");
              setConfirmPop(true);
            } else {
              setConfirmPop(false);
            }
          }
        } else if (url.includes("wallet")) {
          value = await localStorage.getItem("role2");
          token = await localStorage.getItem("JWTwallet");
          if (value && !wConfirmAuth) {
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
              // alert(JSON.stringify(data))
              loginToAccountAuth(data?.data?.username, "pass");
              console.log(data);
            } catch (error) {
              // Handle any errors
              console.error("Error fetching data:", error);
            }
          } else {
            let checkSessionStorage = sessionStorage.getItem("JWTwallet");
            if (checkSessionStorage) {
              navigate("/wallet");
              setUserType("Wallet user");
              setConfirmPop(true);
            } else {
              setConfirmPop(false);
            }
          }
        } else if (url.includes("admin")) {
          value = await localStorage.getItem("role1");
          token = await localStorage.getItem("JWTadmin");
          if (value && !aConfirmAuth) {
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
              // alert(JSON.stringify(data))
              loginToAccountAuth(data?.data?.username, "pass");
              console.log(data);
            } catch (error) {
              // Handle any errors
              console.error("Error fetching data:", error);
            }
          } else {
            let checkSessionStorage = sessionStorage.getItem("JWTadmin");
            if (checkSessionStorage) {
              navigate("/admin");
              setUserType("Admin");
              // console.log("popwwwww");
              setConfirmPop(true);
            } else {
              setConfirmPop(false);
            }
          }
        }
        // let confirmAuth = await localStorage.getItem("confirmAuth");
        // alert("pop 111:" + value)
        // const currentURL = window.location.href;
        // if (currentURL !== 'http://localhost:3000/' || currentURL !== 'http://159.65.154.97:3000/' || currentURL !== 'http://143.244.138.15:3000/') {
        //   if (value && !eConfirmAuth) {
        //     try {
        //       const config = {
        //         headers: {
        //           'Authorization': `Bearer ${token}`
        //         }
        //       };
        //       const response = await axios.get(`${apiBasePath}fair-game-wallet/changeAuth`, config);
        //       const data = response.data;
        //       // alert(JSON.stringify(data))
        //       loginToAccountAuth(data?.data?.username, "pass");
        //       console.log(data);
        //     } catch (error) {
        //       // Handle any errors
        //       console.error('Error fetching data:', error);
        //     }
        //   } else {
        //     let checkSessionStorage = sessionStorage.getItem("JWTexpert");
        //     if (checkSessionStorage) {
        //       navigate("/expert");
        //       // console.log("popwwwww");
        //       setConfirmPop(true);
        //     } else {
        //       setConfirmPop(false);
        //     }
        //   }
        // }
      } catch (error) {}
    });
  }, [eConfirmAuth]);

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
      if (location.pathname.split("/")[1] === "admin") {
        checkLocalStorage = localStorage.getItem("role1");
        checkSessionStorage = sessionStorage.getItem("JWTadmin");
        if (checkSessionStorage === null && checkLocalStorage !== null) {
          localStorage.removeItem("role1", "role1");
        }
      }
      if (location.pathname.split("/")[1] === "wallet") {
        checkLocalStorage = localStorage.getItem("role2");
        checkSessionStorage = sessionStorage.getItem("JWTwallet");
        if (checkSessionStorage === null && checkLocalStorage !== null) {
          localStorage.removeItem("role2", "role2");
        }
      }

      if (location.pathname.split("/")[1] === "expert") {
        let checkLoStorage = localStorage.getItem("role3");
        let checkSeStorage = sessionStorage.getItem("JWTexpert");
        if (checkSeStorage === null && checkLoStorage !== null) {
          localStorage.removeItem("role3", "role3");
        }
      }
    }
    if (location.pathname.split("/")[1] === "admin") {
      checkLocalStorage = localStorage.getItem("role1");
      checkSessionStorage = sessionStorage.getItem("JWTadmin");
      if (checkSessionStorage && checkLocalStorage === null) {
        localStorage.setItem("role1", "role1");
      }
    }
    if (location.pathname.split("/")[1] === "wallet") {
      checkLocalStorage = localStorage.getItem("role2");
      checkSessionStorage = sessionStorage.getItem("JWTwallet");
      if (checkSessionStorage && checkLocalStorage === null) {
        localStorage.setItem("role2", "role2");
      }
    }

    if (location.pathname.split("/")[1] === "expert") {
      let checkLoStorage = localStorage.getItem("role3");
      let checkSeStorage = sessionStorage.getItem("JWTexpert");
      if (checkSeStorage && checkLoStorage === null) {
        localStorage.setItem("role3", "role3");
      }
      if (checkSeStorage && checkLoStorage) {
        navigate(`/${location.pathname.split("/")[1]}/match`);
      }
    }
    if (checkLocalStorage && checkSessionStorage) {
      navigate(`/${location.pathname.split("/")[1]}/list_of_clients`);
    }
  }, [location.pathname.split("/")[1], localStorage]);

  const getLocalToken = (val) => {
    if (
      ["admin", "master", "superAdmin", "supperMaster"].some((v) =>
        val.includes(v)
      )
    ) {
      newtoken = localStorage.getItem("role1");
    } else if (
      ["fairGameWallet", "fairGameAdmin"].some((v) => val.includes(v))
    ) {
      newtoken = localStorage.getItem("role2");
    } else if (["expert"].some((v) => val.includes(v))) {
      newtoken = localStorage.getItem("role3");
    }
  };

  const [loginError, setLoginError] = useState("");
  useEffect(() => {
    getLocalToken(props.allowedRole);
  }, [props.allowedRole, localStorage]);

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
        token = getToken("JWTadmin");
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
    getLocalToken(props.allowedRole);
    // changeErrors()
    // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "")

    try {
      if (user === "" && pass === "") {
        // toast.warning("Username and password required");
        setLoginError("Username and password required!");
        setLoading(false);
        return false;
      } else {
        setLoading(true);
        // if (["role1", "role2", "role3"].includes(newtoken)) {
        //   toast.warn("Please logout from previous session");
        //   setLoading(false);
        //   return false;
        // }

        let { data } = await axios.post(`/auth/login`, {
          username: user,
          password: pass,
          loginType: location.pathname.split("/")[1],
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
            setLoading(false);
            // dispatch(setActiveRole(foundRoles.data));
            // dispatch(stateActions.setUser(data.data.role.roleName, data.data.access_token, data.data.isTransPasswordCreated));
            dispatch(
              setUpdatedTransPasswords(data.data.isTransPasswordCreated)
            );

            dispatch(signIn(data.data));
            setRole(data.data.access_token);
            if (
              ["master", "admin", "superMaster", "superAdmin"].includes(
                data.data.role.roleName
              )
            ) {
              setGlobalStore((prev) => ({
                ...prev,
                adminWT: data.data.access_token,
              }));
              localStorage.setItem("JWTadmin", data.data.access_token);
              // dispatch(setAConfirmAuth(false));
              handleNavigate("/admin/list_of_clients", "admin");
            } else if (
              ["fairGameWallet", "fairGameAdmin"].includes(
                data.data.role.roleName
              )
            ) {
              setGlobalStore((prev) => ({
                ...prev,
                walletWT: data.data.access_token,
              }));
              localStorage.setItem("JWTwallet", data.data.access_token);
              // dispatch(setWConfirmAuth(false));
              handleNavigate("/wallet/list_of_clients", "wallet");
            } else if (["expert"].includes(data.data.role.roleName)) {
              setGlobalStore((prev) => ({
                ...prev,
                expertJWT: data.data.access_token,
              }));
              // alert(data.data.access_token)
              localStorage.setItem("JWTexpert", data.data.access_token);
              // dispatch(setEConfirmAuth(false));
              handleNavigate("/expert/match", "expert");
            } else {
              // toast.error("User Unauthorized !");
              setLoginError("Incorrect username and password!");
              setLoading(false);
            }
          }
        } else {
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
      // toast.error(e?.response?.data?.message || "Something went wrong!");
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }

  async function loginToAccount() {
    getLocalToken(props.allowedRole);
    // changeErrors()
    // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "")

    try {
      if (loginDetail[1].val === "" && loginDetail[2].val === "") {
        // toast.warning("Username and password required");
        setLoginError("Username and password required!");
        setLoading(false);
        return false;
      } else {
        setLoading(true);
        // if (["role1", "role2", "role3"].includes(newtoken)) {
        //   toast.warn("Please logout from previous session");
        //   setLoading(false);
        //   return false;
        // }
        let { data } = await axios.post(`/auth/login`, {
          username: loginDetail[1].val,
          password: loginDetail[2].val,
          loginType: location.pathname.split("/")[1],
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
            setLoading(false);
            // dispatch(setActiveRole(foundRoles.data));
            // dispatch(stateActions.setUser(data.data.role.roleName, data.data.access_token, data.data.isTransPasswordCreated));
            dispatch(
              setUpdatedTransPasswords(data.data.isTransPasswordCreated)
            );

            dispatch(signIn(data.data));
            setRole(data.data.access_token);
            if (
              ["master", "admin", "superMaster", "superAdmin"].includes(
                data.data.role.roleName
              )
            ) {
              setGlobalStore((prev) => ({
                ...prev,
                adminWT: data.data.access_token,
              }));
              localStorage.setItem("JWTadmin", data.data.access_token);
              // dispatch(setAConfirmAuth(false));
              handleNavigate("/admin/list_of_clients", "admin");
            } else if (
              ["fairGameWallet", "fairGameAdmin"].includes(
                data.data.role.roleName
              )
            ) {
              setGlobalStore((prev) => ({
                ...prev,
                walletWT: data.data.access_token,
              }));
              localStorage.setItem("JWTwallet", data.data.access_token);
              // dispatch(setWConfirmAuth(false));
              handleNavigate("/wallet/list_of_clients", "wallet");
            } else if (["expert"].includes(data.data.role.roleName)) {
              setGlobalStore((prev) => ({
                ...prev,
                expertJWT: data.data.access_token,
              }));
              localStorage.setItem("JWTexpert", data.data.access_token);
              // dispatch(setEConfirmAuth(false));
              handleNavigate("/expert/match", "expert");
            } else {
              // toast.error("User Unauthorized !");
              setLoginError("Incorrect username and password!");
              setLoading(false);
            }
          }
        } else {
          // toast.error("User Unauthorized !");
          setLoginError("Incorrect username and password!");
          setLoading(false);
        }
      }
    } catch (e) {
      console.log(e?.message);
      setLoading(false);
      // toast.error(e?.response?.data?.message || "Something went wrong!");
      if (!e?.response) return setLoginError(LoginServerError);
      setLoginError(e.response.data.message);
    }
    // }
  }

  const useHereHandle = async () => {
    const checkUrl = window.location.href;
    let token = "";
    if (checkUrl.includes("expert")) {
      token = await localStorage.getItem("JWTexpert");
    } else if (checkUrl.includes("wallet")) {
      token = await localStorage.getItem("JWTwallet");
    } else if (checkUrl.includes("admin")) {
      token = await localStorage.getItem("JWTadmin");
    }
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
  };

  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              py: "20px",
              width: "18%",
              minWidth: "250px",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <AuthLogo
            style={{
              width: { laptop: "300px", mobile: "250px" },
              height: "100px",
            }}
          />
          <Box sx={{ width: "100%", opacity: 1, width: "90%" }}>
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
                  if (!loading) {
                    loginToAccount();
                  } else {
                    return false;
                  }
                }}
                loading={loading}
                buttonStyle={{ background: theme.palette.button.main }}
                title="Login"
              />
            </Box>
            {loginError !== "" && (
              <Alert severity="warning">{loginError}</Alert>
            )}
          </Box>
        </Box>
      </Box>
      <Dialog
        open={confirmPop}
        // onClose={() => setConfirmPop((prev) => !prev)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${userType} is open in another window. Click "Use Here" to use ${userType} in this window.`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmPop((prev) => !prev)}>Close</Button>
          <Button
            sx={{
              color: "#201f08",
              backgroundColor: "#fdf21b",
            }}
            // onClick={useHereHandle}
            onClick={useHereHandle}
          >
            User Here
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
