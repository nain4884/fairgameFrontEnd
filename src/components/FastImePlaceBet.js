import {
  Input,
  Menu,
  Popover,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, CANCEL, CancelDark } from "../assets";
import "../components/index.css";
import StyledImage from "./StyledImage";
import { useSelector } from "react-redux";
import BoxInput from "./BoxInput";
import { toast } from "react-toastify";
import { setRole } from "../newStore";
import { currencyFormatter, formatNumber } from "./helper/helper";
import { debounce } from "lodash";
const FastTimePlaceBet = ({
  session,
  setFastAmount,
  onSubmit,
  back,
  isSessionYes,
  isBack,
  type,
  name,
  betOn,
  data,
  typeOfBet,
  selectedValue,
  mainData,
  setShowFastTimeBox,
  betType,
  rates,
  fromOdds,
  selectedFastAmount,
}) => {
  const [defaultValue, setDefaultValue] = useState(" ");
  const [currentOdds, setCurrentOdds] = useState(selectedValue);
  const [newRates, setNewRates] = useState({
    loss_amount: 0,
    win_amount: 0,
  });
  const theme = useTheme();
  const { axios } = setRole();
  const selectedColorBox = useSelector(
    (state) => state.selectedColorBox
  )?.value;
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const myDivRef = useRef(null);

  // const scrollToBottom = () => {
  //   myDivRef.current?.scrollIntoView({
  //     top: 2000,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
    if (!fromOdds) {
      // scrollToBottom();
      scrollToFullDiv();
    }
  }, [selectedValue, fromOdds]);

  const [ip, setIP] = useState("");
  useEffect(() => {
    FetchIpAddress();
  }, []);

  async function FetchIpAddress() {
    const response = await fetch("https://geolocation-db.com/json/")
      .then((response) => {
        return response.json();
      }, "jsonp")
      .then((res) => {
        setIP(res);
      })
      .catch((err) => console.log(err));
  }

  const scrollToFullDiv = () => {
    if (myDivRef.current) {
      const { scrollTop, offsetHeight, scrollHeight } = myDivRef.current;
      const scrollPosition = scrollTop + offsetHeight;

      if (scrollPosition < scrollHeight) {
        myDivRef.current.scrollTop = scrollHeight;
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      if (session === "sessionOdds") {
        setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
      } else if (session === "manualBookMaker") {
        setFastAmount((prev) => ({ ...prev, mannualBookMaker: 0 }));
      } else if (session === "bookmaker") {
        setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
      }
    } else {
      if (Number(value) <= 500000) {
        if (session === "sessionOdds") {
          setFastAmount((prev) => ({ ...prev, sessionOdds: Number(value) }));
        } else if (session === "manualBookMaker") {
          setFastAmount((prev) => ({
            ...prev,
            mannualBookMaker: Number(value),
          }));
        } else if (session === "bookmaker") {
          setFastAmount((prev) => ({ ...prev, bookMaker: Number(value) }));
        }
      } else {
        toast.warning(
          `Value must be between less then 500000
          `
        );
      }
    }
  };

  return (
    <Box
      // ref={refs}
      ref={myDivRef}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          border: "1px solid white",
          borderRadius: "5px",
          gap: 1,
          overflow: "hidden",
          width: "100%",
          // boxShadow:
          //   "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          // left: isSessionYes?"-30%": "95%"
        },
        // typeOfBet == "MATCH ODDS" || typeOfBet == "BOOKMAKER ?
      ]}
    >
      <Box
        sx={{
          background: "#F8C851",
          width: { mobile: "100%", laptop: "100%" },
          overflow: "hidden",
          display: "flex",

          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {matchesMobile && (
          <Box sx={{ display: "flex", marginTop: "2px", marginX: "2px" }} />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            padding: "5px",
          }}
        >
          <Box
            sx={{
              width: "80%",
              height: "45px",

              paddingLeft: "20px",
              paddingRight: "20px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
            }}
          >
            <TextField
              onChange={handleChange}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                type: "number",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
          </Box>
          <button
            // style={classes.CustomButton_Btn("#262626")}
            style={{
              color: "#fff",
              backgroundColor: "#262626",
              width: "20%",
              // width: { laptop: "150px", mobile: "130px" },
              height: "45px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              setShowFastTimeBox(false);
            }}
          >
            Submit
          </button>
        </Box>
        {
          <>
            <Box
              sx={{
                display: "flex",
                marginTop: "15px",
                marginX: "2px",
                gap: { mobile: 0, laptop: 1, tablet: 1 },
              }}
            >
              {["2000", "3000", "5000", "10000"]?.map((v) => (
                <NumberData
                  containerStyle={{
                    marginLeft: "2px",
                    flex: 1,
                    background: selectedFastAmount === v && "#FF4949",
                    borderRadius: "5px",
                    border: "2px solid white",
                  }}
                  value={v}
                  session={session}
                  setShowFastTimeBox={setShowFastTimeBox}
                  setFastAmount={setFastAmount}
                />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                marginY: "8px",
                marginX: "2px",

                gap: { mobile: 0, laptop: 1, tablet: 1 },
              }}
            >
              {["20000", "100000", "200000", "500000"]?.map((v) => (
                <NumberData
                  containerStyle={{
                    marginLeft: "2px",
                    flex: 1,
                    background: selectedFastAmount === v && "#FF4949",
                    borderRadius: "5px",
                    border: "2px solid white",
                  }}
                  value={v}
                  session={session}
                  setShowFastTimeBox={setShowFastTimeBox}
                  setFastAmount={setFastAmount}
                />
              ))}
            </Box>
          </>
        }
        {/* <Box
          sx={{
            display: "flex",
            flex: 1,
            paddingY: "2vh",
            justifyContent: "space-evenly",
          }}
        >
          <button
            // style={classes.CustomButton_Btn("#262626")}
            style={{
              color: "#FFF",
              backgroundColor: "#FF4949",
              width: "150px",
              // width: { laptop: "150px", mobile: "130px" },
              height: "35px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              if (session === "sessionOdds") {
                setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
              } else if (session === "manualBookMaker") {
                setFastAmount((prev) => ({ ...prev, mannualBookMaker: 0 }));
              } else if (session === "bookmaker") {
                setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
              }
            }}
          >
            Reset
          </button>

          <button
            // style={classes.CustomButton_Btn("#262626")}
            style={{
              color: "#fff",
              backgroundColor: "#262626",
              width: "150px",
              // width: { laptop: "150px", mobile: "130px" },
              height: "35px",
              borderRadius: "5px",
              border: "2px solid white",
            }}
            onClick={() => {
              setShowFastTimeBox(false);
              //   onSubmit(SubmitPayloadForPlaceBet(betOn, typeOfBet));
            }}
          >
            Submit
          </button>
        </Box> */}
      </Box>
    </Box>
  );
};

const NumberData = ({
  value,
  containerStyle,
  setFastAmount,
  setShowFastTimeBox,
  session,
}) => {
  return (
    <Box
      onClick={() => {
        if (session === "sessionOdds") {
          setFastAmount((prev) => ({ ...prev, sessionOdds: value }));
        } else if (session === "manualBookMaker") {
          setFastAmount((prev) => ({ ...prev, mannualBookMaker: value }));
        } else if (session === "bookmaker") {
          setFastAmount((prev) => ({ ...prev, bookMaker: value }));
        }
        setShowFastTimeBox(false);
      }}
      sx={[
        {
          display: "flex",
          cursor: "pointer",
          borderRadius: "3px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          minWidth: "18%",
          background: "#0B4F26",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        {currencyFormatter(value)}
      </Typography>
    </Box>
  );
};
export default FastTimePlaceBet;
