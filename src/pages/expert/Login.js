
import { Card, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { eye, logo, mail } from '../../assets';
import { Input, CustomButton, AuthLogo } from '../../components';
import AuthBackground from '../../components/AuthBackground';
import { ReCAPTCHACustom } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser } from '../../store/activeUser'
export default function Login() {
    const theme = useTheme()
    const navigate = useNavigate()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"))
    const location = useLocation();
    const dispatch = useDispatch()
    const activeUser = useSelector(state => {
        return state?.activeUser?.activeUser
    })
    useEffect(() => {
        let arr = location?.pathname?.split('/')
        dispatch(setActiveUser(arr[arr?.length - 1]))
    }, [location])
    return (
        <Box style={{ position: "relative" }}>
            <AuthBackground />
            <Box style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "flex-start", position: "relative", justifyContent: "center", }}>
                <Box sx={[{ display: "flex", flexDirection: "column", py: "20px", width: "18%", minWidth: "250px", alignItems: "center", justifyContent: "center" }]}>
                    <AuthLogo style={{ width: { laptop: "300px", mobile: "250px" }, height: "100px" }} />
                    <Box sx={{ width: "100%", opacity: 1, width: "90%" }}>
                        <Input placeholder={'Enter Username'} title={"Username"} img={mail} />
                        <Input placeholder={"Enter Password"} inputProps={{ type: 'password' }} title={"Password"} containerStyle={{ marginTop: "10px" }} img={eye} />
                        <Typography onClick={() => {
                            // navigate("/forget_password")
                        }} sx={{ color: theme.palette.button.main, fontSize: { laptop: "10px", mobile: "12px" }, textAlign: "right", marginRight: "10px", marginTop: ".5em", fontWeight: '600' }}>Forgot Password?</Typography>
                        <ReCAPTCHACustom containerStyle={{ marginTop: "20px" }} />
                        <Box sx={{ display: "flex", justifyContent: "center", marginY: "1vh", marginTop: "4vh" }}>
                            <CustomButton onClick={() => {
                                if (activeUser == '1') {
                                    navigate('/expert/live')
                                }
                                else if (activeUser == '2') {
                                    navigate('/expert/market')
                                } else if (activeUser == '3') {
                                    navigate('/expert/home1')
                                }
                            }} buttonStyle={{ background: theme.palette.button.main }} title="Login" />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}