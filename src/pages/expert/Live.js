import { IndiaPakLive, SessionResult, BetLive, DailogModal } from "../../components";
import { Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header'
import Background from './Background'
import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setDailogData } from "../../store/dailogModal";
import { SocketContext } from "../../context/socketContext";

export default function Live() {
    const { socket } = useContext(SocketContext);
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { sessionAllBetRates } = useSelector((state) => state?.matchDetails);
    const [betData, setBetData] = useState(sessionAllBetRates);

    function showDialogModal(isModalOpen, showRight, message, navigateTo, state) {
        dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }))
        setTimeout(() => {
            dispatch(setDailogData({ isModalOpen: false }))
            navigateTo && navigate(`/${window.location.pathname.split('/')[1]}/${navigateTo}`, state)
        }, [2000])
    }

    const handleBetData = async (data) => {
        // alert("call" + data.length)
        setBetData(data);
    }
    useEffect(() => {
        if (socket && socket.connected) {
            socket.onevent = async (packet) => {
                if (packet.data[0] === "session_bet") {
                    const data = packet.data[1];
                    try {
                        let newData = data?.betPlaceData;
                        setBetData(prevData => [newData, ...prevData]);
                    } catch (err) {
                        console.log(err?.message);
                    }

                }
            }
        }
    }, [socket]);

    return (
        <Background>
            <Header />
            <Box display="flex">
                <Box flex={1} sx={{ margin: "10px" }}>
                    <IndiaPakLive createSession={location?.state?.createSession} match={location?.state?.match} showDialogModal={showDialogModal} sessionEvent={location?.state?.sessionEvent} handleBetData={handleBetData} />
                    <SessionResult createSession={location?.state?.createSession} showDialogModal={showDialogModal} />
                </Box>
                <Box sx={{ margin: "10px", flex: 1, marginLeft: "0px" }}>
                    {location?.state?.sessionEvent && <BetLive createSession={location?.state?.createSession} sessionEvent={location?.state?.sessionEvent} showDialogModal={showDialogModal} betData={betData} />}
                </Box>
            </Box>
            <DailogModal />
        </Background>
    )
}