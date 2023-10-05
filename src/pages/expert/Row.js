import { Box, Typography } from "@mui/material";
import CusButton from "./CusButton";
import { useContext, useEffect, useState } from "react";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import { setDailogData } from "../../store/dailogModal";
import { setRole } from "../../newStore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithSwitch from "./ButtonWithSwitch";
import { toast } from "react-toastify";
import {
  setAllBetRate,
  setSessionResultRefresh,
} from "../../newStore/reducers/expertMatchDetails";
import ButtonWithSwitchBookmaker from "./ButtonWithSwitchBookmaker";
import ModalMUI from "@mui/material/Modal";
import moment from "moment";
import { memo } from "react";
import { StyledImage } from "../../components";

const Row = ({
  index,
  containerStyle,
  data,
  updatedBookmaker,
  sessionData,
  selected,
  changeSelected,
  mode,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axios } = setRole();
  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: { field: "apiMatchActive", val: data?.apiMatchActive || false },
    2: {
      field: "apiBookMakerActive",
      val: data?.apiBookMakerActive || false,
    },
    3: {
      field: "apiSessionActive",
      val: data?.apiSessionActive || false,
    },
    5: {
      field: "manualSessionActive",
      val: data?.manualSessionActive || false,
    },
    4: {
      field: "manualBookMakerActive",
      val: data?.manualBookMakerActive || false,
    },
  });
  const { userAllMatches } = useSelector((state) => state?.matchDetails);
  const [showPopup, setShowPopup] = useState(false);
  const [sessionResults, setSessionResults] = useState([]);
  const [updateBookmaker, setUpdateBookmaker] = useState([]);

  useEffect(() => {
    if (data) {
      const newBody = data?.bookmakers?.map((b) => ({
        id: b?.id,
        marketName: b?.marketName,
        betStatus: [0, null].includes(b?.betStatus) ? false : true,
      }));
      setUpdateBookmaker(newBody);
      setUpdateMatchStatus((prevStatus) => ({
        ...prevStatus,
        1: { ...prevStatus[1], val: data?.apiMatchActive || false },
        2: { ...prevStatus[2], val: data?.apiBookMakerActive },
        3: { ...prevStatus[3], val: data?.apiSessionActive || false },
        4: { ...prevStatus[4], val: data?.manualBookMakerActive || false },
        5: { ...prevStatus[5], val: data?.manualSessionActive || false },
      }));
    }
  }, [data]);

  function showDialogModal(isModalOpen, showRight, message, navigateTo, state) {
    dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }));
    setTimeout(() => {
      dispatch(setDailogData({ isModalOpen: false }));
      navigate(
        `/${window.location.pathname.split("/")[1]}/${navigateTo}`,
        state
      );
    }, [500]);
  }
  const { socket, socketMicro } = useContext(SocketContext);
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [loading, setLoading] = useState({ val: false, id: "" });

  useEffect(() => {
    if (socketMicro && socketMicro.connected) {
      const marketId = sessionStorage.getItem("marketId");
      if (marketId !== null) {
        socketMicro?.emit("disconnect_market", {
          id: marketId,
        });
        // socketMicro.disconnect();
        sessionStorage.removeItem("marketId");
      }
    }
  }, [socketMicro]);

  async function submitMatchUpdation() {
    setLoading({ val: true, id: data.id });
    let defaultMatchStatus = {
      apiMatchActive: false,
      apiBookMakerActive: false,
      apiSessionActive: false,
      manualBookMakerActive: false,
      manualSessionActive: false,
      quick_bookmaker: updateBookmaker?.map((bookmaker) => {
        return {
          id: bookmaker.id,
          betStatus: bookmaker.betStatus === false ? 0 : 1,
        };
      }),
    };
    let i;
    for (i = 0; i < 5; i++) {
      if (updateMatchStatus[i + 1].field === "apiMatchActive")
        defaultMatchStatus.apiMatchActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "apiBookMakerActive")
        defaultMatchStatus.apiBookMakerActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "apiSessionActive")
        defaultMatchStatus.apiSessionActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "manualBookMakerActive")
        defaultMatchStatus.manualBookMakerActive = updateMatchStatus[i + 1].val;
      if (updateMatchStatus[i + 1].field === "manualSessionActive")
        defaultMatchStatus.manualSessionActive = updateMatchStatus[i + 1].val;
    }
    let payload = {
      matchId: data.id,
      ...defaultMatchStatus,
    };

    sessionStorage.setItem("matchId", data.id);
    dispatch(setAllBetRate([]));
    try {
      let response = await axios.post(
        `/game-match/updateMatchActiveStatus`,
        payload
      );
      if (response.data.message === "Match update successfully.") {
        setLoading({ val: false, id: "" });
        toast.success(response.data.message);
        showDialogModal(true, true, response.data.message, "betodds", {
          state: { id: data.id, marketId: data.marketId },
        });
      }
    } catch (e) {
      setLoading({ val: false, id: "" });
      console.log(e);
      toast.error(e.response?.data?.message);
      showDialogModal(true, false, e.response.data.message);
    }
  }

  const navigateToAddBet = () => {
    navigate("/expert/addBet", {
      state: { id: data.id, marketId: data.marketId, gameType: data.gameType },
    });
  };

  const handleClickOnMatchProfitLoss = async (match_id) => {
    try {
      setShowPopup(true);
      let response = await axios.get(`/game-match/getResults/${match_id}`);
      dispatch(setSessionResultRefresh(false));
      setSessionResults(response?.data?.data || []);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            height: "45px",
            background: "#FFE094",
            alignItems: "center",
            borderBottom: "2px solid white",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={{
            display: "flex",
            width: "100px",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>({index})</Typography>
          <Typography
            sx={{ fontSize: "9px", padding: "4px", fontWeight: "700" }}
          >
            {moment(data?.startAt).format("DD-MM-YYYY")} <br />
            {moment(data?.startAt).format("LT")}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
          }}
        >
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <ButtonWithSwitch
              title={data.title}
              containerStyle={{ width: "20%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={1}
            />
            <ButtonWithSwitch
              title="Bookmaker"
              containerStyle={{ width: "14%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={2}
            />
            <ButtonWithSwitch
              title="Session"
              containerStyle={{ width: "14%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={3}
            />
            {updateBookmaker?.map((bookmaker, idx) => {
              return (
                <ButtonWithSwitchBookmaker
                  key={idx}
                  title={bookmaker.marketName}
                  containerStyle={{ width: "14%" }}
                  updateBookmaker={updateBookmaker}
                  setUpdateBookmaker={setUpdateBookmaker}
                  id={bookmaker.id}
                />
              );
            })}
            {/* <ButtonWithSwitch
            title={`Quick\nBookmaker`}
            containerStyle={{ width: "14%" }}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={4}
          /> */}
            <ButtonWithSwitch
              title={`Manual\nSession`}
              containerStyle={{ width: "14%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={5}
            />
            {data?.stopAt && (
              <ButtonWithSwitch
                onClick={handleClickOnMatchProfitLoss}
                notSwitch={true}
                id={data?.id}
                title={`Match Profit/Loss`}
                containerStyle={{ width: "18%" }}
                updateMatchStatus={data?.matchProfitLoss}
              />
            )}
          </Box>
          <CusButton
            loading={loading.id === data.id}
            onClick={() => {
              submitMatchUpdation();
            }}
            title={"Submit"}
          />
        </Box>
      </Box>
      <ModalMUI
        open={showPopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              alignSelf: "center",
              width: { mobile: "90%", laptop: "50%" },
            }}
          >
            <Box
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                px: "10px",
                py: "6px",
                backgroundColor: "#F8C851",
              }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                sx={{ alignItems: "center" }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      mobile: "14px",
                      laptop: "18px",
                      tablet: "18px",
                    },
                    color: "#000",
                    marginRight: {
                      mobile: "10px",
                      laptop: "20px",
                      tablet: "20px",
                    },
                  }}
                >
                  Session Results
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup((prev) => !prev);
                }}
              >
                &times;
              </Typography>
            </Box>
            <Box sx={{ border: "2px solid #FFFFFF" }}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    Overs
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "#303030",
                    width: "20%",
                    borderLeft: "2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    RESULT
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "#303030",
                    width: "20%",
                    borderLeft: "2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    COMMISSION
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "#303030",
                    width: "20%",
                    borderLeft: "2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    PROFIT/LOSS
                  </Typography>
                </Box>
              </Box>
              {sessionResults?.length > 0 &&
                sessionResults?.map((item, index) => {
                  let profit_loss = parseInt(item.profit_loss);
                  return (
                    <Box
                      key={item?.bet_id?.id}
                      display={"flex"}
                      sx={{
                        borderTop: "2px solid white",
                        background: "#FFFFFF",
                      }}
                    >
                      <Box
                        sx={{
                          background: "#FFFFFF",
                          width: "60%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "14px",
                            px: "5px",
                          }}
                        >
                          {item?.bet_id?.bet_condition}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: "#ECECEC",
                          width: "20%",
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "14px" }}
                        >
                          {item?.score}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: "#FFFFFF",
                          width: "20%",
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "14px" }}
                        >
                          {item?.commission ?? "NaN"}
                        </Typography>
                      </Box>
                      {profit_loss > 0 ? (
                        <Box
                          sx={{
                            background: "#10DC61",
                            width: "20%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "white",
                            }}
                          >
                            {profit_loss}
                            <StyledImage
                              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                              sx={{
                                height: "15px",
                                marginLeft: "5px",
                                filter:
                                  "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                                width: "15px",
                              }}
                            />
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: "#FF4D4D",
                            width: "20%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "white",
                            }}
                          >
                            {profit_loss}
                            <StyledImage
                              src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                              sx={{
                                height: "15px",
                                marginLeft: "5px",
                                filter:
                                  "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                                width: "15px",
                              }}
                            />
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
            </Box>
          </Box>
          {/* <h1>Heading</h1> */}
        </Box>
      </ModalMUI>
    </>
  );
};
export default memo(Row);
