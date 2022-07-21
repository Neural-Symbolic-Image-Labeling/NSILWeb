import { Box, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie, Doughnut } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { colorPicker } from "../../../../../muiStyles";
import { Intermediate } from "../../../../../components/Intermediate";
import { findCollection } from "../../../../../utils/workspace";
import { PaperFrame } from "../../../../../components/PaperFrame";
import { externalTooltipHandlerDoughnut, externalTooltipHandlerPie, getRuleLabelInfo } from "./helpers";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const ChartSection = () => {
  const workspace = useSelector(state => state.gallery.workspace);
  const isLoading = useSelector(state => state.gallery.loading);
  const currCollectionId = useSelector(state => state.gallery.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const statistics = workspace ? currCollection ? currCollection.statistics : null : null;
  const labelsInfo = workspace ? currCollection ? getRuleLabelInfo(currCollection) : [] : [];

  /**@type {import("chart.js").ChartData} */
  const PieData = (workspace === null || statistics === null) ? null : {
    labels: ['Unlabeled', 'Manually Labeled', 'Auto-Labeled'],
    datasets: [{
      label: '# of images',
      data: [statistics.unlabeled, statistics.manual, statistics.autoLabeled],
      backgroundColor: [
        colorPicker.unlabeled,
        colorPicker.manual,
        colorPicker.auto
      ],
      // borderWidth: 0,
    }],
  };

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
    cutout: 55,
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

  /**@type {import("chart.js").ChartOptions} */
  const PieOptions = {
    plugins: {
      legend: {
        display: false,
        position: "left",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        }
      },
      tooltip: {
        position: "nearest",
        // yAlign: "top",
        enabled: false,
        external: externalTooltipHandlerPie
      },
      datalabels: {
        formatter: (value, context) => Number(value) === 0 ? '' : `${((Number(value) * 100) / statistics.total).toFixed(0)}%`,
        color: "white",
        font: {
          size: 8,
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
    <>
      <PaperFrame bottom sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mb: '35px',
        pb: '15px',
        mb: '20px'
      }}>
        {/* {`${JSON.stringify(labelsInfo)}`} */}
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
              <Box sx={{
                width: "360px",
                height: "210px",
                position: 'relative',
              }}>
                <Doughnut data={DoughnutData} options={DoughnutOptions}/>
                <Box sx={{
                  width: "42%",
                  height: "42%",
                  top: "50%",
                  left: "50%",
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                }}>
                  <Pie data={PieData} options={PieOptions} />
                </Box>
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