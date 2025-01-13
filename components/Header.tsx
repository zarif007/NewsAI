import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIDo5bQBzNbYmXkbl1ZuY9GTjvt5xAgLx1g&s",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.name}>John Wick</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  textContainer: {
    flex: 1,
  },
  welcome: {
    fontSize: 14,
    color: "#666666",
  },
});
