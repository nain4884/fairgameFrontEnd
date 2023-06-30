import { Box, FormControl, InputLabel, MenuItem, Select, SliderValueLabel, Typography, } from "@mui/material";
import { useState } from "react";
import { ARROWDROPDOWN } from "../admin/assets";
import { useDispatch, useSelector } from "react-redux";

const SmallDropDown = ({ handleChange ,getLimitEntries}) => {
  const { currentStatementPage } = useSelector((state) => state?.auth);
//   alert(currentStatementPage)
  const dispatch = useDispatch()
    const [value, setValue] = useState(15)
    const [open, setOpen] = useState(false)
    const Divider = () => {
        return (
            <Box sx={{ width: '100%', height: '1px', background: '#DEDEDE' }} ></Box>
        )
    }
    const Item = ({ item }) => {
        return (
            <>
                <Typography onClick={() => {
                    getLimitEntries(item)
                    setValue(item)
                    setOpen(false)
                }} sx={{ textAlign: 'center', paddingY: '1px' }}>{item}</Typography>
                <Divider /></>
        )
    }
    return (
        <Box >
            <Box onClick={() => {
                setOpen(!open)
            }} sx={{ width: '47px', height: '30px', justifyContent: "space-around", alignItems: 'center', display: 'flex', background: 'white', borderRadius: '5px', border: '2px solid #DEDEDE', marginX: '5px' }}>
                <Typography sx={{ fontSize: '12px' }} >{value}</Typography>
                <img src={ARROWDROPDOWN} style={{ width: '12px', height: '7px', zIndex: 5, transform: open ? 'rotate(0deg)' : 'rotate(180deg)' }} />
            </Box>
            {open && <Box sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: '47px', alignSelf: 'center', marginX: '5px', borderRadius: '2px', marginTop: '2px', position: 'absolute', zIndex: 22 }} >

                {['1', '2', '3', '4', '5','6','7','8','9','10',"11","12","13","14", "15"].map((i) => {
                    return (<Item item={i} getLimitEntries={getLimitEntries} />)
                })}
            </Box>}
        </Box>
    )
}
export default SmallDropDown;