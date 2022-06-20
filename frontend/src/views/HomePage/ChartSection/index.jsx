import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartSection = () => {
  const workspace = useSelector(state => state.gallery.workspace);
  const isLoading = useSelector(state => state.gallery.loading);

  const data = workspace === null? null : {
    labels: ['Unlabeled', 'Manually Labeled', 'Auto labeled'],
    datasets: [{
      label: '# of images',
      data: [workspace.statistics.unlabeled, workspace.statistics.manual, workspace.statistics.autoLabeled],
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderWidth: 0,
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom"
      }
    },
    responsive: true,
    maintainAspectRatio: true,
  }

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 5px 20px 5px",
      }}>
        <Typography variant="h5" gutterBottom>
          Statistics
        </Typography>
        {isLoading ? <div>Loading...</div> : workspace === null ? <div>No Data</div> : (
          <>
            <Box sx={{width: "250px", height: "250px"}}>
              <Pie data={data} options={options} />
            </Box>

            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "3px solid rgba(255, 159, 64, 1)",
                borderLeft: "3px solid rgba(255, 159, 64, 1)",
                borderBottom: "3px solid rgba(255, 159, 64, 1)",
                borderRadius: "10px 0px 0px 10px",
                height: "88px",
                width: "102px",
              }}>
                <Typography variant="body2" gutterBottom sx={{ marginTop: "10px" }}>
                  Unlabeled
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {((workspace.statistics.unlabeled / workspace.statistics.total) * 100).toFixed(0) + '%'}
                </Typography>
              </Box>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
                borderTop: "3px solid rgba(75, 192, 192, 1)",
                borderLeft: "3px solid rgba(75, 192, 192, 1)",
                borderBottom: "3px solid rgba(75, 192, 192, 1)",
                height: "88px",
                width: "102px"
              }}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    Manually
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Labeled
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {((workspace.statistics.manual / workspace.statistics.total) * 100).toFixed(0) + '%'}
                </Typography>
              </Box>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
                border: "3px solid rgba(153, 102, 255, 1)",
                borderRadius: "0px 10px 10px 0px",
                height: "88px",
                width: "102px"
              }}>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    Auto
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Labeled
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {((workspace.statistics.autoLabeled / workspace.statistics.total) * 100).toFixed(0) + '%'}
                </Typography>
              </Box>

            </Box>
          </>
        )}
      </Box>
    </>
  )
}