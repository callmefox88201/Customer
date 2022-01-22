import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ForgotPassword2({ navigation }) {
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
      <Image
        source={require("../../assets/images/EmailSend.png")}
        style={{
          marginTop: 50,
          width: "100%",
          height: 200,
        }}
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 35,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        Check your mail
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginHorizontal: 20,
          marginTop: 20,
          color: "grey",
          textAlign: "center",
        }}
      >
        We have sent a password recover instructions to your email.
      </Text>
      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.panelButtonTitle}>Login</Text>
      </TouchableOpacity>
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
  commandButton: {
    margin: 25,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#122636",
    alignItems: "center",
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
