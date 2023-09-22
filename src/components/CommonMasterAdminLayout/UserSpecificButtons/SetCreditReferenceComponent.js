import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import StyledImage from "../../StyledImage";
import BoxButton from "../../BoxButton";

import { EyeIcon, EyeSlash } from "../../../admin/assets";
import { setRole } from "../../../newStore";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SetCreditReferenceComponent = ({
  handleKeyDown,
  backgroundColor,
  userModal,
  elementToUDM,
  showDialogModal,
  setSelected,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultNewCreditObj = {
    userId: "",
    amount: null,
    trans_type: "credit_refer",
    adminTransPassword: "",
    remark: "",
  };
  const { currentUser } = useSelector((state) => state?.currentUser);
  const [userId, setUserId] = useState(currentUser?.id);
  const [newCreditObj, setNewCreditObj] = useState(defaultNewCreditObj);

  const UpdateAvailableBalance = async (body) => {
    const newBody = { ...body, userId: userId };
    const { axios } = setRole();
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await axios.post(
          `/fair-game-wallet/updateBalance`,
          newBody
        );
        resolve({
          bool:
            data.message === "Balance update successfully." || status == 200,
          message: data.message,
        });
      } catch (e) {
        console.log(e);
        reject({ bool: false, message: e.response.data.message });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!loading) {
        setLoading(true);
        UpdateAvailableBalance(newCreditObj)
          .then(({ bool, message }) => {
            toast.success(message);
            showDialogModal(true, true, message);
            setLoading(false);
            setSelected(e);
          })
          .catch(({ bool, message }) => {
            toast.error(message);
            setLoading(false);
          });
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser?.id);
    }
  }, [currentUser]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingRight: "10px",
          flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                width: { mobile: "100%", laptop: "40%", tablet: "40%" },
                fontWeight: "600",
                marginRight: { mobile: 0, laptop: "20px", tablet: "20px" },
              }}
            >
              New Credit Limit
            </Typography>
            <Box
              sx={{
                background: "#004A25",
                width: { mobile: "100%", laptop: "60%", tablet: "60%" },
                height: "45px",
                borderRadius: "5px",
                paddingX: "20px",
              }}
            >
              <TextField
                required={true}
                value={newCreditObj.amount}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  console.log(e.target.value, Number(e.target.value), "Numer");
                  const newPerRate =
                    elementToUDM.profit_loss +
                    elementToUDM.credit_refer -
                    Number(
                      isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                    );
                  if (Number(e.target.value) === 0) {
                    setNewCreditObj({
                      ...newCreditObj,
                      amount: Number(e.target.value),
                      userId: userModal.id,
                    });
                  } else {
                    setNewCreditObj({
                      ...newCreditObj,
                      amount: Number(e.target.value),
                      userId: userModal.id,
                    });
                  }
                }}
                variant="standard"
                InputProps={{
                  placeholder: "Type Amount...",
                  autoFocus: true,
                  autoComplete: "new-password",
                  disableUnderline: true,
                  inputProps: { min: "0" },
                  style: {
                    fontSize: "15px",
                    height: "45px",
                    fontWeight: "600",
                    color: "white",
                  },
                }}
                type={"Number"}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: "flex-end",
              marginTop: "10px",
              flexDirection: { mobile: "column", tablet: "row", laptop: "row" },
            }}
          >
            <Typography
              sx={{
                fontSize: { mobile: "3vw", laptop: "1vw", tablet: "1vw" },
                width: { mobile: "100%", laptop: "40%", tablet: "40%" },
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
                  setNewCreditObj({
                    ...newCreditObj,
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
        </Box>
        <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
          <Box
            sx={{
              borderRadius: "5px",
              flex: 1,
              background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              minHeight: "80px",
              maxHeight: "115px",
              paddingX: "10px",
            }}
          >
            <TextField
              onChange={(e) => {
                setNewCreditObj({ ...newCreditObj, remark: e.target.value });
              }}
              rows={4}
              sx={{ width: "100%", minHeight: "40px" }}
              multiline={true}
              variant="standard"
              InputProps={{
                placeholder: "Remark (Optional)",
                disableUnderline: true,
                style: {
                  fontSize: "13px",
                  minHeight: "45px",
                  fontWeight: "600",
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              mobile: "row",
              tablet: "column",
              laptop: "column",
            },
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", width: "150px" }}>
            <BoxButton
              color={"#0B4F26"}
              loading={loading}
              containerStyle={{ width: "150px", height: "35px" }}
              isSelected={true}
              type="submit"
              // onClick={handleSubmit}
              title={"Submit"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "150px",
              marginTop: { mobile: 0, tablet: "10px", laptop: "10px" },
            }}
          >
            <BoxButton
              color={"#E32A2A"}
              containerStyle={{
                width: "150px",
                background: "#E32A2A",
                border: "0px",
                height: "35px",
              }}
              isSelected={true}
              onClick={(e) => {
                setNewCreditObj(defaultNewCreditObj);
                setSelected(e);
              }}
              title={"Cancel"}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SetCreditReferenceComponent;
