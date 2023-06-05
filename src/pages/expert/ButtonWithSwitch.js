import { Box, Switch, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

const ButtonWithSwitch = ({
  title,
  containerStyle,
  titleStyle,
  updateMatchStatus,
  setUpdateMatchStatus,
  place,
}) => {
  const [background, setBackground] = useState("#0B4F26");
  const [checked, setChecked] = useState(updateMatchStatus[place].val);
  useEffect(() => {
    if (checked) {
      setBackground("#0B4F26");
    } else {
      setBackground("#FF4D4D");
    }
  }, [checked]);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 35,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      marginTop: "8px",
      marginRight: "1px",
      padding: 0,
      paddingLeft: "3px",
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#10DC61",
        transform: "translateX(20px)",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "white",
        },
        "& .MuiSwitch-thumb": {
          backgroundColor: "#10DC61",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#FF4D4D",
      width: 18,
      height: 18,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "white",
      borderRadius: 20,
    },
  }));
  return (
    <Box
      sx={[
        {
          height: "35px",
          minWidth: "100px",
          width: "14%",
          marginLeft: "10px",
          borderRadius: "5px",
          background: background,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={[
          {
            color: "white",
            fontWeight: "500",
            fontSize: "13px",
            marginLeft: "1vw",
            lineHeight: "14px",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <MaterialUISwitch
        checked={checked}
        onChange={(e) => {
          setChecked(!checked);
          setUpdateMatchStatus({
            ...updateMatchStatus,
            [place]: {
              ...updateMatchStatus[place],
              val: !checked,
            },
          });
        }}
      />
    </Box>
  );
};

export default ButtonWithSwitch;
