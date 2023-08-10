import React from "react";

import { Box } from "@mui/material";

import "../../index.css";

import { useSelector } from "react-redux";

import Odds from "./Odds";

import SessionMarket from "./SessionOdds/SessionMarket";
import { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
const MatchOdds = ({
  data,
  matchOddsLive,
  bookmakerLive,
  sessionOddsLive,
  allBetsData,
  sessionExposer,
  sessionBets,
  sessionOffline,
  manualBookmakerData,
  setFastAmount,
  fastAmount,
  handleRateChange,
}) => {
  const { manualBookMarkerRates } = useSelector((state) => state?.matchDetails);
  const [matchOddsData, setMatchOddsData] = useState([]);
  const [bookMakerRateLive, setBookMakerRateLive] = useState(false);
  const [matchOddRateLive, setMatchOddRateLive] = useState(false);
  useEffect(() => {
    if (data) {
      const matchOdds = data?.bettings?.filter(
        (element) => element.sessionBet === false
      );
      setMatchOddsData(matchOdds);
      setBookMakerRateLive(data?.bookMakerRateLive);
      setMatchOddRateLive(data?.matchOddRateLive);
    }
  }, [data]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 0);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(data?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days:
          ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) || 0,
        hours:
          ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2) ||
          0,
        minutes:
          ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || 0,
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || 0,
      };
    } else {
      timeLeft = {
        days: "00",
        hours: "00",
        minutes: "00",
      };
    }

    return timeLeft;
  }

  const upcoming =
    Number(timeLeft.days) === 0 &&
    Number(timeLeft.hours) === 0 &&
    Number(timeLeft.minutes) <= 59;

  const teamRates =
    manualBookMarkerRates?.length > 0
      ? manualBookMarkerRates?.find((v) => v?.matchId === data?.id)
      : { teamA: 0, teamB: 0, teamC: 0 };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {data?.apiMatchActive && (
        <Odds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.MATCH_ODDS?.block}
          showDely={true}
          showBox={!matchOddRateLive}
          newData={data}
          data={
            matchOddsLive?.runners?.length > 0 ? matchOddsLive?.runners : []
          }
          lock={
            matchOddsData?.length > 0 && matchOddsData[0]?.betStatus === 0
              ? true
              : false
          }
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          teamCRates={teamRates?.teamC}
          min={data?.betfair_match_min_bet || 0}
          max={data?.betfair_match_max_bet || 0}
          title={"Match Odds"}
          typeOfBet={"MATCH ODDS"}
          handleRateChange={handleRateChange}
        />
      )}

      {data?.manualBookMakerActive &&
        data?.bookmakers?.map((bookmaker, idx) => {
          return (
            <Odds
              key={idx}
              upcoming={!upcoming}
              betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
              newData={data}
              lock={false}
              showDely={false}
              session={"manualBookMaker"}
              showFast={true}
              suspended={false}
              data={data}
              teamARates={teamRates?.teamA}
              teamBRates={teamRates?.teamB}
              teamCRates={teamRates?.teamC}
              min={bookmaker?.min_bet || 0}
              max={bookmaker?.max_bet || 0}
              title={bookmaker.marketName}
              typeOfBet={"MANUAL BOOKMAKER"}
              matchOddsData={bookmaker}
              setFastAmount={setFastAmount}
              fastAmount={fastAmount?.mannualBookMaker}
              handleRateChange={handleRateChange}
            />
          );
        })}

      {/* Manual Bookmaker */}
      {data?.bookmakers?.map((bookmaker) => {
        if (bookmaker.betStatus === 1) {
          return (
            <Odds
              upcoming={!upcoming}
              betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
              newData={data}
              lock={false}
              showDely={false}
              session={"manualBookMaker"}
              showFast={true}
              suspended={false}
              data={data}
              teamARates={teamRates?.teamA}
              teamBRates={teamRates?.teamB}
              teamCRates={teamRates?.teamC}
              min={bookmaker?.min_bet || 0}
              max={bookmaker?.max_bet || 0}
              title={bookmaker.marketName}
              typeOfBet={bookmaker?.marketType}
              matchOddsData={bookmaker}
              setFastAmount={setFastAmount}
              fastAmount={fastAmount?.mannualBookMaker}
              handleRateChange={handleRateChange}
            />
          );
        }
      })}

      {/* {data?.manualBookMakerActive && (
        <Odds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.MANUALBOOKMAKER?.block}
          newData={data}
          lock={false}
          showDely={false}
          session={"manualBookMaker"}
          showFast={true}
          suspended={false}
          data={data}
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          teamCRates={teamRates?.teamC}
          min={data?.bookmaker_manual_min_bet || 0}
          max={data?.bookmaker_manual_max_bet || 0}
          title={"Quick Bookmaker"}
          typeOfBet={"MANUAL BOOKMAKER"}
          matchOddsData={manualBookmakerData}
          setFastAmount={setFastAmount}
          fastAmount={fastAmount?.mannualBookMaker}
          handleRateChange={handleRateChange}
        />
      )} */}
      {data?.apiBookMakerActive && (
        <Odds
          upcoming={!upcoming}
          betLock={data?.blockMarket?.BOOKMAKER?.block}
          showBox={!bookMakerRateLive}
          newData={data}
          showFast={false}
          showDely={true}
          lock={
            data?.bookmakerLive?.length > 0 &&
            data?.bookmakerLive[0]?.betStatus === 0
              ? true
              : false
          }
          data={
            bookmakerLive?.runners?.length > 0 ? bookmakerLive?.runners : []
          }
          // suspended={false}
          teamARates={teamRates?.teamA}
          teamBRates={teamRates?.teamB}
          teamCRates={teamRates?.teamC}
          min={data?.betfair_bookmaker_min_bet || 0}
          max={data?.betfair_bookmaker_max_bet || 0}
          title={"Bookmaker Market "}
          isRound={false}
          session={"bookmaker"}
          typeOfBet={"BOOKMAKER"}
          setFastAmount={setFastAmount}
          fastAmount={fastAmount?.bookMaker}
          handleRateChange={handleRateChange}
        />
      )}
      {/*`${match.bettings[0].teamA_Back ? match.bettings[0].teamA_Back - 2 : 50 - 2}`*/}
      {data?.manualSessionActive && (
        <>
          <SessionMarket
            min={data?.manaual_session_min_bet || 0}
            max={data?.manaual_session_max_bet || 0}
            title={"Quick Session Market"}
            upcoming={!upcoming}
            betLock={data?.blockMarket?.SESSION?.block}
            showFast={true}
            session={"sessionOdds"}
            sessionBets={sessionBets}
            data={sessionOddsLive}
            newData={data}
            sessionOffline={sessionOffline}
            sessionExposer={sessionExposer}
            // dataProfit={dataProfit}
            teamARates={teamRates?.teamA}
            teamBRates={teamRates?.teamB}
            teamCRates={teamRates?.teamC}
            allBetsData={allBetsData}
            setFastAmount={setFastAmount}
            fastAmount={fastAmount?.sessionOdds}
            handleRateChange={handleRateChange}
          />
        </>
      )}
      {data?.apiSessionActive && (
        <>
          <SessionMarket
            min={data?.betfair_session_min_bet || 0}
            max={data?.betfair_session_max_bet || 0}
            title={"Session Market"}
            upcoming={!upcoming}
            betLock={data?.blockMarket?.SESSION?.block}
            showFast={false}
            session={"sessionOdds"}
            sessionBets={sessionBets}
            data={sessionOddsLive}
            newData={data}
            sessionOffline={sessionOffline}
            sessionExposer={sessionExposer}
            // dataProfit={dataProfit}
            teamARates={teamRates?.teamA}
            teamBRates={teamRates?.teamB}
            teamCRates={teamRates?.teamC}
            allBetsData={allBetsData}
            setFastAmount={setFastAmount}
            fastAmount={fastAmount?.sessionOdds}
            handleRateChange={handleRateChange}
          />
        </>
      )}
    </Box>
  );
};

export default memo(MatchOdds);
