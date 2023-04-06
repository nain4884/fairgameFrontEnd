import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const LiveMarket = ({ title, boxStyle, titleStyle, onClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const colors = ["#ff0000", "#ffa500", "#ffff00", "orange", "#0000ff", "#4b0082", "#ee82ee"]
    useEffect(() => {
        let i = setInterval(() => {
            setCurrentIndex(state => {
                if (state < 6) {
                    return state + 1
                } else {
                    return 0
                }
            })
        }, 1000)
        return () => {
            clearInterval(i)
        }
    }, [])
    const classes = {
        mainBoxsx: [{ paddingX: "0.5%", display: "flex", height: "28px", alignItems: "center", background: "red", justifyContent: "center" }, boxStyle],
        mainBoxTypography: [{ fontSize: "11px", lineHeight: "12px", fontWeight: "bold", color: colors[currentIndex], fontFamily: "Montserrat" }, titleStyle]
    }
    return (
        <Box onClick={e => {
            onClick()
        }} sx={classes.mainBoxsx}>
            <Typography sx={classes.mainBoxTypography}>{title}</Typography>
        </Box>
    )
}

export default LiveMarket