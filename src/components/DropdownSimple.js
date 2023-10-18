import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SliderValueLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ARROWDROPDOWN } from "../admin/assets";
import StyledImage from "./StyledImage";
import moment from "moment";
import useOuterClick from "./helper/userOuterClick";

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
  openDrop,
  selectValueStyle,
  type,
  defaultValue,
  matchesSelect,
  disable,
}) => {
  const [value, setValue] = useState(valued ?? data[0]);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (defaultValue === null) {
      setValue(0);
    }

    if (openDrop || openDrop !== undefined) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [defaultValue, openDrop]);

  const Divider = () => {
    return (
      <Box sx={{ width: "100%", height: "1px", background: "#DEDEDE" }}></Box>
    );
  };

  const innerRef = useOuterClick((ev) => {
    setOpen(false);
  });

  const Item = ({
    item,
    mId,
    matchesSelect,
    eventDetail,
    CompetitionName,
    EventId,
    type,
    disable,
  }) => {
    return (
      <Box
        onClick={() => {
          if (!disable) {
            setValue(item);
            function setDetailWithRunners() {
              let allrunners = [];
              eventDetail.Runners.map((runner) => {
                allrunners.push(runner?.runnerName);
              });
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
                22: {
                  ...Detail[22],
                  val: CompetitionName,
                },
                23: {
                  ...Detail[23],
                  val: EventId,
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
                : type === "tournament"
                ? setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],
                      val:
                        item === "Total Loss"
                          ? "totalLoss"
                          : item === "Entry Wise"
                          ? "BetLoss"
                          : item,
                    },
                    34: {
                      ...Detail[34],
                      val: EventId,
                    },
                  })
                : setDetail({
                    ...Detail,
                    [place]: {
                      ...Detail[place],
                      val:
                        item === "Total Loss"
                          ? "totalLoss"
                          : item === "Entry Wise"
                          ? "BetLoss"
                          : item,
                    },
                  });
            }
            matchesSelect && setMarketId(mId);
            setOpen(false);
          }
        }}
        sx={[
          {
            paddingY: "4px",
            paddingLeft: "7px",
            fontSize: "10px",
            fontWeight: "500",
            color: "black",
            "&:hover": {
              cursor: "pointer",
              background: item !== Detail[place].val && "#3498ff33",
            },
            background: item == Detail[place].val && "#DEDEDE",
          },
          dropDownTextStyle,
        ]}
      >
        <Typography>{item === "0" ? "0.00" : item}</Typography>
        <Typography sx={{ fontSize: "12px" }}>{CompetitionName}</Typography>
      </Box>
    );
  };
  const Block = ({
    i,
    mId,
    matchesSelect,
    eventDetail,
    CompetitionName,
    EventId,
    type,
    disbale,
  }) => {
    return (
      <Item
        CompetitionName={CompetitionName}
        item={i}
        EventId={EventId}
        mId={mId}
        matchesSelect={matchesSelect}
        eventDetail={eventDetail}
        type={type}
        disable={disable}
      />
    );
  };
  return (
    <Box sx={[{ width: "19%" }, containerStyle]} ref={innerRef}>
      <Typography
        sx={[
          {
            fontSize: "10px",
            fontWeight: "600",
            marginBottom: ".3vh",
            color: "#202020",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <Box
        onClick={() => {
          if (!disable) {
            setOpen(!open);
          }
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
        <Box
          sx={[
            {
              paddingY: "4px",
              paddingLeft: "7px",
              fontSize: "10px",
              fontWeight: "500",
              color: "white",
            },
          ]}
        >
          <Typography
            sx={{
              fontSize: {
                laptop: "14px !important",
                mobile: "12px !important",
              },
            }}
          >
            {value === "0"
              ? "0.00"
              : place
              ? Detail[place]?.val !== ""
                ? Detail[place]?.val
                : value
              : value}
          </Typography>
          {place === 5 && (
            <Typography sx={{ fontSize: "10px !important" }}>
              {Detail[22]?.val}
            </Typography>
          )}
        </Box>
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
            ? data?.map((i, idx) => {
                return (
                  <Block
                    key={idx}
                    i={i.EventName}
                    mId={i.MarketId}
                    EventId={i.EventId}
                    matchesSelect={matchesSelect}
                    CompetitionName={i.CompetitionName}
                    eventDetail={i.EventDetail}
                    type={type}
                    disable={disable}
                  />
                );
              })
            : data?.map((i, idx) => {
                return <Block key={idx} i={i} disable={disable} />;
              })}
        </Box>
      )}
    </Box>
  );
};
export default DropDownSimple;
