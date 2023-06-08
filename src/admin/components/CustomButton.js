import { Typography, Box } from "@mui/material";

const CustomButton = ({ btnStyle, onClick, getAccountStatement }) => {
  const classes = {
    mainBox: [
      {
        width: "200px",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        height: "35px",
        background: "#0B4F26",
        alignSelf: "end",
        marginRight: "10px",
        cursor: "pointer",
      },
      btnStyle,
    ],
    mainBoxTypographysx: {
      fontSize: { mobile: "12px", tablet: "16px", laptop: "16px" },
      color: "white",
      fontWeight: "600",
    },
  };

  return (
    <Box sx={classes.mainBox} onClick={onClick}>
      <Typography sx={classes.mainBoxTypographysx}>Load</Typography>
    </Box>
  );
};
export default CustomButton;
