import { Menu } from "@mui/material";
import { useState } from "react";
import MenutItemsComponent from "./MenuItemComponent";
import { memo } from "react";

const DropdownMenu1 = ({
  anchorEl,
  open,
  handleClose,
  allMatch,
  allLiveEventSession,
}) => {
  const [selected, setSelected] = useState(0);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ marginTop: "2px", padding: 0 }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        padding: 0,
      }}
      PaperProps={{
        sx: {
          width: "230px",
          padding: 0,
        },
      }}
    >
      {allMatch?.length > 0 &&
        allMatch?.map((x, i) => (
          <MenutItemsComponent
            key={i}
            allLiveEventSession={allLiveEventSession}
            handleClose={handleClose}
            setSelected={setSelected}
            index={i}
            selected={selected}
            x={x}
          />
        ))}
    </Menu>
  );
};

export default memo(DropdownMenu1);
