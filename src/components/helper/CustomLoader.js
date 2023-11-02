import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import "./styles.css";
const CustomLoader = ({ text ,height,width }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width:width ? width: "100%",
        flex: 1,
        height: height? height :"74%",
        // height: { mobile: "74%", tablet: "74%" },
        alignItems: "center",
        flexDirection: "column",
      }}
    >
 
      <div className="loading-wrap">
        <div className="loading">
          <div></div>
          <div></div>
        </div>
        
      </div>
     <Typography sx={{marginTop:"-40px"}} >{text}</Typography>
  
      {/* <Typography sx={{ color: "text.white" }}>{text}</Typography> */}
    </Box>
  );
};

export default memo(CustomLoader);
