import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import { CalendarImage } from "../admin/assets";
const Calendar = ({
  title,
  containerStyle,
  DatePickerProps,
  pickerStyles,
  startDate,
  setStartDate,
}) => {
  // const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={[
        {
          zIndex: 100,
          width: { laptop: "50%", mobile: "50%" },
          position: "relative",
          height: "35px",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" }}
      >
        {title}
      </Typography>
      <Box sx={[{ position: "absolute", height: "35px" }, pickerStyles]}>
        <DatePicker
          onClickOutside={() => setOpen(false)}
          open={open}
          placeholderText="select"
          selected={startDate}
          onSelect={() => setOpen(false)}
          onChange={(date) => {
            setStartDate(date);
          }}
          {...DatePickerProps}
          customInput={<Box sx={[{ width: "10vw" }]}></Box>}
        />
      </Box>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={[
          {
            width: "100%",
            height: "37px",
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
        <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
          {startDate ? moment(startDate).format("YYYY-MM-DD") : "select date"}
        </Typography>
        <img alt="calander" src={CalendarImage} style={{ width: "12px", height: "13px" }} />
      </Box>
    </Box>
  );
};
export default Calendar;
