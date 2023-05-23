import { Box, Typography } from '@mui/material'
import React from 'react'
import { Down } from "../../fairGameWallet/assets";

const ButtonHead = ({ title, boxStyle, titleStyle, onClick, report, selected }) => {
    const classes = {
        mainBox: [{ justifyContent: 'space-between', paddingX: "0.5%", height: "28px", alignItems: 'center', display: 'flex', flexDirection: 'row',cursor:"pointer" }, boxStyle],
        mainBoxTypography: [{ fontSize: "10px", fontWeight: "bold", fontFamily: "Montserrat" }, titleStyle],
        mainBoxTypographyimgstyle: { width: selected ? '10px' : '0px', height: '6px', marginLeft: '4px', opacity: selected ? 1 : 0 }
    }
    return (
        <Box onClick={(e) => onClick(e)} sx={classes.mainBox}>
            <Typography sx={classes.mainBoxTypography}>{title}</Typography>
            {
                report && <img src={Down} style={classes.mainBoxTypographyimgstyle} />
            }
        </Box>
    )
}

export default ButtonHead