import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/background.jpg")}
        style={styles.image}
      ></Image>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignupScreen")}
        style={[styles.login, { left: -screenWidth * 0.2 }]}
      >
        <Text style={[styles.loginText, { marginEnd: screenWidth * 0.19 }]}>
          SIGN UP
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={[
          styles.login,
          { left: -screenWidth * 0.3, marginBottom: screenHeight * 0.02 },
        ]}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.welcome}>Find the best Furniture</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  login: {
    width: screenWidth * 0.8,
    height: screenHeight / 14,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: screenHeight * 0.1,
    backgroundColor: "white",
  },
  loginText: {
    fontSize: 24,
    fontFamily: "BeVietnamPro-Regular",
    color: "black",
    marginEnd: screenWidth * 0.16,
    marginLeft: 0.3,
  },
  welcome: {
    fontSize: 60,
    color: "white",
    marginLeft: 50,
    textAlign: "left",
    fontFamily: "DancingScript-Bold",
    top: screenHeight * 0.3,
  },
});
