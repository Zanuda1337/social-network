import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "src/features/Profile/Profile";
import Header from "src/features/Router/Header/Header";
import Navigation from "src/features/Router/Navigation/Navigation";
import SmallMessenger from "src/features/Router/SmallMessenger/SmallMessenger";
import Messenger from "src/features/Messenger/Messenger";

const Router: React.FC = () => (
  <>
    <Header />
    <main>
      <Navigation />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messenger/*" element={<Messenger />} />
      </Routes>
      <SmallMessenger />
    </main>
  </>
);

export default Router;
