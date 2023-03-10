import { TextField, useMediaQuery, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { SEARCH } from "../admin/assets";
import { Search } from "../assets";
import StyledImage from "./StyledImage";

const SearchInput = ({ placeholder, inputContainerStyle, showTextInput, header,show ,searchContainerStyle}) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))

    return (
        <Box sx={[{ backgroundColor: { mobile: (showTextInput || show) ? "white" : "transparent", laptop: "white" }, minWidth: { laptop: header ? '10vw' : "17vw", mobile: '0vw' }, display: "flex", alignItems: "center", boxShadow: "0px 3px 10px #B7B7B726", height: { laptop: "35px", mobile: "35px" }, overflow: "hidden", paddingX: "5px", borderRadius: "35px" }, inputContainerStyle]}>
            {(!matchesMobile || show) && <TextField

                variant="standard"
                placeholder={placeholder}

                InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "12px", fontWeight: "600", fontStyle: "italic", color: 'black' },
                    // sx={{"label":{color:'red'}}}
                }}

                sx={{ borderColor: "white", display: "flex", flex: 1, marginLeft: "5px", fontSize: { laptop: "10px", mobile: "8px" } }} />}
            {showTextInput && <TextField
                variant="standard"
                placeholder={placeholder}
                InputProps={{
                    disableUnderline: true,
                    style: { fontSize: "12px", fontWeight: "600", fontStyle: "italic" }
                }}

                sx={{ borderColor: "white", display: "flex", flex: 1, marginLeft: "5px", fontSize: { laptop: "10px", mobile: "8px" } }} />}
            <Box sx={[{ height: "30px", width: "30px", borderRadius: "20px", border: '1px solid white', display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", marginRight: -.3 },searchContainerStyle]}>
                <StyledImage src={header ? SEARCH : Search} sx={{ height: "40%", width: "auto" }} />
            </Box>
        </Box>
    )
}

export default SearchInput