import React from 'react'
import {Box, Checkbox, Typography} from '@mui/material'
import ReCAPTCHA from "react-google-recaptcha"
import {Re} from '../assets'
import { REACT_APP_SITE_KEY } from './constants'
export default function ReCAPTCHACustom({containerStyle}){
    const recaptchaRef=React.useRef(null)
    const [checked,setChecked]=React.useState(false)
    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef.current.execute();
        console.log(token)
     
        // apply to form data
      }
    return(
        <Box sx={[{ backgroundColor: "white", display: "flex", alignItems: "center", height: { laptop: "45px", mobile: "50px" }, overflow: "hidden", marginTop: "1px", borderRadius: "10px" }, containerStyle]}>
        <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        type="image"
        sitekey={REACT_APP_SITE_KEY}
        onChange={(token)=>{console.log(token)}}
      />
      <Checkbox checked={checked} onChange={(e)=>{
        console.log(e.target.checked)
        setChecked(e.target?.checked)
        onSubmitWithReCAPTCHA()
      }} />
      <Typography sx={{fontSize:"12px",flex:1,textAlign:"left",marginLeft:"-5px"}}>I'm not a robot</Typography>
      <img  src={Re} style={{height:"35px",width:"35px"}}/>
      </Box>
    )
}