import { Box, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie, Doughnut } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { colorPicker } from "../../../../../muiStyles";
import { Intermediate } from "../../../../../components/Intermediate";
import { findCollection } from "../../../../../utils/workspace";
import { PaperFrame } from "../../../../../components/PaperFrame";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
      },
      datalabels: {
        formatter: (value, context) => Number(value) === 0 ? '' : `${((Number(value) * 100) / statistics.total).toFixed(0)}%`,
        color: "white",
        font: {
          size: 12,
          weight: "bold"
        },
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <>
      <PaperFrame bottom sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: '0 0 35px 0',
        mb: '20px'
      }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          m: '5px 5px 0px 5px'
        }}>
          <Typography variant="h5" gutterBottom sx={{ ml: '5px' }}>
            <strong>Statistics</strong>
          </Typography>
        </Box>
        {isLoading ? <Intermediate>Loading</Intermediate> : (workspace === null || statistics === null) ? <Intermediate>No Data</Intermediate> : (
          <>
            <Box sx={{
              width: "100%",
              display: "flex",
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Box sx={{ width: "360px", height: "210px" }}>
                <Doughnut data={data} options={options} />
              </Box>
            </Box>
          </>
        )}
      </PaperFrame>
    </>
  )
}

const GridBox = ({ children, txtColor }) => {
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
        color: txtColor ? txtColor : '#000',
      }}>
        {children}
      </Typography>
    </Box>
  )
}