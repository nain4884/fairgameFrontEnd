import { Box, MenuItem, Typography } from "@mui/material";
import { StyledImage } from "../../components";
import { ArrowLeft } from "../../expert/assets";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalStore } from "../../context/globalStore";
import { setSessionBetId } from "../../newStore/reducers/expertMatchDetails";

const MenutItemsComponent = ({
  x,
  selected,
  index,
  setSelected,
  handleClose,
  allLiveEventSession,
}) => {
  const { globalStore, setGlobalStore } = useContext(GlobalStore);
  const activeUser = useSelector((state) => state?.activeUser?.activeUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <MenuItem
        dense={true}
        sx={{
          fontSize: { laptop: "12px", mobile: "10px" },
          fontWeight: "500",
          marginX: "0px",
          width: { laptop: "240px", mobile: "210px" },
          borderBottomWidth: 0,
          borderColor: "#EAEFEC",
          paddingY: "0px",
          borderStyle: "solid",
          backgroundColor: selected == index ? "primary.main" : "white",
          color: selected == index ? "white" : "black",
          marginLeft: "-10px",
          marginTop: index == 0 && "-8px",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            borderColor: "white",
            // borderRadius: "5px",
            // transform: "scale(1.02)"
          },
        }}
        onClick={() => {
          // navigate(x.link)
          // handleClose()
          if (index == selected) {
            setSelected(null);
          } else {
            setSelected(index);
          }
        }}
      >
        {x.title}
      </MenuItem>
      {selected == index && (
        <Box
          sx={{
            background: "#F8C851",
            width: "80%",
            marginLeft: "20%",
            borderRadius: "5px",
            paddingX: "5px",
            paddingY: "5px",
          }}
        >
          {allLiveEventSession?.length > 0 &&
            allLiveEventSession?.map((event) => {
              if (event.id == x.id)
                return (
                  <>
                    {event.bettings.length > 0 && (
                      <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                        {activeUser == "1"
                          ? "Current Live Session"
                          : "Current Live Bookmaker"}
                      </Typography>
                    )}
                    {event.bettings.map((element) => {
                      return (
                        <Box
                          onClick={(e) => {
                            dispatch(setSessionBetId(element.id));
                            if (activeUser == "1") {
                              navigate("/expert/live", {
                                state: {
                                  createSession: false,
                                  match: x,
                                  sessionEvent: element,
                                },
                              });
                            } else if (activeUser == "2") {
                              navigate("/expert/market");
                            }
                            handleClose();
                          }}
                          sx={{ marginLeft: "10px", marginTop: "3px" }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              marginTop: "3px",
                              cursor: "pointer",
                            }}
                          >
                            {element.bet_condition}
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                );
            })}
          {/* <Typography sx={{ fontSize: "12px", }}>{activeUser == '1' ? "India v/s Pak Session 1" : "India v/s Pak Bookmaker 1"}</Typography>
                  <Typography sx={{ fontSize: "12px", marginTop: "3px" }}>{activeUser == '1' ? "India v/s Pak Session 1" : "India v/s Pak Bookmaker 2"}</Typography> */}
          <Box
            onClick={(e) => {
              dispatch(setSessionBetId(""));
              navigate("/expert/live", {
                state: {
                  createSession: true,
                  // createSession: globalStore.isSession,
                  match: x,
                },
              });
              handleClose();
            }}
            sx={{ marginTop: "5px", display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
              Create Session
            </Typography>
            <StyledImage
              src={ArrowLeft}
              sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
            />
          </Box>
          <Box
            onClick={(e) => {
              navigate("/expert/add_book_maker", {
                state: { createSession: true, match: x },
              });
              sessionStorage.setItem("matchId",x.id)
              handleClose();
            }}
            sx={{ marginTop: "5px", display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
              Add Bookmaker
            </Typography>
            <StyledImage
              src={ArrowLeft}
              sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MenutItemsComponent;
