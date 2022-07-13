import { Fragment, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Collapse, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { LocalOffer, ExpandMore, TouchApp } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { setRule } from "../../../../../stores/gallery";
import { Intermediate } from "../../../../../components/Intermediate";
import { findCollection } from "../../../../../utils/workspace";
import { PaperFrame } from "../../../../../components/PaperFrame";

export const LearningRules = () => {
  const workspace = useSelector((state) => state.gallery.workspace);
  const isLoading = useSelector(state => state.gallery.loading);
  const currCollectionId = useSelector((state) => state.gallery.currCollectionId);
  const dispatch = useDispatch();
  const currCollection = findCollection(workspace, currCollectionId);
  const rules = workspace ? currCollection ? currCollection.rules : null : null;

  return (
    <PaperFrame>
      <Typography variant="h5" gutterBottom sx={{ ml: '5px' }}>
        <strong>Learning Rules</strong>
      </Typography>
      {isLoading ? <Intermediate>Loading</Intermediate> : (workspace === null || rules === null) ? <Intermediate>No Data</Intermediate> : (
        <Box>
          {rules.map((rule, indexR) => (
            <RuleListItem key={indexR} rule={rule} indexR={indexR} />
          ))}
        </Box>
      )}
    </PaperFrame>
  );
};

const RuleListItem = ({ rule, indexR }) => {
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
            <LocalOffer sx={{ mr: '5px' }} />
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
    // alert(`Rule ${indexR}, Clause ${indexC}, Literal ${indexL}`);
  }

  const handleChipDelete = (indexC, indexL) => {
    const editableRule = JSON.parse(JSON.stringify(rule));
    // console.log(Object.getOwnPropertyDescriptor(editableRule.clauses[indexC], "literals"));
    editableRule.clauses[indexC].literals.splice(indexL, 1);
    if (editableRule.clauses[indexC].literals.length === 0) {
      editableRule.clauses.splice(indexC, 1);
    }
    dispatch(setRule({ ruleIndex: indexR, rule: editableRule }));
    // TODO: add record to externalRules field
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
        <Box key={indexC} sx={{
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
              <Box key={indexL} sx={{
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
            ))}
          </Box>
        </Box>
      ))}
    </PaperFrame>
  )
}

const LiteralEditModal = ({ isModalOpen, setIsModalOpen, selectedLiteralMetaData, rule, updator }) => {
  const [literalValue, setLiteralValue] = useState(null);

  useEffect(() => { 
    setLiteralValue(selectedLiteralMetaData ? rule.clauses[selectedLiteralMetaData.clauseIndex].literals[selectedLiteralMetaData.literalIndex].literal : null);
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
        {/* {JSON.stringify(literalValue)} */}
      </DialogContent>
    </Dialog>
  )
}
