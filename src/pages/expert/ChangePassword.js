import { Box } from "@mui/system";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { Background } from "../../components";
import { TransPasswordComponent } from "../../components/TransPasswordComponent";
import ChangePasswordComponent from "../../components/ChangePasswordComponent";
import { toast } from "react-toastify";
import { setRole } from "../../newStore";

export default function ChangePassword() {
    const { axios } = setRole();
    const theme = useTheme();
    const changePassword = async (value) => {
        // alert(JSON.stringify(value))
        try {
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
        }
    }
    return (
        <Background>
            {/* <Header /> */}
            <Box flex={1} sx={[{ flex: 1, display: "flex" }, (theme) => ({})]}>
                <ChangePasswordComponent changePassword={changePassword} />
            </Box>
        </Background>
    );
}
