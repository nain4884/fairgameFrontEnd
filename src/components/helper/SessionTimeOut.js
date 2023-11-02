import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { stateActions } from '../../store/stateActions';
import { SessionTimerLOGOUT, SessionTimerWARN } from './constants';

function SessionTimeOut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signoutTime, setSignoutTime] = useState(SessionTimerLOGOUT);
    const [warningTime, setWarningTime] = useState(SessionTimerWARN);

    let warnTimeout;
    let logoutTimeout;

    const warn = () => {
        Swal.fire(
            "You were Idle for too long, Please do some action or you will be logged out in next 1 hour"
        );
    };

    const logout = () => {
        dispatch(stateActions.logout());
        navigate("/");
        Swal.fire("Your Session is timed out, You are logged out");
    };

    const setTimeouts = () => {
        if (localStorage.getItem("JWT") != undefined) {
            warnTimeout = setTimeout(warn, warningTime);
            logoutTimeout = setTimeout(logout, signoutTime);
        }
    };

    const clearTimeouts = () => {
        if (warnTimeout) clearTimeout(warnTimeout);
        if (logoutTimeout) clearTimeout(logoutTimeout);
    };

    useEffect(() => {
        const events = [
            "load",
            "mousemove",
            "mousedown",
            "click",
            "scroll",
            "keypress",
        ];
        const resetTimeout = () => {
            clearTimeouts();
            setTimeouts();
        };
        for (let i in events) {
            window.addEventListener(events[i], resetTimeout);
        }
        setTimeouts();
        return () => {
            for (let i in events) {
                window.removeEventListener(events[i], resetTimeout);
                clearTimeouts();
            }
        };
    }, []);
    return (
        <div></div>
    )
}

export default SessionTimeOut