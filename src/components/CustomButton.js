import { Button, CircularProgress } from "@mui/material";

export default function CustomButton({ onClick, title, buttonStyle, loading, type }) {
  return (
    <Button 
      onClick={onClick}
      type={type}
      variant="contained"
      color="secondary"
      sx={[
        {
          width: "62%",
          cursor: "pointer",
          height: { mobile: "50px", laptop: "43px" },
          borderRadius: "10px",
          fontWeight: "500",
          textTransform: "none",
          fontSize: { laptop: "14px", mobile: "14px" },
        },
        buttonStyle,
      ]}
    >
      {loading ? (
        <CircularProgress
          sx={{
            color: "#FFF",
          }}
          size={20}
          thickness={4}
          value={60}
        />
      ) : (
        title
      )}
    </Button>
  );
}
