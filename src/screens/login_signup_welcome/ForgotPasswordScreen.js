import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../first_navigation/AuthProvider";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useContext(AuthContext);
  return (
    <ScrollView style={{ paddingTop: 40 }}>
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
        source={require("../../assets/images/EmailInput.png")}
        style={{
          marginTop: 50,
          width: "100%",
          height: 200,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          marginLeft: 20,
          marginTop: 20,
          color: "grey",
        }}
      >
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginLeft: 20,
          marginTop: 20,
          color: "grey",
        }}
      >
        Email address
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          marginHorizontal: 20,
          borderRadius: 5,
          height: 40,
          borderColor: "grey",
          fontSize: 18,
        }}
        onChangeText={(email) => setEmail(email)}
      />
      <TouchableOpacity
        style={styles.commandButton}
        onPress={async () => {
          let e = await forgotPassword(email);
          if (e == true) {
            navigation.navigate("ForgotPassword2");
          } else {
            console.log(e);
            alert("Failed");
          }
        }}
      >
        <Text style={styles.panelButtonTitle}>Send Instructions</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
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
