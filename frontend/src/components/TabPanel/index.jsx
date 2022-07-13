import { Box } from "@mui/material";

/** 
 * @param {{value: number; index: number}} props 
 * */
 export const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <Box sx={{
      pr: '34px',
    }}>
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </Box>
  );
}