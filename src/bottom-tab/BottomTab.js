import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon, { Icons } from "./Icons";
import Colors from "./Colors";
import * as Animatable from "react-native-animatable";
import HomeScreen from "../screens/home/HomeScreen";
import StackScreen from "../screens/product-list/screen/StackScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileStack from "../screens/profile/ProfileStack";
import UnderConstructScreen from "../screens/chatting/UnderConstructScreen";
// import { StatusBar } from "react-native";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Feather,
    icon: "home",
    component: HomeScreen,
  },
  {
    route: "Inbox",
    label: "Inbox",
    type: Icons.AntDesign,
    icon: "message1",
    component: UnderConstructScreen,
  },
  {
    route: "Shop",
    label: "Shop",
    type: Icons.Feather,
    icon: "shopping-bag",
    component: StackScreen,
  },
  {
    route: "Cart",
    label: "Cart",
    type: Icons.AntDesign,
    icon: "shoppingcart",
    component: CartScreen,
  },
  {
    route: "Account",
    label: "Account",
    type: Icons.FontAwesome,
    icon: "user-circle-o",
    component: ProfileStack,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 7 },
  0.92: { translateY: -34 },
  1: { scale: 1.2, translateY: -10 },
};
const animate2 = {
  0: { scale: 1.2, translateY: -24 },
  1: { scale: 1, translateY: 7 },
};

const circle1 = {
  0: { scale: 0 },
  0.3: { scale: 0.9 },
  0.5: { scale: 0.2 },
  0.8: { scale: 0.7 },
  1: { scale: 1 },
};
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View ref={viewRef} duration={300} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    height: 50,
    position: "absolute",
    // bottom: 16,
    // right: 16,
    // left: 16,
    // borderRadius: 16,
  },
  btn: {
    width: 35,
    height: 35,
    borderRadius: 25,
    // borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.primary,
  },
});
