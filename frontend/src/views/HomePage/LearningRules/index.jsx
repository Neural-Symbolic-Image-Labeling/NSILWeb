import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
//import { addRule, removeRule } from "../../../stores/rules/index.js";

// const ruleCard= [
//   {
//     ruleName: "Dog Twins",
//     description: "match(X, “dog”) ^ match(Y, “dog”) ^ IOU(X, Y) < 0.6",
//   },
//   {
//     ruleName: "Guitarist",
//     description: "match(X, “guitar”) ^ match(Y, “person”) ^ IOU(X, Y) < 0.4",
//   },
//   {
//     ruleName: "Dog Twins",
//     description: "match(X, “dog”) ^ match(Y, “dog”) ^ IOU(X, Y) < 0.6",
//   },
// ];

export const LearningRules = () => {
  const [] = useState([]);
  const workspace = useSelector((state) => state.gallery.workspace);
  const isLoading = useSelector((state) => state.gallery.loading);
  const dispatch = useDispatch();

  return (
    <div>
      <Box
        sx={{
          borderTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Logic Rules
        </Typography>
      </Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : workspace === null ? <div>No Data</div> : (
        <Box
          sx={{
            maxHeight: "30vh",
            overflow: "auto",
            border: 1,
            padding: 2,
            mb: 1.5,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0.4em",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#00000",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              height: "3em",
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              height: "3em",
              background: "#555",
              borderRadius: "10px",
              marginRight: "15px",
            },
          }}
        >
          {workspace.rules.map((rule, index) => (
            <Card key={index} sx={{ minWidth: 270, mb: 1.5 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {rule.label}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {"logic rule"}
                </Typography>
                <Typography variant="body2">{rule.value}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small">COPY</Button>
                <Button size="small">EDIT</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};
