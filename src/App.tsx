import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./features/Auth/Auth";
import "src/assets/css/reset.css";
import "src/assets/css/global.scss";
import Router from "src/features/Router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<Router />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
