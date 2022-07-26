import { ControlPoint, Delete, Lock } from "@mui/icons-material";
import { Box, ClickAwayListener, IconButton, Typography } from "@mui/material"
import React, { Fragment, useState } from "react";
import { ContextMenu } from "../../../../../components/ContextMenu";
import { LiteralItem } from "./LiteralItem";
import { RuleMenu } from "./RuleMenu";

export const ClauseItem = ({ clause, indexR, indexC, setRules, rules }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [coord, setCoord] = useState({ xPos: 0, yPos: 0 });
  const clauseMenuItems = [
    {
      name: "Delete",
      icon: <Delete />,
      handleClick: () => {
        // clause.deleted = !clause.deleted;
        // rules[indexR].clauses[indexC].deleted = !rules[indexR].clauses[indexC].deleted;
        clause.deleted = true;
        let temp = JSON.parse(JSON.stringify(rules));
        temp[indexR].clauses[indexC].deleted = true;
        setRules(temp);
        setShowMenu(false);
      }
    },
    {
      name: "Lock",
      icon: <Lock />,
      handleClick: () => {
        // clause.locked = !clause.locked;
        // rules[indexR].clauses[indexC].locked = !rules[indexR].clauses[indexC].locked;
        clause.locked = true;
        let temp = JSON.parse(JSON.stringify(rules));
        temp[indexR].clauses[indexC].locked = true;
        setRules(temp);
        setShowMenu(false);
      }
    }
  ]

  const handleAddLiteral = () => { 
    let temp = JSON.parse(JSON.stringify(rules));
    temp[indexR].clauses[indexC].literals.push({
      literal: "",
      naturalValue: "New Literal",
      deleted: false,
      locked: false
    });
    // alert(`${indexR}, ${indexC}, ${JSON.stringify(temp[indexR].clauses[indexC].literals)}`);
    setRules(temp);
  }

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCoord({ xPos: e.pageX + "px", yPos: e.pageY + "px" });
    setShowMenu(true);
  }

  const getBorderStyle = () => { 
    if (clause.locked) {
      return "3px solid rgba(11, 164, 54, 0.84)";
    }
    else if (clause.literals.reduce((pre, curr) => curr.deleted && pre, true)) {
      return "3px solid rgba(255, 37, 23, 0.7)";
    }
    return "0";
  }

  return (
    <Fragment>
      {/* <Box>
        {clause.literals.reduce((pre, curr) => curr.deleted && pre, true) ? '1': '0'}
      </Box> */}
      <RuleMenu showMenu={showMenu} setShowMenu={setShowMenu} x={coord.xPos} y={coord.yPos} menuItems={clauseMenuItems}>
        lol1
      </RuleMenu>
      <Box
        onContextMenu={handleContextMenu}
        sx={{
          display: "flex",
          borderRadius: "5px",
          alignItems: "center",
          flexWrap: "wrap",
          boxSizing: "border-box",
          maxWidth: "100%",
          border: getBorderStyle(),
          // clause section indicator
          backgroundColor: "rgba(229, 235, 244, 1)",
          p: '11px 9px 11px 9px',
        }}
      >
        {clause.literals.filter(l => !l.deleted).map((literal, index) => (
          <Fragment key={index}>
            {index !== 0 && (
              <Typography sx={{
                fontWeight: "700",
                fontSize: "17px",
                lineHeight: "26px",
                letterSpacing: "0.15px",
                color: "purple.dark",
                ml: "5px",
                mr: "5px",
              }}>
                AND
              </Typography>
            )}
            {/* {`deleted: ${literal.deleted} | locked: ${literal.locked}`} */}
            <LiteralItem literal={literal} indexR={indexR} indexC={indexC} indexL={index} setRules={setRules} rules={rules} />
          </Fragment>
        ))}
        <Box sx={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // width: "100%",
          ml: "5px",
        }}>
          <IconButton onClick={() => handleAddLiteral()}>
            <ControlPoint sx={{ color: 'purple.dark' }} />
          </IconButton>
        </Box>
      </Box>
    </Fragment>
  )
}