import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { CalendarImage } from "../admin/assets";
import CustomButton from "../admin/components/CustomButton";
import { useSelector } from "react-redux";
import constants from "./helper/constants";
import { setRole } from "../newStore";
import CustomButtonAdmin from "./CustomButtonAdmin";
import jwtDecode from "jwt-decode";


const YellowHeaderAdmin = ({ }) => {
    const adminToken = sessionStorage.getItem("JWTadmin")
    const userToken = sessionStorage.getItem("JWTuser")

    const decodedTokenAdmin = adminToken !== null && jwtDecode(adminToken);
    const decodedTokenUser = userToken !== null && jwtDecode(userToken);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [pageLimit, setPageLimit] = useState(constants.pageLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useSelector((state) => state?.currentUser);

   

    useEffect(() => {

    }, [fromDate, toDate]);


    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    const tab = useMediaQuery(theme.breakpoints.between("mobile", "laptop"))
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingBottom: '1vh' }}>
            <Typography sx={{ fontSize: '18px', color: 'white', marginLeft: '10px', fontWeight: '600', marginY: '10px', alignSelf: 'start' }} >Account Statement</Typography>
            <Box sx={{ display: 'flex', borderRadius: '5px', width: '99%', px: "10px", minHeight: "80px", background: '#F8C851' }}>

                <Calendar
                    pickerStyles={{ height: "40px" }}
                    containerStyle={{ width: matchesMobile ? "31%" : "19%", height: "40px" }}
                    title={'From'}
                    selectedDate={fromDate}
                    // onDateChange={handleFromDateChange}
                />
                <Calendar
                    pickerStyles={{ height: "40px" }}
                    containerStyle={{ width: matchesMobile ? "31%" : "19%", marginLeft: "20px", height: "40px" }}
                    title={'To'}
                    selectedDate={toDate}
                    // onDateChange={handleToDateChange}
                />

                {/* <CustomButton btnStyle={{ height: "40px", borderRadius: "5px", width: matchesMobile ? "32%" : "20%", marginRight: "0px", marginLeft: matchesMobile ? "10px" : "20px", marginBottom: matchesMobile ? "15px" : (tab ? "28px" : "15px") }} onClick={sendDataToParent} getAccountStatement={getAccountStatement} /> */}
                {/* {decodedTokenAdmin.role === "admin" && (
                    ""
                // <CustomButtonAdmin btnStyle={{ height: "40px", borderRadius: "5px", width: matchesMobile ? "32%" : "20%", marginRight: "0px", marginLeft: matchesMobile ? "10px" : "20px", marginBottom: matchesMobile ? "15px" : (tab ? "28px" : "15px") }}  getAccountStatement={getAccountStatement} />
                )}
                {decodedTokenUser.role === "user" && (
                <CustomButton btnStyle={{ height: "40px", borderRadius: "5px", width: matchesMobile ? "32%" : "20%", marginRight: "0px", marginLeft: matchesMobile ? "10px" : "20px", marginBottom: matchesMobile ? "15px" : (tab ? "28px" : "15px") }} onClick={sendDataToParent} getAccountStatement={getAccountStatement} />
                )} */}
           </Box>
        </Box>   
    )
}


const Calendar = ({ title, containerStyle, DatePickerProps, pickerStyles, selectedDate, onDateChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [open, setOpen] = useState(false)


    const handleDateSelect = (date) => {
        setStartDate(date);
        setOpen(false);
        onDateChange(date);
    };


    const theme = useTheme()

    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={[{
            zIndex: 100, width: '19%',
            position: 'relative',
            height: "35px",
        }, containerStyle]} onClick={() => {
            setOpen(!open)
        }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '600', marginY: '.3vh', color: matchesMobile ? "transparent" : "black" }}>{title}</Typography>
            <Box sx={[{ position: 'absolute', height: "35px", }, pickerStyles]}>
                {/* <DatePicker open={open} selected={startDate} onChange={(date) => {
                    setOpen(false)
                    setStartDate(date)
                }} {...DatePickerProps} customInput={<Box sx={[{ width: "25vw" }]}></Box>} /> */}
                <DatePicker
                    open={open}
                    selected={startDate}
                    onChange={handleDateSelect}
                    {...DatePickerProps}
                    customInput={<Box sx={[{ width: "25vw" }]}></Box>}
                />
            </Box>
            <Box onClick={() => {
                setOpen(!open)
            }} sx={[{ width: '100%', height: '35px', justifyContent: "space-between", alignItems: 'center', display: 'flex', background: 'white', borderRadius: '3px', border: '2px solid #DEDEDE', paddingX: '7px', position: 'absolute' }, pickerStyles]}>
                {matchesMobile && <Box >
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>{title}</Typography>
                    <Typography sx={{ fontSize: '11px', fontWeight: '500', marginTop: "-2px" }}>{moment(startDate).format('YYYY-MM-DD')}</Typography>
                </Box>}
                {!matchesMobile && <Typography sx={{ fontSize: '11px', fontWeight: '500' }}>{moment(startDate).format('YYYY-MM-DD')}</Typography>}
                <img src={CalendarImage} style={{ width: '18px', height: '20px' }} />
            </Box>
        </Box>
    );
};

export default YellowHeaderAdmin;