import { Tabs, Box, Tab, Paper, Collapse, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import { TabPanel } from "../../../components/TabPanel";
import { PaperFrame } from "../../../components/PaperFrame";
import { useDispatch, useSelector } from "react-redux";
import { setIsSideBarOpen, setTabNumber } from "../../../stores/workstation";

export const SideBar = () => {
  const dispatch = useDispatch();
  const sideBar = useSelector(state => state.workstation).sideBar;
  // const [tabNumber, setTabNumber] = useState(0);
  // const [showSideBar, setShowSideBar] = useState(true);
  // const tabs = [
  //   {
  //     label: "Results",
  //     icon: <PieChart />,
  //     value: 0,
  //     disabled: false,
  //     jsx: <ResultTab />
  //   },
  //   {
  //     label: "Tools",
  //     icon: <Brush />,
  //     value: 1,
  //     disabled: false,
  //     jsx: <Box>222</Box>
  //   },
  //   // {
  //   //   label: "Tools2",
  //   //   icon: <Brush />,
  //   //   value: 2,
  //   //   disabled: false,
  //   //   jsx: <Box>222</Box>
  //   // }
  // ]

  return (
    <>
      <Collapse
        in={sideBar.isSideBarOpen}
        orientation="horizontal"
        collapsedSize={34}
      >
        <PaperFrame left bottom
          sx={{
            width: "28vw",
            display: "flex",
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            pt: '20px'
          }}>
            <IconButton
              onClick={() => dispatch(setIsSideBarOpen(!sideBar.isSideBarOpen))}
              sx={{
                p: "5px"
              }}
            >
              {!sideBar.isSideBarOpen ? <ArrowBack /> : <ArrowForward />}
            </IconButton>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            mr: "34px"
          }}>
            <Box>
              <Tabs
                // TabIndicatorProps={{style: {background:'black'}}}
                value={sideBar.tabNumber}
                onChange={(e, val) => dispatch(setTabNumber(val))}
                variant="fullWidth"
                // variant="scrollable"
              >
                {sideBar.tabs.map(tab => (
                  <Tab
                    label={tab.label}
                    icon={tab.icon}
                    iconPosition="start"
                    key={tab.value}
                    disabled={tab.disabled}
                    wrapped
                  />
                ))}
              </Tabs>
            </Box>
            {
              sideBar.tabs.map(tab => (
                <TabPanel index={sideBar.tabNumber} value={tab.value} key={tab.value}>
                  {tab.jsx}
                </TabPanel>
              ))
            }
          </Box>
        </PaperFrame>
      </Collapse>
    </>
  )
}