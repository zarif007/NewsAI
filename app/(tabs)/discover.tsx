import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Discover = () => {
  const API_KEY = process.env.EXPO_PUBLIC_RAWG_API_KEY;
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        setGenres(genresResponse.data.results);

        const platformsResponse = await axios.get(
          `https://api.rawg.io/api/platforms?key=${API_KEY}`
        );
        setPlatforms(platformsResponse.data.results);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        {/* Genres Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.grid}>
            {genres
              .slice(0, showAllGenres ? genres.length : 9)
              .map((item: any) => (
                <TouchableOpacity key={item.id} style={styles.button}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            {genres.length > 9 && (
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setShowAllGenres(!showAllGenres)}
              >
                <Text style={styles.moreButtonText}>
                  {showAllGenres ? "Show Less" : "More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Platforms Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platforms</Text>
          <View style={styles.grid}>
            {platforms
              .slice(0, showAllPlatforms ? platforms.length : 9)
              .map((item: any) => (
                <TouchableOpacity key={item.id} style={styles.button}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            {platforms.length > 9 && (
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setShowAllPlatforms(!showAllPlatforms)}
              >
                <Text style={styles.moreButtonText}>
                  {showAllPlatforms ? "Show Less" : "More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%", // Two buttons per row with some spacing
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  moreButton: {
    width: "48%", // Same width as other buttons
    backgroundColor: "#444", // Slightly different color for the "More" button
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  moreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingText: {
    fontSize: 18,
    color: "white",
  },
});
