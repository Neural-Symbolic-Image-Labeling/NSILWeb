import { Delete, Lock } from "@mui/icons-material";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextMenu } from "../../../../../components";
import { findCollection } from "../../../../../utils/workspace";
import { parseLiteral } from "./literalParser";
import { RuleMenu } from "./RuleMenu";

export const LiteralItem = ({ literal, indexR, indexC, indexL, setRules, rules }) => {
  const workspace = useSelector(state => state.workspace.workspace);
  const currCollectionId = useSelector(state => state.workspace.currCollectionId);
  const currCollection = findCollection(workspace, currCollectionId);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(literal.naturalValue);
  const [showMenu, setShowMenu] = useState(false);
  const [coord, setCoord] = useState({ xPos: 0, yPos: 0 });
  const [parsing, setParsing] = useState(false);
  const literalMenuItems = [
    {
      name: "Delete",
      icon: <Delete />,
      handleClick: () => {
        // literal.deleted = !literal.deleted;
        // rules[indexR].clauses[indexC].literals[indexL].deleted = !rules[indexR].clauses[indexC].literals[indexL].deleted;
        literal.deleted = true;
        let temp = JSON.parse(JSON.stringify(rules));
        temp[indexR].clauses[indexC].literals[indexL].deleted = true;
        setRules(temp);
        setShowMenu(false);
      }
    },
    {
      name: "Lock",
      icon: <Lock />,
      handleClick: () => {
        // literal.locked = !literal.locked;
        // rules[indexR].clauses[indexC].literals[indexL].locked = !rules[indexR].clauses[indexC].literals[indexL].locked;
        literal.locked = true;
        let temp = JSON.parse(JSON.stringify(rules));
        temp[indexR].clauses[indexC].literals[indexL].locked = true;
        setRules(temp);
        setShowMenu(false);
      }
    }
  ]

  useEffect(() => {
    setValue(literal.naturalValue);
  }, [literal]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCoord({ xPos: e.pageX + "px", yPos: e.pageY + "px" });
    setShowMenu(true);
  }

  const handleValueChange = (e) => {
    setValue(e.target.value);
    let temp = JSON.parse(JSON.stringify(rules));
    // console.log(`(${indexR}, ${indexC}, ${indexL})original: ${temp[indexR].clauses[indexC].literals[indexL].naturalValue}; new: ${e.target.value}`);
    temp[indexR].clauses[indexC].literals[indexL].naturalValue = e.target.value;
    setRules(temp);
  }

  const handleClickAway = () => { 
    setParsing(true);
    // close menu
    setEditing(false);
    // generate literal from natural value
    let newClause = parseLiteral(literal.naturalValue,
      currCollection.objectList,
      JSON.parse(JSON.stringify(rules[indexR].clauses[indexC])),
      indexL);
    // update clause
    if (newClause) {      
      let temp = JSON.parse(JSON.stringify(rules));
      temp[indexR].clauses[indexC] = newClause;
      setRules(temp);
    }
    setParsing(false);
  }

  return (
    <Fragment>
      <RuleMenu showMenu={showMenu} setShowMenu={setShowMenu} x={coord.xPos} y={coord.yPos} menuItems={literalMenuItems}>
        lol2
      </RuleMenu>
      {/* {`${indexR}, ${indexC}, ${indexL}`} */}
      {editing ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            component='textarea'
            value={value}
            onChange={handleValueChange}
          />
        </ClickAwayListener>
      ) : (

        <Box sx={{boxSizing: "border-box", maxWidth: "100%",}} onDoubleClick={() => setEditing(true)} onContextMenu={handleContextMenu} >
            <LiteralChip literal={literal} isParsing={parsing} />
        </Box>
      )}
    </Fragment>
  )
}

const LiteralChip = ({ literal, isParsing }) => {

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      borderRadius: "16px",
      boxSizing: "border-box",
      backgroundColor: "white",
      maxWidth: "100%",
      overflow: "hidden",
      border: `3px solid ${literal.literal === null ? "rgba(255, 37, 23, 0.7)" : literal.locked ? 'rgba(11, 164, 54, 0.84)' : 'rgba(229, 235, 244, 1)'}`,
      p: '5px 16px 5px 16px',
    }}>
      
      <Typography sx={{
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {isParsing ? "Parsing...": literal.naturalValue}
      </Typography>
    </Box>
  )
}