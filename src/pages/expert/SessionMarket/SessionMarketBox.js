import React from 'react'
import Divider from '../../../components/helper/Divider';
import { Box, Typography, useMediaQuery } from '@mui/material';
import SeperateBox from '../SeperateBox';
import SmallBox from '../SmallBox';
import { toast } from 'react-toastify';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { setRole } from '../../../newStore';
import PlaceBetComponentWeb from './PlaceBetComponentWeb';
import Result from '../Result';
import SessionResultModal from '../../../components/SessionResultModal';

const SessionMarketBox = ({
    index,
    liveUser,
    setCurrentMatch,
    currentMatch,
    newData,
  }) => {
    const theme = useTheme();
    const {axios}=setRole()
    console.log(newData,"newData")
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const [visible, setVisible] = useState(false);
    const [live, setLive] = useState(newData?.betStatus === 1 ? false : true);
    useEffect(() => {
      if (!liveUser) {
        setLive(true);
      } else {
        setLive(false);
      }
    }, [liveUser]);

    const handleLive = async (status, selectionId) => {
      try {
        if (status === 1) {
          setLive(false);
        } else {
          setLive(true);
        }
        const body = {
          match_id: currentMatch?.id,
          matchType: currentMatch?.gameType,
          id: newData?.id,
          selectionId: selectionId,
          betStatus: status,
          // "teamA_lay": 18,
          // "teamB_lay": 15,
          // "teamA_Back": 10,
          // "teamB_Back": 4,
          // "drawRate": 10
        };
        const { data } = await axios.post("betting/addBetting", body);
        if (data.data?.id) {
          const updatedBettings = currentMatch?.bettings?.map((betting) => {
            if (betting?.id === newData?.id) {
              // If the betting's ID matches the given `id`, update the `betStatus` value
              return {
                ...betting,
                betStatus: status,
              };
            }
            // Otherwise, return the original betting object
            return betting;
          });
          setCurrentMatch((prevState) => ({
            ...prevState,
            bettings: updatedBettings,
          }));
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
              width: "100%",
              height: "100%",
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
            height: "38px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "white",
              height: "38px",
              width: "25%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontSize: { laptop: ".7vw", tablet: "10px", mobile: "8px" },
                marginLeft: "7px",
                fontWeight: "600",
              }}
            >
              {newData?.bet_condition}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: { laptop: "13vw" },
                display: "flex",
                zIndex: 100,
              }}
            >
              {live && (
                <SmallBox
                  onClick={(e) => {
                    e.preventDefault();
                    setLive(!live);
                    handleLive(1);
                  }}
                  textSize={"8px"}
                  width={"80px"}
                  title={"Go Live"}
                  color={"#FF4D4D"}
                />
              )}
              {!live && (
                <SmallBox
                  onClick={(e) => {
                    e.preventDefault();
                    setLive(!live);
                    handleLive(0);
                  }}
                  textSize={"8px"}
                  width={"80px"}
                  title={"Live"}
                />
              )}
              <Result
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(true);
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              position: "relative",
              background: "white",
              height: "38px",
              width: { laptop: "60%", mobile: "80%" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SeperateBox color={"white"} />
            {/* {matchesMobile && <PlaceBetComponent />} */}

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox color={"white"} />

            <SeperateBox
              session={true}
              back={true}
              value={newData?.no_rate}
              value2={newData?.rate_percent}
              lock={true}
              color={"#F6D0CB"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            <SeperateBox
              session={true}
              value={newData?.yes_rate}
              value2={newData?.rate_percent}
              lock={true}
              color={"#B3E0FF"}
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>
            {!matchesMobile && (
              <>
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeperateBox color={"white"} />
                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>
                <SeperateBox color={"white"} />
              </>
            )}
            {/* {
                            index != 1 && index !== 2 &&
                            <Box sx={{
                                width: '100%', marginLeft: '-2px', display: 'flex', position: 'absolute', height: '100%', background: 'rgba(0,0,0,1)', justifyContent: 'center ', alignItems: 'center'
                            }}>
                                <img src={BallStart} style={{ width: '60px', height: '19px' }} />
                            </Box>
                        } */}
            {
              <PlaceBetComponentWeb
                // onClick={() => {
                //   if (data?.includes(index)) {
                //     let x = [...data];
                //     x.splice(x.indexOf(index), 1);
                //     setData([...x]);
                //   } else {
                //     if (data.length < 4) {
                //       let x = [...data];
                //       setData([...x, index]);
                //     }
                //   }
                // }}
              />
            }
            {visible && (
              <Box sx={{ position: "absolute", zIndex: 105, top: "100%" }}>
                <SessionResultModal
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Divider/>
      </div>
    );
  };

export default SessionMarketBox