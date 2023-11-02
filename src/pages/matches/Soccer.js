import { Box } from "@mui/material";
import { memo } from "react";
import CustomLoader from "../../components/helper/CustomLoader";

const Soccer = ({selected}) => {
  // const [visible, setVisible] = useState(false);

  // const location = useLocation();
  // const theme = useTheme();
  // const { currentUser } = useSelector((state) => state?.currentUser);

  // const [loader, setLoader] = useState(true);

  // const matchesMobile = useMediaQuery(theme.breakpoints.down("laptop"));

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "hidden",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          minHeight: "90vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomLoader height={"70vh"} text={"Coming Soon"} />
      </Box>
    </Box>
    

  );
};
export default memo(Soccer);
