import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import StyledImage from "./StyledImage";
import { ArrowDown, Cricket } from "../assets/index";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
// import AllRateSeperate from "./AllRateSeperate";
import BetHistory from "./BetHistory";
import SessionBetSeperate from "./sessionBetSeperate";
import SessionBetHistory from "./SessionBetHistory";
import moment from "moment";

const ProfitLossComponent = ({ eventData, reportData, betData, sessionBetData, handleReport, handleBet }) => {
    // alert(JSON.stringify(eventData))
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const getHandleReport = (eventType) => {
        if (!visible) {
            handleReport(eventType);
        }
        setVisible(!visible)
    };

    const getBetReport = (id) => {
        // if (!show) {
        // }
        handleBet(id);
        setShow(!show);
        setSelectedId(id);
    };

    const RowHeader = ({ item, index }) => {
        return (
            <Box
                key={index}
                onClick={() => getHandleReport(item?.eventType)}
                // onClick={() => {
                //     setVisible(!visible)
                // }}
                sx={{ width: '100%', height: { laptop: '60px', mobile: '50px' }, background: 'white', display: 'flex', padding: .1 }}>
                <Box sx={{ width: { mobile: '10%', laptop: '5%' }, height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', background: '#F8C851' }}>
                    <StyledImage src={Cricket} sx={{ width: { laptop: '35px', mobile: '25px' } }} />

                </Box>
                <Box sx={{ width: { mobile: '40%', laptop: "80%" }, height: '100%', alignItems: 'center', display: 'flex', paddingX: '10px', background: '#F8C851', marginLeft: .1, justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '15px', color: 'black', fontWeight: '700' }} >{item?.eventType}</Typography>
                    <StyledImage src={ArrowDown} sx={{ width: { laptop: '20px', mobile: "10px" }, transform: visible ? 'rotate(180deg)' : 'rotate(0deg)', height: { laptop: '10px', mobile: '6px' } }} />
                </Box>
                <Box sx={{ background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A", paddingX: '2px', width: { mobile: "25%", laptop: "20%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: { laptop: '16px', mobile: '12px' }, fontWeight: '700', color: 'white' }} >Loss</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: { laptop: '16px', mobile: "12px" }, fontWeight: '700', color: 'white' }}>{item?.totalLoss}</Typography>
                        <StyledImage src={item?.totalLoss > 0 ? ARROWUP : ARROWDOWN} sx={{ width: { laptop: '25px', mobile: "15px" }, height: { laptop: '12px', mobile: "8px" }, }} />
                    </Box>
                </Box>
                <Box sx={{ background: "#0B4F26", paddingX: '2px', width: { mobile: "25%", laptop: "20%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: { laptop: '16px', mobile: '12px' }, fontWeight: '700', color: 'white' }} >Total Bet</Typography>
                    <Box sx={{ display: 'flex' }} >
                        <Typography sx={{ fontSize: { laptop: '16px', mobile: "12px" }, fontWeight: '700', color: 'white' }}>{item?.totalBet}</Typography>
                    </Box>
                </Box>
            </Box >
        )
    }
    const RowComponent = ({ item, index }) => {
        return (
            <Box key={index} sx={{ width: '100%' }}>
                <Box
                    onClick={() => getBetReport(item?.matchId)}
                    // onClick={() => {
                    //     // setShow(!show)
                    // }} 
                    sx={{ width: '100%', height: '45px', background: 'white', display: 'flex', padding: .1 }}>
                    <Box sx={{ width: { mobile: '10%', laptop: '5%' }, height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'black' }}>
                        <Typography sx={{ fontSize: '14px', color: 'white', fontWeight: '600' }} >{"0" + index}</Typography>

                    </Box>
                    <Box sx={{ width: { mobile: '40%', laptop: "80%" }, position: 'relative', height: '100%', paddingY: '4px', alignItems: { laptop: 'center', mobile: "flex-end" }, display: 'flex', paddingX: '10px', background: '#0B4F26', marginLeft: .1, justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '0px', mobile: '10px' }, color: 'white', marginLeft: '5px', fontWeight: '500', position: 'absolute', top: 0, right: 5 }}>(04-11-2022 d)</Typography>

                        <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }} >
                            <Typography sx={{ fontSize: { mobile: '10px', laptop: '15px' }, color: 'white', fontWeight: '700' }} >{item.eventName}</Typography>
                            <Typography sx={{ fontSize: { laptop: '10px', mobile: '0' }, color: 'white', marginLeft: '5px', fontWeight: '600' }}>({moment(item.matchDate).format("DD-MM-YYYY")})</Typography>
                        </Box>
                        <StyledImage src={ArrowDown} sx={{ width: { laptop: '20px', mobile: "10px" }, height: { laptop: '10px', mobile: '6px' }, transform: selectedId === item?.matchId ? 'rotate(180deg)' : 'rotate(0deg)' }} />

                    </Box>
                    <Box sx={{ background: item.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A", paddingX: '2px', width: { mobile: "25%", laptop: "20%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                        <Typography sx={{ fontSize: { laptop: '12px', mobile: '8px' }, fontWeight: '500', color: 'white' }} >Rate Profit/Loss</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{item.rateProfitLoss}</Typography>
                            <StyledImage src={item.rateProfitLoss > 0 ? ARROWUP : ARROWDOWN} sx={{ width: { laptop: '25px', mobile: "15px" }, height: { laptop: '12px', mobile: "8px" }, }} />
                        </Box>
                    </Box>
                    <Box sx={{ background: item.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A", paddingX: '2px', width: { mobile: "25%", laptop: "20%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                        <Typography sx={{ fontSize: { laptop: '12px', mobile: '8px' }, fontWeight: '500', color: 'white' }} >Session Profit/Loss</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: '15px', fontWeight: '700', color: 'white' }}>{item.sessionProfitLoss}</Typography>
                            <StyledImage src={item.sessionProfitLoss > 0 ? ARROWUP : ARROWDOWN} sx={{ width: { laptop: '25px', mobile: "15px" }, height: { laptop: '12px', mobile: "8px" }, }} />
                        </Box>
                    </Box>
                </Box >
                {selectedId === item?.matchId && <Box sx={{ width: { mobile: '100%', laptop: '96%' }, marginTop: { mobile: '.25vh' }, marginLeft: { laptop: '4%' }, display: 'flex', flexDirection: { laptop: 'row', mobile: "column" } }}>
                    <BetHistory betData={betData} admin profit />

                    <Box sx={{ width: { laptop: '1vw', mobile: 0 } }} ></Box>
                    <SessionBetHistory betData={sessionBetData} admin profit />

                </Box>}
            </Box>
        )
    }
    return (
        <Box>
            {eventData.map((item, index) => {
                return (
                    <RowHeader item={item} index={index} />
                )
            })
            }
            {
                visible && reportData.map((item, index) => {
                    return (
                        <RowComponent item={item} index={index + 1} />
                    )
                })
            }
            {/* {
                visible && ["", "", "", ""].map((i, k) => {
                    return (
                        <RowComponent index={k + 1} />
                    )
                })
            } */}
        </Box>
    )
}
export default ProfitLossComponent;