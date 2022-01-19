import React from "react";
import Routes from "./src/screens/first_navigation/Routes";
import { AuthProvider } from "./src/screens/first_navigation/AuthProvider";

export default () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
