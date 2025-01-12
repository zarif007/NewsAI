import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Home = () => {
  return (
    <LinearGradient
      colors={[
        "#000000", // Pure black
        "#0A1525", // Very dark blue
        "#1F0808", // Very dark red
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 32 }}>
        Stay Updated
      </Text>
      <Text style={{ color: "white", width: "80%", textAlign: "center" }}>
        Get latest news of fast growing world with AI gen summarizer
      </Text>
      <TouchableOpacity
        style={styles.mainBtn}
        onPress={() => router.push("/(tabs)")}
      >
        <Text>Go to Home screen</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  mainBtn: {
    padding: 6,
    backgroundColor: "red",
    color: "white",
  },
});
