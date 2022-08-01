import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { externalTooltipHandlerDoughnut } from "./helper";
import { getRuleLabelInfo } from "../../../../../utils/chart";
import { findCollection } from "../../../../../utils/workspace";
import { PaperFrame } from "../../../../../components/PaperFrame";
import { useSelector } from "react-redux";
import { Intermediate } from "../../../../../components/Intermediate";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const ChartSection = () => {
  const workspace = useSelector(state => state.workspace.workspace);
  const isLoading = useSelector(state => state.workspace.loading);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const statistics = workspace ? currCollection ? currCollection.statistics : null : null;
  const labelsInfo = workspace ? currCollection ? getRuleLabelInfo(currCollection) : [] : [];

  /**@type {import("chart.js").ChartData} */
  const DoughnutData = (workspace === null || statistics === null) ? null : {
    labels: labelsInfo ? labelsInfo.labels : [],
    datasets: [{
      label: '# of images',
      data: labelsInfo ? labelsInfo.values : [],
      backgroundColor: labelsInfo.colors,
      hoverBackgroundColor: labelsInfo.colors,
    }],
  }

  /**@type {import("chart.js").ChartOptions} */
  const DoughnutOptions = {
    cutout: 50,
    plugins: {
      legend: {
        display: false,
        position: "right",
        // onClick: (e, legendItem) => { },
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 40,
          
          font: {
            size: 16,
          }
        }
      },
      tooltip: {
        position: "nearest",
        // yAlign: "top",
        enabled: false,
        external: externalTooltipHandlerDoughnut
      },
      datalabels: {
        formatter: (value, context) => Number(value) === 0 ? '' : `${((Number(value) * 100) / labelsInfo.values.reduce((partialSum, a) => partialSum + a, 0)).toFixed(0)}%`,
        color: "white",
        font: {
          size: 12,
          weight: "bold"
        },
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    /**@type {import("chart.js").DoughnutAnimationOptions} */
    animation: {
      animateRotate: false,
      animateScale: false
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <PaperFrame col sx={{
      alignItems: "center",
      width: "100%",
      minHeight: "35vh",
      // overflow: "hidden",
      height: '1px',
      pb: '12px'
    }}>
      <Box sx={{
        display: "flex",
        width: "100%",
        boxSizing: "border-box",
        justifyContent: "flex-start",
        pt: "16px",
        pl: '25px',
      }}>
        <Typography variant="h5" gutterBottom color="purple.dark" sx={{
          fontWeight: "bold",
          fontSize: "18px",
          lineHeight: "19px",
        }}>
          Labeling Results
        </Typography>
      </Box>
      {isLoading ? <Intermediate>Loading...</Intermediate> : !workspace ? <Intermediate>No Data</Intermediate> : (
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Box sx={{
            width: "70%",
            height: "95%",
            // mt: "35px",
            // mb: "42px",
          }}>
            <Doughnut data={DoughnutData} options={DoughnutOptions} />
          </Box>
        </Box>
      )}
    </PaperFrame>
  )
}