import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./ProductListScreen";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "./DetailScreens";

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <Stack.Navigator
      initialRouteName="list"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name="list" component={ProductListScreen} />
      <Stack.Screen name="detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
