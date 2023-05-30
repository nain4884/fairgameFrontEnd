import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SliderValueLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ARROWDROPDOWN } from "../admin/assets";
import StyledImage from "./StyledImage";
import moment from "moment";

const DropDownSimple = ({
  valued,
  title,
  data,
  containerStyle,
  titleStyle,
  valueContainerStyle,
  valueStyle,
  dropStyle,
  dropDownStyle,
  dropDownTextStyle,
  Detail,
  setDetail,
  place,
  setMarketId,
  matchesSelect,
}) => {
  const [value, setValue] = useState(valued ?? data[0]);
  const [open, setOpen] = useState(false);
  const Divider = () => {
    return (
      <Box sx={{ width: "100%", height: "1px", background: "#DEDEDE" }}></Box>
    );
  };
  const Item = ({ item, mId, matchesSelect, eventDetail }) => {
    return (
      <>
        <Typography
          onClick={() => {
            setValue(item);
            function setDetailWithRunners() {
              let allrunners = [];
              eventDetail.Runners.map((runner) => {
                allrunners.push(runner.RunnerName);
              });
              console.log("eventDetail.eventDate", eventDetail?.EventDate);
              setDetail({
                ...Detail,
                [place]: {
                  ...Detail[place],
                  val: item,
                },
                2: {
                  ...Detail[2],
                  val: new Date(eventDetail?.EventDate),
                },
                9: {
                  ...Detail[9],
                  val: allrunners[0],
                },
                13: {
                  ...Detail[13],
                  val: allrunners[1],
                },
                17: {
                  ...Detail[17],
                  val: allrunners[2] ? allrunners[2] : "",
                },
              });
            }
            {
              eventDetail
                ? setDetailWithRunners()
                : setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],
                      val:
                        item === "Total Loss"
                          ? "totalLoss"
                          : item === "Bet Loss"
                          ? "BetLoss"
                          : item,
                    },
                  });
            }
            matchesSelect && setMarketId(mId);
            setOpen(false);
          }}
          sx={[
            {
              paddingY: "4px",
              paddingLeft: "7px",
              fontSize: "10px",
              fontWeight: "500",
              color: "black",
              background: item == Detail[place].val && "#DEDEDE",
            },
            dropDownTextStyle,
          ]}
        >
          {item}
        </Typography>
      </>
    );
  };
  const Block = ({ i, mId, matchesSelect, eventDetail }) => {
    return (
      <Item
        item={i}
        mId={mId}
        matchesSelect={matchesSelect}
        eventDetail={eventDetail}
      />
    );
  };
  return (
    <Box sx={[{ width: "19%" }, containerStyle]}>
      <Typography
        sx={[
          { fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={[
          {
            width: "100%",
            height: "37px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            background: "white",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            paddingX: "7px",
          },
          valueContainerStyle,
        ]}
      >
        <Typography sx={[{ fontSize: "11px", fontWeight: "500" }, valueStyle]}>
          {value}
        </Typography>
        <StyledImage
          src={ARROWDROPDOWN}
          sx={[
            {
              width: "11px",
              height: "6px",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            },
            dropStyle,
          ]}
        />
      </Box>
      {open && (
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              background: "white",
              width: "18.7%",
              alignSelf: "center",

              borderRadius: "2px",
              marginTop: "2px",
              position: "absolute",
              borderRadius: "3px",
              border: "2px solid #DEDEDE",
              zIndex: 9999,
            },
            dropDownStyle,
          ]}
        >
          {matchesSelect
            ? data.map((i) => {
                return (
                  <Block
                    i={i.EventName}
                    mId={i.MarketId}
                    matchesSelect={matchesSelect}
                    eventDetail={i.EventDetail}
                  />
                );
              })
            : data.map((i) => {
                return <Block i={i} />;
              })}
        </Box>
      )}
    </Box>
  );
};
export default DropDownSimple;
