import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarImage } from "../admin/assets";
import CustomButton from "../admin/components/CustomButton";
import { toast } from "react-toastify";

const YellowHeader = ({ admin, onChildData, getAccountStatement }) => {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const tab = useMediaQuery(theme.breakpoints.between("mobile", "laptop"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          color: "white",
          marginLeft: "10px",
          fontWeight: "600",
          marginY: "2vh",

          alignSelf: "start",
        }}
      >
        Account Statement
      </Typography>
      <Box
        sx={{
          borderRadius: "5px",
          width: "100%",
          px: "10px",
          py: { mobile: "10px", laptop: "0" },
          minHeight: { mobile: "0", laptop: "80px" },
          background: "#F8C851",
          display: "flex",
          flexDirection: { mobile: "row", laptop: "row", tablet: "row", alignItems: { mobile: "center", laptop: "flex-end" } },
        }}
      >
        <Box
          sx={{
            width: { mobile: "67%", laptop: "100%" },
            gap: 1,
            display: "flex",
            flexDirection: { mobile: "row", laptop: "row", tablet: "row" },
          }}
        >
          <Calendar
            pickerStyles={{ height: "40px" }}
            containerStyle={{
              width: matchesMobile ? "50%" : "19%",
              height: "auto",
            }}
            title={"From"}
            selectedDate={fromDate}
            onDateChange={handleFromDateChange}
          />
          <Calendar
            pickerStyles={{ height: "40px" }}
            containerStyle={{
              width: matchesMobile ? "50%" : "19%",
              height: "auto",
            }}
            title={"To"}
            selectedDate={toDate}
            onDateChange={handleToDateChange}
          />
          {!matchesMobile && (
            <CustomButton
              btnStyle={{
                height: "40px",
                borderRadius: "5px",
                width: "20%",
                marginRight: "0px",
                marginTop: matchesMobile ? "25px" : 0,
                marginLeft: matchesMobile ? "10px" : "20px",
                marginBottom: matchesMobile ? "15px" : tab ? "28px" : "15px",
              }}
              onClick={() => {
                if (fromDate === "" && toDate === "") {
                  toast.warn("Please select From and To date");
                  return false;
                } else {
                  getAccountStatement(fromDate, toDate);
                }
              }}
              getAccountStatement={getAccountStatement}
            />
          )}
        </Box>
        {matchesMobile && (
          <CustomButton
            btnStyle={{
              height: "40px",
              borderRadius: "5px",
              width: "30%",
              marginRight: "0px",
              marginTop: matchesMobile ? "0" : 0,
              marginLeft: matchesMobile ? "10px" : "20px",
              marginBottom: matchesMobile ? "0" : tab ? "0" : "0",
            }}
            onClick={() => {
              if (fromDate === "" && toDate === "") {
                toast.warn("Please select From and To date");
                return false;
              } else {
                getAccountStatement(fromDate, toDate);
              }
            }}
            getAccountStatement={getAccountStatement}
          />
        )}
      </Box>
    </Box>
  );
};

const Calendar = ({
  title,
  containerStyle,
  DatePickerProps,
  pickerStyles,
  selectedDate,
  onDateChange,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleDateSelect = (date) => {
    setStartDate(date);
    setOpen(false);
    onDateChange(date);
  };

  const theme = useTheme();

  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Box
      sx={[
        {
          zIndex: 100,
          width: "19%",
          position: "relative",
          height: "35px",
        },
        containerStyle,
      ]}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: "600",
          marginY: ".3vh",
          color: matchesMobile ? "transparent" : "black",
          display: { mobile: "none", laptop: "block" }
        }}
      >
        {title}
      </Typography>
      <Box sx={[{ position: "absolute", height: "35px" }, pickerStyles]}>
        <DatePicker
          open={open}
          selected={startDate}
          onChange={handleDateSelect}
          {...DatePickerProps}
          customInput={<Box sx={[{ width: "25vw" }]}></Box>}
        />
      </Box>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={[
          {
            width: "100%",
            height: "35px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            background: "white",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            paddingX: "7px",
            position: "absolute",
          },
          pickerStyles,
        ]}
      >
        {matchesMobile && (
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: "600" }}>
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: "11px", fontWeight: "500", marginTop: "-2px" }}
            >
              {moment(startDate).format("YYYY-MM-DD")}
            </Typography>
          </Box>
        )}
        {!matchesMobile && (
          <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
            {moment(startDate).format("YYYY-MM-DD")}
          </Typography>
        )}
        <img src={CalendarImage} style={{ width: "18px", height: "20px" }} />
      </Box>
    </Box>
  );
};

export default YellowHeader;
