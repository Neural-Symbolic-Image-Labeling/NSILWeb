const regexDict = {
  hasLiteral: {
    r: /^This image has (.+)$/,
    handler: (naturalValue, objectDict, clause, indexL, r) => {
      if (new RegExp(r).test(naturalValue)) {
        const inputObject = naturalValue.match(r)[1];
        const swappedDict = Object.entries(objectDict).map(
          ([key, value]) => [value, key]
        );
        // substitude variables with the object index in the dictionary
        for (let i = 0; i < clause.literals.length; i++) {
          let literal = clause.literals[i];

        }

      }
      return null;
    }
  },
  // Temporary solution for overlapping literals
  overLapLiteralRegex: {
    r: /^([a-zA-Z]+) overlaps with ([a-zA-Z]+)$/,
    handler: (naturalValue, objectDict, clause, indexL, r) => {
      return null;
    }
  },
};

export const parseLiteral = (naturalValue, objectDict, clause, indexL,) => {
  let result = null;
  regexList = Object.values(regexDict);
  regexList.forEach((item) => {
    result = item.handler(naturalValue, objectDict, clause, indexL, item.r);
    if (result) {
      return result;
    }
  });
}