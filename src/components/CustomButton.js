import { Button } from "@mui/material";

export default function CustomButton({ onClick, title, buttonStyle }) {
    return (
        <Button onClick={onClick} variant="contained" color="secondary" sx={[ { width: "62%",height:{mobile:"50px",laptop:"43px"}, borderRadius: "10px", fontWeight: "500", textTransform: "none", fontSize: { laptop: "14px", mobile: "14px" } },buttonStyle]} >
            {title}
        </Button>
    )
}