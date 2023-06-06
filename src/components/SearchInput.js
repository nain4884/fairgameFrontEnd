import { useState } from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { SEARCH } from "../admin/assets";
import { Search } from "../assets";
import StyledImage from "./StyledImage";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { setRole } from "../newStore";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../newStore/reducers/auth";
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

const SearchInput = ({
  placeholder,
  inputContainerStyle,
  setData,
  showTextInput,
  header,
  setShowSearch,
  show,
  width,
  searchContainerStyle,
  onChange,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { axios } = setRole();
  const { userData } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    try {
      const { data } = await axios.get(
        `/fair-game-wallet/getAllUser?userName=${value}`
      );
      data?.data?.data.map((element) => {
        // let roleDetail = roles.find(findThisRole);
        // function findThisRole(role) {
        //   return role.id === element.roleId;
        // }
        // element.role = roleDetail?.roleName;
      });
      setData(data?.data?.data);
      // dispatch(setUserData(data?.data?.data));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        onClick={setShowSearch}
        sx={[
          {
            backgroundColor: {
              mobile: showTextInput || show ? "white" : "transparent",
              laptop: "white",
            },
            minWidth: {
              laptop: header ? "10vw" : "17vw",
              mobile: "10vw",
            },
            width:{mobile:width? width: "66%",laptop:"17vw",tablet:"17vw"},
            display: "flex",
            justifyContent:"flex-end",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            height: { laptop: "35px", mobile: "35px" },
            overflow: "hidden",
            paddingX: "5px",
            borderRadius: "35px",
          },
          inputContainerStyle,
        ]}
      >
        {(!matchesMobile || show) && (
          <TextField
            variant="standard"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "12px",
                fontWeight: "600",
                fontStyle: "italic",
                color: "black",
              },
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              marginLeft: "5px",
              fontSize: { laptop: "10px", mobile: "8px" },
            }}
          />
        )}
        {showTextInput && (
          <TextField
            variant="standard"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "12px",
                fontWeight: "600",
                fontStyle: "italic",
              },
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              marginLeft: "5px",
              fontSize: { laptop: "10px", mobile: "8px" },
            }}
          />
        )}
        <Box
          sx={[
            {
              height: "30px",
              width: "30px",
              borderRadius: "20px",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "primary.main",
              marginRight: -0.3,
            },
            searchContainerStyle,
          ]}
        >
          <StyledImage
            src={header ? SEARCH : Search}
            sx={{ height: "40%", width: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
  const BasicList = () => {
    return <></>;
  };
};

export default SearchInput;
