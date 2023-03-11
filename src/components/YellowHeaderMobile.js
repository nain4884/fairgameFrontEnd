import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import Calendar from "./Calendar";
import CustomButton from "./CustomButton";
import DropDownCustom from "./DropdownCustom";
import DropDownSimple from "./DropdownSimple";
import SearchInput from "./SearchInput";

const YellowHeaderMobile = ({ admin }) => {
    const theme = useTheme()
    const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"))
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingBottom: '1vh' }}>
            <Typography sx={{ fontSize: '16px', color: 'white', marginLeft: '0.5%', fontWeight: '600', marginY: '0.5%', alignSelf: 'start' }} >Account Statement</Typography>
            <Box sx={{ display: 'flex', borderRadius: '5px', flexDirection: 'column', width: '99%', minHeight: '80px', background: '#F8C851', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', width: '100%', marginTop: { mobile: "5px", laptop: 0 }, flexDirection: matchesMobile ? "column" : "row", justifyContent: 'space-evenly', alignItems: matchesMobile ? "center" : "flex-start" }}>

                    <Box sx={{ display: 'flex', width: '100%', paddingX: '2%', justifyContent: 'space-between' }} >
                        <DropDownCustom dropDownStyle={{ width: "100%", position: 'absolute' }} containerStyle={{ width: "47%", marginLeft: "0px", position: 'relative' }} title={'Account Type'} data={[
                            {
                                title: "Balance Report",
                                values: ["All", "Upper Level", "Down Level"]
                            },
                            {
                                title: "Game Report",
                                values: ["All", "Cricket", "Football", "Tennis"]
                            }
                        ]} />
                        <DropDownSimple dropDownStyle={{ width: "100%", position: 'absolute' }} containerStyle={{ width: "47%", marginTop: "0px", position: 'relative' }} title={'Game Name'} data={["All", "Cricket", "Football", "Tennis"]} />
                    </Box>

                    <SearchInput titleStyle={{ display: 'none' }} containerStyle={{ width: '96%', marginTop: "10px" }} data={[
                        "john doe",
                        "lisa",
                        "lendy",
                        "senty"
                    ]} title={'Search By Client Name...'} />
                    <Box sx={{ display: 'flex', width: '96%', justifyContent: 'space-between', marginTop: '7px' }}>
                        <Calendar DatePickerProps={{ popperPlacement: "top-end" }} containerStyle={{ width: '47%' }} title={'From'} />
                        <Calendar DatePickerProps={{ popperPlacement: "top-end" }} containerStyle={{ width: '47%' }} title={'To'} />
                    </Box>
                    <Box sx={{ width: '8%' }}></Box>
                    <CustomButton btnStyle={{ height: "45px", border: '2px solid black', marginTop: '40px', marginBottom: '20px', alignSelf: matchesMobile ? "center" : "flex-end", borderRadius: "5px" }} />

                </Box>
            </Box>
        </Box>
    )
}
export default YellowHeaderMobile;