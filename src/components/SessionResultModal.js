import { Box, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { CancelDark } from "../assets"

const SessionResultModal = ({ onClick, undeclare }) => {
    const [selected, setSelected] = useState('')
    const CustomButton = ({ title, color }) => {
        return (
            <Box onClick={(e) => {
                e.stopPropagation()
                onClick()
            }} sx={{ width: '55%', height: '38px', borderRadius: '10px', background: color, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: '500', color: 'white' }}>{title}</Typography>
            </Box>
        )
    }
    return (
        <Box sx={{ width: '300px', height: '240px', padding: .2, borderRadius: 2, boxShadow: '0px 5px 10px #1A568414', background: 'white' }}>
            <Box sx={[{ width: '100%', justifyContent: 'space-between', paddingX: '10px', display: 'flex', alignItems: 'center', height: '50px', background: 'white', borderRadius: 2 }, (theme) => ({ backgroundImage: theme.palette.primary.headerGradient })]}>
                <Typography sx={{ fontWeight: 'bold', color: 'white', fontSize: '18px' }} >Session Result</Typography>
                <img onClick={(e) => {
                    e.stopPropagation()
                    onClick()
                }} src={CancelDark} style={{ width: '25px', height: '25px' }} />
            </Box>
            <Box sx={{ width: '100%', flexWrap: 'wrap', paddingTop: '3%', flexDirection: 'row', display: 'flex', alignSelf: 'center', alignItems: 'center', justifyContent: "center", }}>
                <TextField
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        sx: {
                            alignSelf: 'center',
                            border: '1px solid #303030',
                            borderRadius: '5px',
                            paddingY: '5px',
                            paddingX: "1vw"
                        }
                    }}
                />
            </Box>
            <Box sx={{ width: '100%', marginTop: '5%', height: '100px', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {undeclare && <CustomButton color={'#FF4D4D'} title={'Un Declare'} />}
                <CustomButton color={'#0B4F26'} title={'Declare'} />
            </Box>
        </Box>
    )
}
export default SessionResultModal;