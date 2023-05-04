import { Card, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { eye, logo, mail } from "../../assets";
import {
  Input,
  CustomButton,
  AuthLogo,
  AuthBackground,
  ReCAPTCHACustom,
} from "../../components";
import { useDispatch } from "react-redux";
import {
  apiBasePath,
  LoginServerError,
} from "../../components/helper/constants";
import OTPInput from "otp-input-react";
import { setAllRoles, signIn } from "../../newStore/reducers/auth";
import { setCurrentUser } from "../../newStore/reducers/currentUser";
import UseTokenUpdate from "../../useTokenUpdate";
import { setRole } from "../../newStore";

export default function NewPassword() {
  let { transPass, axios, role } = setRole();

  const theme = useTheme();
  const navigate = useNavigate();
  


  const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"));

  const NewPassword = () => {
    return (
      <>
        <Typography
          variant="header"
          sx={{
            fontSize: { laptop: "20px", mobile: "22px" },
            marginTop: matchesMobile ? "100px" : "1vh",
          }}
        >
          New Password
        </Typography>
        <Typography
          variant="subHeader"
          sx={{
            fontSize: { laptop: "11px", mobile: "13px" },
            lineHeight: "18px",
            marginTop: "1vh",
            textAlign: "center",
            fontFamily: "200",
          }}
        >
          Please enter new password.
        </Typography>
        <Box
          sx={{
            width: { laptop: "55%", mobile: "75%", marginTop: "20px" },
            opacity: 1,
          }}
        >
          <Input
            placeholder={"Enter Password"}
            inputProps={{ type: "password" }}
            title={"New Password"}
            containerStyle={{}}
            img={eye}
          />
          <Input
            placeholder={"Enter Password"}
            inputProps={{ type: "password" }}
            title={"Confirm New Password"}
            containerStyle={{ marginTop: "10px" }}
            img={eye}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginY: "1vh",
              marginTop: "50px",
            }}
          >
            <CustomButton
              onClick={() => {
                navigate("/");
              }}
              buttonStyle={{ background: theme.palette.button.main }}
              title="Continue"
            />
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          justifyContent: "flex-end",
        }}
      >
        <Card
          sx={[
            {
              display: "flex",
              height: "100%",
              flexDirection: "column",
              py: "10px",
              alignItems: "center",
              justifyContent: matchesMobile ? "flex-start" : "center",
              width: { laptop: "380px", tablet: "43%", mobile: "100%" },
            },
            (theme) => ({
              background: `${theme.palette.primary.mainGradient}`,
            }),
          ]}
        >
          <AuthLogo />

          <NewPassword />
        </Card>
      </Box>
    </Box>
  );
}
