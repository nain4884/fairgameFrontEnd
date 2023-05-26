import { Box, Typography } from "@mui/material"

const SmallBox = ({ color, valueA, valueB }) => {
    return (
        // <Box sx={{ width: { laptop: '70px', mobile: '17vw' }, display: 'flex', marginRight: "5px", justifyContent: 'center', alignItems: 'center', height: '30px', background: 'white', borderRadius: '3px', flexDirection: 'column' }}>
        //     <Typography sx={{ fontSize: { laptop: '12px', mobile: '10px' }, fontWeight: 'bold', color: color ? color : '#46e080' }} >+Book.60</Typography>
        // </Box>
        <Box sx={{ marginLeft: { mobile: "34px", laptop: "12px", tablet: "12px" }, display: "flex", gap: "4px", }}>
            <Box
                sx={{
                    width: { laptop: "70px", mobile: "50px", tablet: "70px" },
                    // position: "absolute",
                    flexDirection: "column",
                    paddingX: "5px",
                    display: "flex",
                    left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    background: "white",
                    borderRadius: "3px",
                }}
            >
                <Typography sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold", }} > Book </Typography>
                <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: valueA < 0 ? `#FF9292` : `#46e080`, }} > {valueA < 0 ? ` ${valueA}` : `${valueA}`} </Typography>
            </Box>
            <Box
                sx={{
                    width: { laptop: "70px", mobile: "50px", tablet: "70px" },
                    // position: "absolute",
                    paddingX: "5px",
                    display: "flex",
                    flexDirection: "column",
                    left: { mobile: "65%", laptop: "55vw", tablet: "65%" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    background: "white",
                    borderRadius: "3px",
                }}
            >
                <Typography sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold", }} > Book </Typography>

                <Typography sx={{ fontSize: "10px", fontWeight: "bold", color: valueB < 0 ? `#FF9292` : `#46e080`, }} > {valueB < 0 ? ` ${valueB}` : `${valueB}`} </Typography>
            </Box>
        </Box>
    )
}

export default SmallBox