import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Intermediate } from "../../../components/Intermediate";
import { findCollection } from "../../../utils/workspace";

export const LearningRules = () => {
  const [] = useState([]);
  const workspace = useSelector((state) => state.gallery.workspace);
  const currCollectionId = useSelector((state) => state.gallery.currCollectionId);
  const isLoading = useSelector((state) => state.gallery.loading);
  const dispatch = useDispatch();
  const currCollection = findCollection(workspace, currCollectionId);
  const rules = workspace ? currCollection ? currCollection.rules : [] : [];

  return (
    <Paper sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "95%",
      padding: '0 0 35px 0'
    }}>
      <Box sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-start",
        m: '5px 5px 10px 5px'
      }}>
        <Typography variant="h5" gutterBottom sx={{ ml: '20px' }}>
          <strong>Logic Rules</strong>
        </Typography>
      </Box>
      <Paper sx={{
        padding: '10px 0 0 0',
        width: "90%",
      }}>
        {isLoading ? <Intermediate>Loading</Intermediate> : workspace === null ? <Intermediate>No Data</Intermediate> : (
          <List sx={{
            width: '100%', maxHeight: '200px', overflowY: 'scroll',
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
          }}>
            {rules.map((rule, index) => (
              <ListItem key={index} sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: 'center',
                width: '100%'
              }}>
                <Card sx={{
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  width: "100%",
                  mb: "10px"
                }}>
                  <CardContent sx={{ pb: '0' }}>
                    <Typography variant="h5" component="div">
                      <strong>{rule.label}</strong>
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {"logic rule"}
                    </Typography>
                    <Typography variant="body1">{rule.value}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="medium"><strong>COPY</strong></Button>
                    <Button size="medium"><strong>EDIT</strong></Button>
                  </CardActions>
                </Card>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Paper>
  );
};
