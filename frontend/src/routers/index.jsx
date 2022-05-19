import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../views/HomePage";

export const WebRouters = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}