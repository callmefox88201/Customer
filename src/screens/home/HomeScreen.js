import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import database from "@react-native-firebase/database";
const { width } = Dimensions.get("screen");

const DATA_CATEGORIES = [
  {
    id: "lv",
    image: require("../../assets/images/home/img_livingroom.png"),
    nameRoom: "Living Room",
  },
  {
    id: "br",
    image: require("../../assets/images/home/img_bedroom.png"),
    nameRoom: "Bedroom",
  },
  {
    id: "kr",
    image: require("../../assets/images/home/img_kitchenroom.png"),
    nameRoom: "Kitchen Room",
  },
  {
    id: "bar",
    image: require("../../assets/images/home/img_bathroom.png"),
    nameRoom: "Bathroom",
  },
  {
    id: "sr",
    image: require("../../assets/images/home/img_studyroom.png"),
    nameRoom: "Study Room",
  },
];

const DATA_OFFERS = [
  {
    id: "img1",
    image: require("../../assets/images/home/img_newoffers.png"),
    content: "New offers",
  },
  {
    id: "img2",
    image: require("../../assets/images/home/img_newoffers1.png"),
    content: "Big Sales",
  },
  {
    id: "img3",
    image: require("../../assets/images/home/img_newoffers2.png"),
    content: "New Year Comming",
  },
  {
    id: "img4",
    image: require("../../assets/images/home/img_newoffers3.png"),
    content: "2.2",
  },
];

const DATA_SALE = [
  {
    id: "sal1",
    image: require("../../assets/images/home/img_bigSale.png"),
  },
  {
    id: "sal2",
    image: require("../../assets/images/home/img_bigSale1.png"),
  },
  {
    id: "sal3",
    image: require("../../assets/images/home/img_bigSale2.png"),
  },
];

const ItemRoom = ({ image, nameRoom }) => (
  <View style={styles.categories}>
    <Image style={styles.img_categories} source={image} />
    <Text style={styles.txt_categories}>{nameRoom}</Text>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const get = () => {
    database()
      .ref("products/")
      .on("value", function (snapshot) {
        let array = [];
        let populars = [];
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
          if (childData.popular) {
            populars.push({
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
          }
        });
        setData(array);
        // console.log(data);
        setPopularData(populars);
      });
  };
  const [popularData, setPopularData] = useState([]);
  useEffect(() => {
    get();
    return () => {
      setData([]);
      setPopularData([]);
    };
  }, []);

  const renderItemRoom = ({ item }) => (
    <ItemRoom image={item.image} nameRoom={item.nameRoom} />
  );

  const [active, setactive] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.view_header}>
        <MaterialCommunityIcons name="sort-variant" size={28} color="#122636" />

        <View style={styles.viewsearch}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#122636",
            }}
          >
            Home
          </Text>
        </View>
      </View>

      <ScrollView style={{ marginBottom: 55 }}>
        <SwiperFlatList autoplay autoplayDelay={5} autoplayLoop>
          {DATA_OFFERS.map((item, index) => (
            <View key={index} style={styles.view_new_offers}>
              <Image source={item["image"]} style={styles.view_new_offers} />
              <Text style={styles.txt_new_offers}>{item["content"]}</Text>
            </View>
          ))}
        </SwiperFlatList>

        <Text style={styles.txt_title_content}>Popular</Text>
        <FlatList
          data={popularData}
          horizontal
          style={{ paddingLeft: 20 }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                height: 190 * 1.05,
                backgroundColor: "#fff",
                elevation: 10,
                width: (width / 2.5) * 1.05,
                padding: 10,
                marginVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("Shop", {
                  screen: "detail",
                  params: { item: item },
                });
              }}
            >
              <ImageBackground
                source={{ uri: item.imageUrl }}
                style={{ height: 120 * 1.05, width: "100%" }}
                imageStyle={{ borderRadius: 10 }}
              ></ImageBackground>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  color: "#122636",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#122636",
                    fontSize: 16,
                  }}
                >
                  {"$" + item.price}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={styles.view_sale}>
          <ScrollView
            pagingEnabled
            horizontal
            style={{ width: Dimensions.get("window").width }}
            showsHorizontalScrollIndicator={false}
          >
            {DATA_SALE.map((item, index) => (
              <Image
                style={styles.view_sale}
                key={index}
                source={item["image"]}
              />
            ))}
          </ScrollView>
        </View>

        <Text style={styles.txt_title_content}>Categories</Text>
        <FlatList
          data={DATA_CATEGORIES}
          renderItem={renderItemRoom}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#e0e0e0",
    paddingTop: 40,
  },
  view_header: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
  },
  viewsearch: {
    width: "60%",
    height: 40,
    marginTop: 6,
  },
  search: {
    position: "absolute",
    right: 0,
    margin: 8,
  },
  textInput: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingEnd: 40,
  },

  item: {
    width: 150,
    height: 200,
    justifyContent: "center",
    margin: 16,
    alignItems: "center",
    elevation: 3,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  image_product: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  txt_product: {
    fontWeight: "700",
    color: "#001064",
    fontSize: 16,
    paddingHorizontal: 8,
    marginTop: 30,
  },

  txt_new_offers: {
    position: "absolute",
    fontSize: 32,
    color: "#ff4",
    fontWeight: "bold",
  },
  view_new_offers: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: 180,
    marginBottom: 16,
    resizeMode: "cover",
  },
  view_sale: {
    width: Dimensions.get("window").width,
    height: 180,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  txt_title_content: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 16,
    marginStart: 16,
  },
  categories: {
    width: 250,
    height: 150,
    alignItems: "stretch",
    justifyContent: "flex-end",
    margin: 16,
    elevation: 3,
  },
  img_categories: {
    width: 250,
    height: 150,
    borderRadius: 15,
  },
  txt_categories: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginStart: 8,
    marginBottom: 4,
    position: "absolute",
  },

  txt_dot: {
    color: "#e0e0e0",
    margin: 4,
  },
  txt_Active_dot: {
    color: "#f57c00",
    margin: 4,
  },
});
