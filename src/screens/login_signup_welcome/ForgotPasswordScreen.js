import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={{ paddingTop: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 25, marginLeft: 55 }}>
          Forgot Password
        </Text>
      </View>
      <Text>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    // backgroundColor: COLORS.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
