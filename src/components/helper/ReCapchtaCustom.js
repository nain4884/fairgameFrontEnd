import { Box } from "@mui/material";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
