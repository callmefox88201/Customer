import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../first_navigation/AuthProvider";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useContext(AuthContext);

  const validate = () => {
    if (email.trim() === "") {
      alert("Please enter the email!");
    } else if (password.trim() === "") {
      alert("Please enter the password!");
    } else if (password.trim().length < 8) {
      alert("Password's minimum length is 8!");
    } else if (confirmPassword.trim() === "") {
      alert("Please enter the confirm password!");
    } else if (password === confirmPassword) {
      register(email, password);
    } else {
      alert("Recheck the password!");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Login.png")}
        style={styles.image}
      ></Image>
      <Text
        style={{
          color: "#D13301",
          fontSize: 35,
          alignSelf: "flex-end",
          marginRight: 30,
          top: 40,
        }}
      >
        Sign up
      </Text>
      <View
        style={{
          marginTop: 80,
          flexDirection: "row",
          left: -15,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.3746, 0.9529]}
          style={[
            styles.login,
            {
              position: "absolute",
            },
          ]}
          colors={["rgba(208, 37, 0, 0.72)", "rgba(238, 158, 4, 0.72)"]}
          useAngle={true}
          angle={76.45}
          angleCenter={{ x: 0.5, y: 0.5 }}
        ></LinearGradient>
        <TextInput
          style={[
            styles.login,
            {
              backgroundColor: "#FFF",
              width: screenWidth * 0.65,
              textAlign: "center",
              fontSize: 20,
            },
          ]}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <MaterialIcons
          name="email"
          size={32}
          color="white"
          style={{
            left: 8,
            alignSelf: "center",
          }}
        />
      </View>
      <View
        style={{ marginVertical: 20, flexDirection: "row-reverse", right: -10 }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.3746, 0.9529]}
          style={[styles.login, { position: "absolute", alignSelf: "center" }]}
          colors={["rgba(208, 37, 0, 0.72)", "rgba(238, 158, 4, 0.72)"]}
          useAngle={true}
          angle={76.45}
          angleCenter={{ x: 0.5, y: 0.5 }}
        ></LinearGradient>
        <TextInput
          style={[
            styles.login,
            {
              backgroundColor: "#FFF",
              width: screenWidth * 0.65,
              textAlign: "center",
              fontSize: 20,
            },
          ]}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          maxLength={15}
        />
        <FontAwesome5
          name="key"
          size={31}
          color="white"
          style={{
            left: 8,
            alignSelf: "center",
          }}
        />
      </View>
      <View style={{ flexDirection: "row-reverse", right: -10 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.3746, 0.9529]}
          style={[styles.login, { position: "absolute", alignSelf: "center" }]}
          colors={["rgba(208, 37, 0, 0.72)", "rgba(238, 158, 4, 0.72)"]}
          useAngle={true}
          angle={76.45}
          angleCenter={{ x: 0.5, y: 0.5 }}
        ></LinearGradient>
        <TextInput
          style={[
            styles.login,
            {
              backgroundColor: "#FFF",
              width: screenWidth * 0.65,
              textAlign: "center",
              fontSize: 20,
            },
          ]}
          onChangeText={(password) => setConfirmPassword(password)}
          placeholder="Confirm password"
          secureTextEntry={true}
          maxLength={15}
        />
        <FontAwesome5
          name="key"
          size={31}
          color="white"
          style={{
            left: 8,
            alignSelf: "center",
          }}
        />
      </View>
      <TouchableOpacity
        style={{ top: screenHeight * 0.05 }}
        onPress={() => validate()}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.3746, 0.9529]}
          style={styles.login}
          colors={["rgba(208, 37, 0, 0.72)", "rgba(238, 158, 4, 0.72)"]}
          useAngle={true}
          angle={76.45}
          angleCenter={{ x: 0.5, y: 0.5 }}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", top: screenHeight * 0.1 }}>
        <Text style={{ fontSize: 18 }}>You had an account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={{ fontSize: 18, marginLeft: 10, color: "red" }}>
            Login here
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
  },
  login: {
    width: screenWidth * 0.8,
    height: screenHeight / 14,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "DancingScript-Medium",
  },
});
