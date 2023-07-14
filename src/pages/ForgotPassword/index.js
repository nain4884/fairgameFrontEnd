import { Card, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mail } from "../../assets";
import {
  Input,
  CustomButton,
  AuthLogo,
  AuthBackground,
} from "../../components";

export default function ForgotPassword() {

  const theme = useTheme();
  const navigate = useNavigate();

  const ForgotPassword = () => {
    return (
      <>
        <Typography
          variant="header"
          sx={{
            fontSize: { laptop: "20px", mobile: "22px" },
            marginTop: matchesMobile ? "100px" : "1vh",
          }}
        >
          Forgot Password?
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
          Enter the email associated with your account.
        </Typography>
        <Box
          sx={{
            width: { laptop: "55%", mobile: "75%", marginTop: "20px" },
            opacity: 1,
          }}
        >
          <Input placeholder={"Enter Username"} title={"Username"} img={mail} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginY: "1vh",
              marginTop: "4vh",
            }}
          >
            <CustomButton
              onClick={() => {
                navigate("/verification");
              }}
              buttonStyle={{ background: theme.palette.button.main }}
              title="Next"
            />
          </Box>
        </Box>
      </>
    );
  };

  const matchesMobile = useMediaQuery(theme.breakpoints.down("tablet"));

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
          <ForgotPassword />
        </Card>
      </Box>
    </Box>
  );
}
