import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current; // For animation

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${process.env.EXPO_PUBLIC_RAWG_API_KEY}&page_size=10&ordering=-released`
        );
        setTrendingGames(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending games:", error);
        setLoading(false);
      }
    };

    fetchTrendingGames();
  }, []);

  // Handle press animation
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Render platform icons
  const renderPlatformIcons = (platforms: any) => {
    return platforms.map((platform: any) => (
      <View key={platform.platform.id} style={styles.platformIcon}>
        <Ionicons
          name={
            platform.platform.slug === "pc"
              ? "logo-windows"
              : platform.platform.slug === "playstation"
              ? "logo-playstation"
              : platform.platform.slug === "xbox"
              ? "logo-xbox"
              : "logo-android"
          }
          size={20}
          color="white"
        />
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading trending games...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Games</Text>
      <FlatList
        data={trendingGames}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/game/${item.id.toString()}`} asChild>
            <TouchableOpacity
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View
                style={[styles.gameCard, { transform: [{ scale: scaleAnim }] }]}
              >
                <Image
                  source={{ uri: item.background_image }}
                  style={styles.gameImage}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.gradientOverlay}
                />
                <View style={styles.gameInfo}>
                  <Text style={styles.gameName}>{item.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="gold" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <View style={styles.platformsContainer}>
                    {renderPlatformIcons(item.parent_platforms)}
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default TrendingGames;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: "Roboto-Bold", // Custom font
  },
  gameCard: {
    width: Dimensions.get("window").width * 0.6, // 60% of screen width
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android
  },
  gameImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  gameInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  gameName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold", // Custom font
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    color: "white",
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "Roboto-Regular", // Custom font
  },
  platformsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  platformIcon: {
    marginRight: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Roboto-Italic", // Custom font
  },
});
