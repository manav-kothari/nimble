import React from "react";
import { Navigate } from "react-router-dom";
import Menu from "./components/Menu";

const HomePage = () => {
  const performRedirect = () => {
    return <Navigate to="/signin" />;
  };
  return (
    <>
      <Menu />
      <div className="page page3">
        <h2 className="text-center">
          Welcome to Nimble! You are being Redirected
        </h2>
      </div>
      {performRedirect()}
    </>
  );
};

export default HomePage;
