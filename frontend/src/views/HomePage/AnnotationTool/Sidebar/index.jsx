import { Typography } from "@mui/material";
import { useState } from "react";
import style from "./style.module.css";

const tools = [
  {
    name: "Bounding Box",
    svg: (<svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 39.5C3.76561 39.5 3.53708 39.477 3.31639 39.4334L3.21935 39.9239C2.69457 39.82 2.2067 39.6136 1.77754 39.3263L2.0557 38.9108C1.6738 38.6551 1.3449 38.3262 1.08922 37.9443L0.673738 38.2225C0.386418 37.7933 0.179953 37.3054 0.076136 36.7806L0.56663 36.6836C0.52297 36.4629 0.5 36.2344 0.5 36V35H0V33H0.5V31H0V29H0.5V27H0V25H0.5V23H0V21H0.5V19H0V17H0.5V15H0V13H0.5V11H0V9H0.5V7H0V5H0.5V4C0.5 3.76561 0.52297 3.53708 0.56663 3.31639L0.0761362 3.21935C0.179953 2.69457 0.386419 2.2067 0.673739 1.77754L1.08922 2.0557C1.3449 1.6738 1.6738 1.3449 2.0557 1.08922L1.77754 0.673738C2.2067 0.386419 2.69457 0.179953 3.21935 0.0761362L3.31639 0.56663C3.53708 0.52297 3.76561 0.5 4 0.5H5V0H7V0.5H9V0H11V0.5H13V0H15V0.5H17V0H19V0.5H21V0H23V0.5H25V0H27V0.5H29V0H31V0.5H33V0H35V0.5H36C36.2344 0.5 36.4629 0.52297 36.6836 0.56663L36.7806 0.0761362C37.3054 0.179953 37.7933 0.386419 38.2225 0.673738L37.9443 1.08922C38.3262 1.3449 38.6551 1.6738 38.9108 2.0557L39.3263 1.77754C39.6136 2.2067 39.82 2.69457 39.9239 3.21935L39.4334 3.31639C39.477 3.53708 39.5 3.76561 39.5 4V5H40V7H39.5V9H40V11H39.5V13H40V15H39.5V17H40V19H39.5V21H40V23H39.5V25H40V27H39.5V29H40V31H39.5V33H40V35H39.5V36C39.5 36.2344 39.477 36.4629 39.4334 36.6836L39.9239 36.7806C39.82 37.3054 39.6136 37.7933 39.3263 38.2225L38.9108 37.9443C38.6551 38.3262 38.3262 38.6551 37.9443 38.9108L38.2225 39.3263C37.7933 39.6136 37.3054 39.82 36.7806 39.9239L36.6836 39.4334C36.4629 39.477 36.2344 39.5 36 39.5H35V40H33V39.5H31V40H29V39.5H27V40H25V39.5H23V40H21V39.5H19V40H17V39.5H15V40H13V39.5H11V40H9V39.5H7V40H5V39.5H4Z" fill="transparent" stroke="#1976D2" stroke-linejoin="round" stroke-dasharray="2 2" />
    </svg>)
  },
  {
    name: "Circle",
    svg: (<svg width="80" height="80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="19.5" fill="transparent" stroke="#0BA436" stroke-dasharray="2 2"/>
    </svg>)
  },
  {
    name: "Segment",
    svg: (<svg width="100" height="100" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 18H14.0769L21.6154 2L29.6923 18H44L29.6923 29.5L35.6154 44L21.6154 35L9.23077 44L14.0769 29.5" stroke="#F3A40A" stroke-width="1.5" stroke-dasharray="2 2"/>
    </svg>)
  }
]


export const Sidebar = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && (
        <div className={style["container"]}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Add New Object
          </Typography>
          <Typography variant="body1" sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            Choose<strong> Bounding Box </strong>or<strong> Circle </strong>for image detection.
          </Typography>
          <Typography variant="body1" sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            Choose <strong>Segment</strong> for image segematation
          </Typography>
          <div className={style["label-tools"]}>
            {tools.map((tool, index) => (
              <div className={style["tool-container"]}>
                {tool.svg}
                <Typography variant="body1">
                  {tool.name}
                </Typography>
              </div>
            ))}
          </div>
          


        </div>
      )}
    </>
  )
}