import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
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
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  // const [cartIds, setCartIds] = useState([])
  const [count, setCount] = useState(0);
  // let carts = [];

  const getCartProductIds = () => {
    database()
      .ref("carts/" + user.uid + "/")
      .on("value", function (snapshot) {
        let array = [];
        snapshot.forEach(function (childSnapshot) {
          let childData = childSnapshot.val();
          let k = childSnapshot.key;
          array.push({
            id: k,
            count: childData.count,
          });
        });
        setCarts(array);
      });
  };

  const getProducts = () => {
    database()
      .ref("products/")
      .on("value", function (snapshot) {
        let array = [];
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          array.push({
            id: childSnapshot.key,
            imageUrl: childData.imageUrl,
            name: childData.name,
            type: childData.type,
            price: childData.price,
            like: childData.like,
            popular: childData.popular,
            storageQuantity: childData.storageQuantity,
            description: childData.description,
          });
        });
        setProducts(array);
      });
  };

  const subtract = (id) => {
    let count = getCount(id);
    if (count > 1) {
      let postRef = database().ref("carts/" + user.uid + "/" + id);
      postRef.set({
        count: count - 1,
      });
      // item.count -= 1;
    } else {
      database()
        .ref("carts/" + user.uid + "/" + id)
        .set(null);
    }
  };

  const add = (item) => {
    let count = getCount(item.id);
    if (count < item.storageQuantity) {
      let postRef = database().ref("carts/" + user.uid + "/" + item.id);
      postRef.set({
        count: count + 1,
      });
    }
  };

  useEffect(() => {
    getCartProductIds();
    getProducts();
    return () => {
      setCarts([]);
      setProducts([]);
    };
  }, []);

  const getCount = (id) => {
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id === id) {
        return carts[i].count;
      }
    }
    return -1;
  };

  const getTotalAmount = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      let c = getCount(products[i].id);
      if (c > -1) total += products[i].price * c;
    }
    return total;
  };

  const CartButton = ({ title }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <View style={styles.cardButton}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const CartCard = ({ item }) => {
    let count = getCount(item.id);
    if (count < 0) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.cartCard}
        onPress={() => {
          navigation.navigate("Shop", {
            screen: "detail",
            params: { item: item },
          });
        }}
      >
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

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => {
              subtract(item.id);
            }}
          >
            <MaterialCommunityIcons name="minus" size={20} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {getCount(item.id)}
          </Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => {
              add(item);
            }}
          >
            <MaterialCommunityIcons name="plus" size={20} />
          </TouchableOpacity>
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
        data={products}
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
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {"$" + getTotalAmount()}
              </Text>
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
    backgroundColor: "#122636",
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
  quantityContainer: {
    height: 35,
    width: 100,
    backgroundColor: "#122636",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  quantityBtn: {
    height: 25,
    width: 25,
    backgroundColor: "white",
    borderRadius: 7,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
