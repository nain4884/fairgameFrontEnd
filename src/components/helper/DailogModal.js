import { Box, Modal, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { BETPLACED, NOT } from "../../assets";
import { setDailogData } from "../../store/dailogModal";

const DailogModal = ({ }) => {
    const dailogModal = useSelector(state => state?.dailogModal)
    const dispatch = useDispatch()
    return (
        <Modal
            onClose={() => dispatch(setDailogData({ isModalOpen: false }))}
            sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', outline: 'none' }}
            open={dailogModal?.isModalOpen ?? false}
            disableAutoFocus={true}
        >
            <Box sx={{ width: '260px', minHeight: "85px", borderRadius: "6px", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'white', alignSelf: 'center', display: 'flex', paddingTop: "15px", paddingBottom: '5px', position: 'absolute', top: '35%', zIndex: 999 }}>
                {!dailogModal?.showRight ? <img src={NOT} style={{ width: '50px', height: '50px', marginTop: '3px' }} /> : <img src={BETPLACED} style={{ width: '65px', height: '60px', marginTop: '3px' }} />}
                <Typography sx={{ fontSize: '20px', fontWeight: '700', marginY: '1vh', width: '80%', alignSelf: 'center', textAlign: 'center' }}>{dailogModal?.bodyText}</Typography>
                {/* <BoxButton onClick={()=>{
                    dispatch(setDailogData({isModalOpen:false}))
                }} containerStyle={{width:"200px"}}  title={"OK"} /> */}
            </Box>
        </Modal>
    )
}
const BoxButton = ({ title, containerStyle, icon, onClick }) => {
    return (
        <Box onClick={onClick} sx={[{ background: "#262626", display: "flex", justifyContent: "center", height: "40px", alignItems: "center", borderRadius: "5px", width: "34%" }, containerStyle]}>
            <Typography color="white" sx={{ fontSize: "14px" }}>{title}{icon}</Typography>
        </Box>
    )
}
export default DailogModal;
