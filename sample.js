import { useState } from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { SEARCH } from "../admin/assets";
import { Search } from "../assets";
import StyledImage from "./StyledImage";
import axios from "../axios/axios";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const SearchInput = ({ placeholder, inputContainerStyle, showTextInput, header, show, searchContainerStyle, onChange }) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = async (event) => {
    const staticData = [
      "john_doe",
      "jane_smith",
      "mike_jones",
      "emily_williams",
      "alexander_brown",
      "olivia_davis",
      // Add more usernames as needed
    ];
    
    const value = event.target.value;
    // Filter the static data based on the search value
    const filteredData = staticData.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredData)
    setSearchValue(value);
    console.log(value)
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    // try {
    //     const response = await axios.get(`your-api-endpoint?search=${value}`);
    //     // Handle the response data
    //     console.log(response.data);
    //   } catch (error) {
    //     // Handle error
    //     console.error(error);
    //   }
  };

  return (
    <>
    <Box
      sx={[
        {
          backgroundColor: {
            mobile: showTextInput || show ? "white" : "transparent",
            laptop: "white",
          },
          minWidth: {
            laptop: header ? "10vw" : "17vw",
            mobile: "0vw",
          },
          display: "flex",
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
};

export default SearchInput;



