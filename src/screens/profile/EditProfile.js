import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useTheme } from "react-native-paper";

import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import { AuthContext } from "../first_navigation/AuthProvider";
import storage from "@react-native-firebase/storage";

import ImagePicker from "react-native-image-crop-picker";
const EditProfileScreen = ({ navigation, route }) => {
  const { profile } = route.params;
  const [image, setImage] = useState(profile.image);
  const { colors } = useTheme();
  const { user, setUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(profile.name);
  const [address, setAddress] = useState(profile.address);
  const [nickname, setNickname] = useState(profile.nickname);
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
  const [email, setEmail] = useState(profile.email);

  const validate = () => {
    if (
      image == "temp" ||
      name == "" ||
      nickname == "" ||
      address == "" ||
      phoneNumber.length != 10 ||
      email == ""
    ) {
      return false;
    }
    return true;
  };

  const post = async () => {
    let uploadUri = image;
    setUploading(true);
    try {
      if (profile.image === "temp") {
        let firestoreRef = storage().ref("images/" + user.uid);
        await firestoreRef.putFile(uploadUri);
        uploadUri = await firestoreRef.getDownloadURL();
      } else if (uploadUri !== profile.image) {
        let firestoreRef = storage().ref("images/" + user.uid);
        await firestoreRef.delete();
        firestoreRef = storage().ref("images/" + user.uid);
        await firestoreRef.putFile(uploadUri);
        uploadUri = await firestoreRef.getDownloadURL();
      }
      let postRef = database().ref("users/" + user.uid);
      postRef.set({
        name: name,
        nickname: nickname,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        image: uploadUri,
      });
      setUploading(false);
      alert("done");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      const imageUri = image.path;
      setImage(imageUri);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialCommunityIcons name="chevron-left" size={25} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 22, marginLeft: 90 }}>
          Edit Profile
        </Text>
      </View>
      <View
        style={{
          margin: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => choosePhotoFromLibrary()}>
            <View
              style={{
                height: 150,
                width: 150,
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: 75,
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: image }}
                style={{ height: 150, width: 150 }}
                imageStyle={{ borderRadius: 75 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{ opacity: 0.0 }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Name"
            defaultValue={profile.name ? profile.name : null}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Nick Name"
            placeholderTextColor="#666666"
            defaultValue={profile.nickname ? profile.nickname : null}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(nickname) => setNickname(nickname)}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            defaultValue={profile.phoneNumber ? profile.phoneNumber : null}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            maxLength={10}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            defaultValue={profile.email ? profile.email : null}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color={colors.text}
            size={20}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            defaultValue={profile.address ? profile.address : null}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(address) => setAddress(address)}
          />
        </View>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            if (validate()) {
              post();
            } else {
              alert("Please enter full information");
            }
          }}
        >
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  commandButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#122636",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    // backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: "#05375a",
  },
  headerBtn: {
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
