import { Box, Typography } from "@mui/material"
import { memo } from "react"

const BookButton = ({ rate }) => {
    // alert(match)
    return (
        <Box
            sx={{
                width: { laptop: "40%", mobile: "50px", tablet: "40%" },
                // position: "absolute",
                marginRight: '5px',
                flexDirection: "column",
                paddingX: "5px",
                display: "flex",
                left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
                justifyContent: "center",
                alignItems: "center",
                height: "30px",
                background: "white",
                borderRadius: "3px",
                border: "2px solid transparent"
            }}
        >
            <Typography
                sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: rate < 0 ? `#FF4D4D` : `#319E5B`,
                }}
            >
                {rate < 0 ? ` ${rate}` : `${rate}`}
            </Typography>
        </Box>
    )
}

export default memo(BookButton)