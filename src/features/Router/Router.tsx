import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Profile from "src/features/Profile/Profile";
import Header from "src/features/Header/Header";
import Navigation from "src/features/Navigation/Navigation";
import SmallMessenger from "src/features/SmallMessenger/SmallMessenger";
import Messenger from "src/features/Messenger/Messenger";
import Users from "src/features/Users/Users";
import Auth from "src/features/Auth/Auth";
import { IAuthState } from "src/features/Auth/Auth.slice";
import ProtectedRoute from "src/components/ProtectedRoute/ProtectedRoute";

type TRouterProps = {
  auth: IAuthState;
};

const Router: React.FC<TRouterProps> = ({ auth }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            auth.isLoggedIn ? (
              <Navigate to={`/profile/${auth.userId}`} />
            ) : (
              <Auth />
            )
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Header />
              <main>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Profile />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/messenger/*" element={<Messenger />} />
                  <Route path="/friends" element={<Users />} />
                </Routes>
                <SmallMessenger />
              </main>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
