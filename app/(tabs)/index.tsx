import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import TrendingGames from "@/components/TrendingGames";
import GenresList from "@/components/GenresList";
import GamesList from "@/components/GamesList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";

const HomeScreen: React.FC = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results

  // Handle search
  const handleSearch = async (query: string) => {
    if (query.length === 0) {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${process.env.EXPO_PUBLIC_RAWG_API_KEY}&search=${query}&page_size=10`
      );
      setSearchResults(response.data.results); // Set search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 2000);
            }}
            colors={["#fff"]}
            tintColor="#fff"
          />
        }
      >
        <TrendingGames />
        <GenresList
          selectedGenre={selectedGenre}
          onGenrePress={setSelectedGenre}
        />
        <GamesList
          genreId={selectedGenre}
          searchResults={searchResults} // Pass search results to GamesList
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
