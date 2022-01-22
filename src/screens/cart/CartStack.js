import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "./CartScreen";
import PaymentScreen from "./PaymentScreen";

const Stack = createNativeStackNavigator();
export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
