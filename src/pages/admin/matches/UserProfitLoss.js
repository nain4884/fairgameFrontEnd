import React, { useEffect } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import Divider from "../../../components/helper/Divider";
import { useTheme } from "@emotion/react";
import UserProfitLossListComp from "./UserProfitLossListComp";
import { useState } from "react";
import { Refresh } from "../../../assets";
import { setRole } from "../../../newStore";

const UserProfitLoss = ({ title, matchId, setShowUserProfitLoss, single }) => {
  const { axios } = setRole();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const [showTeamC, setShowTeamC] = useState(false);
  const [userProfitLoss, setUserProfitLoss] = useState([]);

  const getChildProfitLoss = async (matchId) => {
    try {
      const { data } = await axios.get(
        `/game-match/getChildProfitLoss/${matchId}`
      );
      setUserProfitLoss(data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (matchId !== undefined) {
      getChildProfitLoss(matchId);
    }
  }, [matchId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginBottom: "3px",
          width: "100%",
          maxHeight: single === "single" ? "29rem" : null,
          alignSelf: {
            mobile: "center",
            tablet: "center",
            laptop: "flex-start",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: 38,
            flexDirection: "row",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  laptop: "13px",
                  tablet: "12px",
                  mobile: matchesMobile ? "12px" : "12px",
                },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {single === "multiple" && (
              <img
                onClick={(event) => {
                  event.preventDefault();
                  getChildProfitLoss(matchId);
                }}
                src={Refresh}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted"></div>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {single === "multiple" ? (
              <Button
                sx={{
                  color: "#f1c40f",
                  fontSize: "30px",
                  minWidth: 0,
                  padding: "0px 8px",
                }}
                onClick={() => {
                  setShowUserProfitLoss(false);
                }}
              >
                &times;
              </Button>
            ) : (
              <img
                onClick={() => {
                  getChildProfitLoss(matchId);
                }}
                src={Refresh}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              width: "99.7%",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "'#319E5B'",
                height: "25px",
                width: "40%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { laptop: "11px", mobile: "9px" },
                  marginLeft: "7px",
                }}
              >
                Username
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { laptop: "60%", mobile: "81%" },
                justifyContent: { laptop: "flex-end", mobile: "flex-end" },
              }}
            >
              <Box
                sx={{
                  background: "#f1c550",
                  border: "1px solid #2626264D",
                  width: { laptop: "10vw", mobile: "30.06%" },
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {userProfitLoss?.teamA}
                </Typography>
              </Box>
              <Box
                sx={{ width: "3px", display: "flex", background: "white" }}
              ></Box>
              <Box
                sx={{
                  background: "#f1c550",
                  border: "1px solid #2626264D",
                  width: { laptop: "10vw", mobile: "30%" },
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {userProfitLoss?.teamB}
                </Typography>
              </Box>
              {userProfitLoss?.teamC && (
                <>
                  <Box
                    sx={{
                      width: "3px",
                      display: "flex",
                      background: "white",
                    }}
                  ></Box>
                  <Box
                    sx={{
                      background: "#f1c550",
                      border: "1px solid #2626264D",
                      width: { laptop: "10vw", mobile: "30%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {userProfitLoss?.teamC}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: single === "single" ? "400" : "160px",
              width: "100%",
              position: "relative",
            }}
          >
            {userProfitLoss?.childProfitLoss?.length > 0 &&
              userProfitLoss?.childProfitLoss?.map((element) => {
                return (
                  <Box
                    key={element?.id}
                    sx={{
                      width: "100%",
                      display: element?.betStatus === 2 ? "none" : "block",
                    }}
                  >
                    <UserProfitLossListComp
                      key={element?.id}
                      element={element}
                      showTeamC={userProfitLoss?.teamC ? true : false}
                    />
                    <Divider />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfitLoss;
