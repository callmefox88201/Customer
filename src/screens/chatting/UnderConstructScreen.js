import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";

export default function UnderConstructScreen() {
  return (
    <View
      style={{
        paddingTop: 140,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#122636",
          fontFamily: "Inter-Bold",
        }}
      >
        OOPHS
      </Text>

      <Image
        source={require("../../assets/images/UnderConstruct.png")}
        style={{
          marginTop: 50,
          width: "100%",
          height: 200,
        }}
      />

      <Text
        style={{
          fontSize: 25,
          color: "#122636",
          marginTop: 100,
          fontFamily: "Roboto-MediumItalic",
        }}
      >
        We are fixing this page...
      </Text>
      <Text
        style={{
          fontSize: 25,
          color: "#122636",
          fontFamily: "Roboto-MediumItalic",
        }}
      >
        Please come back later
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}
