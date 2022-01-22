import React, { useContext, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Title, Caption, Text, TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../first_navigation/AuthProvider";
import database from "@react-native-firebase/database";

export default Profile = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const [image, setImage] = useState("temp");
  const [profile, setProfile] = useState({
    name: "",
    nickname: "",
    address: "",
    phoneNumber: "",
    email: "",
    image: "temp",
  });

  const getProfile = () => {
    database()
      .ref("users/")
      .on("value", function (snapshot) {
        if (snapshot.hasChild(user.uid)) {
          database()
            .ref("users/" + user.uid)
            .on("value", function (childSnapshot) {
              let childData = childSnapshot.val();
              let p = {
                name: childData.name,
                nickname: childData.nickname,
                address: childData.address,
                phoneNumber: childData.phoneNumber,
                email: childData.email,
                image: childData.image,
              };
              setProfile(p);
              setImage(p.image);
            });
        } else {
          setProfile({
            name: "",
            nickname: "",
            address: "",
            phoneNumber: "",
            email: "",
            image: "temp",
          });
        }
      });
  };

  useEffect(() => {
    getProfile();
    // console.log(profile);
    // console.log(data)
    return () => {
      setProfile({
        name: "",
        nickname: "",
        address: "",
        phoneNumber: "",
        email: "",
        image: "temp",
      });
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <View
            style={{
              height: 100,
              width: 100,
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 50,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: image,
              }}
              style={{ height: 100, width: 100, borderRadius: 50 }}
              size={80}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {profile.name === "" ? "Your name" : profile.name}
            </Title>
            <Caption style={styles.caption}>
              {profile.nickname === ""
                ? "@Your nickname"
                : "@" + profile.nickname}
            </Caption>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              marginTop: 15,
              flexDirection: "row-reverse",
            }}
            onPress={() => {
              navigation.navigate("Editprofile", { profile: profile });
            }}
          >
            <FontAwesome5 name="user-edit" size={24} color={"gray"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            color="#777777"
            size={20}
          />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {profile.address === "" ? "Your address" : profile.address}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {profile.phoneNumber === ""
              ? "Your phone number"
              : profile.phoneNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {profile.email === "" ? "Your email" : profile.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>$0</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>0</Title>
          <Caption>Orders</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="heart-outline"
              color="#122636"
              size={25}
            />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="credit-card"
              color="#122636"
              size={25}
            />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.panelButtonTitle}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  userInfoSection: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 26,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  commandButton: {
    margin: 25,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#122636",
    alignItems: "center",
    marginTop: 10,
  },
});
