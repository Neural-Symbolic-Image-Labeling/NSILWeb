import { Tabs, Box, Tab, Paper, Collapse, IconButton } from "@mui/material";
import { PieChart, Brush, ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import { TabPanel } from "../../../components/TabPanel";
import { ResultTab } from "./ResultTab";
import { PaperFrame } from "../../../components/PaperFrame";

export const SideBar = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const [showSideBar, setShowSideBar] = useState(true);
  const tabs = [
    {
      label: "Results",
      icon: <PieChart />,
      value: 0,
      disabled: false,
      jsx: <ResultTab />
    },
    {
      label: "Tools",
      icon: <Brush />,
      value: 1,
      disabled: false,
      jsx: <Box>222</Box>
    },
    {
      label: "Tools2",
      icon: <Brush />,
      value: 2,
      disabled: false,
      jsx: <Box>222</Box>
    }
  ]

  return (
    <>
      <Collapse
        in={showSideBar}
        orientation="horizontal"
        collapsedSize={34}
      >
        <PaperFrame noFrame={!showSideBar}
          sx={{
            width: "28vw",
            display: "flex",
            // minHeight: "100%",
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            pt: '20px'
          }}>
            <IconButton
              onClick={() => setShowSideBar(!showSideBar)}
              sx={{
                p: "5px"
              }}
            >
              {!showSideBar ? <ArrowBack /> : <ArrowForward />}
            </IconButton>
          </Box>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
          }}>
            <Box>
              <Tabs
                value={tabNumber}
                onChange={(e, val) => setTabNumber(val)}
                variant="fullWidth"
              // variant="scrollable"
              >
                {tabs.map(tab => (
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
              tabs.map(tab => (
                <TabPanel index={tabNumber} value={tab.value} key={tab.value}>
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