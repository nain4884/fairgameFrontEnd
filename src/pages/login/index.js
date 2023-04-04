
import { Card, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eye, logo, mail } from '../../assets';
import { Input, CustomButton, AuthLogo, AuthBackground, ReCAPTCHACustom } from '../../components';
import { useDispatch } from 'react-redux';
import { stateActions } from '../../store/stateActions';
import axios from '../../axios/axios';
import { apiBasePath, LoginServerError } from '../../components/constants';
import OTPInput, { ResendOTP } from "otp-input-react";
import { setActiveRole } from '../../store/activeRole';
import { SocketContext } from '../../context/socketContext';

export default function Login() {

    const socket = useContext(SocketContext);
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginDetail, setLoginDetail] = useState({
        1: { field: "username", val: "" },
        2: { field: "password", val: "" }
    })
    const [error, setError] = useState({
        1: { field: "username", val: false },
        2: { field: "password", val: false }
    })
    const [OTP, setOTP] = useState("");

    const [loginError, setLoginError] = useState()

    // useEffect(() => {
    // }, [error, loginDetail])

    function changeErrors() {
        setError({
            ...error, 1: {
                ...loginDetail[1],
                val: loginDetail[1].val === ""
            }, 2: {
                ...loginDetail[2],
                val: loginDetail[2].val === ""
            }
        })
    }

    const ForgotPassword = () => {
        return (
            <>
                <Typography variant="header" sx={{ fontSize: { laptop: "20px", mobile: "22px" }, marginTop: matchesMobile ? "100px" : "1vh" }}>Forgot Password?</Typography>
                <Typography variant="subHeader" sx={{ fontSize: { laptop: "11px", mobile: "13px" }, lineHeight: "18px", marginTop: "1vh", textAlign: "center", fontFamily: '200' }}>Enter the email associated with your account.</Typography>
                <Box sx={{ width: { laptop: "55%", mobile: "75%", marginTop: "20px" }, opacity: 1 }}>
                    <Input placeholder={'Enter Username'} title={"Username"} img={mail} />
                    <Box sx={{ display: "flex", justifyContent: "center", marginY: "1vh", marginTop: "4vh" }}>
                        <CustomButton onClick={() => {
                            navigate('/verification')
                        }} buttonStyle={{ background: theme.palette.button.main }} title="Next" />
                    </Box>
                </Box>
            </>
        )
    }

    const Verification = () => {
        return (
            <>
                <Typography variant="header" sx={{ fontSize: { laptop: "20px", mobile: "22px" }, marginTop: matchesMobile ? "100px" : "1vh" }}>Verification</Typography>
                <Typography variant="subHeader" sx={{ fontSize: { laptop: "11px", mobile: "13px" }, lineHeight: "18px", marginTop: "1vh", textAlign: "center", fontFamily: '200' }}>Please enter the 4-digit verification code<br /> sent to your email address.</Typography>
                <Box sx={{ width: { laptop: "55%", mobile: "75%", marginTop: "20px" }, opacity: 1, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ display: "flex", paddingLeft: "15px", justifyContent: "center", alignItems: "center" }}>
                        <OTPInput placeholder={["*", "*", "*", "*"]} inputStyles={{ height: "50px", width: "50px", background: "white", borderRadius: "10px", verticalAlign: "bottom", fontSize: "16px" }} value={OTP} onChange={setOTP} style={{ display: "flex" }} OTPLength={4} disabled={false} secure />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", marginY: "1vh", marginTop: "4vh" }}>
                        <CustomButton onClick={() => {
                            navigate("/new_password")
                        }} buttonStyle={{ background: theme.palette.button.main, width: "120px", marginTop: "40px" }} title="Next" />
                    </Box>
                </Box>
            </>
        )
    }

    const handleNavigate = (path, type) => {
        // Set a timeout for 2 seconds before navigating
        let token = ''
        setTimeout(() => {
            switch (type) {
                case 'master':
                    token = localStorage.getItem('JWTmaster')
                    break;
                case 'expert':
                    token = localStorage.getItem('JWTexpert')
                    break;
                case 'user':
                    token = localStorage.getItem('JWTuser')
                    break;
                case 'admin':
                    token = localStorage.getItem('JWTadmin')
                    break;
            }
            if (token != '') {
                navigate(path);
            }
        }, 0);
    };

    async function loginToAccount() {
        // changeErrors()
        // if (!error[1].val && !error[2].val && loginDetail[1].val !== "" && loginDetail[2].val !== "") 
            try {
       
                let { data } = await axios.post(`/auth/login`, {
                    "username": loginDetail[1].val,
                    "password": loginDetail[2].val
                });
                let foundRoles = await axios.get(`/role`);
                let roles = foundRoles.data
                let roleDetail = roles.find(findThisRole)
                function findThisRole(role) {
                    return role.id === data.data.roleId
                }
                if (roleDetail) data.data.role = roleDetail
                if (data.message === "User login successfully.") {
                    dispatch(setActiveRole(foundRoles.data));
                    dispatch(stateActions.setUser(data.data.role.roleName, data.data.access_token, data.data.isTransPasswordCreated));
                    switch (data.data.role.roleName) {
                        case "master":
                            handleNavigate('/master/list_of_clients', 'master')
                            break;
                        case "superMaster":
                            handleNavigate('/super_master/list_of_clients', 'master')
                            break;
                        case "admin":
                            handleNavigate('/admin/list_of_clients', 'master')
                            break;
                        case "superAdmin":
                            handleNavigate('/super_admin/list_of_clients', 'master')
                            break;
                        case "expert":
                            handleNavigate('/expert/live', 'expert')
                            break;
                        case "user":
                            handleNavigate('/matches', 'user')
                            break;
                        case "fairGameWallet":
                            handleNavigate('/fairgame_wallet/list_of_clients', 'admin')
                            break;
                        case "fairGameAdmin":
                            handleNavigate('/fairgame_admin/list_of_clients', 'admin')
                            break;
                        default:
                            handleNavigate('/matches', 'user')
                            break;
                    }
                }
            } catch (e) {
                console.log(e)
                if (!e?.response) return setLoginError(LoginServerError)
                setLoginError(e.response.data.message)
            }
        // }
    }

    const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"))

    const NewPassword = () => {
        return (<>
            <Typography variant="header" sx={{ fontSize: { laptop: "20px", mobile: "22px" }, marginTop: matchesMobile ? "100px" : "1vh" }}>New Password</Typography>
            <Typography variant="subHeader" sx={{ fontSize: { laptop: "11px", mobile: "13px" }, lineHeight: "18px", marginTop: "1vh", textAlign: "center", fontFamily: '200' }}>Please enter new password.</Typography>
            <Box sx={{ width: { laptop: "55%", mobile: "75%", marginTop: "20px" }, opacity: 1 }}>
                <Input placeholder={"Enter Password"} inputProps={{ type: 'password' }} title={"New Password"} containerStyle={{}} img={eye} />
                <Input placeholder={"Enter Password"} inputProps={{ type: 'password' }} title={"Confirm New Password"} containerStyle={{ marginTop: "10px" }} img={eye} />
                <Box sx={{ display: "flex", justifyContent: "center", marginY: "1vh", marginTop: "50px" }}>
                    <CustomButton onClick={() => {
                        navigate('/')
                    }} buttonStyle={{ background: theme.palette.button.main }} title="Continue" />
                </Box>
            </Box>
        </>)
    }

    return (
        <Box style={{ position: "relative" }}>
            <AuthBackground />
            <Box style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "flex-end", position: "relative", justifyContent: "flex-end" }}>

                <Card sx={[{ display: "flex", height: "100%", flexDirection: "column", py: "10px", alignItems: "center", justifyContent: matchesMobile ? "flex-start" : "center", width: { laptop: '380px', tablet: "43%", mobile: '100%' } },
                (theme) => ({
                    background: `${theme.palette.primary.mainGradient}`
                })
                ]}>
                    <AuthLogo />
                    {window.location.pathname === "/" ? <Box sx={{ width: { laptop: "55%", mobile: "75%", marginTop: matchesMobile ? "100px" : "20px" }, opacity: 1 }}>
                        <Input placeholder={'Enter Username'} title={"Username"} img={mail} setDetail={setLoginDetail} Detail={loginDetail} setError={setError} error={error} place={1} />
                        {error[1].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                        <Input placeholder={"Enter Password"} inputProps={{ type: 'password' }} title={"Password"} containerStyle={{ marginTop: "10px" }} img={eye} setDetail={setLoginDetail} Detail={loginDetail} setError={setError} error={error} place={2} />
                        {error[2].val && <p style={{ color: "#fa1e1e" }}>Field Required</p>}
                        <Typography onClick={() => {
                            navigate("/forget_password")
                        }} sx={{ color: theme.palette.button.main, fontSize: { laptop: "10px", mobile: "12px" }, textAlign: "right", marginRight: "10px", marginTop: ".5em", fontWeight: '600' }}>Forgot Password?</Typography>
                        <ReCAPTCHACustom containerStyle={{ marginTop: "20px" }} />
                        <Box sx={{ display: "flex", justifyContent: "center", marginY: "1vh", marginTop: "4vh" }}>
                            <CustomButton onClick={() => {
                                loginToAccount()
                            }} buttonStyle={{ background: theme.palette.button.main }} title="Login" />
                        </Box>
                        {loginError && <p style={{ color: "#f50c0c" }} className={"text-center"}>{loginError}</p>}
                    </Box> : window.location.pathname === "/forget_password" ?
                        <ForgotPassword /> :
                        window.location.pathname === "/verification" ?
                            <Verification /> :
                            window.location.pathname === "/new_password" ?
                                <NewPassword /> :
                                <></>
                    }
                </Card>
            </Box>
        </Box>
    );
}