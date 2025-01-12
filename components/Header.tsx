import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Text style={styles.name}>John Doe</Text>
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
