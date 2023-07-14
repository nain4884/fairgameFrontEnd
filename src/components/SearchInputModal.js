import { useState } from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { SEARCH } from "../admin/assets";
import { Search } from "../assets";
import StyledImage from "./StyledImage";

import * as React from "react";
import { debounce } from "lodash";

const SearchInputModal = ({
  placeholder,
  inputContainerStyle,
  showTextInput,
  header,
  show,
  searchContainerStyle,
  onChange,
  getListOfUser,
}) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = debounce(async (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    try {
      getListOfUser(value);
    } catch (e) {
      console.log(e);
    }
  }, 500);

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
            // value={searchValue}
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
            // value={searchValue}
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
          onClick={() => {
            getListOfUser(searchValue);
          }}
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

export default SearchInputModal;
