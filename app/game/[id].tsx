import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import OpenAI from "openai";

const GameDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Get the game ID from the URL
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false); // Loading state for AI
  const [aiResponse, setAiResponse] = useState(""); // AI-generated response
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [showFullDescription, setShowFullDescription] = useState(false); // Show full description

  // Initialize OpenAI
  const openai = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  });

  // Fetch game details
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${process.env.EXPO_PUBLIC_RAWG_API_KEY}` // Replace with your API key
        );
        setGameDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  // Fetch AI-generated details
  const fetchAIDetails = async () => {
    setAiLoading(true);
    try {
      const prompt = `Provide a detailed strategy, tips, and insights for the game "${gameDetails.name}". Include key features, gameplay mechanics, and any notable strategies.`;
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });
      setAiResponse(
        response.choices[0].message.content || "No response from AI."
      );
    } catch (error) {
      console.error("Error fetching AI details:", error);
      setAiResponse("Failed to fetch AI-generated details.");
    } finally {
      setAiLoading(false);
    }
  };

  // Open AI modal
  const openAIModal = () => {
    setModalVisible(true);
    fetchAIDetails();
  };

  // Get platform logos
  const getPlatformLogo = (platformName: string) => {
    const lowercasedPlatform = platformName.toLowerCase();

    if (lowercasedPlatform.startsWith("playstation")) {
      return <Ionicons name="logo-playstation" size={24} color="white" />;
    }
    if (lowercasedPlatform.startsWith("xbox")) {
      return <Ionicons name="logo-xbox" size={24} color="green" />;
    }
    if (lowercasedPlatform.startsWith("pc")) {
      return <Ionicons name="logo-windows" size={24} color="blue" />;
    }
    if (
      lowercasedPlatform.startsWith("ios") ||
      lowercasedPlatform.startsWith("mac")
    ) {
      return <Ionicons name="logo-apple" size={24} color="gray" />;
    }
    if (lowercasedPlatform.startsWith("android")) {
      return <Ionicons name="logo-android" size={24} color="green" />;
    }

    // Default icon for unknown platforms
    return <Ionicons name="help-circle-outline" size={24} color="gray" />;
  };

  // Truncate description to 60 words
  const truncateDescription = (text: string) => {
    const words = text.split(" ");
    if (words.length > 60) {
      return words.slice(0, 60).join(" ") + "...";
    }
    return text;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading game details...</Text>
      </SafeAreaView>
    );
  }

  if (!gameDetails) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Game not found.</Text>
      </SafeAreaView>
    );
  }

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={20} color="gold" />);
    }

    if (halfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={20} color="gold" />
      );
    }

    return stars;
  };

  // Open website link
  const openWebsite = () => {
    if (gameDetails.website) {
      Linking.openURL(gameDetails.website);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Game Image */}
        <Image
          source={{ uri: gameDetails.background_image }}
          style={styles.gameImage}
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
        />

        {/* Game Title */}
        <Text style={styles.gameTitle}>{gameDetails.name}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          {renderStars(gameDetails.rating)}
          <Text style={styles.ratingText}>{gameDetails.rating}/5</Text>
        </View>

        {/* AI Gen Button */}
        <TouchableOpacity style={styles.aiButton} onPress={openAIModal}>
          <Text style={styles.aiButtonText}>AI Gen</Text>
        </TouchableOpacity>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.gameDescription}>
            {showFullDescription
              ? gameDetails.description_raw
              : truncateDescription(gameDetails.description_raw)}
          </Text>
          {gameDetails.description_raw.split(" ").length > 300 && (
            <TouchableOpacity
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? "Show Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.gameDetails}>
            Released: {new Date(gameDetails.released).toLocaleDateString()}
          </Text>
          <View style={styles.platformsContainer}>
            <Text style={styles.gameDetails}>Platforms: </Text>
            <View style={styles.platformIcons}>
              {gameDetails.platforms.map((p: any) => (
                <View key={p.platform.id} style={styles.platformIcon}>
                  {getPlatformLogo(p.platform.name)}
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.gameDetails}>
            Genres: {gameDetails.genres.map((g: any) => g.name).join(", ")}
          </Text>
          <Text style={styles.gameDetails}>
            Developers:{" "}
            {gameDetails.developers.map((d: any) => d.name).join(", ")}
          </Text>
          <Text style={styles.gameDetails}>
            Publishers:{" "}
            {gameDetails.publishers.map((p: any) => p.name).join(", ")}
          </Text>
          {gameDetails.website && (
            <TouchableOpacity onPress={openWebsite}>
              <Text style={[styles.gameDetails, { color: "blue" }]}>
                Visit Website
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* AI Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {aiLoading ? (
              <ActivityIndicator size="large" color="#FF474C" />
            ) : (
              <ScrollView>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, color: "white" }}
                >
                  AI generated Details
                </Text>
                <Text style={styles.modalText}>{aiResponse}</Text>
              </ScrollView>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GameDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  gameImage: {
    width: "100%",
    height: 250,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginHorizontal: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  ratingText: {
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  aiButton: {
    backgroundColor: "#FF474C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  aiButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  gameDescription: {
    fontSize: 16,
    color: "white",
    lineHeight: 24,
  },
  readMoreText: {
    color: "#FF474C",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  gameDetails: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  platformsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  platformIcons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  platformIcon: {
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  loadingText: {
    fontSize: 18,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalText: {
    fontSize: 16,
    color: "white",
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: "#FF474C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
