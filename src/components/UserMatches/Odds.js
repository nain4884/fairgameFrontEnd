import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import BoxComponent from "./BoxComponent";
import ManualBoxComponent from "./ManualBoxComponent";
import Divider from "../helper/Divider";
import {
    BallStart,
    FASTTIME,
    HourGlass,
    Info,
    TIME,
    ARROWUP,
} from "../../assets";
import { memo } from "react";
import FastTimePlaceBet from "../FastImePlaceBet";
import LiveMarket from "../CommonMasterAdminLayout/LiveMarket";
import FastTime from "../FastTime";
import { currencyFormatter, formatNumber } from "../helper/helper";
import PlaceBet from "../PlaceBet";
import { toast } from "react-toastify";
import OddsPlaceBet from "../OddsPlaceBet";
import { setRole } from "../../newStore";
import { useDispatch } from "react-redux";
import { setDailogData } from "../../store/dailogModal";
import Lottie from "lottie-react";
import NotificationModal from "../NotificationModal";
import { LockIcon } from "../../admin/assets";
import { useEffect } from "react";
import SmallCustomLoader from "../helper/SmallCustomLoader";

const SmallBox = ({ valueA, valueB }) => {
    return (
        <Box
            sx={{
                marginLeft: { mobile: 0, laptop: "-14px", tablet: 0 },
                justifyContent: {
                    mobile: "center",
                    laptop: "center",
                    tablet: "center",
                },
                display: "flex",
                width: { mobile: "85%", laptop: "80%", tablet: "85%" },
                gap: "4px",
            }}
        >
            <Box
                sx={{
                    width: { laptop: "70px", mobile: "45px", tablet: "70px" },
                    // position: "absolute",
                    flexDirection: "column",
                    paddingX: "5px",
                    display: "flex",
                    left: { mobile: "53%", laptop: "49vw", tablet: "53%" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    background: "white",
                    borderRadius: "3px",
                }}
            >
                <Typography
                    sx={{
                        color: "#FF4D4D",
                        fontSize: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Book
                </Typography>
                <Typography
                    sx={{
                        fontSize: { laptop: "12px", mobile: "10px", tablet: "10px" },
                        fontWeight: "bold",
                        color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
                    }}
                >
                    {valueA < 0 ? ` ${valueA}` : `${valueA}`}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: { laptop: "70px", mobile: "45px", tablet: "70px" },
                    // position: "absolute",
                    paddingX: "5px",
                    display: "flex",
                    flexDirection: "column",
                    left: { mobile: "65%", laptop: "55vw", tablet: "65%" },
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30px",
                    background: "white",
                    borderRadius: "3px",
                }}
            >
                <Typography
                    sx={{
                        color: "#FF4D4D",
                        fontSize: "8px",
                        fontWeight: "bold",
                    }}
                >
                    Book
                </Typography>

                <Typography
                    sx={{
                        fontSize: { laptop: "12px", mobile: "10px", tablet: "10px" },
                        fontWeight: "bold",
                        color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
                    }}
                >
                    {valueB < 0 ? ` ${valueB}` : `${valueB}`}
                </Typography>
            </Box>
        </Box>
    );
};

const Time = (data) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
                sx={{
                    fontSize: { mobile: "8px", laptop: "12px" },
                    fontWeight: "bold",
                    color: "#black",
                    width: { mobile: "50px", laptop: "80px" },
                }}
            >
                {data.time} sec Delay
            </Typography>
            <img style={{ width: "20px", height: "20px" }} src={TIME} />
        </Box>
    );
};

