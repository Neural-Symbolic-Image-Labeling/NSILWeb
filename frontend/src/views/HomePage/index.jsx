import { Box } from '@mui/system';
import { ChartSection } from './ChartSection';
import { HomePageHeader } from './Header';
import { TopActionBar } from './TopActionBar';
import { WorkStation } from './WorkStation';
import { LearningRules } from './LearningRules'
import { Paper } from '@mui/material';

export const HomePage = () => {
  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header Part */}
        <HomePageHeader />

        {/* Body Part*/}
        <Box sx={{
          display: "flex",
        }}>
          {/* Left Part */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexBasis: "70%",
          }}>
            {/* Top Action Bar */}
            <TopActionBar />
            {/* Work Station Part */}
            <WorkStation />
          </Box>
          {/* Right Part */}
          <Paper sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexBasis: "30%",
            padding: '10px',
          }}>
            {/* Chart Section */}
            <ChartSection />
            {/* Rule List */}
            <LearningRules />
          </Paper>
        </Box>
      </Box>
    </>
  )
}