import { useTheme } from "@emotion/react"
import { Box, Typography, useMediaQuery } from "@mui/material"

const MoneyBox = ({ color, rates }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{
            width: '80px',
            borderRadius: "5px", justifyContent: 'center', position: matchesMobile ? 'absolute' : 'relative', right: matchesMobile ? '-90%' : '20px', alignItems: 'center', display: 'flex', height: '25px', borderRadius: '7px'
        }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 'bold', color: color }} >{rates}</Typography>

        </Box>
    )
}

export default MoneyBox