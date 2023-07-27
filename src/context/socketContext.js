import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import {
  apiBasePath,
  apiMicroBasePath,
  microServiceApiPath,
} from "../components/helper/constants";
import { setRole } from "../newStore";
import { GlobalStore } from "./globalStore";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentUser, setCurrentUser } from "../newStore/reducers/currentUser";
import {
  removeManualBookMarkerRates,
  removeSelectedMatch,
  setAllBetRate,
  setAllSessionBets,
  setManualBookMarkerRates,
  setManualBookmaker,
  setSelectedMatch,
  setSessionExposure,
  setSessionOffline,
} from "../newStore/reducers/matchDetails";
import { removeSocket } from "../components/helper/removeSocket";
import { logout } from "../newStore/reducers/auth";

export const SocketContext = createContext();
var match_id;


export const SocketProvider = ({ children }) => {
  const location = useLocation();
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const [socket, setSocket] = useState(null);
  const [socketMicro, setSocketMicro] = useState(null);
  const { JWT, role } = setRole();
  const token = "Bearer " + JWT;
  const checkSocket = localStorage.getItem("socket");
  const checkMicroSocket = localStorage.getItem("microSocket");
  const { currentUser } = useSelector((state) => state?.currentUser);
  const {
    allBetRates,
    allSessionBets,
    selectedMatch,
    sessionOffline,
    manualBookmaker,
  } = useSelector((state) => state?.matchDetails);

  const [localCurrentUser, setLocalCurrentUser] = useState(null);
  const [localAllBetRates, setLocalAllBetRates] = useState([]);
  const [sessionBets, setSessionBets] = useState([]);
  const [currentMatch, setCurrentMatch] = useState([]);
  const [localSessionOffline, setLocalSessionOffline] = useState([]);
  const [manualBookmakerData, setManualBookmakerData] = useState([]);

  useEffect(() => {
    if (allBetRates) {
      setLocalAllBetRates(allBetRates);
    }
    if (allSessionBets) {
      setSessionBets(allSessionBets);
    }
    if (currentUser) {
      setLocalCurrentUser(currentUser);
    }
    if (selectedMatch) {
      setCurrentMatch(selectedMatch);
    }
    if (sessionOffline) {
      setLocalSessionOffline(sessionOffline);
    }
    if (manualBookmaker) {
      setManualBookmakerData(manualBookmaker);
    }
  }, [
    allBetRates,
    allSessionBets,
    currentUser,
    selectedMatch,
    sessionOffline,
    manualBookmaker,
  ]);

  console.log("nav", location);
  const dispatch = useDispatch();
  const getToken = (tk, rl) => {
    let token = "";
    if (rl === "role4") {
      token = "Bearer " + (tk.userJWT || sessionStorage.getItem("JWTuser"));
    } else if (rl === "role3") {
      token = "Bearer " + (tk.expertJWT || sessionStorage.getItem("JWTexpert"));
    } else if (rl === "role2") {
      token = "Bearer " + (tk.adminWT || sessionStorage.getItem("JWTwallet"));
    }
    if (rl === "role1") {
      token = "Bearer " + (tk.walletWT || sessionStorage.getItem("JWTadmin"));
    }
    return token;
  };

  function getSessionStorageItemAsync(key) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const item = sessionStorage.getItem(key);
          resolve(item);
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  }
  // Usage example
  getSessionStorageItemAsync("matchId")
    .then((matchId) => {
      if (matchId !== null) {
        console.log("Match ID:", matchId);
        match_id = matchId;
        // Your further processing with the matchId
      } else {
        console.log("Match ID not found in sessionStorage.");
      }
    })
    .catch((error) => {
      console.error("Error occurred while accessing sessionStorage:", error);
    });

  const localServerEvents = (localSocket,microSocket) => {

    
      localSocket.on("logoutUserForce", (event) => {
   
        try {
            dispatch(removeCurrentUser()); 
              dispatch(removeManualBookMarkerRates());
              dispatch(removeSelectedMatch());
              dispatch(logout({ roleType: "role4" }));
              setGlobalStore((prev) => ({ ...prev, userJWT: "" }));
              // await axios.get("auth/logout");
              removeSocket();
              socket.disconnect();
              socketMicro.disconnect();
        } catch (e) {
          console.log("error :", e?.message);
        }
      });
      

    localSocket.on("match_bet", (event) => {
      const data = event;

      try {
        if (data) {
          const body = {
            id: data?.betPlaceData?.id,
            isActive: true,
            createAt: data?.betPlaceData?.createAt,
            updateAt: data?.betPlaceData?.createAt,
            createdBy: null,
            deletedAt: null,
            user_id: null,
            match_id: data?.betPlaceData?.match_id,
            bet_id: data?.betPlaceData?.bet_id,
            result: "pending",
            team_bet: data?.betPlaceData?.team_bet,
            odds: data?.betPlaceData?.odds,
            win_amount: null,
            loss_amount: null,
            bet_type: data?.betPlaceData?.bet_type,
            country: null,
            ip_address: null,
            deleted_reason: data?.betPlaceData?.deleted_reason || null,
            rate: null,
            marketType: data?.betPlaceData?.marketType,
            amount: data?.betPlaceData?.stack || data?.betPlaceData?.stake,
          };
          if (data?.betPlaceData?.match_id === match_id) {
            setLocalAllBetRates((prev) => {
              const newBody = [body, ...prev];
              dispatch(setAllBetRate(newBody));
              return newBody;
            });

            setLocalCurrentUser((prev) => {
              const user = {
                ...prev,
                current_balance: data.newBalance,
                exposure: data.exposure,
              };
              dispatch(setCurrentUser(user));
              return user;
            });

            const manualBookmaker = {
              matchId: data?.betPlaceData?.match_id,
              teamA: data.teamA_rate,
              teamB: data.teamB_rate,
              teamC: data.teamC_rate,
            };
            dispatch(setManualBookMarkerRates(manualBookmaker));
          }
          // alert(JSON.stringify(manualBookmaker));
        }
      } catch (e) {
        console.log("error", e?.message);
      }
    });

    localSocket.on("session_bet", (event) => {
      const data = event;

      try {
        const body = {
          ...data.betPlaceData,
          deleted_reason: data.betPlaceData?.deleted_reason || null,
        };
        if (data?.betPlaceData?.match_id === match_id) {
          setCurrentMatch((currentMatch) => {
            const updatedBettings = currentMatch?.bettings?.map((betting) => {
              if (betting?.id === data?.betPlaceData?.bet_id) {
                // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
                let profitLoss = data?.profitLoss;
                return {
                  ...betting,

                  profitLoss: profitLoss,
                };
              }
              return betting;
            });
            // Return the updated current match object
            const body = {
              ...currentMatch,
              bettings: updatedBettings,
            };
            dispatch(setSelectedMatch(body));
            return body;
          });
          setSessionBets((prev) => {
            const newBody = [body, ...prev];
            console.log(newBody, "newBody");
            dispatch(setAllSessionBets(newBody));
            return newBody;
          });
          setLocalCurrentUser((prev) => {
            const user = {
              ...prev,
              current_balance: data.newBalance,
              exposure: data.exposure,
            };
            dispatch(setCurrentUser(user));
            return user;
          });

          dispatch(setSessionExposure(data?.sessionExposure));
        }
      } catch (err) {
        console.log(err?.message);
      }
    });

    localSocket.on("newBetAdded", (event) => {
      const value = event;
      // matchId = value?.match_id;
      try {
        setCurrentMatch((currentMatch) => {
          if (currentMatch?.id !== value?.match_id) {
            // If the new bet doesn't belong to the current match, return the current state
            return currentMatch;
          }

          // Update the bettings array in the current match object
          const updatedBettings = currentMatch?.bettings?.map((betting) => {
            if (betting.id === value.id && value.sessionBet) {
              // If the betting ID matches the new bet ID and the new bet is a session bet, update the betting object
              return {
                ...betting,
                ...value,
              };
            } else if (
              betting?.id === value?.id &&
              value.sessionBet === false
            ) {
              return {
                ...betting,
                ...value,
              };
            }
            return betting;
          });
          var newUpdatedValue = updatedBettings;
          const bettingsIds = updatedBettings?.map((betting) => betting?.id);

          if (!bettingsIds?.includes(value.id)) {
            // If the value object's id does not match any of the existing bettings' ids, push it into the bettings array

            newUpdatedValue = [...newUpdatedValue, value];
          } else {
            setLocalSessionOffline((prev) => {
              if (prev.includes(value.id) && value.betStatus === 1) {
                const newres = prev.filter((id) => id !== value.id);
                dispatch(setSessionOffline(newres));
              }
              if (value?.betStatus === 0) {
                const body = [...prev, value.id];

                dispatch(setSessionOffline(body));
              }
            });
            // newUpdatedValue = newUpdatedValue?.filter(
            //   (v) => v?.id !== value?.id && v?.betStatus === 1
            // );
          }

          // Return the updated current match object
          const newBody = {
            ...currentMatch,
            bettings: newUpdatedValue,
          };
          dispatch(setSelectedMatch(newBody));
          return newBody;
        });

        // manualBookmakerData session bet false
        // manualBookmakerData
        let betData = {
          betRestult: null,
          betStatus: 1,
          bet_condition: null,
          createAt: value?.createAt,
          createdBy: value?.createdBy,
          deletedAt: null,
          drawRate: null,
          id: value?.id,
          isActive: true,
          matchType: "cricket",
          match_id: value?.match_id,
          no_rate: null,
          rate_percent: null,
          selectionId: null,
          sessionBet: false,
          stopAt: value?.stopAt,
          suspended: value?.suspended,
          teamA_Back: value?.teamA_Back,
          teamA_lay: value?.teamA_lay,
          teamA_suspend: value?.teamA_suspend,
          teamB_Back: null,
          teamB_lay: null,
          teamB_suspend: value?.teamB_suspend,
          teamC_Back: null,
          teamC_lay: null,
          teamC_suspend: value?.teamC_suspend,
          updateAt: value?.updateAt,
          yes_rate: null,
        };
        setManualBookmakerData((prev) => {
          if (prev.length == 0 && value?.sessionBet) {
            const body = [...prev, betData];
            dispatch(setManualBookmaker(body));
            return body;
          }
          return prev;
        });
      } catch (err) {
        console.log(err?.message);
      }
    });

    localSocket.on("matchOddRateLive", (event) => {
      const value = event;
      try {
        setCurrentMatch((prev) => {
          if (prev?.id === value?.matchId) {
            const newBody = {
              ...prev,
              matchOddRateLive: value?.matchOddLive,
            };
            dispatch(setSelectedMatch(newBody));
            return;
          }
          return prev;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("matchOddRateLive", (event) => {
      const data = event;
      try {
        setCurrentUser((prev) => {
          const user = {
            ...prev,
            current_balance: data?.currentBalacne,
          };
          dispatch(setCurrentUser(user));
          return user;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });

    localSocket.on("bookMakerRateLive", (event) => {
      const data = event;
      try {
        setCurrentMatch((prev) => {
          if (prev?.id === data?.matchId) {
            const newBody = {
              ...prev,
              bookMakerRateLive: data?.bookMakerLive,
            };
            dispatch(setSelectedMatch(newBody));
            return newBody;
          }
          return prev;
        });
      } catch (e) {
        console.log("error :", e?.message);
      }
    });


  };

  const localServerSocket = () => {
    // if (!socket && checkSocket !== "true") {
    const newSocket = io(`${apiBasePath}`, {
      transports: ["websocket"],
      headers: {
        Authorization: `${token}`,
      },
      auth: {
        token: `${token}`,
      },
    });
    newSocket.on("connect", () => {
      setSocket(newSocket);
      // toast.success("Socket connect !", { autoClose: 2000 });
      // localStorage.setItem("socket", newSocket.connected)
    });

    // }
    // newSocket.on("disconnect", () => {
    //   toast.error("Socket disconnect !", { autoClose: 1000 });
    // });
    // }
    // if (!socketMicro && checkMicroSocket !== "true") {
    localServerEvents(newSocket);
  };

  const mircoServerSocket = () => {
    const newMicroSocket = io(`${microServiceApiPath}`, {
      transports: ["websocket"],
      headers: {
        Authorization: `${token}`,
      },
      auth: {
        token: `${token}`,
      },
    });

    newMicroSocket.on("connect", () => {
      setSocketMicro(newMicroSocket);
      // toast.success("Third party socket connect !", { autoClose: 2000 });
      // localStorage.setItem("microSocket", newMicroSocket.connected)
    });
    // newMicroSocket.on("disconnect", () => {
    //   toast.error("Third party socket disconnect !", { autoClose: 1000 });
    // });

    newMicroSocket.onerror = (event) => {
      // Handle the WebSocket connection error here
      console.error("WebSocket connection failed:", event);
    };
    // }
  };
  useEffect(() => {
    try {
      const token = getToken(globalStore, role);
      if (!["Bearer null", ""].includes(token)) {
        localServerSocket();
        mircoServerSocket();
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }, [role, globalStore]);

  return (
    <SocketContext.Provider value={{ socket, socketMicro }}>
      {children}
    </SocketContext.Provider>
  );
};
