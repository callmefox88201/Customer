import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-community/async-storage";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import OnBoardScreen from "./OnBoardScreen";
import SignupScreen from "../login_signup_welcome/SignupScreen";
import LoginScreen from "../login_signup_welcome/LoginScreen";
import WelcomeScreen from "../login_signup_welcome/WelcomeScreen";
import ForgotPasswordScreen from "../login_signup_welcome/ForgotPasswordScreen";
import ForgotPassword2 from "../login_signup_welcome/ForgotPassword2";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [isFirstLauch, setIsFirstLauch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLauch(true);
      } else {
        setIsFirstLauch(false);
      }
    });
  }, []);

  let routeName;

  if (isFirstLauch == null) {
    return null;
  } else if (isFirstLauch == true) {
    routeName = "OnBoardScreen";
  } else {
    routeName = "WelcomeScreen";
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen
        name="OnBoardScreen"
        component={OnBoardScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ForgotPassword2"
        component={ForgotPassword2}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
