import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  LogBox,
} from "react-native";
import COLORS from "../const/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import furnitures from "../const/Furnitures";
import database from "@react-native-firebase/database";
const { width } = Dimensions.get("screen");

const ProductListScreen = ({ navigation }) => {
  const categoryItems = [
    { name: "All", iconName: "alpha-a-box-outline" },
    { name: "Chair", iconName: "seat-outline" },
    { name: "Table", iconName: "table-furniture" },
    { name: "Cupboard", iconName: "cupboard-outline" },
    { name: "Wardrobe", iconName: "wardrobe-outline" },
    { name: "Bed", iconName: "bed-queen-outline" },
    { name: "Other", iconName: "alpha-o-box-outline" },
  ];
  const [data, setData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const get = (type) => {
    database()
      .ref("products/")
      .on("value", function (snapshot) {
        let array = [];
        let populars = [];
        let tops = [];
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (type == "" || type == "All" || type == childData.type) {
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
            if (tops.length < 10 && childData.popular) {
              tops.push({
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
          }
        });
        setData(array);
        // console.log(data);
        setPopularData(populars);
        setTopData(tops);
      });
  };
  useEffect(() => {
    get("");
    // console.log(data)
    return () => {
      setData([]);
      setPopularData([]);
      setTopData([]);
    };
  }, []);

  const ListCategories = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={style.categoriesContainer}>
          {categoryItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => {
                setSelectedCategoryIndex(index);
                get(item.name);
              }}
            >
              <View
                style={[
                  style.categoryItemBtn,
                  {
                    backgroundColor:
                      selectedCategoryIndex == index
                        ? COLORS.primary
                        : COLORS.light,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.iconName}
                  size={20}
                  color={
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary
                  }
                />
                <Text
                  style={[
                    style.categoryText,
                    {
                      color:
                        selectedCategoryIndex == index
                          ? COLORS.white
                          : COLORS.primary,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  const Card = ({ item, mgR }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("detail", {
            item: item,
          })
        }
      >
        <View style={[style.card, { marginRight: mgR }]}>
          <ImageBackground
            source={{ uri: item.imageUrl }}
            style={{ height: 120 * 1.05, width: "100%" }}
            imageStyle={{ borderRadius: 10 }}
          ></ImageBackground>

          <Text style={style.cardName}>{item.name}</Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={style.price}>{"$" + item.price}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="heart"
                color={COLORS.red}
                size={18}
              />
              <Text style={style.rating}>{item.like}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const PopularItemCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={style.popularItemCard}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("detail", {
            item: item,
          })
        }
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
          <Text style={style.cardName}>{item.name}</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={style.price}>{"$" + item.price}</Text>
            <View style={{ flexDirection: "row", marginLeft: 60 }}>
              <MaterialCommunityIcons
                name="heart"
                color={COLORS.red}
                size={18}
              />
              <Text style={style.rating}>{item.like}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        paddingBottom: 50,
        paddingTop: 40,
      }}
    >
      {/* Header container */}
      <View style={style.header}>
        <MaterialCommunityIcons
          name="sort-variant"
          size={28}
          color={COLORS.primary}
        />
        <TouchableOpacity>
          <MaterialCommunityIcons onPress={()=>navigation.navigate("Cart")}
            name="cart-outline"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={style.headerTitle}>Best Furniture For Your Home.</Text>

            {/* Input and sort button container */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <View style={style.searchInputContainer}>
                <MaterialCommunityIcons
                  name="magnify"
                  color={COLORS.grey}
                  size={25}
                />
                <TextInput placeholder="Search" />
              </View>

              <View style={style.sortBtn}>
                <MaterialCommunityIcons
                  name="tune"
                  color={COLORS.white}
                  size={25}
                />
              </View>
            </View>

            <Text style={style.title}>Categories</Text>
            <ListCategories />

            <Text style={style.title}>Top Furniture</Text>

            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10 }}
              data={topData}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Card item={item} mgR={15} />}
            />

            <Text style={style.title}>Popular</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10 }}
              data={popularData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PopularItemCard item={item} />}
            />

            <Text style={style.title}>All Products</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
              numColumns={2}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Card item={item} mgR={0} />}
            />
          </>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    width: "55%",
    lineHeight: 30,
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  sortBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  categoriesContainer: {
    flexDirection: "row",
    padding: 20,
  },
  categoryItemBtn: {
    flexDirection: "row",
    backgroundColor: COLORS.light,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    alignItems: "center",
    marginRight: 10,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.primary,
    marginLeft: 5,
  },
  card: {
    height: 190 * 1.05,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: (width / 2.5) * 1.05,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  cardName: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  price: { fontWeight: "bold", color: COLORS.primary, fontSize: 12 },
  rating: {
    fontWeight: "bold",
    color: COLORS.primary,
    fontSize: 12,
    marginLeft: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", paddingHorizontal: 20 },
  iconContainer: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.white,
    position: "absolute",
    elevation: 2,
    right: 10,
    top: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
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
export default ProductListScreen;
