import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        forgotPassword: async (email) => {
          let result = await auth()
            .sendPasswordResetEmail(email)
            .then(function () {
              return true;
            })
            .catch(function (e) {
              console.log(e);
              return false;
            });
          console.log(result);
          return result;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
