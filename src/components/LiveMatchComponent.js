// https://www.sciencekids.co.nz/images/pictures/flags680/India.jpg
// https://www.sciencekids.co.nz/images/pictures/flags680/Pakistan.jpg
import { TextField, Typography, useTheme, useMediaQuery, Divider } from "@mui/material"
import { Box } from "@mui/system"
import './index.css'
import { ARROWUP, Header, INDIA, Info, Lock, Logout, PAKISTAN, TIME, UD } from "../admin/assets/index"
import { useState } from "react"

const LiveMatchComponent = ({ }) => {
    const [visible, setVisible] = useState(true)
    return (
        <Box sx={[{ position: 'relative', width: { tablet: "55%", mobile: "98%", laptop: '100%' }, display: 'flex', flexDirection: 'column', alignSelf: 'center', marginX: { laptop: '0vw', mobile: '0px', tablet: '0px' }, marginTop: ".5vh", borderRadius: '2px', background: 'white', alignSelf: { mobile: 'center', tablet: 'center', laptop: "flex-start" } }]}>
            <Box sx={{ display: 'flex', height: 38, marginTop: '2spx', flexDirection: 'row', width: '99.1%', alignSelf: 'center' }}>
                <Box sx={{ flex: 1, background: '#f1c550', alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: { laptop: '13px', tablet: '12px', mobile: "12px" }, fontWeight: 'bold', marginLeft: '7px' }} >Live Scoreboard</Typography>
                </Box>
                <Box sx={{
                    flex: .1, background: '#262626'
                    // '#262626' 
                }}>
                    <div className="slanted"></div>

                </Box>
                <Box sx={{
                    flex: 1, background: '#262626',
                    // '#262626' ,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>

                    <img onClick={() => {
                        setVisible(!visible)
                    }} src={ARROWUP} style={{ transform: visible ? 'rotate(180deg)' : 'rotate(0deg)', width: '15px', height: '15px', marginRight: '5px', marginLeft: '5px' }} />
                </Box>
            </Box >
            {visible && <Box sx={{ display: 'flex', padding: '1vh', flexDirection: 'column', flex: 1, justifyContent: 'flex-end', borderBottom: '0px solid', borderColor: 'gray' }} >
                <Typography sx={{ marginBottom: '10px', fontSize: '10px', color: 'grey' }}><span style={{ fontWeight: '600', color: "black" }} >World T20 </span>Sunday 23 Oct 2022 10:00 am</Typography>
                <Box sx={{ display: 'flex' }} >

                    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }} >
                        <img style={{ width: '45px', height: '35px', "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} src="https://www.sciencekids.co.nz/images/pictures/flags680/India.jpg" />
                        <Typography sx={{ fontSize: { mobile: '8px', table: '10px', laptop: '12px' }, marginTop: '1vh', fontWeight: '600' }}  >India</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: .2, alignItems: 'center', flexDirection: 'column', display: 'flex', marginTop: '1vh' }} >
                        <Typography sx={{ fontSize: { mobile: '8px', tablet: '8px', laptop: '10px' }, marginTop: '5vh', color: 'gray', fontWeight: '600' }}  >V/S</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }} >
                        <img style={{ width: '45px', height: '35px', "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} src="https://www.sciencekids.co.nz/images/pictures/flags680/Pakistan.jpg" />
                        <Typography sx={{ fontSize: { mobile: '8px', table: '10px', laptop: '12px' }, marginTop: '1vh', fontWeight: '600' }}  >Pakistan</Typography>
                    </Box>

                </Box>

            </Box>}
            {/* {visible && <Box sx={{ width: '99.2%', height: '63%', top: 40, left: '2px', background: 'rgba(0,0,0,0.5)', position: 'absolute' }} >

            </Box>} */}
        </Box >
    )
}

export default LiveMatchComponent;