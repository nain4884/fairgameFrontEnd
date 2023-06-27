import { Box } from "@mui/system";
import { memo } from "react";
import SideBarAdmin from "../sideBar/SideBarAdmin";
import { Drawer } from "@mui/material";
import { drawerBackground } from "../../assets";

const MobileSideBar = ({ mobileOpen, setMobileOpen }) => {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const classes = {
    Drawersx: {
      display: { xs: "block", sm: "none" },
      "& .MuiDrawer-paper": { boxSizing: "border-box", width:"300px" },
    },
    DrawerBox1sx: {
      minHeight: { laptop: "60px", mobile: "60px", tablet: "60px" },
    },
    DrawerBox2sx: { minHeight: "100vh" },
  };
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={classes.Drawersx}
    >
      <Box sx={classes.DrawerBox1sx} />
      <Box
        sx={
          (classes.DrawerBox2sx,
          (theme) => ({
            height: "100%",
            backgroundImage: `${theme.palette.primary.mainGradient}`,
          }))
        }
      >
        <SideBarAdmin
          key={2}
          handleDrawerToggle={handleDrawerToggle}
          mobileShow={true}
        />
      </Box>
    </Drawer>
  );
};

export default memo(MobileSideBar);
