import { Fragment, useState } from "react";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { LocalOffer, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
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
      <Typography variant="h5" gutterBottom sx={{ ml: '20px' }}>
        <strong>Learning Rules</strong>
      </Typography>
      {isLoading ? <Intermediate>Loading</Intermediate> : (workspace === null || rules === null) ? <Intermediate>No Data</Intermediate> : (
        <List>
          {rules.map((rule, index) => (
            <RuleListItem key={index} rule={rule} />
          ))}
        </List>
      )}
    </PaperFrame>
  );
};

const RuleListItem = ({ rule }) => { 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <ListItemButton sx={{
        borderBottom: "1px solid black",
      }}>
        <ListItemIcon>
          <LocalOffer />
        </ListItemIcon>
        <ListItemText primary={rule.name} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <RuleDatail rule={rule} />
      </Collapse>
    </Fragment>
  )
}

const RuleDatail = ({ rule }) => { 
  return (
    <PaperFrame>
      
    </PaperFrame>
  )
}
