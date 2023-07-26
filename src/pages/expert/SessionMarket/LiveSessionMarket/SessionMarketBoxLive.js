import React from "react";
import { Box, Typography } from "@mui/material";
import SeperateBox from "../../SeperateBox";
import SmallBox from "../../SmallBox";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import Result from "../../Result";
import SessionResultModal from "../../../../components/SessionResultModal";
import { formatNumber } from "../../../../components/helper/helper";
import { setRole } from "../../../../newStore"
import Divider from "../../../../components/helper/Divider";

const SessionMarketBoxLive = ({
  index,
  stop,
  currentMatch,
  newData,
  setStop,
  liveOnly,
  setLocalState,
  setMatchSessionData,
  updateSessionData,
  hideResult,
}) => {
  const theme = useTheme();
  const { axios } = setRole();
  const [visible, setVisible] = useState(false);
  const [live, setLive] = useState(
    [0, 2].includes(newData?.betStatus) ? true : false
  );

  useEffect(() => {
    if (!stop) {
      setLive(true);
    }
  }, [stop]);

  const handleLive = async (status) => {
    try {
      if (status === 1) {
        setLive(false);
        setStop(true);
      } else {
        setLive(true);
      }
      const body = {
        match_id: currentMatch?.id,
        matchType: currentMatch?.gameType,
        id: newData?.id ? newData?.id : "",
        selectionId: newData?.selectionId,
        betStatus: 1,
        sessionBet: true,
        bet_condition: newData?.bet_condition,
        no_rate: newData?.no_rate,
        yes_rate: newData?.yes_rate,
        rate_percent: newData?.rate_percent,
        suspended: newData?.suspended,
        // "teamA_lay": 18,
        // "teamB_lay": 15,
        // "teamA_Back": 10,
        // "teamB_Back": 4,
        // "drawRate": 10
      };
      const { data } = await axios.post("betting/addBetting", body);
      if (data?.data?.id) {
        if (liveOnly) {
          setLive(true);
          setMatchSessionData((prev) =>
            prev?.filter((v) => v?.selectionId !== data?.data?.selectionId)
          );
        } else {
          setMatchSessionData((prev) => {
            const exists = prev.some((v) => v?.id === data?.data?.id);
            if (!exists) {
              return [...prev,data.data];
            }
            return prev;
          });
        }
        setLocalState(() => {
          const updatedBettings = currentMatch?.bettings.map(
            (betting, index) => {
              if (betting.selectionId === data?.data?.selectionId) {
                return (betting[index] = data?.data);
              } else if (betting.id === data?.data?.id) {
                return (betting[index] = data?.data);
              }
              return betting;
            }
          );
          return {
            ...currentMatch,
            bettings: updatedBettings,
          };
        });
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err?.message);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {live && (
        <Box
          sx={{
            margin: "1px",
            width: { laptop: "100%", mobile: "100%" },
            height: "100%",
            right: 0,
            position: "absolute",
            background: "rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        ></Box>
      )}
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "30px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: "55%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "10px", tablet: "10px", mobile: "10px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {newData?.bet_condition}
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "5px",
            right: { laptop: "27%", tablet: "7vh" },
            display: "flex",
            zIndex: 100,
          }}
        >
          {live && newData?.betStatus !== 2 && (
            <SmallBox
              hide={true}
              onClick={(e) => {
                e.preventDefault();
                setLive(!live);
                handleLive(1);
              }}
              textSize={"8px"}
              width={"33px"}
              // title={"Go Live"}
              color={"#FF4D4D"}
            />
          )}
          {newData?.betStatus === 2 && newData?.betRestult && (
            <SmallBox
              hide={false}
              textSize={"12px"}
              width={"80px"}
              title={`Score : ${newData?.betRestult || 0}`}
              color={"#FFF"}
            />
          )}
          {!live && (
            <SmallBox
              hide={true}
              onClick={(e) => {
                e.preventDefault();
                setLive(!live);
                handleLive(0);
              }}
              textSize={"8px"}
              width={"33px"}
            // title={"Live"}
            />
          )}
          {!hideResult && (
            <Result
              onClick={(e) => {
                setVisible(true);
              }}
            />
          )}
        </Box>

        {visible && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 105,
              top: "100%",
              right: "0vh",
            }}
          >
            <SessionResultModal
              newData={newData}
              setLocalState={setLocalState}
              currentMatch={currentMatch}
              setLive={setLive}
              updateSessionData={updateSessionData}
              onClick={() => {
                setVisible(false);
              }}
            />
          </Box>
        )}

        {!["ACTIVE", "", undefined, null].includes(newData?.suspended) ||
          newData?.betStatus === 2 ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "30px",
              right: "0vh",
              position: "absolute",
              width: { laptop: "27%", mobile: "27%" },
              justifyContent: { mobile: "center", laptop: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}

            <Typography
              style={{
                fontSize: { mobile: "10px", laptop: "10px" },
                textTransform: "uppercase",
                textAlign: "center",
                width: "100%",
                color: "white",
                fontWeight: "400",
              }}
            >
              {newData?.betStatus === 2
                ? `Result Declared`
                : newData?.suspended}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "38px",
              // marginLeft: "40px",
              width: { laptop: "45%", mobile: "60%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeperateBox
              session={true}
              back={true}
              width={"30%"}
              value={newData?.no_rate}
              value2={formatNumber(newData?.rate_percent?.split("-")[0])}
              lock={newData?.suspended === "suspended"}
              color={"#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeperateBox
              session={true}
              width={"30%"}
              value={newData?.yes_rate}
              value2={formatNumber(newData?.rate_percent?.split("-")[1])}
              lock={newData?.suspended === "suspended"}
              color={"#B3E0FF"}
            />

          </Box>
        )}
      </Box>
      <Divider />
    </div>
  );
};

export default SessionMarketBoxLive;
