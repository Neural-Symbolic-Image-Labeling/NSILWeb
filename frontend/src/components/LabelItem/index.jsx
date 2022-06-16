import { Box } from "@mui/material"

/**
 * @param {{label: string; isLablled: boolean}} param0 
 */
export const LabelItem = ({ label, isLablled }) => { 
  
  return (
    <>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          border: `2px solid ${isLablled ? "#21AB82" : "#1976D2"}`,
          borderRadius: "8px 0 0 8px",
          color: `${isLablled ? "#21AB82" : "#1976D2"}`,
          height: "20px",
          width: "60px",
          padding: "2px 14px",
          fontSize: "13px",
        }}>
          {label}
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isLablled ? "#21AB82" : "#1976D2",
          border: `2px solid ${isLablled ? "#21AB82" : "#1976D2"}`,
          borderRadius: "0 8px 8px 0",
          color: "white",
          height: "20px",
          width: "60px",
          padding: "2px 14px",
          fontSize: "13px",
        }}>
          {isLablled ? "Labeled" : "Unlabeled"}
        </Box>
      </Box>
    </>
  )
}