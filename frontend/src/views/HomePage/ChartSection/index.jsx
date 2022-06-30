import { Box, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { colorPicker } from "../../../muiStyles";
import { Intermediate } from "../../../components/Intermediate";
import { findCollection } from "../../../utils/workspace";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartSection = () => {
  const workspace = useSelector(state => state.gallery.workspace);
  const isLoading = useSelector(state => state.gallery.loading);
  const currCollectionId = useSelector(state => state.gallery.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const statistics = workspace ? currCollection ? currCollection.statistics : null : null;

  const data = (workspace === null || statistics === null) ? null : {
    labels: ['Unlabeled', 'Manually Labeled', 'Auto-Labeled'],
    datasets: [{
      label: '# of images',
      data: [statistics.unlabeled, statistics.manual, statistics.autoLabeled],
      backgroundColor: [
        colorPicker.unlabeled,
        colorPicker.manual,
        colorPicker.auto
      ],
      borderWidth: 0,
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: "right"
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <>
      <Paper sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "95%",
        padding: '0 0 35px 0',
        mb: '20px'
      }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          m: '5px 5px 10px 5px'
        }}>
          <Typography variant="h5" gutterBottom sx={{ ml: '20px' }}>
            <strong>Statistics</strong>
          </Typography>
        </Box>
        {isLoading ? <Intermediate>Loading</Intermediate> : (workspace === null || statistics === null) ? <Intermediate>No Data</Intermediate> : (
          <>
            <Paper sx={{
              width: "90%",
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
              mb: '35px'
            }}>
              <Box sx={{ width: "330px", height: "200px" }}>
                <Pie data={data} options={options} />
              </Box>
            </Paper>

            <Paper sx={{
              display: "flex",
              width: "90%",
              padding: '10px 0 10px 0',
            }}>
              <GridBox>
                Unlabeled
              </GridBox>
              <GridBox>
                Manually Labeled
              </GridBox>
              <GridBox>
                Auto-Labeled
              </GridBox>
            </Paper>
            <Paper sx={{
              display: "flex",
              width: "90%",
              padding: '20px 0 20px 0',
              mt: '5px'

            }}>
              <GridBox>
                <strong>
                  {((statistics.unlabeled / statistics.total) * 100).toFixed(0) + '%'}
                </strong>
              </GridBox>
              <GridBox>
                <strong>
                {((statistics.manual / statistics.total) * 100).toFixed(0) + '%'}
                </strong>
              </GridBox>
              <GridBox>
                <strong>
                {((statistics.autoLabeled / statistics.total) * 100).toFixed(0) + '%'}
                </strong>
              </GridBox>
            </Paper>
            {/* <Paper sx={{
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
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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

            </Paper> */}
          </>
        )}
      </Paper>
    </>
  )
}

const GridBox = ({ children }) => {
  return (
    <Box sx={{
      flexBasis: '33%',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      wordWrap: "break-word",
    }}>
      <Typography sx={{
        fontWeight: '200px',
        width: '73px',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {children}
      </Typography>
    </Box>
  )
}