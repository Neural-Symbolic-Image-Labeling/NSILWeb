const regexDict = {
  hasLiteral: {
    math: /^([a-zA-Z]+)\(X,(.)\)$/,
    natural: /^This image has (.+)$/,
  },
  overLapLiteralRegex: {
    math: /^overlap\(([^NX]+),([^NX]+)\)$/,
    natural: /^([a-zA-Z]+) is overlaped with ([a-zA-Z]+)$/,
  }
}

const literalHandlers = {
  hasLiteral: {
    handler: (naturalValue, objectList, clause, indexL) => {
      try {
        if (!new RegExp(regexDict.hasLiteral.natural).test(naturalValue)) return null;
        // New literal is a hasLiteral
        // extract object and generate new math value
        const inputObject = naturalValue.match(regexDict.hasLiteral.natural)[1];
        //generate new math value
        const newMathValue = `${inputObject}(X,A)`;
        //replace math value
        clause.literals[indexL].literal = newMathValue;

        // parse current wrong clause
        let result = clauseParser(objectList, clause, indexL);
        return result;
      } catch (error) {
        return null;
      }
    }
  },
  // Temporary solution for overlapping literals
  overLapLiteralRegex: {
    handler: (naturalValue, objectList, clause, indexL, r) => {
      return null;
    }
  },
};

export const parseLiteral = (naturalValue, objectList, clause, indexL,) => {
  for (let item of literalHandlers) {
    let resultClause = item.handler(naturalValue, objectList, clause, indexL);
    if (result) {
      return resultClause;
    }
  }
  return null;
}

const clauseParser = (objectList, clause, indexL) => {
  //convert letters variables to numbers
  for (let index = 0; index < clause.literals.length; index++) {
    let literal = clause.literals[index];
    //(for hasLiteral)
    if (new RegExp(regexDict.hasLiteral.math).test(literal.literal)) {
      // this literal is a hasLiteral
      // replace letter with object index
      let matches = literal.literal.match(regexDict.hasLiteral.math);
      let objectName = matches[1];
      let objectIndex = objectList.findIndex(object => object.toUpperCase() === matches[1].toUpperCase());
      if (objectIndex === -1) {
        return null;
      }
      let newLiteral = `${objectName}(X,${objectIndex})`;
      literal.literal = newLiteral;
    }
    //(for overlapLiteral)
    else if (new RegExp(regexDict.overLapLiteralRegex.math).test(literal.literal)) {
      // this literal is an overLapLiteral
      // find names of object1 and object2
      let letterMatches = literal.literal.match(regexDict.overLapLiteralRegex.math);
      let o1Letter = letterMatches[1];
      let o2Letter = letterMatches[2];
      let o1Name = null;
      let o2Name = null;
      for (let literal of clause.literals) {
        if (new RegExp(regexDict.hasLiteral.math).test(literal.literal)) {
          let matches = literal.literal.match(regexDict.hasLiteral.math);
          if (matches[2].toUpperCase() === o1Letter.toUpperCase()) {
            o1Name = matches[1];
          }
          if (matches[2].toUpperCase() === o2Letter.toUpperCase()) {
            o2Name = matches[1];
          }
        }
      }
      if (o1Name === null || o2Name === null) {
        return null;
      }
      //find indexes of objects
      let o1Index = objectList.findIndex(object => object.toUpperCase() === o1Name.toUpperCase());
      let o2Index = objectList.findIndex(object => object.toUpperCase() === o2Name.toUpperCase());
      if (o1Index === -1 || o2Index === -1) {
        return null;
      }
      //generate new math value
      let newLiteral = `overlap(${o1Index},${o2Index})`;
      literal.literal = newLiteral;
    }
  }
  //replace letters back to letters for hasLiterals
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
  let nextLetterIndex = 0;
  let currMatchTable = {};
  for (let index = 0; index < clause.literals.length; index++) {
    let literal = clause.literals[index];
    if (index === indexL) return;
    //(for hasLiteral)
    if (new RegExp(regexDict.hasLiteral.math).test(literal.literal)) {
      // this literal is a hasLiteral
      // find or add matching in table
      let matches = literal.literal.match(regexDict.hasLiteral.math);
      let objectName = matches[1];
      let targetIndex = Number.parseInt(matches[2]);
      if (!currMatchTable[targetIndex]) {
        // index has not been converted yet
        currMatchTable[targetIndex] = letters[nextLetterIndex];
        nextLetterIndex++;
      }
      let newLiteral = `${objectName}(X,${currMatchTable[targetIndex]})`;
      literal.literal = newLiteral;
    }
    //(for overlapLiteral)
    else if (new RegExp(regexDict.overLapLiteralRegex.math).test(literal.literal)) {
      let matches = literal.literal.match(regexDict.overLapLiteralRegex.math);
      let o1Index = Number.parseInt(matches[1]);
      let o2Index = Number.parseInt(matches[2]);
      if (!currMatchTable[o1Index] || !currMatchTable[o2Index]) {
        return null;
      }
      let newLiteral = `overlap(${currMatchTable[o1Index]},${currMatchTable[o2Index]})`;
      literal.literal = newLiteral;
    }
  }

  return clause;
}