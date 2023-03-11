import { Box, Button, Input, styled, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput, StyledImage } from "../../components";
import { ArrowDownBlack, ArrowDownWhite, Upload2 as Upload } from "../../expert/assets";
import { DatePicker } from 'rsuite';
import Header from './Header'
import Background from './Background'
import "./style.css"
import axios from "../../axios/expertAxios";
import DropDownSimple from "../../components/DropdownSimple";
const containerStyles = {
    marginTop: "10px"
}
const titleStyles = { color: "#202020", fontSize: { mobile: "12px", laptop: "12px" }, fontWeight: "600", marginLeft: "0px" }
const imputStyle = { fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" } }
const inputContainerStyle = { borderRadius: "5px", border: "1px solid #DEDEDE" }

const stateDetail = {
    1: { field: "Game", val: "" },
    2: { field: "Start_Time", val: "" },
    3: { field: "Betfair_Match_Max_Bet", val: "" },
    4: { field: "Bookmaker_Manual_Max_Bet", val: "" },
    5: { field: "Match_Name", val: "" },
    6: { field: "Image", val: 0 },
    7: { field: "Betfair_Session_Min_Bet", val: "" },
    8: { field: "Bookmaker_Manual_Min_Bet", val: 0 },
    9: { field: "Team_A", val: "" },
    10: { field: "Team_A_Image", val: 0 },
    11: { field: "Betfair_Session_Max_Bet_A", val: 0 },
    12: { field: "Manaual_Session_Min_Bet_A", val: 0 },
    13: { field: "Team_B", val: "" },
    14: { field: "Team_B_Image", val: "" },
    15: { field: "Betfair_Bookmaker_Max_Bet_B", val: 0 },
    16: { field: "Manaual_Session_Max_Bet_B", val: 0 },
    17: { field: "Team_C", val: "" },
    18: { field: "Betfair_Bookmaker_Max_Bet_C", val: 0 },
    19: { field: "Manaual_Session_Max_Bet_C", val: 0 }
}

export default function Home1() {

    const [Detail, setDetail] = useState(stateDetail)

    const [Error, setError] = useState({
        1: { field: "Game", val: false },
        2: { field: "Start_Time", val: false },
        3: { field: "Betfair_Match_Max_Bet", val: false },
        4: { field: "Bookmaker_Manual_Max_Bet", val: false },
        5: { field: "Match_Name", val: false },
        6: { field: "Image", val: false },
        7: { field: "Betfair_Session_Min_Bet", val: false },
        8: { field: "Bookmaker_Manual_Min_Bet", val: false },
        9: { field: "Team_A", val: false },
        10: { field: "Team_A_Image", val: false },
        11: { field: "Betfair_Session_Max_Bet_A", val: false },
        12: { field: "Manaual_Session_Min_Bet_A", val: false },
        13: { field: "Team_B", val: false },
        14: { field: "Team_B_Image", val: false },
        15: { field: "Betfair_Bookmaker_Max_Bet_B", val: false },
        16: { field: "Manaual_Session_Max_Bet_B", val: false },
        17: { field: "Team_C", val: false },
        18: { field: "Betfair_Bookmaker_Max_Bet_C", val: false },
        19: { field: "Manaual_Session_Max_Bet_C", val: false }
    })

    const createMatch = async () => {
        let payload = {
            Game: "",
            Start_Time: "",
            Betfair_Match_Max_Bet: "",
            Bookmaker_Manual_Max_Bet: "",
            Match_Name: "",
            Image: 0,
            Betfair_Session_Min_Bet: "",
            Bookmaker_Manual_Min_Bet: 0,
            Team_A: 0,
            Team_A_Image: 0,
            Betfair_Session_Max_Bet_A: "",
            Manaual_Session_Min_Bet_A: "",
            Team_B: 0,
            Team_B_Image: 0,
            Betfair_Session_Max_Bet_B: "",
            Manaual_Session_Min_Bet_B: "",
            Team_C: 0,
            Betfair_Bookmaker_Max_Bet_C: 0,
            Manaual_Session_Max_Bet_C: ""
        }
        try {
            payload = {
                ...payload,
                Game: Detail[1].val,
                Start_Time: Detail[2].val,
                Betfair_Match_Max_Bet: Detail[3].val,
                Bookmaker_Manual_Max_Bet: Detail[4].val,
                Match_Name: Detail[5].val,
                Image: Detail[6].val,
                Betfair_Session_Min_Bet: Detail[7].val,
                Bookmaker_Manual_Min_Bet: Detail[8].val,
                Team_A: Detail[9].val,
                Team_A_Image: Detail[10].val,
                Betfair_Session_Max_Bet_A: Detail[11].val,
                Manaual_Session_Min_Bet_A: Detail[12].val,
                Team_B: Detail[13].val,
                Team_B_Image: Detail[14].val,
                Betfair_Session_Max_Bet_B: Detail[15].val,
                Manaual_Session_Min_Bet_B: Detail[16].val,
                Team_C: Detail[17].val,
                Betfair_Bookmaker_Max_Bet_C: Detail[18].val,
                Manaual_Session_Max_Bet_C: Detail[19].val
            }
            const { data } = await axios.post(`/fair-game-wallet/adduser`, payload);
        } catch (e) {
            console(e)
        }
    }

    useEffect(() => {
        console.log(Detail)
    }, [Detail])

    const [showMatch, setShowMatch] = useState(false)
    const navigate = useNavigate()
    return (
        <Background>
            <Header />
            <Box sx={{ background: "white", borderRadius: "5px", m: "10px", p: "10px" }}>
                <Box sx={{ display: "flex" }}>
                    <LabelValueComponent icon={ArrowDownWhite} valueStyle={{ color: "white" }} valueContainerStyle={{ background: "#0B4F26" }} containerStyle={{ flex: 1 }} title={"BetFair Match List"} value="India vs Pakistan" />
                    <LabelValueComponent icon={ArrowDownWhite} valueStyle={{ color: "white" }} valueContainerStyle={{ background: "#0B4F26" }} containerStyle={{ flex: 1, marginLeft: "20px" }} title={"BetFair Maximum Amount"} value="$ 1,00,000,000,000,000" />
                </Box>
                <Box sx={{ background: "#F8C851", marginTop: "20px", borderRadius: "5px", p: "10px", py: "20px" }}>
                    <Box sx={{ display: "flex" }}>
                        {/* <LabelValueComponent icon={ArrowDownBlack} valueStyle={{}} containerStyle={{ flex: 1 }} title={"Game"} value="Select Game" /> */}
                        <Box sx={{ flex: 1, position: "relative" }}>
                            <DropDownSimple valued="Select Account Type..." dropStyle={{ filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);" }} valueStyle={{ ...imputStyle, color: "white" }} title={'Game'} valueContainerStyle={{ height: "45px", marginX: "0px", background: "#0B4F26", border: "1px solid #DEDEDE", borderRadius: "5px" }} containerStyle={{ width: "100%", position: 'relative', marginTop: "5px" }} titleStyle={{ marginLeft: "0px" }} data={["Cricket", "Football", "Tennis", "Football", "Ice", "Hockey", "Volleyball", "Politics", "Basketball", "Table Tennis", "Darts"]} dropDownStyle={{ width: '100%', marginLeft: "0px", marginTop: "0px", position: 'absolute' }} dropDownTextStyle={imputStyle} Detail={Detail} setDetail={setDetail} place={1} />
                            {/* <DropDownSimple titleStyle={{ marginY: "0px", fontSize: "12px" }} valueContainerStyle={{ border: "0px", borderRadius: "5px" }} dropDownStyle={{ width: "100%", background: "#F2F2F2" }} containerStyle={{ width: "100%" }} title={'Game'} data={["Cricket", "Football", "Tennis", "Football", "Ice", "Hockey", "Volleyball", "Politics", "Basketball", "Table Tennis", "Darts"]} place={1} /> */}
                        </Box>
                        <Box sx={{ flex: 1, position: "relative", marginLeft: "1%" }}>
                            <DropDownSimple valued="Select Account Type..." dropStyle={{ filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);" }} valueStyle={{ ...imputStyle, color: "white" }} title={'Match Name'} valueContainerStyle={{ height: "45px", marginX: "0px", background: "#0B4F26", border: "1px solid #DEDEDE", borderRadius: "5px" }} containerStyle={{ width: "100%", position: 'relative', marginTop: "5px" }} titleStyle={{ marginLeft: "0px" }} data={["India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England"]} dropDownStyle={{ width: '100%', marginLeft: "0px", marginTop: "0px", position: 'absolute' }} dropDownTextStyle={imputStyle} Detail={Detail} setDetail={setDetail} place={5} />
                            {/* <DropDownSimple titleStyle={{ marginY: "0px", fontSize: "12px" }} valueContainerStyle={{ border: "0px", borderRadius: "5px" }} dropDownStyle={{ width: "100%", background: "#F2F2F2" }} containerStyle={{ width: "100%" }} title={'Match Name'} data={["India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England", "India vs Pakistan", "Australia vs England"]} place={2} /> */}
                        </Box>
                        {/* <LabelValueComponent icon={ArrowDownBlack} containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Match Name"} value="Enter Name of the Match..." /> */}
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team A"} type={"text"} value="Enter Name of Team A..." InputValType={"InputVal"} place={9} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team B"} type={"text"} value="Enter Name of Team B..." InputValType={"InputVal"} place={13} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team C"} type={"text"} value="Enter Name of Team C..." InputValType={"InputVal"} place={17} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "20px" }}>
                        <LabelValueComponent icon={ArrowDownBlack} valueStyle={{}} containerStyle={{ flex: 1 }} title={"Start Time"} value="Select Start Time..." InputValType={"DatePickerVal"} place={2} DetailError={{ Error, setDetail, Detail, setError }} />
                        <LabelValueComponent icon={Upload} containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Image (Optional)"} value="No File Selected..." InputValType={"FileSelectVal"} place={6} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent icon={Upload} containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team A Image (Optional)"} value="No File Selected..." InputValType={"FileSelectVal"} place={10} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent icon={Upload} containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Team B Image (Optional)"} value="No File Selected..." InputValType={"FileSelectVal"} place={14} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Betfair Match Min Bet"} type={"Number"} value="Enter your Match Min Bet..." InputValType={"InputVal"} place={18} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        {/* <Input placeholder="Delhi" containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"City"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={5} /> */}
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "20px" }}>
                        <LabelValueComponent valueStyle={{}} containerStyle={{ flex: 1 }} title={"Betfair Match Max Bet"} type={"Number"} value="Enter your Match Max Bet..." InputValType={"InputVal"} place={3} DetailError={{ Error, setDetail, Detail, setError, type: "Number" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Betfair Session Min Bet"} type={"Number"} value="Betfair Session Min Bet..." InputValType={"InputVal"} place={7} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Betfair Session Max Bet"} type={"Number"} value="Betfair Session Max Bet..." InputValType={"InputVal"} place={11} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Betfair Bookmaker Max Bet"} type={"Number"} value="Enter  Bookmaker Max Bet..." InputValType={"InputVal"} place={15} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Betfair Bookmaker Min Bet"} type={"Number"} value="Enter Bookmaker Min Bet..." InputValType={"InputVal"} place={16} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                    </Box>
                    <Box sx={{ display: "flex", marginTop: "20px" }}>
                        <LabelValueComponent valueStyle={{}} containerStyle={{ flex: 1 }} title={"Bookmaker Manual Max Bet"} type={"Number"} value="Enter Bookmaker Manaul Max Bet..." InputValType={"InputVal"} place={4} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Bookmaker Manual Min Bet"} type={"Number"} value="Enter Bookmaker Manaul Max Bet..." InputValType={"InputVal"} place={8} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Manaual Session Min Bet"} type={"Number"} value="Enter Session Min Bet..." InputValType={"InputVal"} place={16} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <LabelValueComponent containerStyle={{ flex: 1, marginLeft: "1%" }} title={"Manaual Session Max Bet"} type={"Number"} value="Enter Session Max Bet..." InputValType={"InputVal"} place={19} DetailError={{ Error, setDetail, Detail, setError, type: "String" }} />
                        <Box sx={{ flex: 1, marginLeft: "1%" }} />
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}>
                    <Box onClick={() => {
                        createMatch()
                        // setShowMatch(true)
                        navigate('/expert/match')
                    }} sx={{ background: "#10DC61", height: "40px", width: "15%", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px", border: "2px solid black" }}>
                        <Typography sx={{ color: "white" }}>Create</Typography>
                    </Box>
                    <Box onClick={() => {
                        console.log("stateDetail, Detail", stateDetail, Detail)
                        setShowMatch(false)
                        setDetail(stateDetail)
                    }} sx={{ background: "#E32A2A", height: "40px", marginLeft: "20px", display: "flex", width: "15%", justifyContent: "center", alignItems: "center", borderRadius: "5px", border: "2px solid black" }}>
                        <Typography sx={{ color: "white" }}>Cancel</Typography>
                    </Box>
                </Box>
            </Box>
            {/* {showMatch && <MatchListComp />} */}
        </Background>
    )
}

