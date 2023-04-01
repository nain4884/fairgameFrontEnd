import { Box, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import DropDownSimple from '../../components/DropdownSimple'
import { matchType } from '../../components/constants'
import { useEffect } from 'react'

const stateDetail = {
    1: { field: "match_id", val: '' },
    2: { field: "matchType", val: '' },
    3: { field: "sessionBet", val: '' },
    4: { field: "teamA_lay", val: 0 },
    5: { field: "teamB_lay", val: 0 },
    6: { field: "teamA_Back", val: 0 },
    7: { field: "teamB_Back", val: 0 },
    8: { field: "drawRate", val: 0 },
    9: { field: "bet_condition", val: '' },
    10: { field: "no_rate", val: 0 },
    11: { field: "yes_rate", val: 0 },
    12: { field: "rate_percent", val: 0 }
}

const imputStyle = { fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" } }

function AddBetComp() {

    const [Detail, setDetail] = useState(stateDetail)

    const [Error, setError] = useState({
        1: { field: "match_id", val: false },
        2: { field: "matchType", val: false },
        3: { field: "sessionBet", val: false },
        4: { field: "teamA_lay", val: false },
        5: { field: "teamB_lay", val: false },
        6: { field: "teamA_Back", val: false },
        7: { field: "teamB_Back", val: false },
        8: { field: "drawRate", val: false },
        9: { field: "bet_condition", val: false },
        10: { field: "no_rate", val: false },
        11: { field: "yes_rate", val: false },
        12: { field: "rate_percent", val: false }
    })

    useEffect(() => {

    }, [Detail])

    console.log('Detail', Detail)

    return (
        <>
            <Box sx={{ margin: '15px' }}>
                <LabelValueComponent title={'Add Bet'} notShowSub={true} titleSize={'20px'} headColor={'white'} />
            </Box>
            <Box sx={{ background: "#F8C851", marginTop: "20px", borderRadius: "5px", p: "10px", py: "20px", margin: '15px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <DropDownSimple valued="Select Bet Type..." dropStyle={{ filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);" }} valueStyle={{ ...imputStyle, color: "white" }} title={'Match / Session'} data={['Match Odds', 'Session Odds']} valueContainerStyle={{ height: "45px", marginX: "0px", background: "#0B4F26", border: "1px solid #DEDEDE", borderRadius: "5px" }} containerStyle={{ width: "100%", position: 'relative', marginTop: "5px" }} titleStyle={{ marginLeft: "0px", color: '#575757' }} dropDownStyle={{ width: '100%', marginLeft: "0px", marginTop: "0px", position: 'absolute' }} dropDownTextStyle={imputStyle} Detail={Detail} setDetail={setDetail} place={3} />
                <DropDownSimple valued="Select Sports..." dropStyle={{ filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);" }} valueStyle={{ ...imputStyle, color: "white" }} title={'Sports'} data={matchType} valueContainerStyle={{ height: "45px", marginX: "0px", background: "#0B4F26", border: "1px solid #DEDEDE", borderRadius: "5px" }} containerStyle={{ width: "100%", position: 'relative', marginTop: "5px" }} titleStyle={{ marginLeft: "0px", color: '#575757' }} dropDownStyle={{ width: '100%', marginLeft: "0px", marginTop: "0px", position: 'absolute' }} dropDownTextStyle={imputStyle} Detail={Detail} setDetail={setDetail} place={2} />
                <DropDownSimple valued="Select Active Match For Betting..." dropStyle={{ filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);" }} valueStyle={{ ...imputStyle, color: "white" }} title={'Available Match For Betting'} data={['Match Odds', 'Session Odds']} valueContainerStyle={{ height: "45px", marginX: "0px", background: "#0B4F26", border: "1px solid #DEDEDE", borderRadius: "5px" }} containerStyle={{ width: "100%", position: 'relative', marginTop: "5px" }} titleStyle={{ marginLeft: "0px", color: '#575757' }} dropDownStyle={{ width: '100%', marginLeft: "0px", marginTop: "0px", position: 'absolute' }} dropDownTextStyle={imputStyle} Detail={Detail} setDetail={setDetail} place={1} />
            </Box>
            {Detail[3].val === "Session Odds" && <Box sx={{ background: "#F8C851", marginTop: "20px", borderRadius: "5px", p: "10px", py: "20px", margin: '15px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography sx={{ fontSize:"18px", fontWeight: "600", color: '#000000' }}>Session Bet</Typography>
                <Box sx={{ display: "flex", marginTop: "30px" }}>
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team A Back"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team A Lay"} type={"text"} value="Enter Name of Team B..." InputValType={"InputVal"} place={13} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Draw Rate"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                </Box>
                <Box sx={{ display: "flex", marginTop: "20px" }}>
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team B Back"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team B Lay"} type={"text"} value="Enter Name of Team B..." InputValType={"InputVal"} place={13} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} />
                </Box>
                {/* <Box sx={{ display: "flex", marginTop: "20px" }}>
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Draw Rate"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                </Box> */}
            </Box>}
            {Detail[3].val !== "Session Odds" && <Box sx={{ background: "#F8C851", marginTop: "20px", borderRadius: "5px", p: "10px", py: "20px", margin: '15px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography sx={{ fontSize:"18px", fontWeight: "600", color: '#000000' }}>Match Bet</Typography>
                <Box sx={{ display: "flex", marginTop: "30px" }}>
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Bet Condition"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Rate Percent"} type={"text"} value="Enter Name of Team B..." InputValType={"InputVal"} place={13} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                </Box>
                <Box sx={{ display: "flex", marginTop: "20px" }}>
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Yes Rate"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"No Rate"} type={"text"} value="Enter Name of Team B..." InputValType={"InputVal"} place={13} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                </Box>
            </Box>}
            <Box sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}>
                <Box onClick={() => {
                    // createMatch()
                }} sx={{ background: "#10DC61", height: "40px", width: "15%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px", border: "2px solid black" }}>
                    <Typography sx={{ color: "white", lineHeight: 1 }}>Create Bet</Typography>
                </Box>
                <Box onClick={() => {
                    // setShowMatch(false)
                    // setDetail(stateDetail)
                }} sx={{ background: "#E32A2A", height: "40px", marginLeft: "20px", display: "flex", width: "15%", justifyContent: "center", alignItems: "center", borderRadius: "5px", border: "2px solid black" }}>
                    <Typography sx={{ color: "white", lineHeight: 1 }}>Cancel Bet</Typography>
                </Box>
            </Box>
        </>
    )
}

const LabelValueComponent = ({ title, containerStyle, titleSize, headColor, InputValType }) => {
    return (
        <Box className="beFairMatch" sx={[containerStyle]}>
            <Typography sx={{ fontSize: titleSize ? titleSize : "12px", fontWeight: "600", color: headColor ? headColor : '#575757' }}>{title}</Typography>
            {InputValType && <input sx={{borderRadius: '5px'}}/>}
        </Box>
    )
}


export default AddBetComp