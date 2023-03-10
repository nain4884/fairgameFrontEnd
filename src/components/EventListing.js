import { Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { BASKETBALL, Card, CHESS, Cricket, Football, GOLF, Hockey, Play, Slot, SNOOKER, Tennis } from "../assets"
import { setActive } from "../store/betPlace"
import './index.css'
const EventListing = ({ selected, setSelected }) => {
    const dispatch = useDispatch()
    const data = [
        {
            title: "INPLAY",
            image: Play
        },
        {
            title: "LIVE CASINO",
            image: Slot
        },
        {
            title: "LIVE CARD",
            image: Card
        },
        {
            title: "CRICKET",
            image: Cricket
        },
        {
            title: "SOCCER",
            image: Football
        },
        {
            title: "TENNIS",
            image: Tennis
        },
        {
            title: "ICE HOCKEY",
            image: Hockey
        },
        {
            title: "SNOOKER",
            image: SNOOKER
        }
        ,
        {
            title: "GOLF",
            image: GOLF
        },
        {
            title: "CHESS",
            image: CHESS
        },
        {
            title: "BASKETBALL",
            image: BASKETBALL
        }
    ]
    const EventComponent = ({ data }) => {
        return (
            <Box onClick={() => {
                dispatch(setActive(data.title))
                setSelected(data.title)

            }} sx={[{
                width: '60px', minHeight: 80, minWidth: 80, height: '60px', marginX: '.5vw', marginBottom: '1vh', borderRadius: '.6vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: { laptop: 'center', mobile: 'center' }, background: 'white',
            }, selected == data.title ? { background: '#F8C851' } : { background: 'white' }, selected == data.title ? { border: "2px solid white" } : { border: '2px solid white' }]} >
                <img src={data.image} style={{ width: '35px', height: '35px', alignSelf: 'center' }} />
                <Typography noWrap sx={{ fontSize: { laptop: '12px', mobile: '12px' }, fontWeight: { mobile: "500", tablet: '500' }, marginTop: { mobile: '5px', laptop: '.8vh' } }} >{data.title}</Typography>
            </Box>
        )
    }
    return (
        <Box sx={[{ width: { mobile: "98%", laptop: '100%' }, msOverflowStyle: "none", overflowY: 'hidden', minHeight: { mobile: 80, laptop: 80 }, marginLeft: { mobile: '0', laptop: ".5vw" }, overflowX: 'auto', marginTop: '1vh', alignSelf: { mobile: 'center', laptop: 'flex-start' }, display: 'flex' }]}
        >
            {
                data.map((i) => {
                    return (
                        <EventComponent data={i} />
                    )
                })
            }
        </Box>
    )
}

export default EventListing;