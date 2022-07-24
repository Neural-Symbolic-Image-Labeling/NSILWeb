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
        labels: {
          boxWidth: 10,
          boxHeight: 10,
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
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <PaperFrame col sx={{
      alignItems: "center",
      width: "100%",
    }}>
      <Typography variant="h5" gutterBottom color="purple.dark" sx={{
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "19px",
        mt: "16px",
      }}>
        Labeling Results
      </Typography>
      {isLoading ? <Intermediate>Loading...</Intermediate> : !workspace ? <Intermediate>No data available</Intermediate> : (
        <Box sx={{
          width: "170px",
          height: "170px",
          mt: "35px",
          mb: "42px",
        }}>
          <Doughnut data={DoughnutData} options={DoughnutOptions} />
        </Box>
      )}
    </PaperFrame>
  )
}