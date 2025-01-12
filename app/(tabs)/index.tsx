import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { Image, StyleSheet, Platform, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Header />
      <SearchBar />
      <Text style={{ color: "white" }}>hiiii</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
