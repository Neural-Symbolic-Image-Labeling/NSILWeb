import { Box } from '@mui/system';
import { ChartSection } from './ChartSection';
import { HomePageHeader } from './Header';
import { TopActionBar } from './TopActionBar';
import { WorkStation } from './WorkStation';
import { LearningRules } from './LearningRules'

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
            flexBasis: "65%",
            border: "1px solid black",
          }}>
            {/* Top Action Bar */}
            <TopActionBar />
            {/* Work Station Part */}
            <WorkStation />
          </Box>
          {/* Right Part */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexBasis: "35%",
            border: "1px solid black",
          }}>
            {/* Chart Section */}
            <ChartSection />
            {/* Rule List */}
            <LearningRules />
          </Box>
        </Box>
      </Box>
    </>
  )
}