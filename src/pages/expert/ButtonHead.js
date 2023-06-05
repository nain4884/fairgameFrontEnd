import { Box, Typography } from "@mui/material";
import { Down } from "../../admin/assets";

const ButtonHead = ({
  title,
  boxStyle,
  titleStyle,
  onClick,
  report,
  selected,
}) => {
  return (
    <Box
      onClick={(e) => onClick(e)}
      sx={[
        {
          paddingX: "12.5px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        },
        boxStyle,
      ]}
    >
      <Typography
        sx={[
          { fontSize: "11px", fontWeight: "bold", fontFamily: "Montserrat" },
          titleStyle,
        ]}
      >
        {title}
      </Typography>

      {selected && report && (
        <img
          src={Down}
          style={{ width: "10px", height: "6px", marginLeft: "4px" }}
        />
      )}
    </Box>
  );
};

export default ButtonHead;
