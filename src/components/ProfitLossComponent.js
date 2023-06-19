import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { StyledImage } from ".";
import { ArrowDown, Cricket } from "../assets";
import { ARROWDOWN, ARROWUP } from "../expert/assets";
import AllRateSeperate from "./AllRateSeperate";
import SessionBetSeperate from "./sessionBetSeperate";
import moment from "moment";

const ProfitLossComponent = ({eventData, reportData, betData, sessionBetData, handleReport, handleBet }) => {
    const [visible, setVisible] = useState(false)

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

    const RowHeader = ({item,index}) => {
        return (
            <Box 
                
                onClick={() => getHandleReport(item?.eventType)}
                sx={{ width: '100%', height: { laptop: '60px', mobile: '50px' }, background: 'white', display: 'flex', padding: .1 }}>
                <Box sx={{ width: { mobile: '10%', laptop: '5%' }, height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', background: '#F8C851' }}>
                    <StyledImage src={Cricket} sx={{ width: { laptop: '35px', mobile: '25px' } }} />

                </Box>
                <Box sx={{ width: { mobile: '40%', laptop: "60%" }, height: '100%', alignItems: 'center', display: 'flex', paddingX: '10px', background: '#F8C851', marginLeft: .1, justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '15px', color: 'black', fontWeight: '600' }} >{item?.eventType}</Typography>
                    <StyledImage src={ArrowDown} sx={{ width: { laptop: '20px', mobile: "10px" }, transform: visible ? 'rotate(180deg)' : 'rotate(0deg)', height: { laptop: '10px', mobile: '6px' } }} />
                </Box>
                <Box sx={{ background:item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A", paddingX: '2px', width: { mobile: "25%", laptop: "30%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: { laptop: '14px', mobile: '12px' }, fontWeight: '700', color: 'white' }} >{item?.totalLoss>0 ? "Profit":"Loss"}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: { laptop: '14px', mobile: "10px" }, fontWeight: '700', color: 'white' }}>{Number(item?.totalLoss).toFixed(2) || ""}</Typography>
                        <StyledImage src={item?.totalLoss > 0 ? ARROWUP:ARROWDOWN} sx={{ width: { laptop: '25px', mobile: "15px" }, height: { laptop: '12px', mobile: "8px" }, }} />
                    </Box>
                </Box>
                <Box sx={{ background: "#0B4F26", paddingX: '2px', width: { mobile: "25%", laptop: "30%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                    <Typography sx={{ fontSize: { laptop: '14px', mobile: '12px' }, fontWeight: '700', color: 'white' }} >Total Bet</Typography>
                    <Box sx={{ display: 'flex' }} >
                        <Typography sx={{ fontSize: { laptop: '14px', mobile: "10px" }, fontWeight: '700', color: 'white' }}>{item?.totalBet}</Typography>
                    </Box>
                </Box>
            </Box >
        )
    }
    const RowComponent = ({ item,index }) => {
        return (
            <Box sx={{ width: '100%' }}>
                <Box  onClick={() => getBetReport(item?.matchId)} sx={{ width: '100%', height: '40px', background: 'white', display: 'flex', padding: .1 }}>
                    <Box sx={{ width: { mobile: '10%', laptop: '5%' }, height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'black' }}>
                        <Typography sx={{ fontSize: '14px', color: 'white', fontWeight: '600' }} >{0 + index}</Typography>

                    </Box>
                    <Box sx={{ width: { mobile: '40%', laptop: "60%" }, position: 'relative', height: '100%', paddingY: '4px', alignItems: { laptop: 'center', mobile: "flex-end" }, display: 'flex', paddingX: '10px', background: '#0B4F26', marginLeft: .1, justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: { laptop: '0px', mobile: '10px' }, color: 'white', marginLeft: '5px', fontWeight: '500', position: 'absolute', top: 0, right: 5 }}>(04-11-2022)</Typography>

                        <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }} >
                            <Typography sx={{ fontSize: { mobile: '10px', laptop: '15px' }, color: 'white', fontWeight: '600' }} >{item.eventName}</Typography>
                            <Typography sx={{ fontSize: { laptop: '10px', mobile: '0' }, color: 'white', marginLeft: '5px', fontWeight: '500' }}>({moment(item.matchDate).format("DD-MM-YYYY")})</Typography>
                        </Box>
                        <StyledImage src={ArrowDown} sx={{ width: { laptop: '20px', mobile: "10px" }, height: { laptop: '10px', mobile: '6px' }, transform: selectedId === item?.matchId  ? 'rotate(180deg)' : 'rotate(0deg)' }} />

                    </Box>
                    <Box sx={{ background: item.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A", paddingX: '2px', width: { mobile: "25%", laptop: "30%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                        <Typography sx={{ fontSize: { laptop: '12px', mobile: '8px' }, fontWeight: '500', color: 'white' }} >Rate Profit/Loss</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: { mobile: '10px', laptop: '14px' }, fontWeight: '700', color: 'white' }}>{Number(item.rateProfitLoss).toFixed(2) || ""}</Typography>
                            <StyledImage src={item.rateProfitLoss > 0 ? ARROWUP : ARROWDOWN} sx={{ width: { laptop: '25px', mobile: "15px" }, height: { laptop: '12px', mobile: "8px" }, }} />
                        </Box>
                    </Box>
                    <Box sx={{ background:item.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A", paddingX: '2px', width: { mobile: "25%", laptop: "30%" }, height: '100%', marginLeft: .1, justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                        <Typography sx={{ fontSize: { laptop: '12px', mobile: '8px' }, fontWeight: '500', color: 'white' }} >Session Profit/Loss</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: { mobile: '10px', laptop: '14px' }, fontWeight: '700', color: 'white' }}>{Number(item.sessionProfitLoss).toFixed(2) || ""}</Typography>
                            <StyledImage src={item.sessionProfitLoss > 0 ? ARROWUP : ARROWDOWN} sx={{ width: { laptop: '25px', mobile: "15px" }, height: { laptop: '12px', mobile: "8px" }, }} />
                        </Box>
                    </Box>
                </Box >
                {selectedId === item?.matchId  && <Box sx={{ width: { mobile: '100%', laptop: '96%' }, marginTop: { mobile: '.25vh' }, marginLeft: { laptop: '4%' }, display: 'flex', flexDirection: { laptop: 'row', mobile: "column" } }}>
                    <SessionBetSeperate betHistory={true} allBetsData={sessionBetData} profit />
                    <Box sx={{ width: { laptop: '1vw', mobile: 0 } }} ></Box>
                    <AllRateSeperate  betHistory={true}  count={betData?.length}  allBetsData={betData}  profit />
                </Box>}
            </Box>
        )
    }
    return (
        <Box>
           {eventData.map((item, index) => {
                return (
                    <RowHeader key={index} item={item} index={index} />
                )
            })
            }
            {
                visible && reportData.map((item, index) => {
                    return (
                        <RowComponent key={index} item={item} index={index + 1} />
                    )
                })
            }
        </Box>
    )
}
export default ProfitLossComponent;