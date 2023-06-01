import { Box } from "@mui/system";
import { FASTTIME } from "../assets";
import LiveMarket from "./CommonMasterAdminLayout/LiveMarket";
import { memo } from "react";

const FastTime = ({ data, setShowFastTimeBox, session, setFastAmount }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center",justifyContent:"flex-end" ,cursor: "pointer" ,width:"100%"}}>
      {/* <Typography
          sx={{
            fontSize: { mobile: "10px", laptop: "12px" },
            fontWeight: "bold",
            textAlign: "center",
            color: "#FF4949",
            width: { mobile: "40px", laptop: "80px" },
          }}
        >
          {data ? data :""}
  
        </Typography> */}
      {data ? (
        <LiveMarket
          onClick={() => {
            if (session === "sessionOdds") {
              setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
            } else if (session === "manualBookMaker") {
              setFastAmount((prev) => ({ ...prev, mannualBookMaker: 0 }));
            } else if (session === "bookmaker") {
              setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
            }
          }}
          title={data}
          boxStyle={{
            backgroundColor: "transparent",
            borderRadius: "3px",
            fontSize: "20px",
            justifyContent: "center",
            cursor: "pointer",
            alignItems: "center",
          }}
        />
      ) : (
        " "
      )}
      {!data && (
        <img
          style={{ width: "30px", height: "30px" }}
          src={FASTTIME}
          onClick={() => setShowFastTimeBox((prev) => !prev)}
        />
      )}
    </Box>
  );
};

export default memo(FastTime);
