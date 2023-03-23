import { Box, FormControl, InputLabel, MenuItem, Select, SliderValueLabel, Typography, } from "@mui/material";
import { useState } from "react";
import { ARROWDROPDOWN } from "../admin/assets";
import StyledImage from "./StyledImage";

const DropDownSimple = ({ valued, title, data, containerStyle, titleStyle, valueContainerStyle, valueStyle, dropStyle, dropDownStyle, dropDownTextStyle, Detail, setDetail, place }) => {
    const [value, setValue] = useState(valued ?? data[0])
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
                    setDetail({
                        ...Detail, [place]: {
                            ...Detail[place],
                            val: item
                        }
                    })
                    setOpen(false)
                }} sx={[{ paddingY: '4px', paddingLeft: '7px', fontSize: '10px', fontWeight: '500', color: 'black' }, dropDownTextStyle]}>{item}</Typography>
            </>
        )
    }
    const Block = ({ i }) => {
        return (
            <Item item={i} />
        )
    }
    return (
        <Box sx={[{ width: '19%' }, containerStyle]} >
            <Typography sx={[{ fontSize: '12px', fontWeight: '600', marginBottom: '.3vh' }, titleStyle]}>{title}</Typography>
            <Box onClick={() => {
                setOpen(!open)
            }} sx={[{ width: '100%', height: '37px', justifyContent: "space-between", alignItems: 'center', display: 'flex', background: 'white', borderRadius: '3px', border: '2px solid #DEDEDE', paddingX: '7px' }, valueContainerStyle]}>
                <Typography sx={[{ fontSize: '11px', fontWeight: '500' }, valueStyle]} >{value}</Typography>
                <StyledImage src={ARROWDROPDOWN} sx={[{ width: '11px', height: '6px', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }, dropStyle]} />
            </Box>
            {open && <Box sx={[{ display: 'flex', flexDirection: 'column', background: 'white', width: '18.7%', alignSelf: 'center', borderRadius: '2px', marginTop: '2px', position: 'absolute', borderRadius: '3px', border: '2px solid #DEDEDE', zIndex: 9999 }, dropDownStyle]} >

                {data.map((i) => {
                    return (
                        <Block i={i} />
                    )
                })}
            </Box>}
        </Box>
    )
}
export default DropDownSimple;