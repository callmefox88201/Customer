import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import EditProfileScreen from "./EditProfile";

const Stack = createNativeStackNavigator();
export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Editprofile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
