import { Switch, styled } from "@mui/material";
import { LockClosed, LockOpen } from "../../../admin/assets";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 72,
  height: 30,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    marginTop: "3px",
    marginRight: "1px",
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(40px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url(${LockOpen})`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#409963",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "white",
    width: 26,
    height: 26,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${LockClosed})`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#FF8484",
    borderRadius: 20,
  },
}));

export default MaterialUISwitch;
