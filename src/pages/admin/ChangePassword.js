import { Box } from "@mui/system";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Background } from "../../components";
import { ChangePasswordComponent } from "../matches/ChangePassword";
import { TransPasswordComponent } from "../matches/TransPasswordComponent";

export default function ChangePassword() {
  const theme = useTheme();
  return (
    <Background>
      {/* <Header /> */}
      <Box flex={1} sx={[{ flex: 1, display: "flex" }, (theme) => ({})]}>
        {/createTransPassword/.test(window.location.pathname) ? <TransPasswordComponent /> : <ChangePasswordComponent />}
      </Box>
    </Background>
  );
}
