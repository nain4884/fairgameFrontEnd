import { TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "../components/index.css";
import { toast } from "react-toastify";
import { currencyFormatter } from "./helper/helper";
const FastTimePlaceBet = ({
  session,
  setFastAmount,
  selectedValue,
  setShowFastTimeBox,
  fromOdds,
  selectedFastAmount,
  typeOfBet,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  const { buttonData } = useSelector((state) => state?.matchDetails);
  const [buttonList, setButtonList] = useState(buttonData);

  const myDivRef = useRef(null);

  useEffect(() => {
    if (!fromOdds) {
      // scrollToBottom();
      scrollToFullDiv();
      setButtonList(buttonData);
    }
  }, [selectedValue, fromOdds]);

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
        setFastAmount((prev) => ({ ...prev, [typeOfBet]: 0 }));
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
            [typeOfBet]: Number(value),
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
        },
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
              width: { mobile: "50%", laptop: "60%", tablet: "50%" },
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
                inputProps: { min: "0" },
                type: "number",
                style: { fontSize: "13px", height: "45px", fontWeight: "600" },
              }}
            />
          </Box>
          <Box
            sx={{
              width: { mobile: "50%", laptop: "40%", tablet: "50%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              flexDirection: "row-reverse",
            }}
          >
            <button
              // style={classes.CustomButton_Btn("#262626")}
              style={{
                color: "#fff",
                backgroundColor: "rgb(49 158 91)",
                width: "50%",
                // width: { laptop: "150px", mobile: "130px" },
                height: "45px",
                borderRadius: "5px",
                border: "2px solid white",
              }}
              onClick={() => {
                setShowFastTimeBox(false);
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "11px", laptop: "14px", tablet: "14px" },
                }}
              >
                Submit
              </Typography>
            </button>
            <button
              // style={classes.CustomButton_Btn("#262626")}
              style={{
                color: "#fff",
                backgroundColor: "#FF4D4D",
                width: "50%",
                // width: { laptop: "150px", mobile: "130px" },
                height: "45px",
                borderRadius: "5px",
                border: "2px solid white",
              }}
              onClick={() => {
                if (session === "sessionOdds") {
                  setFastAmount((prev) => ({ ...prev, sessionOdds: 0 }));
                } else if (session === "manualBookMaker") {
                  setFastAmount((prev) => ({ ...prev, [typeOfBet]: 0 }));
                } else if (session === "bookmaker") {
                  setFastAmount((prev) => ({ ...prev, bookMaker: 0 }));
                }
                setShowFastTimeBox(false);
              }}
            >
              <Typography
                sx={{
                  fontSize: { mobile: "11px", laptop: "14px", tablet: "14px" },
                }}
              >
                Cancel
              </Typography>
            </button>
          </Box>
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
              {buttonList.length > 0 &&
                buttonList?.slice(0, 4)?.map((v, index) => (
                  <NumberData
                    key={index}
                    containerStyle={{
                      marginLeft: "2px",
                      flex: 1,
                      background: selectedFastAmount === v && "#FF4949",
                      borderRadius: "5px",
                      border: "2px solid white",
                    }}
                    value={v.value}
                    lable={v.lable}
                    session={session}
                    setShowFastTimeBox={setShowFastTimeBox}
                    typeOfBet={typeOfBet}
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
              {buttonList.length > 0 &&
                buttonList?.slice(4, 8)?.map((v, index) => (
                  <NumberData
                    key={index}
                    containerStyle={{
                      marginLeft: "2px",
                      flex: 1,
                      background: selectedFastAmount === v && "#FF4949",
                      borderRadius: "5px",
                      border: "2px solid white",
                    }}
                    value={v.value}
                    lable={v.lable}
                    session={session}
                    setShowFastTimeBox={setShowFastTimeBox}
                    typeOfBet={typeOfBet}
                    setFastAmount={setFastAmount}
                  />
                ))}
            </Box>
          </>
        }
      </Box>
    </Box>
  );
};

const NumberData = ({
  value,
  typeOfBet,
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
          setFastAmount((prev) => ({ ...prev, [typeOfBet]: value }));
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
