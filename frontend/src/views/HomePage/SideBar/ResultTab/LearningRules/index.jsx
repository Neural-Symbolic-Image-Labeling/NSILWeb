import { Fragment, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { LocalOffer, ExpandLess, ExpandMore } from "@mui/icons-material";
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
          {rules.map((rule, index) => (
            <RuleListItem key={index} rule={rule} />
          ))}
        </Box>
      )}
    </PaperFrame>
  );
};

const RuleListItem = ({ rule }) => {
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
          <RuleDatail rule={rule} />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  )
}

const RuleDatail = ({ rule }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const handleChipClick = (indexC, indexL) => { 
    alert(indexC, indexL);
  }

  const handleChipDelete = (indexC, indexL) => { 
    const editableRule = JSON.parse(JSON.stringify(rule));
    // console.log(Object.getOwnPropertyDescriptor(editableRule.clauses[indexC], "literals"));
    editableRule.clauses[indexC].literals.splice(indexL, 1);
    dispatch(setRule({ruleId: rule._id, rule: editableRule}));
    // TODO: add record to externalRules field
  }

  return (
    <PaperFrame>
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
              {`${indexC + 1}.`}
            </Typography>
            {clause.literals.map((literal, indexL) => (
              <Box key={ indexL } sx={{
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
                <Chip
                  label={literal.naturalValue}
                  onClick={() => handleChipClick(indexC, indexL)}
                  onDelete={() => handleChipDelete(indexC, indexL)}
                  sx={{
                    ml: '5px',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </PaperFrame>
  )
}
