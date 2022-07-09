import { HomePageHeader } from './Header';
import { WorkStation } from './WorkStation';
import { Paper, Box } from '@mui/material';
import { SideBar } from './SideBar';

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
          justifyContent: "space-between",
        }}>
          {/* Left Part */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // flexBasis: "70%",
            flexGrow: 1,
            padding: '10px',
          }}>
            {/* Work Station Part */}
            <WorkStation />
          </Box>
          {/* Right Part */}
          <Box sx={{
            display: "flex",
            // flexBasis: "30%",
            flexGrow: 0,
            justifyContent: "flex-end",
            padding: '10px',
            overflow: 'hidden',
          }}>
            <SideBar />
          </Box>
        </Box>
      </Box>
    </>
  )
}