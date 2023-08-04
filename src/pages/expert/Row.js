import { Box, Typography } from "@mui/material";
import CusButton from "./CusButton";
import { useContext, useEffect, useState } from "react";
import { GlobalStore } from "../../context/globalStore";
import { SocketContext } from "../../context/socketContext";
import { setDailogData } from "../../store/dailogModal";
import { setRole } from "../../newStore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ButtonWithSwitch from "./ButtonWithSwitch";
import { toast } from "react-toastify";
import ButtonWithSwitchBookmaker from "./ButtonWithSwitchBookmaker";

const Row = ({ index, containerStyle, data }) => {
  console.log(data, "kjnjnjnkjin");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axios } = setRole();

  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: { field: "apiMatchActive", val: data?.apiMatchActive || false },
    2: { field: "apiBookMakerActive", val: data?.apiBookMakerActive || false },
    3: { field: "apiSessionActive", val: data?.apiSessionActive || false },
    5: {
      field: "manualSessionActive",
      val: data?.manualSessionActive || false,
    },
    4: {
      field: "manualBookMakerActive",
      val: data?.manualBookMakerActive || false,
    },
    // 5: {
    //   field: "bookmaker1",
    //   val: bookMaker[0]?.betStatus == 0? false : true,
    // },
    // 6: {
    //   field: "bookmaker2",
    //   val: bookMaker[1]?.betStatus == 0? false : true,
    // },
    // 7: {
    //   field: "bookmaker3",
    //   val: bookMaker[2]?.betStatus == 0? false : true,
    // },
  });

  const [updateBookmaker, setUpdateBookmaker] = useState([
    ...data?.bookmakers?.map((bookmaker, index) => {
      return {
        id: bookmaker?.id,
        marketName: bookmaker?.marketName,
        betStatus: bookmaker?.betStatus == 0 || null ? false : true,
      };
    }),
  ]);

  console.log("bookmaker", updateBookmaker);

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
  return (
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
          width: "60px",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>{index}</Typography>
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

          {updateBookmaker?.map((bookmaker) => {
            return (
              <ButtonWithSwitchBookmaker
                title={bookmaker.marketName}
                containerStyle={{ width: "14%" }}
                updateBookmaker={updateBookmaker}
                setUpdateBookmaker={setUpdateBookmaker}
                id={bookmaker.id}
              />
            );
          })}

          {/* {data?.bookmakers?.length == 1 && (
            <ButtonWithSwitch
              title={data?.bookmakers[0]?.marketName}
              containerStyle={{ width: "14%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={5}
            />
          )}
          {data?.bookmakers?.length == 2 && (
            <ButtonWithSwitch
              title={data?.bookmakers[1]?.marketName}
              containerStyle={{ width: "14%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={6}
            />
          )}
          {data?.bookmakers?.length == 3 && (
            <ButtonWithSwitch
              title={data?.bookmakers[2]?.marketName}
              containerStyle={{ width: "14%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={7}
            />
          )} */}
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
              notSwitch={true}
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
  );
};
export default Row;
