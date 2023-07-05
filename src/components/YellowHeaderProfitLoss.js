import { Box, Typography } from "@mui/material"
import Calendar from "./Calendar";
import CustomButtonAdmin from "./CustomButtonAdmin";
import DropDownCustom from "./DropdownCustom";
import DropDownSimple from "./DropdownSimple";
import SearchInputWallet from "./SearchInputWallet";

const YellowHeaderProfitLoss = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingBottom: '.1vh' }}>
            {/* <Typography sx={{ fontSize: '18px', color: 'white', marginLeft: '10px', fontWeight: '600', marginY: '10px', alignSelf: 'start' }} >Profit/Loss</Typography> */}
            <Typography sx={{ fontSize: '16px', color: 'white', marginLeft: '0.5%', fontWeight: '600', marginY: {laptop: '0.5%', mobile: '2%'}, alignSelf: 'start' }} >Profit/Loss</Typography>
            <Box sx={{ display: 'flex', borderRadius: '5px', flexDirection: 'column', width: '99%', paddingY: {laptop: '0vh', mobile: '1vh'}, background: '#F8C851', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                <Box sx={{ display: 'flex', width: '100%', flexDirection: {laptop: "row", mobile: "column"}, padding: "10px 20px" }}>
                    <Box sx={{ width: '10px' }} ></Box>
                    <SearchInputWallet data={[
                        "john doe",
                        "lisa",
                        "lendy",
                        "senty"
                    ]} title={'Search By Client Name'} />
                    <Box sx={{ width: '10px' }} ></Box>

                    <Box sx={{ display: {laptop: "flex", mobile: "none"}, width: "40%" }} >
                        <Calendar title={'From'}  sx={{width: "50%"}}/>
                        <Box sx={{ width: '10px' }} ></Box>

                        <Calendar title={'To'} sx={{width: "50%"}}/>
                        <Box sx={{ width: '10px' }} ></Box>

                    </Box>
                    <Box sx={{width: "100%", display: {laptop: "none", mobile: "flex"}, gap: 1, height: "80px" }} >
                        <Calendar title={'From'}  />
                        <Calendar title={'To'} />
                    </Box>
                    <Box sx={{width: "100%",   alignSelf: "flex-end"}} >
                        <CustomButtonAdmin 
                            btnStyle={{
                                width: {mobile: "100%", laptop: "20%"},
                              
                            }}
                        />
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}
export default YellowHeaderProfitLoss;