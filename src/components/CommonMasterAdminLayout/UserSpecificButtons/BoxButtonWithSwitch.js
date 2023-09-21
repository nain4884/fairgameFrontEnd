import { Box, Typography } from "@mui/material";
import { useState } from "react";
import MaterialUISwitch from "./MaterialUISwitch";

const BoxButtonWithSwitch = ({
  title,
  containerStyle,
  icon,
  onClick,
  isSelected,
  deleteBtn,
  titleStyle,
  val,
  setLockUnlockObj,
  lockUnlockObj,
  elementToUDM,
  setElementToUDM,
}) => {
  const [checked, setChecked] = useState(false);
  const classes = {
    mainBox: [
      {
        background: !val ? "#0B4F26" : "#E32A2A",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
      },
      containerStyle,
    ],
    mainBoxTypography: [
      {
        fontSize: { mobile: "3vw", laptop: "0.7vw", tablet: "0.7vw" },
        fontWeight: "600",
        textAlign: "right",
        color: "white",
        marginRight: "10px",
        minWidth: "80px",
      },
      titleStyle,
    ],
  };
  return (
    <Box onClick={onClick} sx={classes.mainBox}>
      <MaterialUISwitch
        checked={!val}
        onChange={(e) => {
          if (title === "User") {
            setLockUnlockObj({
              ...lockUnlockObj,
              all_blocked: !val === true ? 1 : 0,
            });
            setElementToUDM({
              ...elementToUDM,
              all_blocked: !val === true ? 1 : 0,
            });
          } else {
            setLockUnlockObj({
              ...lockUnlockObj,
              bet_blocked: !val === true ? 1 : 0,
            });
            setElementToUDM({
              ...elementToUDM,
              bet_blocked: !val === true ? 1 : 0,
            });
          }
          setChecked(!checked);
        }}
      />
      <Typography sx={classes.mainBoxTypography}>
        {title} {!val ? "Unlocked" : "Locked"}
      </Typography>
    </Box>
  );
};

export default BoxButtonWithSwitch;
