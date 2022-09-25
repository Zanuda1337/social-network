import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "src/features/Profile/Profile";
import Header from "src/features/Router/Header/Header";
import Navigation from "src/features/Router/Navigation/Navigation";
import SmallMessenger from "src/features/Router/SmallMessenger/SmallMessenger";

const Router: React.FC = () => (
  <>
    <Header />
    <main>
      <Navigation />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      <SmallMessenger />
    </main>
  </>
);

export default Router;
