import { PaperFrame } from "../PaperFrame"

export const Intermediate = ({children}) => { 
  return (
    <PaperFrame noFrame sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    }}>
      {children}
    </PaperFrame>
  )
}