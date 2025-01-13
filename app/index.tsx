import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import { router } from "expo-router";

const Home = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://e0.pxfuel.com/wallpapers/740/417/desktop-wallpaper-call-of-duty-modern-warfare-3-cod-mw3-video-game-ultra-thumbnail.jpg",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Level Up Your News</Text>
        <Text style={styles.subtitle}>
          AI-powered summaries. Real-time updates. Stay in the game.
        </Text>
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.btnText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
    width: "100%",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    fontFamily: "Arial", // Use a bold, modern font (replace with your custom font if available)
  },
  subtitle: {
    color: "white",
    width: "80%",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 32,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontFamily: "Arial", // Use a modern font
  },
  mainBtn: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#FF474C", // Vibrant red
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFA726", // Orange border for a gaming vibe
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8, // For Android
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase", // Uppercase text for a bold look
    letterSpacing: 1.5, // Spacing for a futuristic feel
  },
});
