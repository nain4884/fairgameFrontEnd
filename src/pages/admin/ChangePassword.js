import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { toast } from "react-toastify";
import { Background } from "../../components";
import ChangePasswordComponent from "../../components/ChangePasswordComponent";
import { TransPasswordComponent } from "../../components/TransPasswordComponent";
import { setRole } from "../../newStore";

export default function ChangePassword() {
  const [passLoader, setPassLoader] = useState(false)
  const { axios } = setRole();
  const theme = useTheme();
  const changePassword = async (value) => {
    // alert(JSON.stringify(value))
    try {
      setPassLoader(true)
      const payload = {
        OldPassword: value[2].val,
        password: value[3].val,
        confirmpassword: value[4].val,
      };
      const { data } = await axios.post(
        `/fair-game-wallet/updateSelfPassword`,
        payload
      );

      if (data.message === "Password update successfully.") {
        toast.success("Password update successfully.");
      }
    } catch (e) {
      // console.log(e.response.data.message);
      toast.error(e.response.data.message);
    } finally {
      setPassLoader(false)
    }
  }
  return (
    <Background>
      {/* <Header /> */}
      <Box flex={1} sx={[{ flex: 1, display: "flex" }, (theme) => ({})]}>
        {/createTransPassword/.test(window.location.pathname) ? <TransPasswordComponent /> : <ChangePasswordComponent passLoader={passLoader} changePassword={changePassword} />}
      </Box>
    </Background>
  );
}
