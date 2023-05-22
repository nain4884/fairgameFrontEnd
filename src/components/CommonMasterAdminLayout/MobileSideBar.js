import { Box } from "@mui/system";
import { memo } from "react";
import SideBarAdmin from "../sideBar/SideBarAdmin";
import { Drawer } from "@mui/material";

const MobileSideBar = ({ mobileOpen, setMobileOpen }) => {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const classes = {
    Drawersx: {
      display: { xs: "block", sm: "none" },
      "& .MuiDrawer-paper": { boxSizing: "border-box", width: "300px" },
    },
    DrawerBox1sx: { minHeight: { laptop: 60, mobile: 60 + 32 } },
    DrawerBox2sx: { height: "100vh" },
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
      <Box sx={classes.DrawerBox2sx}>
        <SideBarAdmin
          handleDrawerToggle={handleDrawerToggle}
          mobileShow={true}
        />
      </Box>
    </Drawer>
  );
};

export default memo(MobileSideBar);
