import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../views/HomePage";
import { TestPage } from "../views/TestPage";
import React from 'react';


export const WebRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}