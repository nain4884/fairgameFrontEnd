import React from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { Re } from "../../assets";
import { REACT_APP_SITE_KEY } from "./constants";
export default function ReCAPTCHACustom({
  containerStyle,
  onSubmitWithReCAPTCHA,
}) {
  const recaptchaRef = React.useRef(null);

  return (
    <Box
      sx={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        type="image"
        sitekey={REACT_APP_SITE_KEY}
        onChange={onSubmitWithReCAPTCHA}
      />
    </Box>
  );
}
