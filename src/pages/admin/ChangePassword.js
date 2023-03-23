import { Box } from "@mui/system";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Background } from "../../components";
import { ChangePasswordComponent } from "../matches/ChangePassword";
import { TransPasswordComponent } from "../matches/TransPasswordComponent";

export default function ChangePassword() {
  const [drawer, setDrawer] = useState(false);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  return (
    <Background>
      {/* <Header /> */}
      <Box flex={1} sx={[{ flex: 1, display: "flex" }, (theme) => ({})]}>
        {window.location.pathname === "/fairgame_wallet/createTransPassword"?<TransPasswordComponent />:<ChangePasswordComponent />}
      </Box>
    </Background>
  );
}
