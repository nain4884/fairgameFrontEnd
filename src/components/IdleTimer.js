import { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useDispatch } from "react-redux";
import { useIdleTimer } from 'react-idle-timer'
import { SocketContext } from "../context/socketContext";
import { removeSocket } from "./helper/removeSocket";
import { GlobalStore } from "../context/globalStore";
import { removeCurrentUser } from "../newStore/reducers/currentUser";
import {
    removeManualBookMarkerRates, removeSelectedMatch,
} from "../newStore/reducers/matchDetails";
import { logout } from "../newStore/reducers/auth";
import { useNavigate } from "react-router-dom";

const IdleTimer = ({ role }) => {
    const { setGlobalStore } = useContext(GlobalStore);
    const { socket, socketMicro } = useContext(SocketContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showWarning, setShowWarning] = useState(false);
    const [timer, setTimer] = useState(3570000);
    const [showTimer, setShowTimer] = useState(30);
    // const [isOpen, setIsOpen] = useState(false);

    const handleOnIdle = event => {
        // console.log('user is idle', event)
        // console.log('last active', getLastActiveTime())

        if (role == "user") {
            dispatch(removeCurrentUser());
            dispatch(removeManualBookMarkerRates());
            dispatch(removeSelectedMatch());
            dispatch(logout({ roleType: "role4" }));
            socket.disconnect();
            socketMicro.disconnect();
            setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
            // await axios.get("auth/logout");
            removeSocket();
            navigate("/");
        } else {
            const url = window.location.href;
            if (url.includes("expert")) {
                dispatch(removeManualBookMarkerRates());
                dispatch(removeCurrentUser());
                dispatch(logout({ roleType: "role3" }));
                socketMicro.disconnect();
                socket.disconnect();
                dispatch(removeSelectedMatch());
                setGlobalStore((prev) => ({
                    ...prev,
                    expertJWT: "",
                    isSession: true,
                }));
                removeSocket();
                navigate("/expert");
            }
            else if (url.includes("wallet")) {
                dispatch(removeManualBookMarkerRates());
                dispatch(removeCurrentUser());
                dispatch(logout({ roleType: "role2" }));
                socketMicro.disconnect();
                socket.disconnect();
                dispatch(removeSelectedMatch());
                setGlobalStore((prev) => ({
                    ...prev,
                    JWTwallet: "",
                    isSession: true,
                }));
                removeSocket();
                navigate("/wallet");
            } else if (url.includes("admin")) {
                dispatch(removeManualBookMarkerRates());
                dispatch(removeCurrentUser());
                dispatch(logout({ roleType: "role1" }));
                socketMicro.disconnect();
                socket.disconnect();
                dispatch(removeSelectedMatch());
                setGlobalStore((prev) => ({
                    ...prev,
                    JWTadmin: "",
                    isSession: true,
                }));
                removeSocket();
                navigate("/admin");
            }

        }
    }

    const handleOnActive = event => {
        setShowWarning(false);
        // console.log('user is active', event)
        // console.log('time remaining', getRemainingTime())
    }

    const handleOnAction = event => {
        // alert(JSON.stringify(event?.isTrusted))
        if (event instanceof MouseEvent) {
            setShowWarning(false);
        }
        console.log('user did something', event)
        // console.log('time remaining 111', getRemainingTime())
        let time = 1 * 30 * 1000
        // alert(getRemainingTime() - time)
        setTimer(getRemainingTime() - time);


    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 60 * 60 * 1000,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    })

    useEffect(() => {
        // alert(timer)
        const warningTimeout = setTimeout(() => {
            setShowWarning(true);
        }, (timer)); // Show the warning 10 seconds before timeout

        let interval;
        if (showWarning) {
            if (showTimer > 0) {
                interval = setInterval(() => {
                    setShowTimer((prevTime) => prevTime - 1);
                }, 1000);
            } else {
                setShowWarning(false);
            }
        }

        return () => {
            clearTimeout(warningTimeout);
            clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        let interval;
        if (showWarning) {
            if (showTimer > 0) {
                interval = setInterval(() => {
                    setShowTimer((prevTime) => prevTime - 1);
                }, 1000);
            } else {
                setShowWarning(false);
            }
        }

        return () => {
            clearInterval(interval);
        }
    }, [showWarning]);

    const handleClose = event => {
        setShowWarning(false);
    }
    return (
        <>
            {showWarning && <div style={{ color: '#fdf21b', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>Your session will expire in {showTimer} second{showTimer !== 1 && "s"}.</div>}
            {/* <Dialog open={showWarning}>
                <DialogTitle>Timeout</DialogTitle>
                <DialogContent>
                    <p>Your session will expire in {showTimer} second{showTimer !== 1 && "s"}.</p>
                    <p>Please refresh the page or take necessary action.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog> */}
        </>
    )

}

export default IdleTimer;