const Odds = ({
    data,
    teamARates,
    teamBRates,
    teamCRates,
    title,
    min,
    max,
    lock,
    showBox,
    showDely,
    suspended,
    newData,
    isRound,
    typeOfBet,
    session,
    matchOddsData,
    setFastAmount,
    fastAmount,
    betLock,
    showFast,
    upcoming,
    handleRateChange,
}) => {
    // alert(teamCRates)
    // console.log("matchOddsData 11:", matchOddsData);
    const theme = useTheme();
    const [showFastTimeBox, setShowFastTimeBox] = useState(false);
    const [placeBetData, setPlaceBetData] = useState(null);
    const [fastRate, setFastRate] = useState(null);
    const [fastBetLoading, setFastBetLoading] = useState(false);
    const [canceled, setCanceled] = useState({
        value: false,
        msg: "",
        type: false,
    });

    useEffect(() => {
        if (betLock) {
            setPlaceBetData(null);
        }
    }, [betLock]);
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
    const bookRatioB = (() => {
        if (teamARates === 0) {
            return 0;
        } else {
            const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
            const formattedRatio = Math.abs(bookRatio).toFixed(2);
            return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
        }
    })();

    const bookRatioA = (() => {
        if (teamARates === 0) {
            return 0;
        } else {
            const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
            // alert(teamARates)
            const formattedRatio = Math.abs(bookRatio).toFixed(2);
            // alert(typeof teamARates < 0 ? `-${formattedRatio}` : formattedRatio)

            return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
        }
    })();

    const [visible, setVisible] = useState(true);


    return (
        <>
            <Box
                key="odds"
                sx={{
                    position: "relative",
                    display: "flex",
                    backgroundColor: "white",
                    padding: { mobile: "1px", laptop: ".1vh" },
                    flexDirection: "column",
                    marginY: { mobile: "2px", laptop: ".5vh" },
                    marginTop: { mobile: "0" },
                    width: { mobile: "98%", laptop: "97%" },
                    marginX: "1vw",
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
                                width: "100%",
                                fontSize: { laptop: "13px", tablet: "12px", mobile: "10px" },
                                fontWeight: "bold",
                                marginLeft: "7px",
                            }}
                        >
                            {title}
                        </Typography>
                        {showDely && typeOfBet === "MATCH ODDS" && (
                            <Time time={newData.delaySecond ? newData?.delaySecond : 0} />
                        )}
                        {showFast && (
                            <FastTime
                                session={session}
                                setPlaceBetData={setPlaceBetData}
                                setFastAmount={setFastAmount}
                                setShowFastTimeBox={setShowFastTimeBox}
                                data={fastAmount ? currencyFormatter(fastAmount) : ""}
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            flex: 0.1,
                            background: "#262626",
                            // '#262626'
                        }}
                    >
                        <div className="slanted"></div>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            background: "#262626",
                            // '#262626' ,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: {
                                mobile: "flex-end",
                                laptop: "center",
                                tablet: "flex-end",
                            },
                        }}
                    >
                        <SmallBox valueA={bookRatioA} valueB={bookRatioB} />
                        <Box
                            className="arrowUpCollapse"
                            sx={{
                                flex: 1,
                                background: { laptop: "#262626", mobile: "none" },
                                position: { laptop: "static", mobile: "absolute" },
                                // '#262626' ,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <img
                                onClick={() => {
                                    setVisible(!visible);
                                }}
                                src={ARROWUP}
                                style={{
                                    transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
                                    width: "16px",
                                    height: "16px",
                                    marginRight: "5px",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                }}
                                alt={"Banner"}
                            />
                        </Box>
                        {/* <Typography
            sx={{
              color: "white",
              width: {mobile:"40px",tablet:"100px",laptop:"100px"},

              fontSize: { laptop: "9px", mobile: "7px" },
              fontWeight: "500",
              flexWrap: "wrap",
            }}
          >
            Maximum Bet {max}
          </Typography>
          <img
            src={Info}
            style={{
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          /> */}
                    </Box>
                </Box>

                {visible && showFastTimeBox && (
                    <Box>
                        <FastTimePlaceBet
                            session={session}
                            setFastAmount={setFastAmount}
                            selectedFastAmount={fastAmount}
                            setShowFastTimeBox={setShowFastTimeBox}
                        />
                    </Box>
                )}
                {visible && (
                    <Box sx={{ color: "black", position: "relative", overflow: 'hidden' }}>
                        <Box
                            sx={{
                                display: "flex",
                                background: "#319E5B",
                                height: "25px",
                                width: { laptop: "100%", mobile: "99.9%" },
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
                                    MIN: {min} MAX:{max}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    background: "#319E5B",
                                    height: "25px",
                                    gap: { mobile: "0px", laptop: "1px", tablet: "1px" },
                                    width: { laptop: "60%", mobile: "80%" },
                                    justifyContent: { laptop: "center", mobile: "flex-end" },
                                }}
                            >
                                {/* <Box sx={{ width: ".50%", display: "flex" }}></Box> */}
                                <Box
                                    sx={{
                                        background: "#00C0F9",
                                        width: { laptop: "16.5%", mobile: "30%" },
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderLeft: {
                                            laptop: "3px solid #319e5b",
                                            mobile: "1px solid #319e5b",
                                        },
                                    }}
                                >
                                    <Typography
                                        sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                                    >
                                        Back
                                    </Typography>
                                </Box>
                                <Box sx={{ width: ".35%", display: "flex" }}></Box>
                                <Box
                                    sx={{
                                        background: "#FF9292",
                                        width: { laptop: "16.4%", mobile: "29.9%" },
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderRight: {laptop: '1.5px solid #319e5b', mobile: '2px solid #319e5b' }
                                    }}
                                >
                                    <Typography
                                        sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                                    >
                                        Lay
                                    </Typography>
                                </Box>
                                {/* <Box sx={{ width: ".50%", display: "flex" }}></Box> */}
                            </Box>
                        </Box>
                        {betLock && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    height: "65%",
                                    top: "35%",
                                    width: "100%",
                                    display: "flex",
                                    zIndex: "999",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "rgba(0, 0, 0, .6)",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { mobile: "60%", laptop: "40%", tablet: "60%" },
                                    }}
                                ></Box>
                                <Box
                                    sx={{
                                        width: { mobile: "40%", laptop: "60%", tablet: "40%" },
                                        gap: 1,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        style={{ width: "35px", height: "40px" }}
                                        src={LockIcon}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: "600",
                                            margin: "20px 0px 0px -25px",
                                            fontSize: "20px",
                                            color: "#FFF",
                                        }}
                                    >
                                        Locked
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* {fastBetLoading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    height: "100%",
                                    top: "0%",
                                    width: "100%",
                                    display: "flex",
                                    zIndex: "999",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "rgba(0, 0, 0, .5)",
                                }}
                            >
                                <Lottie
                                    animationData={HourGlass}
                                    style={{
                                        display: "flex",
                                        alignSelf: "center",
                                        width: "50px",
                                        height: "50px",
                                    }}
                                />
                                <SmallCustomLoader />
                            </Box>
                        )} */}

                        {upcoming && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    height: "83%",
                                    // top: "18%",
                                    width: "100%",
                                    display: "flex",
                                    zIndex: "999",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "rgba(0, 0, 0, .5)",

                                }}
                            ></Box>
                        )}
                        {typeOfBet == "MANUAL BOOKMAKER" ? (
                            <>
                                <ManualBoxComponent
                                    setFastBetLoading={setFastBetLoading}
                                    placeBetData={placeBetData}
                                    setFastRate={(val) => setFastRate(val)}
                                    fastRate={fastRate}
                                    setPlaceBetData={setPlaceBetData}
                                    setFastAmount={setFastAmount}
                                    time={true}
                                    sessionMain={session}
                                    fromOdds={true}
                                    showBox={showBox}
                                    selectedFastAmount={fastAmount}
                                    livestatus={
                                        matchOddsData?.[0]?.teamA_suspend === "suspended"
                                            ? true
                                            : false
                                    }
                                    ballStatus={
                                        matchOddsData?.[0]?.teamA_Ball === "ball" || matchOddsData?.[0]?.teamA_suspend == "Ball Started" ? true : false
                                    }
                                    teamImage={newData?.teamA_Image}
                                    newData={newData}
                                    color={teamARates <= 0 ? "#FF4D4D" : "#319E5B"}
                                    allRates={{
                                        teamA: teamARates,
                                        teamB: teamBRates,
                                        teamC: teamCRates,
                                    }}
                                    rate={teamARates}
                                    name={newData?.teamA}
                                    data={data?.length > 0 ? data[0] : []}
                                    team={"teamA"}
                                    suspendedData={data[0]?.status}
                                    typeOfBet={typeOfBet}
                                    isRound={isRound}
                                    matchOddsData={{
                                        back: matchOddsData?.[0]?.teamA_Back,
                                        lay: matchOddsData?.[0]?.teamA_lay,
                                    }}
                                    isBall={true}
                                    isTeamC={newData?.teamC}
                                    handleRateChange={handleRateChange}
                                />
                                <Divider />
                                <ManualBoxComponent
                                    setFastBetLoading={setFastBetLoading}
                                    placeBetData={placeBetData}
                                    setFastRate={(val) => setFastRate(val)}
                                    fastRate={fastRate}
                                    setPlaceBetData={setPlaceBetData}
                                    sessionMain={session}
                                    setFastAmount={setFastAmount}
                                    teamImage={newData?.teamB_Image}
                                    time={true}
                                    fromOdds={true}
                                    showBox={showBox}
                                    newData={newData}
                                    selectedFastAmount={fastAmount}
                                    // livestatus={newData?.status === "SUSPENDED" ? true : false}
                                    livestatus={
                                        matchOddsData?.[0]?.teamB_suspend === "suspended"
                                            ? true
                                            : false
                                    }
                                    ballStatus={
                                        matchOddsData?.[0]?.teamB_Ball === "ball" || matchOddsData?.[0]?.teamB_suspend == "Ball Started" ? true : false
                                    }
                                    color={teamBRates <= 0 ? "#FF4D4D" : "#319E5B"}
                                    name={newData?.teamB}
                                    data={data?.length > 0 ? data[1] : []}
                                    suspendedData={data[1]?.status}
                                    rate={teamBRates}
                                    allRates={{
                                        teamA: teamARates,
                                        teamB: teamBRates,
                                        teamC: teamCRates,
                                    }}
                                    team={"teamB"}
                                    typeOfBet={typeOfBet}
                                    isRound={isRound}
                                    matchOddsData={{
                                        back: matchOddsData?.[0]?.teamB_Back,
                                        lay: matchOddsData?.[0]?.teamB_lay,
                                    }}
                                    isBall={false}
                                    isTeamC={newData?.teamC}
                                    handleRateChange={handleRateChange}
                                />
                                {newData?.teamC && (
                                    <>
                                        <Divider />
                                        <ManualBoxComponent
                                            setFastBetLoading={setFastBetLoading}
                                            placeBetData={placeBetData}
                                            setFastRate={(val) => setFastRate(val)}
                                            fastRate={fastRate}
                                            setPlaceBetData={setPlaceBetData}
                                            sessionMain={session}
                                            setFastAmount={setFastAmount}
                                            teamImage={null}
                                            selectedFastAmount={fastAmount}
                                            fromOdds={true}
                                            time={true}
                                            // livestatus={newData?.status === "SUSPENDED" ? true : false}
                                            livestatus={
                                                matchOddsData?.[0]?.teamC_suspend === "suspended"
                                                    ? true
                                                    : false
                                            }
                                            ballStatus={
                                                matchOddsData?.[0]?.teamC_Ball === "ball" || matchOddsData?.[0]?.teamC_suspend == "Ball Started" ? true : false
                                            }
                                            showBox={showBox}
                                            newData={newData}
                                            // color={"#FF4D4D"}
                                            color={teamCRates <= 0 ? "#FF4D4D" : "#46e080"}
                                            name={newData?.teamC}
                                            data={data?.length > 0 ? data[2] : []}
                                            suspendedData={data[2]?.status}
                                            rate={teamCRates}
                                            allRates={{
                                                teamA: teamARates,
                                                teamB: teamBRates,
                                                teamC: teamCRates,
                                            }}
                                            team={"teamC"}
                                            typeOfBet={typeOfBet}
                                            isRound={isRound}
                                            matchOddsData={{
                                                back: matchOddsData?.[0]?.teamC_Back,
                                                lay: matchOddsData?.[0]?.teamC_lay,
                                            }}
                                            isBall={false}
                                            isTeamC={newData?.teamC}
                                            handleRateChange={handleRateChange}
                                        />
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <BoxComponent
                                    setFastBetLoading={setFastBetLoading}
                                    placeBetData={placeBetData}
                                    setFastRate={(val) => setFastRate(val)}
                                    fastRate={fastRate}
                                    setPlaceBetData={setPlaceBetData}
                                    sessionMain={session}
                                    setFastAmount={setFastAmount}
                                    time={true}
                                    fromOdds={true}
                                    selectedFastAmount={fastAmount}
                                    showBox={showBox}
                                    livestatus={newData?.status === "SUSPENDED" ? true : false}
                                    teamImage={newData?.teamA_Image}
                                    newData={newData}
                                    // lock={data?.length > 0 ? false : true}
                                    color={teamARates <= 0 ? "#FF4D4D" : "#319E5B"}
                                    allRates={{
                                        teamA: teamARates,
                                        teamB: teamBRates,
                                        teamC: teamCRates,
                                    }}
                                    rate={teamARates}
                                    name={newData?.teamA}
                                    data={data?.length > 0 ? data[0] : []}
                                    team={"teamA"}
                                    suspendedData={data[0]?.status}
                                    typeOfBet={typeOfBet}
                                    isRound={isRound}
                                    handleRateChange={handleRateChange}
                                />
                                <Divider />
                                {/* {console.log("newData :",newData)} */}
                                <BoxComponent
                                    setFastBetLoading={setFastBetLoading}
                                    placeBetData={placeBetData}
                                    setFastRate={(val) => {
                                        setFastRate(val);
                                    }}
                                    fastRate={fastRate}
                                    setPlaceBetData={setPlaceBetData}
                                    sessionMain={session}
                                    setFastAmount={setFastAmount}
                                    teamImage={newData?.teamB_Image}
                                    time={true}
                                    showBox={showBox}
                                    fromOdds={true}
                                    selectedFastAmount={fastAmount}
                                    newData={newData}
                                    livestatus={newData?.status === "SUSPENDED" ? true : false}
                                    // lock={data?.length > 0 ? false : true}
                                    color={teamBRates <= 0 ? "#FF4D4D" : "#319E5B"}
                                    name={newData?.teamB}
                                    data={data?.length > 0 ? data[1] : []}
                                    suspendedData={data[1]?.status}
                                    rate={teamBRates}
                                    allRates={{
                                        teamA: teamARates,
                                        teamB: teamBRates,
                                        teamC: teamCRates,
                                    }}
                                    team={"teamB"}
                                    typeOfBet={typeOfBet}
                                    isRound={isRound}
                                    handleRateChange={handleRateChange}
                                />
                                {newData?.teamC && (
                                    <>
                                        <Divider />
                                        <BoxComponent
                                            setFastBetLoading={setFastBetLoading}
                                            placeBetData={placeBetData}
                                            setFastRate={(val) => setFastRate(val)}
                                            fastRate={fastRate}
                                            setPlaceBetData={setPlaceBetData}
                                            sessionMain={session}
                                            setFastAmount={setFastAmount}
                                            fromOdds={true}
                                            teamImage={null}
                                            selectedFastAmount={fastAmount}
                                            time={true}
                                            livestatus={
                                                newData?.status === "SUSPENDED" ? true : false
                                            }
                                            showBox={showBox}
                                            newData={newData}
                                            // lock={data?.length > 0 ? false : true}
                                            color={teamCRates <= 0 ? "#FF4D4D" : "#319E5B"}
                                            name={newData?.teamC}
                                            data={data?.length > 0 ? data[2] : []}
                                            suspendedData={data[2]?.status}
                                            rate={teamCRates}
                                            allRates={{
                                                teamA: teamARates,
                                                teamB: teamBRates,
                                                teamC: teamCRates,
                                            }}
                                            team={"teamC"}
                                            typeOfBet={typeOfBet}
                                            isRound={isRound}
                                            handleRateChange={handleRateChange}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </Box>
                )}
            </Box>

            {placeBetData && (
                <Box
                    sx={{
                        width: "100%",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: { mobile: 0, laptop: "40%", tablet: 0 },
                        }}
                    ></Box>
                    <Box sx={{ width: { mobile: "98%", laptop: "58%", tablet: "98%" } }}>
                        <OddsPlaceBet
                            setCanceled={setCanceled}
                            setPlaceBetData={setPlaceBetData}
                            placeBetData={placeBetData}
                            handleClose={() => setPlaceBetData(null)}
                            name={placeBetData?.name}
                            setFastRate={setFastRate}
                            fastRate={fastRate}
                            rates={placeBetData?.rates}
                            season={session}
                            back={placeBetData?.back}
                            currentMatch={placeBetData?.currentMatch}
                            isBack={placeBetData?.isBack}
                            selectedValue={placeBetData?.selectedValue}
                            type={placeBetData?.type}
                            typeOfBet={typeOfBet}
                            handleRateChange={handleRateChange}
                        />
                    </Box>
                    {canceled.value && (
                        <NotificationModal
                            open={canceled}
                            handleClose={() =>
                                setCanceled({ value: false, msg: "", type: false })
                            }
                        />
                    )}
                </Box>
            )}

            <style jsx scope>
                {`
          @media only screen and (max-width: 600px) {
            body .arrowUpCollapse img {
              width: 14px !important;
              height: 14px !important;
              margin-right: 3px !important;
            }
          }
        `}
            </style>
        </>
    );
};
export default memo(Odds);
