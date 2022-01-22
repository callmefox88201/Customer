import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../first_navigation/AuthProvider";
import { RadioButton } from "react-native-paper";
import database from "@react-native-firebase/database";

export default function PaymentScreen({ navigation, route }) {
  const { user, setUser } = useContext(AuthContext);
  const { amount } = route.params;
  const [checked1, setChecked1] = useState("first");
  const [checked2, setChecked2] = useState("first");
  const [profile, setProfile] = useState({
    name: "",
    nickname: "",
    address: "",
    phoneNumber: "",
    email: "",
    image: "temp",
  });

  const removeCart = () => {
    database()
      .ref("carts/" + user.uid)
      .set(null);
  };

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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("CartScreen")}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 26, marginLeft: 100 }}>
          Details
        </Text>
      </View>
      <View style={{ flex: 80, paddingVertical: 22 }}>
        <ScrollView
          style={{
            paddingHorizontal: 15,
          }}
        >
          <View style={{ magrin: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Shipping to
            </Text>
          </View>

          <View style={styles.product}>
            <View style={styles.pr}>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <RadioButton
                  style={styles.radiobutton}
                  value="first"
                  status={checked1 === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked1("first")}
                  color="#DF0029"
                />
              </View>
              <View style={{ flex: 60 }}>
                <View
                  style={{
                    flex: 40,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.txt}>Home</Text>
                </View>
                <View
                  style={{
                    flex: 35,
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.price}>{profile.phoneNumber}</Text>
                </View>
                <View
                  style={{
                    flex: 35,
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.price}>{profile.address}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="pencil" size={24} color="black" />
              </View>
            </View>
          </View>
          <View style={styles.product}>
            <View style={styles.pr}>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <RadioButton
                  style={styles.radiobutton}
                  value="second"
                  status={checked1 === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked1("second")}
                  color="#DF0029"
                />
              </View>
              <View style={{ flex: 60 }}>
                <View
                  style={{
                    flex: 40,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.txt}>Office</Text>
                </View>
                <View
                  style={{
                    flex: 35,
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.price}>{profile.phoneNumber}</Text>
                </View>
                <View
                  style={{
                    flex: 35,
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.price}>{profile.address}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="pencil" size={24} color="black" />
              </View>
            </View>
          </View>
          <View style={{ magrin: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}>
              Payment method
            </Text>
          </View>

          <View style={styles.paymentmethod}>
            <View style={styles.pr}>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../../assets/images/cart/Card.jpg")}
                ></Image>
              </View>

              <View style={{ flex: 60 }}>
                <View
                  style={{
                    flex: 70,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.txts}>Cash</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioButton
                  style={styles.radiobutton}
                  value="first"
                  status={checked2 === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked2("first")}
                  color="#DF0029"
                />
              </View>
            </View>
          </View>

          <View style={styles.paymentmethod}>
            <View style={styles.pr}>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../../assets/images/cart/AccountWallet.jpg")}
                ></Image>
              </View>

              <View style={{ flex: 60 }}>
                <View
                  style={{
                    flex: 70,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.txts}>Account Wallet</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioButton
                  style={styles.radiobutton}
                  value="second"
                  status={checked2 === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked2("second")}
                  color="#DF0029"
                />
              </View>
            </View>
          </View>
          <View style={styles.paymentmethod}>
            <View style={styles.pr}>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../../assets/images/cart/Google.jpg")}
                ></Image>
              </View>

              <View style={{ flex: 60 }}>
                <View
                  style={{
                    flex: 70,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.txts}>Google Pay</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioButton
                  style={styles.radiobutton}
                  value="thỉrd"
                  status={checked2 === "third" ? "checked" : "unchecked"}
                  onPress={() => setChecked2("third")}
                  color="#DF0029"
                />
              </View>
            </View>
          </View>
          <View style={styles.paymentmethod}>
            <View style={styles.pr}>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../../assets/images/cart/cash.png")}
                ></Image>
              </View>

              <View style={{ flex: 60 }}>
                <View
                  style={{
                    flex: 70,
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.txts}>Credit Card</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RadioButton
                  style={styles.radiobutton}
                  value="fourth"
                  status={checked2 === "fourth" ? "checked" : "unchecked"}
                  onPress={() => setChecked2("fourth")}
                  color="#DF0029"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 32,
          borderRadius: 30,
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 20,
          paddingVertical: 15,
        }}
      >
        <View style={{ flex: 10, flexDirection: "row" }}>
          <View
            style={{
              flex: 50,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textx}>Shipping fee</Text>
          </View>
          <View
            style={{
              flex: 50,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textx}>$19.99</Text>
          </View>
        </View>
        <View style={{ flex: 10, flexDirection: "row" }}>
          <View
            style={{
              flex: 50,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textx}>Sub total</Text>
          </View>
          <View
            style={{
              flex: 50,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={styles.textx}>{amount}</Text>
          </View>
        </View>
        <View style={{ flex: 12, flexDirection: "row" }}>
          <View
            style={{
              flex: 50,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.texts}>Total</Text>
          </View>
          <View
            style={{
              flex: 50,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={styles.texts}>{19.99 + amount}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 30,
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            style={styles.usrBtn}
            onPress={() => {
              navigation.navigate("Home");
              removeCart();
              alert("payment success");
            }}
          >
            <Text style={styles.usrTxt}>Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#E8E8E8",
    // alignItems: "center",
    // justifyContent: "center",
    // flexDirection: "column",
    paddingTop: 40,
  },
  product: {
    width: "93%",
    height: Dimensions.get("window").height / 7,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 14,
    borderRadius: 20,
    backgroundColor: "#F8F8FF",
    shadowColor: "#A0A0A0",
  },
  paymentmethod: {
    width: "93%",
    height: Dimensions.get("window").height / 15,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 14,
    borderRadius: 20,
    backgroundColor: "#F8F8FF",
    shadowColor: "#A0A0A0",
  },
  pr: {
    flex: 1,
    flexDirection: "row",
    margin: 8,
  },

  img: {
    flex: 1,
    width: 55,
    height: 55,
    borderRadius: 15,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
  },
  price: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  quantity: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  radiobutton: {},
  texts: {
    fontSize: 22,
    fontWeight: "bold",
  },
  textx: {
    fontSize: 18,
  },
  usrBtn: {
    backgroundColor: "#122636",
    padding: 15,
    width: "100%",
    borderRadius: 15,
  },
  usrTxt: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  txts: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