const LabelValueComponent = ({ title, value, icon, containerStyle, valueStyle, valueContainerStyle, InputValType, place, DetailError, type }) => {
    return (
        <Box className="beFairMatch" sx={[containerStyle]}>
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>{title}</Typography>
            <ShowComponent InputValType={InputValType} value={value} valueContainerStyle={valueContainerStyle} valueStyle={valueStyle} icon={icon} place={place} DetailError={DetailError} type={type} />
        </Box>
    )
}

const ShowComponent = ({ InputValType, value, valueContainerStyle, valueStyle, icon, place, DetailError, type }) => {
    switch (InputValType) {
        case "InputVal":
            return (
                <Box sx={[{ height: "35px", borderRadius: "5px", px: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" }, valueContainerStyle]}>
                    {/* <Input containerStyle={containerStyles} placeholder="1,000,000,000" titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"Credit Reference"} setDetail={setDetail} Detail={Detail} setError={setError} error={error} place={8} type={"Number"} /> */}
                    <Input placeholder={`${value}`} containerStyle={containerStyles} titleStyle={titleStyles} inputStyle={imputStyle} inputContainerStyle={inputContainerStyle} title={"City"} type={type} onChange={(e) => {
                        DetailError.setDetail({
                            ...DetailError.Detail, [place]: {
                                ...DetailError.Detail[place],
                                val: type === "Number" ? parseInt(e.target.value) : e.target.value.toString()
                            }
                        });
                        DetailError.setError({
                            ...DetailError.error, [place]: {
                                ...DetailError.Detail[place],
                                val: type === "Number" ? DetailError.Detail[place].val === 0 : DetailError.Detail[place].val === ""
                            }
                        })
                    }} />
                </Box>
            )
        case "FileSelectVal":
            return (
                <Button variant="contained" component="label" sx={[{ height: "35px", borderRadius: "5px", px: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" }, valueContainerStyle]}>
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                    {icon && <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />}
                </Button>
            )
        case "DatePickerVal":
            return (
                <DatePicker format="yyyy-MM-dd HH:mm" onChange={(e) => {
                    console.log(e);
                    DetailError.setDetail({
                        ...DetailError.Detail, [place]: {
                            ...DetailError.Detail[place],
                            val: e.toString()
                        }
                    });
                }} />
            )
        default:
            return (
                <Box sx={[{ height: "35px", borderRadius: "5px", px: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white" }, valueContainerStyle]}>
                    <Typography sx={[{ color: "black", fontSize: "11px" }, valueStyle]}>{value}</Typography>
                    {icon && <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />}
                </Box>
            )
    }
}

const MatchListComp = () => {
    return (
        <Box sx={[{ marginX: "10px", marginTop: '10px', minHeight: "200px", borderRadius: "10px", border: "2px solid white" }, (theme) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`
        })]}>
            <ListH />
            <ListHeaderT />
            <Row index={1} />
            <Row index={2} containerStyle={{ background: "#ECECEC" }} />
            <Row index={3} />
        </Box>
    )
}

const ListH = () => {
    const navigate = useNavigate()
    return (<Box display={"flex"} sx={{ justifyContent: "space-between", px: "10px", py: "10px" }}>
        <Typography sx={{ fontSize: '16px', color: 'white', fontWeight: '500' }}>Match List</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchInput placeholder={"Search Match..."} />
            <CusButton onClick={() => {
                navigate('/expert/home1')
            }} title={"Add Match"} />
        </Box>
    </Box>)
}

const CusButton = ({ title, onClick }) => {
    return (<Box onClick={onClick} sx={{ height: "35px", minWidth: "100px", marginLeft: "10px", borderRadius: "5px", background: "#0B4F26", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ color: "white", fontSize: "13px" }}>{title}</Typography>
    </Box>)
}


const ListHeaderT = () => {
    return (
        <Box sx={{ display: "flex", height: "35px", background: "#262626", alignItems: "center", borderTop: "2px solid white", borderBottom: "2px solid white" }}>
            <Box sx={{ width: "60px", display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px", borderRight: "2px solid white" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Sr No.</Typography>
            </Box>
            <Box sx={{ flex: 1, display: "flex", paddingLeft: "10px", alignItems: "center", height: "35px" }}>
                <Typography sx={{ color: "white", fontSize: "12px" }}>Title</Typography>
            </Box>

        </Box>
    )
}

const Row = ({ index, containerStyle }) => {
    const navigate = useNavigate()
    return (
        <Box sx={[{ display: "flex", height: "45px", background: "#FFE094", alignItems: "center", borderBottom: "2px solid white" }, containerStyle]}>
            <Box sx={{ display: "flex", width: "60px", paddingLeft: "10px", alignItems: "center", height: "45px", borderRight: "2px solid white" }}>
                <Typography sx={{ fontSize: "12px" }}>{index}</Typography>
            </Box>
            <Box sx={{ flex: 1, display: "flex", paddingX: "10px", alignItems: "center", height: "45px" }}>
                <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
                    <ButtonWithSwitch title="India vs Pakistan" containerStyle={{ width: "30%" }} />
                    <ButtonWithSwitch title="Bookmaker" containerStyle={{}} />
                    <ButtonWithSwitch title="Session" containerStyle={{}} />
                    <ButtonWithSwitch title={`Manual\nSession`} containerStyle={{ width: "13%" }} />
                    <ButtonWithSwitch title={`Manual\nBookmaker`} containerStyle={{}} />
                </Box>
                <CusButton onClick={() => {
                    navigate('/expert/betodds')
                }} title={"Submit"} />
            </Box>
        </Box>
    )
}

const ButtonWithSwitch = ({ title, containerStyle, titleStyle }) => {
    const [background, setBackground] = useState("#0B4F26")
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        if (checked) {
            setBackground("#0B4F26")
        } else {
            setBackground("#FF4D4D")
        }
    }, [checked])
    return (<Box sx={[{ height: "35px", minWidth: "100px", width: "14%", marginLeft: "10px", borderRadius: "5px", background: background, display: "flex", justifyContent: "space-between", alignItems: "center" }, containerStyle]}>
        <Typography sx={[{ color: "white", fontWeight: '500', fontSize: '13px', marginLeft: "1vw", lineHeight: "14px" }, titleStyle]}>{title}</Typography>
        <MaterialUISwitch checked={checked} onChange={(e) => {
            setChecked(!checked)
        }} />
    </Box>)
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 50,
    height: 35,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        marginTop: "8px",
        marginRight: "1px",
        padding: 0,
        paddingLeft: "3px",
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#10DC61',
            transform: 'translateX(20px)',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: "white",
            },
            '& .MuiSwitch-thumb': {
                backgroundColor: "#10DC61"
            }
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: "#FF4D4D",
        width: 18,
        height: 18,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: "white",
        borderRadius: 20,
    },
}));
export { MatchListComp };