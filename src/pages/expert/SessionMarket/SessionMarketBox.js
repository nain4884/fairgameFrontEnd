import React from "react";
import Divider from "../../../components/helper/Divider";
import { Box, Typography, useMediaQuery } from "@mui/material";
import SeperateBox from "../SeperateBox";
import SmallBox from "../SmallBox";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import { setRole } from "../../../newStore";
import PlaceBetComponentWeb from "./PlaceBetComponentWeb";
import Result from "../Result";
import SessionResultModal from "../../../components/SessionResultModal";
import { formatNumber } from "../../../components/helper/helper";
import { useDispatch } from "react-redux";
import { setSelectedMatch } from "../../../newStore/reducers/expertMatchDetails";
import CustomSessionResult from "../../../components/CustomSessionResult";

const SessionMarketBox = ({
  index,
  stop,
  setCurrentMatch,
  currentMatch,
  newData,
  setStop,
  liveOnly,
  setLocalState,
  setLiveData,
  setMatchSessionData,
  updateSessionData,
  hideResult,
  hideTotalBet,
  setData,
  setIObtes,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { axios } = setRole();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
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
        betStatus: status,
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
              return [data.data, ...prev];
            }
            return prev;
          });
        }
        // setLocalState(() => {
        //   const updatedBettings = currentMatch?.bettings.map(
        //     (betting, index) => {
        //       if (betting.selectionId === data?.data?.selectionId) {
        //         return (betting[index] = data?.data);
        //       } else if (betting.id === data?.data?.id) {
        //         return (betting[index] = data?.data);
        //       }
        //       return betting;
        //     }
        //   );
        //   return {
        //     ...currentMatch,
        //     bettings: updatedBettings,
        //   };
        // });
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
            height: "30px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { laptop: "10px", tablet: "10px", mobile: "8px" },
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
            top: "2px",
            width: "30%",
            justifyContent: "flex-end",
            left: { laptop: "23vh", tablet: "24vh" },
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
              // width={"80px"}
              width={"33px"}
            // title={"Live"}
            />
          )}
          {!hideResult && (
            <Result
              width={7}
              onClick={(e) => {
                setVisible(true);
              }}
            />
          )}
        </Box>

        {/* {visible && (
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
              visible={visible}
              setIObtes={setIObtes}
              setLocalState={setLocalState}
              currentMatch={currentMatch}
              setLive={setLive}
              updateSessionData={updateSessionData}
              onClick={() => {
                setVisible(false);
              }}
            />
          </Box>
        )} */}
        {visible && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 105,
              top: 0,
              right: 0,
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <CustomSessionResult
              newData={newData}
              visible={visible}
              setIObtes={setIObtes}
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
              height: "40px",
              right: "20.5%",
              position: "absolute",
              width: { laptop: "18%", mobile: "18%" },
              justifyContent: { mobile: "center", laptop: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <img src={BallStart} style={{ width: '113px', height: "32px" }} /> */}
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "12px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                fontWeight: '400'
              }}
            >
              {newData?.betStatus === 2
                ? `Result Declared`
                : newData?.suspended}
            </h6>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "30px",
              marginLeft: "4vh",
              width: { laptop: "43%", mobile: "60%" },
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <SeperateBox
              session={true}
              back={true}
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
              value={newData?.yes_rate}
              value2={formatNumber(newData?.rate_percent?.split("-")[1])}
              lock={newData?.suspended === "suspended"}
              color={"#B3E0FF"}
            />

            {/* {
                            index != 1 && index !== 2 &&
                            <Box sx={{
                                width: '100%', marginLeft: '-2px', display: 'flex', position: 'absolute', height: '100%', background: 'rgba(0,0,0,1)', justifyContent: 'center ', alignItems: 'center'
                            }}>
                                <img src={BallStart} style={{ width: '60px', height: '19px' }} />
                            </Box>
                        } */}
          </Box>
        )}
        {!hideTotalBet && (
          <PlaceBetComponentWeb width={7} newData={newData} setData={setData} />
        )}
      </Box>
      <Divider />
    </div>
  );
};

export default SessionMarketBox;
