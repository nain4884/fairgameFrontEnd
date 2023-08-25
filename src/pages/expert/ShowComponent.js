import { Box, Button, Input, Typography } from "@mui/material";
import { StyledImage } from "../../components";
import { DatePicker } from "rsuite";

const containerStyles = {
  width: "100%",
  marginTop: "10px",
};
const titleStyles = {
  width: "100%",
  color: "#202020",
  fontSize: { mobile: "12px", laptop: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const imputStyle = {
  width: "100%",
  fontSize: { mobile: "14px", laptop: "14px", fontWeight: "600" },
  textTransform: "capitalize",
};
const inputContainerStyle = {
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

const ShowComponent = ({
  InputValType,
  value,
  valueContainerStyle,
  valueStyle,
  icon,
  required,
  place,
  DetailError,
  title,
  type,
  disable,
}) => {
  switch (InputValType) {
    case "InputVal":
      return (
        <Box
          sx={[
            {
              width: "100%",
              height: "40px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          <Input
            fullWidth
            inputProps={{ min: 0 }}
            disabled={disable}
            placeholder={`${value}`}
            value={DetailError.Detail[place]?.val}
            containerStyle={containerStyles}
            titleStyle={titleStyles}
            inputStyle={imputStyle}
            inputContainerStyle={inputContainerStyle}
            title={title}
            required={required}
            type={type}
            error={DetailError?.Error[place]?.val}
            onKeyDown={(e) => {
              // Check string not start with symbols
              if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              if (type === "Number") {
                DetailError.setDetail({
                  ...DetailError.Detail,
                  [place]: {
                    ...DetailError.Detail[place],
                    val: parseInt(e.target.value),
                  },
                });
              } else {
                DetailError.setDetail({
                  ...DetailError.Detail,
                  [place]: {
                    ...DetailError.Detail[place],
                    val: e.target.value.toString(),
                  },
                });
              }

              DetailError.setError({
                ...DetailError.error,
                [place]: {
                  ...DetailError.Detail[place],
                  val:
                    type === "Number"
                      ? DetailError.Detail[place]?.val === 0
                      : DetailError.Detail[place]?.val === "",
                },
              });
            }}
          />
        </Box>
      );
    case "FileSelectVal":
      const fileUpload = async (e, position, DetailError) => {
        let file = e.target.files[0];
        DetailError.setDetail({
          ...DetailError.Detail,
          [position]: {
            ...DetailError.Detail[position],
            val: file,
          },
        });
        DetailError.setError({
          ...DetailError.error,
          [position]: {
            ...DetailError.Detail[position],
            val: file === undefined ? false : true,
          },
        });
      };
      return (
        <Button
          variant="contained"
          component="label"
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          {![undefined, ""].includes(DetailError.Detail[place].val)
            ? DetailError.Detail[place].val?.name
            : "Upload"}
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => {
              fileUpload(e, place, DetailError);
            }}
          />
          {icon && (
            <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />
          )}
        </Button>
      );
    case "DatePickerVal":
      return (
        <DatePicker
          disabled={disable}
          style={{ width: "100%" }}
          format="yyyy-MM-dd HH:mm"
          value={DetailError?.Detail[2]?.val} //(DetailError?.Detail[2]?.val)
          onChange={(e) => {
            DetailError.setDetail({
              ...DetailError.Detail,
              [place]: {
                ...DetailError.Detail[place],
                val: e?.toString(),
              },
            });
          }}
        />
      );
    default:
      return (
        <Box
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          <Typography sx={[valueStyle, imputStyle]}>{value}</Typography>
          {icon && (
            <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />
          )}
        </Box>
      );
  }
};

export default ShowComponent;
