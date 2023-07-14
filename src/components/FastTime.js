import { Box } from "@mui/system";
import { FASTTIME } from "../assets";
import LiveMarket from "./CommonMasterAdminLayout/LiveMarket";
import { memo } from "react";

const FastTime = ({
  data,
  setShowFastTimeBox,
  session,
  setFastAmount,
  setPlaceBetData,
}) => {
  return (
    <Box
      title="Faster Bet"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        cursor: "pointer",
        width: "100%",
      }}
    >
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
            fontSize: "22px",
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
          onClick={() => {
            if (setPlaceBetData !== undefined) {
              setPlaceBetData(null);
            }
            setShowFastTimeBox((prev) => !prev);
          }}
        />
      )}
    </Box>
  );
};

export default memo(FastTime);
