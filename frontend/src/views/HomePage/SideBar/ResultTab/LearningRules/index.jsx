import { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { LocalOffer, ExpandMore, TouchApp } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setRule } from "../../../../../stores/gallery";
import { Intermediate } from "../../../../../components/Intermediate";
import { findCollection } from "../../../../../utils/workspace";
import { PaperFrame } from "../../../../../components/PaperFrame";
import { updateRule } from "../../../../../apis/workspace";
import { getRuleLabelInfo } from "../ChartSection/helpers";

export const LearningRules = () => {
  const workspace = useSelector((state) => state.gallery.workspace);
  const isLoading = useSelector(state => state.gallery.loading);
  const currCollectionId = useSelector((state) => state.gallery.currCollectionId);
  const dispatch = useDispatch();
  const currCollection = findCollection(workspace, currCollectionId);
  const rules = workspace ? currCollection ? currCollection.rules : [] : [];
  const labelsInfo = workspace ? currCollection ? getRuleLabelInfo(currCollection) : [] : [];

  return (
    <PaperFrame sx={{
      mb: '25px',
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: '15px',
      }}>
        <Typography variant="h5" sx={{ ml: '5px' }}>
          <strong>Labeling Rules</strong>
        </Typography>
        <Button
          variant="contained"
          onClick={() => alert("Not implemented yet")}
          size="medium"
          sx={{
            bgcolor: 'rgba(57, 125, 192, 1)',
            color: 'white',
            ml: 'auto',
          }}
        >
          Trail Label
        </Button>
      </Box>
      {isLoading ? <Intermediate>Loading</Intermediate> : (workspace === null || rules.length === 0) ? <Intermediate>No Data</Intermediate> : (
        <Box>
          {rules.map((rule, indexR) => (
            <RuleListItem key={indexR} rule={rule} indexR={indexR} color={labelsInfo.colors[labelsInfo.labels.findIndex(l => l === rule.name)]} />
          ))}
        </Box>
      )}
    </PaperFrame>
  );
};

const RuleListItem = ({ rule, indexR, color }) => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} sx={{
          backgroundColor: 'rgba(0, 0, 0, .01)',
        }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
          }}>
            <LocalOffer sx={{ mr: '5px', color: color }} />
            <Typography>{rule.name}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <RuleDatail rule={rule} indexR={indexR} />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  )
}

const RuleDatail = ({ rule, indexR }) => {
  const dispatch = useDispatch();
  const currCollectionId = useSelector((state) => state.gallery.currCollectionId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLiteralMetaData, setSelectedLiteralMetaData] = useState(null);

  const literalUpdator = (literal) => {
  }

  const handleChipClick = (indexC, indexL) => {
    setSelectedLiteralMetaData({
      ruleIndex: indexR,
      clauseIndex: indexC,
      literalIndex: indexL,
    });
    setIsEditModalOpen(true);
  }

  const handleChipDelete = (indexC, indexL) => {
    const editableRule = JSON.parse(JSON.stringify(rule));

    editableRule.clauses[indexC].literals[indexL].deleted = true;

    updateRule(currCollectionId, indexR, editableRule)
      .then(() => {
        dispatch(setRule({ ruleIndex: indexR, rule: editableRule }));
      })
      .catch(err => console.log(err));
  }

  return (
    <PaperFrame>
      <LiteralEditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        selectedLiteralMetaData={selectedLiteralMetaData}
        rule={rule}
      />
      {rule.clauses.map((clause, indexC) => (
        <Fragment key={indexC}>
          {clause.literals.reduce((result, literal) => result || !literal.deleted, false) && (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
            }}>
              {indexC !== 0 && (
                <Typography variant="body2" sx={{
                  mt: '10px',
                  mb: '10px',
                  color: 'text.secondary',
                }}>
                  <strong>OR</strong>
                </Typography>
              )}

              <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}>
                <Typography variant="body2" sx={{}}>
                  {`${indexC}.`}
                </Typography>
                {clause.literals.map((literal, indexL) => (
                  <Fragment key={indexL}>
                    {!literal.deleted && (
                      <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {indexL !== 0 && (
                          <Typography variant="body2" sx={{
                            ml: '5px',
                            color: 'text.secondary',
                          }}>
                            <strong>AND</strong>
                          </Typography>
                        )}
                        <Tooltip disableInteractive title="EDIT" arrow>
                          <Chip
                            label={literal.naturalValue}
                            onClick={() => handleChipClick(indexC, indexL)}
                            onDelete={() => handleChipDelete(indexC, indexL)}
                            sx={{
                              ml: '5px',
                            }}
                          />
                        </Tooltip>
                      </Box>
                    )}
                  </Fragment>
                ))}
              </Box>
            </Box>
          )}
        </Fragment>
      ))}
    </PaperFrame>
  )
}

const LiteralEditModal = ({ isModalOpen, setIsModalOpen, selectedLiteralMetaData, rule, updator }) => {
  const dispatch = useDispatch();
  const currCollectionId = useSelector((state) => state.gallery.currCollectionId);
  const [literalValue, setLiteralValue] = useState(null);

  const handleSubmit = () => {
    const editableRule = JSON.parse(JSON.stringify(rule));
    // TODO: update literal value
    editableRule.clauses[selectedLiteralMetaData.clauseIndex].literals[selectedLiteralMetaData.literalIndex].naturalValue = literalValue;

    editableRule.clauses[selectedLiteralMetaData.clauseIndex].literals[selectedLiteralMetaData.literalIndex].modifiedValue = literalValue;
    editableRule.clauses[selectedLiteralMetaData.clauseIndex].literals[selectedLiteralMetaData.literalIndex].modified = true;
    updateRule(currCollectionId, selectedLiteralMetaData.ruleIndex, editableRule)
      .then(() => {
        dispatch(setRule({ ruleIndex: selectedLiteralMetaData.ruleIndex, rule: editableRule }));
        setIsModalOpen(false);
      })
      .catch(err => {
        console.log(err);
        setIsModalOpen(false);
      });
  }

  useEffect(() => {
    const targetLiteral = selectedLiteralMetaData ? rule.clauses[selectedLiteralMetaData.clauseIndex].literals[selectedLiteralMetaData.literalIndex] : null;
    if (!targetLiteral) return;
    setLiteralValue(targetLiteral.modified ? targetLiteral.modifiedValue : targetLiteral.literal);
  }, [selectedLiteralMetaData]);

  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DialogTitle>Edit Literal</DialogTitle>
      <DialogContent>
        <PaperFrame sx={{
          mt: '10px',
          display: "flex",
          flexDirection: "column",
        }}>
          <TextField
            label="Literal"
            value={literalValue}
            InputLabelProps={{ shrink: literalValue ? true : false }}
            onChange={(e) => setLiteralValue(e.target.value)}
          />
        </PaperFrame>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button variant="outlined" onClick={() => handleSubmit()}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
