import { Box, FormControl, InputLabel, MenuItem, Select, SliderValueLabel, Typography, } from "@mui/material";
import { useState } from "react";
import { ARROWDROPDOWN } from "../admin/assets";

const DropDownCustom = ({ handleChange, title, data, containerStyle, dropDownStyle }) => {
    const [value, setValue] = useState("All",)
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
                    setValue(item)
                    setOpen(false)
                }} sx={{ paddingY: '4px', paddingLeft: '20px', fontSize: '10px', fontWeight: '500', color: 'black' }}>{item}</Typography>


            </>
        )
    }
    const Block = ({ i }) => {
        const [inside, setInside] = useState(true)
        return (
            <>
                <Box onClick={() => {
                    setInside(!inside)
                }} sx={{ paddingX: '7px', paddingTop: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Typography sx={{ fontSize: '11px', fontWeight: '500' }} >{i.title}</Typography>
                    <img alt="arrow" src={ARROWDROPDOWN} style={{ width: '11px', height: '6px', transform: !inside ? 'rotate(0deg)' : 'rotate(180deg)' }} />
                </Box>
                {
                    inside && i.values.map((item) => {
                        return (
                            <Item item={item} />
                        )
                    })
                }
            </>
        )
    }
    return (
        <Box sx={[{ width: '19%' }, containerStyle]} >
            <Typography sx={{ fontSize: '12px', fontWeight: '600', marginBottom: '.3vh' }}>{title}</Typography>
            <Box onClick={() => {
                setOpen(!open)
            }} sx={{ width: '100%', height: '37px', justifyContent: "space-between", alignItems: 'center', display: 'flex', background: 'white', borderRadius: '3px', border: '2px solid #DEDEDE', paddingX: '7px' }}>
                <Typography sx={{ fontSize: '11px', fontWeight: '500' }} >{value}</Typography>
                <img alt="arrow" src={ARROWDROPDOWN} style={{ width: '11px', height: '6px', transform: !open ? 'rotate(0deg)' : 'rotate(180deg)' }} />
            </Box>
            {open && <Box sx={[{ display: 'flex', flexDirection: 'column', background: 'white', width: '19%', alignSelf: 'center', borderRadius: '2px', marginTop: '2px', position: 'absolute', borderRadius: '3px', border: '2px solid #DEDEDE', zIndex: 9999 }, dropDownStyle]} >

                {data.map((i, idx) => {
                    return (
                        <Block key={idx} i={i} />
                    )
                })}
            </Box>}
        </Box>
    )
}
export default DropDownCustom;