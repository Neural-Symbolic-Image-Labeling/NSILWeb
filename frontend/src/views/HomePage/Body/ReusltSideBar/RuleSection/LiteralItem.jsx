import { Delete, Lock } from "@mui/icons-material";
import { Box, ClickAwayListener, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { ContextMenu } from "../../../../../components";
import { RuleMenu } from "./RuleMenu";

export const LiteralItem = ({ literal, indexR, indexC, indexL, setRules, rules }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(literal.naturalValue);
  const [showMenu, setShowMenu] = useState(false);
  const [coord, setCoord] = useState({ xPos: 0, yPos: 0 });
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
    rules[indexR].clauses[indexC].literals[indexL].naturalValue = e.target.value;
    setRules(rules);
  }

  return (
    <Fragment>
      <RuleMenu showMenu={showMenu} setShowMenu={setShowMenu} x={coord.xPos} y={coord.yPos} menuItems={literalMenuItems}>
        lol2
      </RuleMenu>
      {editing ? (
        <ClickAwayListener onClickAway={() => setEditing(false)}>
          <Box
            component='textarea'
            value={value}
            onChange={handleValueChange}
          />
        </ClickAwayListener>
      ) : (

        <Box sx={{boxSizing: "border-box", maxWidth: "100%",}} onDoubleClick={() => setEditing(true)} onContextMenu={handleContextMenu} >
          <LiteralChip literal={literal} />
        </Box>
      )}
    </Fragment>
  )
}

const LiteralChip = ({ literal }) => {

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      borderRadius: "16px",
      boxSizing: "border-box",
      backgroundColor: "white",
      maxWidth: "100%",
      overflow: "hidden",
      border: `3px solid ${literal.locked ? 'rgba(11, 164, 54, 0.84)' : 'rgba(229, 235, 244, 1)'}`,
      p: '5px 16px 5px 16px',
    }}>
      <Typography sx={{
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {literal.naturalValue}
      </Typography>
    </Box>
  )
}