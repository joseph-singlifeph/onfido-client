import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { paths } from "./routes";

export default function App() {
  return (
    <Router>
      <Routes>
        {paths.map((item) => (
          <Route path={item.path} element={item.element} index={item.index} />
        ))}
      </Routes>
    </Router>
  );
}
