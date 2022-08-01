import { Box, Button, Typography } from "@mui/material"
import { useEffect } from "react";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestAutoLabel, requestTrailLabel, updateRules } from "../../../../../apis/workspace";
import { Intermediate } from "../../../../../components/Intermediate";
import { PaperFrame } from "../../../../../components/PaperFrame"
import { adjustedScrollbar } from "../../../../../muiStyles"
import { loadWorkspace } from "../../../../../stores/workspace";
import { findCollection } from "../../../../../utils/workspace";
import { RuleItem } from "./RuleItem";

export const RuleSection = () => {
  const dispatch = useDispatch();
  const workspace = useSelector(state => state.workspace.workspace);
  const isLoading = useSelector(state => state.workspace.loading);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const [rules, setRules] = useState(null);

  const handlePreview = () => {
    // delete "new" field in literals and clauses
    let temp = JSON.parse(JSON.stringify(rules));
    for (let rule of temp) { 
      for (let clause of rule.clauses) {
        delete clause.new;
        for (let literal of clause.literals) {
          delete literal.new;
        }
      }
    }

    updateRules(currCollectionId, temp)
      .then(() => {
        requestTrailLabel(workspace._id, currCollectionId)
          .then(() => {
            dispatch(loadWorkspace(workspace.name));
          }).catch(err => { console.log(err) });
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (workspace && currCollection) {
      setRules(JSON.parse(JSON.stringify(currCollection.rules)));
    }
  }, [workspace, currCollection]);

  return (
    <PaperFrame col sx={{
      alignItems: "center",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      p: '25px',
      mt: '13px',
      boxSizing: "border-box",
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
        mb: '18px',
      }}>
        <Typography variant="h5" color="purple.dark" sx={{
          fontWeight: "bold",
          fontSize: "18px",
          lineHeight: "19px",
        }}>
          Labeling Rules
        </Typography>

        <Button
          size="medium"
          variant="contained"
          sx={{
            bgColor: "purple.dark",
            color: "white",
            ml: "auto",
          }}
          onClick={() => handlePreview()}
          disabled={isLoading || !rules}
        >
          Preview
        </Button>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        overflowY: "scroll",
        overflowX: "hidden",
        // pr: '9px',
        ...adjustedScrollbar.thin
      }}>
        {isLoading ? <Intermediate>Loading...</Intermediate> : !rules ? <Intermediate>No Data</Intermediate> : (
          <Fragment>
            {rules.map((rule, index) => (
              <RuleItem key={index} rule={rule} indexR={index} setRules={setRules} rules={rules} />
            ))}
          </Fragment>
        )}
      </Box>
    </PaperFrame>
  )
}