import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Nagivation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Nagivation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route path="/*" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
          </div>
        ) : (
          <Route path="/*" element={<Auth />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
