import { Box } from '@mui/system';
import { ChartSection } from './ChartSection';
import { HomePageHeader } from './Header';
import { TopActionBar } from './TopActionBar';

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
            border: "1px solid black",
          }}>
            {/* Top Action Bar */}
            <TopActionBar />
            {/* Work Station Part */}
            <div>Work Station Part In Progress...</div>
          </Box>
          {/* Right Part */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexBasis: "30%",
            border: "1px solid black",
          }}>
            {/* Chart Section */}
            <ChartSection />
            {/* Rule List */}
          </Box>
        </Box>
      </Box>
    </>
  )
}