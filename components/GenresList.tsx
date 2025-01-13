import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import axios from "axios";
import { Colors } from "@/constants/Colors";

interface Genre {
  id: string;
  name: string;
}

interface GenresListProps {
  selectedGenre: string;
  onGenrePress: (genreId: string) => void;
}

const GenresList: React.FC<GenresListProps> = ({
  selectedGenre,
  onGenrePress,
}) => {
  const API_KEY = process.env.EXPO_PUBLIC_RAWG_API_KEY;
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        setGenres([{ id: "all", name: "All" }, ...response.data.results]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Loading genres...</Text>;
  }

  return (
    <FlatList
      data={genres}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.genreButton,
            selectedGenre === item.id && styles.selectedGenreButton,
          ]}
          onPress={() => onGenrePress(item.id)}
        >
          <Text
            style={[
              styles.genreText,
              selectedGenre === item.id && styles.selectedGenreText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.genreList}
    />
  );
};

const styles = StyleSheet.create({
  genreList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark.background,
    marginRight: 10,
  },
  selectedGenreButton: {
    backgroundColor: Colors.dark.tint,
  },
  genreText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },
  selectedGenreText: {
    color: "black",
    fontWeight: "bold",
  },
  loadingText: {
    color: Colors.dark.text,
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontFamily: "Roboto-Italic",
  },
});

export default GenresList;
