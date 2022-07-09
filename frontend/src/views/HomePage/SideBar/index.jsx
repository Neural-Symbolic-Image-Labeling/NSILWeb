import { Tabs, Box, Tab, Paper, Collapse, IconButton } from "@mui/material";
import { PieChart, Brush, ArrowBack, ArrowForward } from "@mui/icons-material";
import { useState } from "react";
import { TabPanel } from "../../../components/TabPanel";
import { ResultTab } from "./ResultTab";

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
    },
    {
      label: "Tools3",
      icon: <Brush />,
      value: 3,
      disabled: false,
      jsx: <Box>222</Box>
    },
  ]

  return (
    <>
      <Collapse
        in={showSideBar}
        orientation="horizontal"
        collapsedSize={40}
      >
        <Paper sx={{
          width: "100%",
          // minHeight: "100%",
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
          }}>
            <IconButton onClick={() => setShowSideBar(!showSideBar)}>
              {!showSideBar ? <ArrowBack /> : <ArrowForward />}
            </IconButton>
            {showSideBar && (
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
            )}
          </Box>

          {showSideBar && (
            tabs.map(tab => (
              <TabPanel index={tabNumber} value={tab.value} key={tab.value}>
                {tab.jsx}
              </TabPanel>
            ))
          )}

        </Paper>
      </Collapse>
    </>
  )
}