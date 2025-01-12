import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          placeholderTextColor="#666"
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0, // Remove default padding
  },
});
