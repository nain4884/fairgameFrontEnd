import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import StyledImage from "../../StyledImage";
import BoxButton from "../../BoxButton";
import {
  DeleteIcon,
  EyeIcon,
  EyeIconWhite,
  EyeSlash,
  EyeSlashWhite,
  LockClosed,
  LockOpen,
} from "../../../admin/assets";
import { setRole } from "../../../newStore";
import BoxButtonWithSwitch from "./BoxButtonWithSwitch";
import { useEffect } from "react";

const LockUnlockComponent = ({
  setShowUserModal,
  userModal,
  showDialogModal,
  elementToUDM,
  setElementToUDM,
  prevElement,
  setSelected,
  getListOfUser,
}) => {
  const [showPass, setShowPass] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [userId, setUserId] = useState(currentUser?.id);
  const defaultLockUnlockObj = {
    userId: currentUser?.id,
    all_blocked: userModal.all_blocked,
    adminTransPassword: "",
    bet_blocked: userModal.bet_blocked,
  };

  const UpdateLockUnlock = (body) => {
    const newBody = { ...body, userId: userId };
    const { axios } = setRole();
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await axios.post(
          `/fair-game-wallet/lockUnclockUser`,
          newBody
        );
        resolve({
          bool: data.message === "User update successfully." || status == 200,
          message: data.message,
        });
      } catch (e) {
        console.log(e);
        reject({ bool: false, message: e.response.data.message });
      }
    });
  };

  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  const handleLockSubmit = (e) => {
    e.preventDefault();
    UpdateLockUnlock(lockUnlockObj)
      .then(({ bool, message }) => {
        toast.success(message);
        setSelected(e);
        showDialogModal(true, true, message);
      })
      .catch(({ bool, message }) => {
        toast.error(message);
      });
  };

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser?.id);
    }
  }, [currentUser]);
  return (
    <form onSubmit={handleLockSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingRight: { mobile: "0", laptop: "10px" },
          flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          gap: 2,
          width: { mobile: "92vw", tablet: "80%", laptop: "80%" },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                mobile: "center",
                tablet: "flex-start ",
                laptop: "flex-start ",
              },
              height: "45px",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                width: { mobile: "100%", laptop: "35%", tablet: "35%" },
                fontWeight: "600",
                marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },

                visibility: "hidden",
                display: { mobile: "none", laptop: "block" },
              }}
            >
              Dummy
            </Typography>
            <Box
              sx={{
                borderRadius: "px",
                width: { mobile: "100%", laptop: "65%", tablet: "65%" },
                height: "45px",
                // background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                // border: "2px solid #26262633",
                // paddingX: "20px",
              }}
            >
              <Box sx={{ width: "48%", display: "flex", alignItems: "center" }}>
                <BoxButtonWithSwitch
                  title={"User"}
                  val={lockUnlockObj.all_blocked}
                  setLockUnlockObj={setLockUnlockObj}
                  lockUnlockObj={lockUnlockObj}
                  elementToUDM={elementToUDM}
                  setElementToUDM={setElementToUDM}
                />
              </Box>
              <Box
                sx={{
                  width: "48%",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <BoxButtonWithSwitch
                  title={"Bet"}
                  val={lockUnlockObj.bet_blocked}
                  setLockUnlockObj={setLockUnlockObj}
                  lockUnlockObj={lockUnlockObj}
                  elementToUDM={elementToUDM}
                  setElementToUDM={setElementToUDM}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
              justifyContent: "flex-start",
              marginTop: "10px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                width: { mobile: "100%", laptop: "35%", tablet: "35%" },
                fontWeight: "600",
                marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
              }}
            >
              Transaction Password
            </Typography>
            <Box
              sx={{
                borderRadius: "px",
                width: { mobile: "100%", laptop: "65%", tablet: "65%" },
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "20px",
              }}
            >
              <TextField
                required={true}
                onChange={(e) => {
                  setLockUnlockObj({
                    ...lockUnlockObj,
                    adminTransPassword: e.target.value,
                    userId: prevElement?.userId,
                  });
                }}
                sx={{ width: "100%", height: "45px" }}
                variant="standard"
                InputProps={{
                  placeholder: "",
                  disableUnderline: true,
                  autoComplete: "new-password",
                  type: !showPass ? "password" : "text",
                  style: {
                    fontSize: "13px",
                    height: "45px",
                    fontWeight: "600",
                  },
                }}
              />
              <Box
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                <StyledImage
                  src={showPass ? EyeIcon : EyeSlash}
                  sx={{ height: "14px", width: "20px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              mobile: "row-reverse",
              tablet: "column-reverse",
              laptop: "column-reverse",
            },
            justifyContent: {
              mobile: "space-between",
              tablet: "center",
              laptop: "center",
            },
            gap: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { mobile: "48%", tablet: "150px", laptop: "150px" },
            }}
          >
            <BoxButton
              color={"#0B4F26"}
              containerStyle={{
                maxWidth: "100%!important",
                height: "44px",
                flex: {
                  mobile: "0 0 100%",
                  tablet: "0 0 100%",
                  laptop: "0 0 100%",
                },
              }}
              isSelected={true}
              type="submit"
              title={"Submit"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { mobile: "48%", tablet: "150px", laptop: "150px" },
              marginTop: { mobile: 0, tablet: "0", laptop: "0" },
            }}
          >
            <BoxButton
              color={"#E32A2A"}
              containerStyle={{
                maxWidth: "100%!important",
                height: "44px",
                background: "#E32A2A",
                border: "0px",
                flex: {
                  mobile: "0 0 100%",
                  tablet: "0 0 100%",
                  laptop: "0 0 100%",
                },
              }}
              isSelected={true}
              onClick={(e) => {
                setSelected(e);
                console.log(
                  "elementToUDM.bet_blocked, elementToUDM.all_blocked",
                  elementToUDM.bet_blocked,
                  elementToUDM.all_blocked
                );
                setElementToUDM({
                  ...elementToUDM,
                  bet_blocked: prevElement.bet_blocked,
                  all_blocked: prevElement.all_blocked,
                });
              }}
              title={"Cancel"}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default LockUnlockComponent;
