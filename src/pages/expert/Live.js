import { IndiaPakLive, SessionResult, BetLive, DailogModal } from "../../components";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Header from './Header'
import Background from './Background'
import { useState } from "react";
import Modal from "../../components/Modal";
import { useDispatch } from "react-redux";
import { setDailogData } from "../../store/dailogModal";
export default function Live() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function showDialogModal(isModalOpen, showRight, message, navigateTo, state) {
        dispatch(setDailogData({ isModalOpen, showRight, bodyText: message }))
        setTimeout(() => {
            dispatch(setDailogData({ isModalOpen: false }))
            navigateTo && navigate(`/${window.location.pathname.split('/')[1]}/${navigateTo}`, state)
        }, [2000])
    }
    return (
        <Background>
            <Header />
            <Box display="flex">
                <Box flex={1} sx={{ margin: "10px" }}>
                    <IndiaPakLive createSession={location?.state?.createSession} match={location?.state?.match} showDialogModal={showDialogModal} sessionEvent={location?.state?.sessionEvent} />
                    <SessionResult createSession={location?.state?.createSession} showDialogModal={showDialogModal} />
                </Box>
                <Box sx={{ margin: "10px", flex: 1, marginLeft: "0px" }}>
                    {location?.state?.sessionEvent && <BetLive createSession={location?.state?.createSession} sessionEvent={location?.state?.sessionEvent} showDialogModal={showDialogModal} />}
                </Box>
            </Box>
            <DailogModal />
        </Background>
    )
}