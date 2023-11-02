import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  EyeIcon,
  EyeIconWhite,
  EyeSlash,
  EyeSlashWhite,
} from "../../../admin/assets";
import { setRole } from "../../../newStore";
import BoxButton from "../../BoxButton";
import StyledImage from "../../StyledImage";
import { onChangeKeyCheck } from "../../helper/PassKeyCheck";

const ChangePasswordComponent = ({
  userModal,
  showDialogModal,
  setSelected,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [userId, setUserId] = useState(currentUser?.id);
  const defaultChangePasswordObj = {
    userId: userId,
    password: "",
    adminTransPassword: "",
  };
  const [changePasswordObj, setChangePasswordObj] = useState(
    defaultChangePasswordObj
  );

  const UpdatePassword = (body) => {
    let newBody = { ...body, userId: userId };
    const { axios } = setRole();
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await axios.post(
          `/fair-game-wallet/updatePassword`,
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

  const handleChangePassword = (e) => {
    e.preventDefault();
    UpdatePassword(changePasswordObj)
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
    <form onSubmit={handleChangePassword}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingX: "10px",
          flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ width: { laptop: "100%", mobile: "88vw" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: { mobile: "flex-start", laptop: "center" },
              flexDirection: { mobile: "row", tablet: "row", laptop: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { mobile: "column", laptop: "row" },
                width: { mobile: "60%", laptop: "70%", tablet: "70%" },
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                  width: { mobile: "100%", laptop: "32.5%", tablet: "32.5%" },
                  fontWeight: "600",
                  marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                }}
              >
                New Password
              </Typography>
              <Box
                sx={{
                  borderRadius: "px",
                  width: { mobile: "100%", laptop: "32.5", tablet: "60%" },
                  height: "45px",
                  background: "#0B4F26",
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
                    setChangePasswordObj({
                      ...changePasswordObj,
                      password: e.target.value,
                      userId: userModal.id,
                    });
                  }}
                  sx={{ width: "100%", height: "45px", color: "white" }}
                  variant="standard"
                  InputProps={{
                    placeholder: "",
                    autoFocus: true,
                    disableUnderline: true,
                    autoComplete: "new-password",
                    type: !showPass1 ? "password" : "text",
                    style: {
                      fontSize: "13px",
                      height: "45px",
                      fontWeight: "600",
                      color: "white",
                    },
                  }}
                />
                <Box
                  onClick={() => {
                    setShowPass1(!showPass1);
                  }}
                >
                  <StyledImage
                    src={showPass1 ? EyeIconWhite : EyeSlashWhite}
                    sx={{ height: "14px", width: "20px", fill: "white" }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: { mobile: "40%", laptop: "250px" },
                marginTop: { mobile: "18px", tablet: "0", laptop: "0" },
              }}
            >
              <BoxButton
                color={"#E32A2A"}
                containerStyle={{
                  width: "100%",
                  background: "#E32A2A",
                  border: "0px",
                  height: "45px",
                  marginLeft: "10px",
                  maxWidth: {
                    mobile: "91% !important",
                    laptop: "100% !important",
                  },
                  flex: {
                    laptop: "0 0 60%!important",
                    mobile: "0 0 100%!important",
                  },
                }}
                isSelected={true}
                onClick={(e) => {
                  setChangePasswordObj(defaultChangePasswordObj);
                  setSelected(e);
                }}
                title={"Cancel"}
              />
            </Box>
          </Box>
          <p style={{ color: "#fa1e1e" }}>
            {changePasswordObj.password &&
              onChangeKeyCheck(changePasswordObj.password) !== false &&
              onChangeKeyCheck(changePasswordObj.password)}
          </p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: { mobile: "flex-start", laptop: "center" },
              flexDirection: { mobile: "row", tablet: "row", laptop: "row" },
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { mobile: "column", laptop: "row" },
                width: { mobile: "60%", laptop: "70%", tablet: "70%" },
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                  width: { mobile: "100%", laptop: "32.5%", tablet: "32.5%" },
                  fontWeight: "600",
                  marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
                }}
              >
                Transaction Password
              </Typography>

              <Box
                sx={{
                  borderRadius: "px",
                  width: { mobile: "100%", laptop: "60%", tablet: "60%" },
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
                    setChangePasswordObj({
                      ...changePasswordObj,
                      adminTransPassword: e.target.value,
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

            <Box
              sx={{
                display: "flex",
                width: { mobile: "40%", laptop: "250px" },
                marginTop: { mobile: "18px", tablet: "0", laptop: "0" },
              }}
            >
              <BoxButton
                color={"#0B4F26"}
                containerStyle={{
                  width: "100%",
                  height: "45px",
                  marginLeft: "10px",
                  maxWidth: {
                    mobile: "91% !important",
                    laptop: "100% !important",
                  },
                  flex: {
                    laptop: "0 0 60%!important",
                    mobile: "0 0 100%!important",
                  },
                }}
                isSelected={true}
                type="submit"
                title={"Submit"}
              />
            </Box>
          </Box>

          {/* cancel submit buttons  */}

          <Box
            sx={{
              display: "none",
              flexDirection: { mobile: "row", tablet: "row", laptop: "row" },
              justifyContent: "flex-start",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", width: "150px" }}>
              <BoxButton
                containerStyle={{
                  width: "100%",
                  height: "35px",
                }}
                isSelected={true}
                color={"#0B4F26"}
                type="submit"
                title={"Submit"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default ChangePasswordComponent;
