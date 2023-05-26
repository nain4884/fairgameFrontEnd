import React from "react";
import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery, Box, Menu, MenuItem } from "@mui/material";
import { BallStart, INDIA, Lock, PAKISTAN, TIME, UD } from "../../assets/index";
import "../../components/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setColorValue } from "../../store/selectedColorBox";
import { useState, useContext } from "react";
import { StyledImage } from "../../components";
import { Popover } from "react-tiny-popover";
import { DeleteIcon, LOCKED, LOCKOPEN, LockSolid } from "../../admin/assets";
import { Background, DailogModal } from "../../components/index";
import { useLocation } from "react-router-dom";
import FullAllBets from "../../components/FullAllBets";
import AddNotificationModal from "../../components/AddNotificationModal";
import { setDailogData } from "../../store/dailogModal";
import Odds from "./matches/Odds";
import SessionMarket from "./matches/SessionMarket";
import BookMarketer from "./matches/BookMaketer";
import { useEffect } from "react";
import { setRole } from "../../newStore";
import { setSelectedMatch } from "../../newStore/reducers/matchDetails";
import { SocketContext } from "../../context/socketContext";

let matchOddsCount = 0;
const DeleteBet = ({ }) => {
  const { socket, socketMicro } = useContext(SocketContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const location = useLocation();
  const matchId = location?.state?.matchId;
  const { axios } = setRole();

  const [IObets, setIObtes] = useState([]);
  const [marketId, setMarketId] = useState("");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const { selectedMatch } = useSelector((state) => state?.matchDetails);
  const [currentMatch, setCurrentMatch] = useState(selectedMatch);
  const [matchOddsLive, setMacthOddsLive] = useState([]);
  const [bookmakerLive, setBookmakerLive] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);
  const [matchDetail, setMatchDetail] = useState();


  useEffect(() => {
    if (socketMicro && socketMicro.connected && marketId) {
      socketMicro.emit("init", { id: marketId });
      // activateLiveMatchMarket();

      socketMicro.on("reconnect", () => {
        socket.emit("init", { id: marketId });
      });
      socketMicro.on(`matchOdds${marketId}`, (val) => {
        // matchodds Market live and stop disable condition
        if (val !== null) {
          if (val.length === 0) {
            matchOddsCount += 1;
            if (matchOddsCount >= 3) {
              socketMicro.emit("disconnect_market", {
                id: marketId,
              });
              // socketMicro.disconnect();
            }
          } else {
            // dispatch(setMatchOddsLive(val[0]));
            setMacthOddsLive(val[0]);
            console.log("setMatchOddsLive :", val[0]);
            if (val[0]?.status === "CLOSED") {
              socketMicro.emit("disconnect_market", {
                id: marketId,
              });
            }
          }
        }
      });
      socketMicro.on(`bookmaker${marketId}`, (val) => {
        if (val !== null) {
          // console.log("val 222:", val);
          if (val.length > 0) {
            // dispatch(setBookMakerLive(val[0]));
            setBookmakerLive(val[0]);
          }
        }
      });
    }

    return () => {
      socketMicro?.emit("disconnect_market", {
        id: marketId,
      });
    };
  }, [socketMicro, marketId]);

  async function getThisMatch(id) {
    try {
      const response = await axios.get(`/game-match/matchDetail/${id}`);

      let matchOddsDataTemp = response.data?.bettings?.filter(
        (element) => element.sessionBet === false
      );

      setManualBookmakerData(matchOddsDataTemp);

      //   setSessionExposure(response?.data?.sessionExposure);
      setCurrentMatch({
        ...response.data,
      });

      dispatch(
        setSelectedMatch({
          ...response.data,
        })
      );
      //TODO
      //   dispatch(
      //     setManualBookMarkerRates({
      //       matchId: response.data.id,
      //       teamA: response.data.teamA_rate ? response.data.teamA_rate : 0,
      //       teamB: response.data.teamB_rate ? response.data.teamB_rate : 0,
      //     })
      //   );

      setMarketId(response.data.marketId);
      setMatchDetail(response.data);

      //TODO
      //   dispatch(
      //     setAllSessionBets(
      //       response?.data?.betting?.filter((v) => v?.sessionBet === true) || []
      //     )
      //   );
    } catch (e) {
      console.log("response", e.response.data);
    }
  }


  async function getAllBetsData(val) {
    let payload = {
      match_id: val,
      user_id: currentUser?.id,
    };
    try {
      let { data } = await axios.post(`/betting/getPlacedBets`, payload);

      setIObtes(
        data?.data?.data?.filter((b) =>
          ["MATCH ODDS", "BOOKMAKER", "MANUAL BOOKMAKER"].includes(
            b?.marketType
          )
        )
      );

    } catch (e) {
      console.log(e);
    }
  }

  console.log("currentMatch", IObets);
  useEffect(() => {
    if (matchId !== undefined) {
      getThisMatch(matchId);
      getAllBetsData(matchId)
    }
  }, [matchId]);



  //TODO
  // const PlaceBetComponent = () => {
  //     const [anchorEl, setAnchorEl] = useState(null);
  //     const handleClick = (event) => {
  //         setAnchorEl(event.currentTarget);
  //     };
  //     const handleClose = () => {
  //         setAnchorEl(0);
  //     };
  //     return (
  //         <>
  //             <Box onClick={e => handleClick(e)} sx={{ background: "#0B4F26", flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center', width: { laptop: "90px", mobile: '80px' }, borderRadius: '5px', height: '35px', left: '35px', position: 'absolute' }} >
  //                 <Box sx={{ background: "#FDF21A", borderRadius: '3px', width: "90%", height: '45%', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
  //                     <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: 'bold', color: "#FF4D4D" }}>Total Bet : <span style={{ color: "#0B4F26" }} >250</span></Typography>
  //                 </Box>
  //                 <Box >
  //                     <Typography sx={{ fontSize: { laptop: '10px', mobile: "8px" }, fontWeight: '500', color: "white" }}>Profit/Loss</Typography>

  //                 </Box>
  //             </Box >
  //             <DropdownMenu open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} />

  //         </>
  //     )
  // }

  // const menutItems = [{ title: "Account Statement" }, { title: "Profile Loss Report" }, { title: "Bet History" }, { title: "Unsetteled Bet" }, { title: "Casino Report History" }, { title: "Set Button Values" }, { title: "Security Auth Verfication" }, { title: "Change Password" }]

  const [mode, setMode] = useState(false);
  const CustomButton = () => {
    return (
      <Box
        onClick={() => {
          if (mode) {
            setVisible(true);
          } else {
            setMode(!mode);
          }
        }}
        sx={{
          width: "150px",
          marginY: ".75%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          background: "#E32A2A",
          height: "35px",
          border: "1.5px solid white",
          display: "flex",
          alignSelf: "flex-end",
        }}
      >
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "13px",
            color: "white",
            marginRight: "10px",
          }}
        >
          {mode ? "Delete" : "Delete Bet"}
        </Typography>
        <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
      </Box>
    );
  };
  const CancelButton = () => {
    return (
      <Box
        onClick={() => {
          setMode(!mode);
        }}
        sx={{
          width: "150px",
          marginY: ".75%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          background: "#f1c550",
          height: "35px",
          border: "1.5px solid white",
          display: "flex",
          alignSelf: "flex-end",
        }}
      >
        <Typography
          style={{
            fontWeight: "600",
            fontSize: "13px",
            color: "black",
            marginRight: "10px",
          }}
        >
          {"Cancel"}
        </Typography>
      </Box>
    );
  };
  const dispatch = useDispatch();
  return (
    <Background>
      <AddNotificationModal
        value={value}
        title={"Add Remark"}
        visible={visible}
        onDone={() => {
          dispatch(
            setDailogData({
              isModalOpen: true,
              showRight: true,
              bodyText: "Deleted Sucessfully",
            })
          );
        }}
        setVisible={() => {
          setVisible(false);
          setMode(!mode);
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              paddingTop: "2%",
              alignSelf: "start",
            }}
          >
            {currentMatch?.teamA} V/S {currentMatch?.teamB}
          </Typography>
          {currentMatch?.apiMatchActive && <Odds
            currentMatch={currentMatch}
            // matchOddsLive={matchOddsLive}
            data={
              matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
            }
          // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
          />
          }
          {currentMatch?.apiBookMakerActive && <BookMarketer
            currentMatch={currentMatch}
            data={
              bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
            }

          />}
          {(currentMatch?.apiSessionActive ||
            currentMatch?.manualSessionActive) && <SessionMarket
              currentMatch={currentMatch}
              data={[]}
            />}
        </Box>
        <Box sx={{ width: "20px" }} />
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            {mode && <CancelButton />}
            <Box sx={{ width: "2%" }}></Box>
            <CustomButton />
          </Box>
          <FullAllBets IObets={IObets} mode={mode} tag={false} />
        </Box>
      </Box>
      <DailogModal />
    </Background>
  );
};

export default DeleteBet;
