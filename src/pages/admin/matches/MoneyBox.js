import { useTheme } from "@emotion/react"
import { Box, Typography, useMediaQuery } from "@mui/material"

const MoneyBox = ({ color, rates }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{
            width: "85px",
            marginRight: { mobile: "5px", laptop: "15px" },
            border: "1px solid #2626264D",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "25px",
            background: "#F6F6F6",
            borderRadius: "7px",
            zIndex: 100,
        }}>
            <Typography sx={{ fontSize: matchesMobile ? '11px' : '13px', fontWeight: 'bold', color: color }} >{rates}</Typography>

        </Box>
    )
}

export default MoneyBox