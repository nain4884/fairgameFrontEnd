import { Box, Typography } from "@mui/material"

const SmallBox = ({ color }) => {
    return (
        <Box sx={{ width: { laptop: '70px', mobile: '17vw' }, display: 'flex', marginRight: "5px", justifyContent: 'center', alignItems: 'center', height: '30px', background: 'white', borderRadius: '3px' }}>
            <Typography sx={{ fontSize: { laptop: '12px', mobile: '10px' }, fontWeight: 'bold', color: color ? color : '#46e080' }} >+Book.60</Typography>
        </Box>
    )
}

export default SmallBox