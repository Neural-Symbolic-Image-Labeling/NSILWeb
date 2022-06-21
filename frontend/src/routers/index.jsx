import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../views/DashboardPage";
import { HomePage } from "../views/HomePage";
import { TestPage } from "../views/TestPage";

export const WebRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}