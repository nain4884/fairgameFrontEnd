import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { ARROWDROPDOWN } from "../admin/assets";
const SearchInput = ({
  title,
  data,
  containerStyle,
  inputContainerStyle,
  setSearch,
  search,
}) => {
  const [value, setValue] = useState("All");
  const [open, setOpen] = useState(false);

  const Item = ({ item }) => {
    return (
      <>
        <Typography
          onClick={() => {
            setSearch(item);
            setOpen(false);
          }}
          sx={{
            paddingY: "5px",
            paddingLeft: "10px",
            fontSize: "10px",
            fontWeight: "500",
            color: "black",
            "&:hover": {
              cursor: "pointer",
              background: "#3498ff33",
            },
          }}
        >
          {item?.userName}
        </Typography>
      </>
    );
  };
  const Block = ({ i }) => {
    return <Item item={i} />;
  };
  return (
    <Box
      sx={[
        { width: { laptop: "30%", mobile: "100%", position: "relative" } },
        containerStyle,
      ]}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" }}
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
          inputContainerStyle,
        ]}
      >
        <TextField
          variant="standard"
          placeholder={"Search"}
          value={search?.userName}
          onChange={(e) => {
         
            setSearch(e.target?.value);
            setOpen(true);
          }}
          InputProps={{
            disableUnderline: true,
            textTransform:"lowercase",
            style: { fontSize: "11px", fontWeight: "500" },
          }}
          sx={{
            textTransform:"lowercase",
            borderColor: "white",
            display: "flex",
            flex: 1,
            fontSize: { laptop: "10px", mobile: "8px" },
          }}
        />
        <img
          src={ARROWDROPDOWN}
          style={{
            width: "11px",
            height: "6px",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
      </Box>
      {search && search.length > 0 && open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            width: "100%",
            alignSelf: "center",
            borderRadius: "2px",
            marginTop: "2px",
            position: "absolute",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            zIndex: 9999,
          }}
        >
          {data
            ?.filter((k) =>
              k?.userName?.toLowerCase().includes(search.toLowerCase())
            )
            .map((i, idx) => {
              return <Block key={idx} i={i} />;
            })}
        </Box>
      )}
    </Box>
  );
};
export default SearchInput;
