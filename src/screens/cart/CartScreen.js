import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
import { AuthContext } from "../first_navigation/AuthProvider";
import COLORS from "../product-list/const/Colors";
const { width } = Dimensions.get("screen");

export default function CartScreen({ navigation, route }) {
  const { user, setUser } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);

  const getCartProducts = () => {
    database()
      .ref("carts/")
      .on("value", function (snapshot) {
        let array = [];
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          var k = childSnapshot.key;
          if (k.indexOf(user.uid) >= 0) {
            array.push({
              id: k.substring(user.uid.length),
              count: childData.count,
              imageUrl: childData.imageUrl,
              name: childData.name,
              type: childData.type,
              price: childData.price,
              like: childData.like,
              popular: childData.popular,
              storageQuantity: childData.storageQuantity,
              description: childData.description,
            });
          }
        });
        setCarts(array);
      });
  };
  const subtract = (item) => {
    let count = item.count - 1;
    if (count > 0) {
      let postRef = database().ref("carts/" + user.uid + item.id);
      postRef.set({
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
    } else {
      database()
        .ref("carts/" + user.uid + item.id)
        .set(null);
    }
  };

  const add = (item) => {
    console.log(item.storageQuantity);
    console.log(item.count);
    if (item.count < item.storageQuantity) {
      let postRef = database().ref("carts/" + user.uid + item.id);
      postRef.set({
        count: item.count + 1,
        imageUrl: item.imageUrl,
        name: item.name,
        type: item.type,
        price: item.price,
        like: item.like,
        popular: item.popular,
        storageQuantity: item.storageQuantity,
        description: item.description,
      });
    } else {
      console.log("?");
    }
  };

  React.useEffect(() => {
    getCartProducts();
    return () => {
      setCarts([]);
      // setLoad(false);
      // getDataInfo();
      // getCartProducts();
    };
  }, []);

  const CartButton = ({ title, onPress = () => {} }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.cardButton}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const CartCard = ({ item }) => {
    return (
      <View style={styles.cartCard}>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ height: 80, width: 80 }}
        />
        <View
          style={{ height: 100, marginLeft: 10, paddingVertical: 20, flex: 1 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
          <Text style={{ fontSize: 14, color: "grey" }}>{item.type}</Text>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            ${item.price}
          </Text>
        </View>
        <View style={{ marginRight: 20, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.count}</Text>
          <View style={styles.actionBtn}>
            <TouchableOpacity
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                subtract(item);
              }}
            >
              <MaterialIcons name="remove" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                add(item);
              }}
            >
              <MaterialIcons name="add" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const PopularItemCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.popularItemCard}
        activeOpacity={0.8}
        // onPress={() =>
        //   navigation.navigate("detail", {
        //     item: item,
        //   })
        // }
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: 100,
            height: "100%",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            marginRight: 10,
          }}
        />
        <View style={{ paddingVertical: 15, justifyContent: "center" }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              color: COLORS.primary,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.primary,
                fontSize: 12,
              }}
            >
              {"$" + item.price}
            </Text>
            <View style={{ flexDirection: "row", marginLeft: 60 }}>
              <MaterialCommunityIcons
                name="heart"
                color={COLORS.red}
                size={18}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.primary,
                  fontSize: 12,
                  marginLeft: 3,
                }}
              >
                {item.like}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginLeft: 130,
          }}
        >
          Cart
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10 }}
        data={carts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Total Price
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>$0</Text>
            </View>
            <View style={{ marginHorizontal: 30 }}>
              <CartButton title="CHECKOUT" />
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    paddingTop: 40,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 100,
    height: 30,
    backgroundColor: "#637aff",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  cardButton: {
    backgroundColor: "#F9813A",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  popularItemCard: {
    height: 90,
    width: width - 100,
    backgroundColor: COLORS.white,
    elevation: 10,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 10,
    flexDirection: "row",
  },
});
