import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

interface Game {
  id: string;
  background_image: string;
  name: string;
  released: string;
  rating: number;
  parent_platforms: { platform: { name: string; id: string } }[];
}

interface GamesListProps {
  genreId: string;
  searchResults: Game[]; // Accept search results as a prop
}

const GamesList: React.FC<GamesListProps> = ({ genreId, searchResults }) => {
  const API_KEY = process.env.EXPO_PUBLIC_RAWG_API_KEY;
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const url =
          genreId === "all"
            ? `https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`
            : `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}&page_size=10`;
        const response = await axios.get(url);
        setGames(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [genreId]);

  // Use search results if available, otherwise use genre-filtered games
  const displayedGames = searchResults.length > 0 ? searchResults : games;

  if (loading) {
    return <Text style={styles.loadingText}>Loading games...</Text>;
  }

  return (
    <View>
      {displayedGames.map((game) => (
        <Link key={game.id} href={`/game/${game.id.toString()}`} asChild>
          <TouchableOpacity style={styles.gameContainer}>
            <Image
              source={{ uri: game.background_image }}
              style={styles.gameImage}
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradientOverlay}
            />
            <Text style={styles.gameTitle}>{game.name}</Text>
            <Text style={styles.gameDetails}>
              Released: {new Date(game.released).toLocaleDateString()}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.gameDetails}>Rating: </Text>
              {renderStars(game.rating)}
              <Text style={styles.gameDetails}> ({game.rating}/5)</Text>
            </View>
            <View style={styles.platformsContainer}>
              {game.parent_platforms.map((platform) => (
                <View key={platform.platform.id} style={styles.platformLogo}>
                  {getPlatformLogo(platform.platform.name)}
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating - fullStars >= 0.5; // Check if there's a half star

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons key={`full-${i}`} name="star" size={16} color="gold" />
    );
  }

  // Add half star if needed
  if (halfStar) {
    stars.push(<Ionicons key="half" name="star-half" size={16} color="gold" />);
  }

  // Add empty stars to fill up to 5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="gold" />
    );
  }

  return stars;
};

const getPlatformLogo = (platformName: string) => {
  switch (platformName.toLowerCase()) {
    case "playstation":
      return <Ionicons name="logo-playstation" size={24} color="white" />;
    case "xbox":
      return <Ionicons name="logo-xbox" size={24} color="green" />;
    case "pc":
      return <Ionicons name="logo-windows" size={24} color="blue" />;
    case "ios":
    case "mac":
      return <Ionicons name="logo-apple" size={24} color="gray" />;
    case "android":
      return <Ionicons name="logo-android" size={24} color="green" />;
    default:
      return <Ionicons name="help-circle-outline" size={24} color="gray" />; // Default icon for unknown platforms
  }
};

const styles = StyleSheet.create({
  gameContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    marginHorizontal: 16,
  },
  gameImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  gameTitle: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Roboto-Bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    letterSpacing: 1.2,
  },
  gameDetails: {
    color: Colors.dark.text,
    fontSize: 10,
    marginTop: 5,
    fontFamily: "Roboto-Regular",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.8,
  },
  loadingText: {
    color: Colors.dark.text,
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Roboto-Italic",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  platformsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  platformLogo: {
    marginRight: 10,
  },
});

export default GamesList;
