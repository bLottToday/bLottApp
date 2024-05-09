import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import DeselectIcon from "@mui/icons-material/Deselect";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NotesIcon from "@mui/icons-material/Notes";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import ConstructionIcon from "@mui/icons-material/Construction";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import {
  useTranslate,
  DashboardMenuItem,
  MenuItemLink,
  MenuProps,
  useSidebarState,
} from "react-admin";
import SubMenu from "./SubMenu";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";

type MenuName =
  | "smartContracts"
  | "manageFund"
  | "reports"
  | "settings"
  | "tools";

const Menu = ({ dense = false }: MenuProps) => {
  const [state, setState] = useState({
    smartContracts: true,
    manageFund: true,
    reports: true,
    settings: true,
    tools: true,
  });
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <Box
      sx={{
        width: open ? 250 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem primaryText="Home" />

      <SubMenu
        handleToggle={() => handleToggle("reports")}
        isOpen={state.reports}
        name="Track"
        icon={<FileCopyOutlinedIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/dapptxs"
          state={{ _scrollToTop: true }}
          primaryText="Ticket TXs"
          leftIcon={<AttachMoneyIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/dapptxs"
          state={{ _scrollToTop: true }}
          primaryText={"Prize results"}
          leftIcon={<NotesIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/dapptxs"
          state={{ _scrollToTop: true }}
          primaryText="Prize transferred TXs"
          leftIcon={<FormatIndentIncreaseIcon />}
          dense={dense}
        />
      </SubMenu>
      <MenuItemLink
        to="/buyticket"
        state={{ _scrollToTop: true }}
        primaryText="Buy tickets"
        leftIcon={<DoneAllIcon />}
        dense={dense}
      />
      <SubMenu
        handleToggle={() => handleToggle("tools")}
        isOpen={state.tools}
        name="Tools"
        icon={<DeselectIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/dapptxs"
          state={{ _scrollToTop: true }}
          primaryText="Find potential tickets"
          leftIcon={<DoneAllIcon />}
          dense={dense}
        />

        <MenuItemLink
          to="/dapptxs"
          state={{ _scrollToTop: true }}
          primaryText="Your ROI"
          leftIcon={<NotesIcon />}
          dense={dense}
        />
      </SubMenu>
      <SubMenu
        handleToggle={() => handleToggle("tools")}
        isOpen={state.tools}
        name="Settings"
        icon={<ConstructionIcon />}
        dense={dense}
      >
        <MenuItemLink
          to="/dapptxs"
          state={{ _scrollToTop: true }}
          primaryText="Change wallet"
          leftIcon={<PeopleOutlinedIcon />}
          dense={dense}
        />
      </SubMenu>
    </Box>
  );
};

export default Menu;
