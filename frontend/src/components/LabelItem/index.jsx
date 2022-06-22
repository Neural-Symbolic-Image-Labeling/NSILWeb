import { Box, Typography } from "@mui/material"
import { colorPicker } from "../../muiStyles"

/**
 * @param {{label: string; type: "unlabeled" | "auto" | "manual"}} param0 
 */
export const LabelItem = ({ label, type }) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60px",
        height: "30px",
        bgcolor: colorPicker[type],
        borderRadius: "8px",
      }}>
        <Typography
          sx={{
            color: "white",
          }}
          variant="body2"
        >
          {label}
        </Typography>
      </Box>
    </Box>
  )
}