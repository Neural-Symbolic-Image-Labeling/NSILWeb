import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rules: [{
    ruleName: "Dog Twins",
    description: "match(X, “dog”) ^ match(Y, “dog”) ^ IOU(X, Y) < 0.6",
  },
  {
    ruleName: "Guitarist",
    description: "match(X, “guitar”) ^ match(Y, “person”) ^ IOU(X, Y) < 0.4",
  },
  {
    ruleName: "Cat Twins",
    description: "match(X, “cat”) ^ match(Y, “cat”) ^ IOU(X, Y) < 0.6",
  },
],
};

export const ruleSlice = createSlice({
  name: "logicRule",
  initialState,
  reducers: {
    //Waiting to implement add/remove button area
    
    // addRule: (state, action) => {
    //   const rule = {
    //     id: Math.random() * 100,
    //     ruleName: action.payload,
    //     description: action.payload,
    //   };
    //   state.rules.push(rule);
    // },
    // removeRule: (state, action) => {
    //   state.rules = state.rules.filter((rule) => rule.id !== action.payload);
    // },
  },
});

export const { addRule, removeRule } = ruleSlice.actions;

export default ruleSlice.reducer;
