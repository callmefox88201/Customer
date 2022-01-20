import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import database from "@react-native-firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../const/Colors";
import { AuthContext } from "../../first_navigation/AuthProvider";
const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [likeNo, setLikeNo] = useState(item.like);
  const [count, setCount] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const [storageQuantity, setStorageQuantity] = useState(item.storageQuantity);
  const { user, setUser } = useContext(AuthContext);

  const addToCart = () => {
    let newPostRef = database().ref("carts/" + user.uid + item.id);
    newPostRef.set({
      count: count,
      imageUrl: item.imageUrl,
      name: item.name,
      type: item.type,
      price: item.price,
      like: item.like,
      popular: item.popular,
      storageQuantity: item.storageQuantity,
      description: item.description,
    });
  };

  const deleteFromCart = () => {
    database()
      .ref("carts/" + user.uid + item.id)
      .set(null);
  };

  const checkUserLike = () => {
    database()
      .ref("likes/" + item.id)
      .on("value", function (snapshot) {
        if (snapshot.hasChild(user.uid)) {
          setUserLike(true);
        } else {
          setUserLike(false);
        }
      });
  };

  const setProductUserLike = async () => {
    if (userLike) {
      await database().ref("likes/").child(item.id).child(user.uid).set(null);
      database()
        .ref("products/")
        .child(item.id)
        .update({
          id: item.key,
          imageUrl: item.imageUrl,
          name: item.name,
          type: item.type,
          price: item.price,
          like: likeNo - 1,
          popular: item.popular,
          storageQuantity: item.storageQuantity,
          description: item.description,
        });
    } else {
      database()
        .ref("likes/" + item.id)
        .child(user.uid)
        .set({ uid: user.uid });
      database()
        .ref("products/" + item.id)
        .set({
          id: item.key,
          imageUrl: item.imageUrl,
          name: item.name,
          type: item.type,
          price: item.price,
          like: likeNo + 1,
          popular: item.popular,
          storageQuantity: item.storageQuantity,
          description: item.description,
        });
    }
    setUserLike(!userLike);
  };
  useEffect(() => {
    database()
      .ref("products/" + item.id)
      .on("value", function (snapshot) {
        let snapshotData = snapshot.val();
        setLikeNo(snapshotData.like);
        setStorageQuantity(snapshotData.storageQuantity);
      });
    checkUserLike();
    database()
      .ref("carts/" + user.uid)
      .on("value", function (snapshot) {
        if (snapshot.hasChild(item.id)) {
          setCount(snapshot.child(item.id).val().count);
        } else {
          setCount(0);
        }
      });

    return () => {
      setLikeNo(0);
      setUserLike(false);
      setCount(0);
      setProductUserLike(false);
      setStorageQuantity(0);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingBottom: 50,
        paddingTop: 40,
      }}
    >
      <View style={style.header}>
        <TouchableOpacity
          style={style.headerBtn}
          onPress={() => navigation.navigate("list")}
        >
          <MaterialCommunityIcons name="chevron-left" size={25} />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Details</Text>
        <TouchableOpacity
          style={style.headerBtn}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={25}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          style={style.backgroundImage}
          source={{ uri: item.imageUrl }}
        >
          <View
            style={{
              height: 60,
              width: 70,
              backgroundColor: COLORS.primary,
              position: "absolute",
              borderTopLeftRadius: 15,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <MaterialCommunityIcons
                name="heart"
                color={COLORS.red}
                size={18}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: COLORS.white,
                  fontWeight: "bold",
                  marginLeft: 4,
                }}
              >
                {likeNo}
              </Text>
            </View>
            <Text
              style={{ fontSize: 9, color: COLORS.white, fontWeight: "bold" }}
            >
              250 Reviews
            </Text>
          </View>
        </ImageBackground>

        <View style={style.detailsContainer}>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: COLORS.primary }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontWeight: "bold",
              fontSize: 16,
              color: COLORS.primary,
            }}
          >
            Description
          </Text>
          <Text style={{ color: COLORS.dark, fontSize: 12, lineHeight: 20 }}>
            {item.description}
          </Text>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: COLORS.yellow, fontSize: 22, fontWeight: "bold" }}
            >
              {"$" + item.price}
            </Text>
            <View style={style.quantityContainer}>
              <TouchableOpacity
                style={style.quantityBtn}
                onPress={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  } else {
                    setCount(0);
                    deleteFromCart();
                  }
                }}
              >
                <MaterialCommunityIcons name="minus" size={20} />
              </TouchableOpacity>
              <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                {count}
              </Text>
              <TouchableOpacity
                style={style.quantityBtn}
                onPress={() => {
                  if (count < storageQuantity && count < 99) {
                    setCount(count + 1);
                  }
                }}
              >
                <MaterialCommunityIcons name="plus" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                height: 50,
                width: 50,
                elevation: 7,
                marginRight: 30,
                borderRadius: 25,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setProductUserLike();
              }}
            >
              <MaterialCommunityIcons
                name="heart"
                size={28}
                color={userLike ? COLORS.red : COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.addToCartBtn}
              activeOpacity={0.8}
              onPress={() => {
                if (count > 0) {
                  addToCart();
                } else {
                  deleteFromCart();
                }
              }}
            >
              <Text style={{ color: COLORS.white }}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const style = StyleSheet.create({
  backgroundImage: {
    marginHorizontal: 20,
    height: 300,
    borderRadius: 15,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingTag: {
    height: 30,
    width: 35,
    backgroundColor: COLORS.blue,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartBtn: {
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    flexDirection: "row",
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  quantityBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    height: 35,
    width: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default DetailScreen;
