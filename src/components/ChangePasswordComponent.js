import { Box, Button, CircularProgress, Typography } from "@mui/material";
import EventListing from "./EventListing";
import Input from "./Input";
import { eye, eyeLock } from "../assets";
import { doSendErrorForPassword } from "./helper/doCheckErrorForPassword";
import { useState } from "react";

export const ChangePasswordComponent = ({
  visible,
  selected,
  passLoader,
  width,
  changePassword,
  setRecaptchToken,
}) => {
  const [passwordDetail, setPasswordDetail] = useState({
    2: { field: "oldPassword", val: "" },
    3: { field: "newPassword", val: "" },
    4: { field: "confirmPassword", val: "" },
  });
  const [error, setError] = useState({
    2: { field: "oldPassword", val: false },
    3: { field: "newPassword", val: false },
    4: { field: "confirmPassword", val: false },
  });

  const handleChange = (e) => {
    e.preventDefault();
    // setRecaptchToken(null)
    if (
      !error[3].val &&
      !error[4].val &&
      passwordDetail[2].val !== "" &&
      passwordDetail[3].val !== "" &&
      passwordDetail[4].val !== ""
    ) {
      changePassword(passwordDetail);
    }
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };
  return (
    <form onSubmit={handleChange}>
      <Box
        sx={{
          width: { mobile: "96vw", laptop: "19vw", tablet: "19vw" },
          minWidth: {
            laptop: width ? width : "350px",
            tablet: width ? width : "350px",
            mobile: "0px",
          },
          marginTop: "10px",
          marginX: { mobile: "2vw", laptop: "1vw" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { laptop: "18px", mobile: "20px" },
            fontWeight: "700",
          }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            background: "#F8C851",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <Input
            required={true}
            placeholder={"Enter Old Password"}
            title={"Old Password"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{}}
            img={eye}
            img1={eyeLock}
            setDetail={setPasswordDetail}
            Detail={passwordDetail}
            setError={setError}
            error={error}
            place={2}
            onFocusOut={doSendErrorForPassword}
            toFoucs={true}
          />
          <Input
            required={true}
            placeholder={"Enter New Password"}
            inputProps={{ type: "password" }}
            title={"New Password"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            setDetail={setPasswordDetail}
            Detail={passwordDetail}
            setError={setError}
            error={error}
            place={3}
            onFocusOut={doSendErrorForPassword}
            toFoucs={true}
          />
          {error[3].val && <p style={{ color: "#fa1e1e" }}>{error[3].val}</p>}
          <Input
            required={true}
            placeholder={"Enter Confirm Password"}
            inputProps={{ type: "password" }}
            title={"Confirm New Password"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            setDetail={setPasswordDetail}
            Detail={passwordDetail}
            setError={setError}
            error={error}
            place={4}
            onFocusOut={doSendErrorForPassword}
            toFoucs={true}
            okButtonRef={"okButtonRef"}
            onKeyDown={handleEnterKeyPress}
          />
          {passwordDetail[3].val !== passwordDetail[4].val && (
            <p style={{ color: "#fa1e1e" }}>Password Doesn't match</p>
          )}
          <Button
            // onClick={handleChange}
            type="submit"
            sx={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mx: "auto",
              marginTop: "60px",
              marginBottom: "40px",
              width: "80%",
              background: "#0B4F26",
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                background: "#0B4F26",
              },
            }}
          >
            <Typography
              sx={{ fontSize: { laptop: "18px", mobile: "20px" } }}
              color={"white"}
            >
              {passLoader ? (
                <CircularProgress
                  sx={{
                    color: "#FFF",
                  }}
                  size={20}
                  thickness={4}
                  value={60}
                />
              ) : (
                "Update"
              )}
            </Typography>
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ChangePasswordComponent;
