import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./types"; // Sesuaikan dengan lokasi file types.ts

// Definisikan tipe data untuk planet
interface Planet {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
}

const PlanetList = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadMorePlanets();
  }, []);

  const loadMorePlanets = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/planets/?page=${page}`
      );
      // Ambil semua properti yang diperlukan dari response.data.results
      const newPlanets = response.data.results.map((planet: any) => ({
        name: planet.name,
        diameter: planet.diameter,
        climate: planet.climate,
        terrain: planet.terrain,
      }));
      const allPlanets = [...planets, ...newPlanets];
      // Sort the combined array of planets alphabetically by name
      allPlanets.sort((a, b) => a.name.localeCompare(b.name));
      setPlanets(allPlanets);
      setPage(page + 1);
    } catch (error) {
      console.warn("Jumlah Planet Sudah Maksimal!");
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: Planet }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlanetDetail", { planet: item })}
      style={styles.card}
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Planet List</Text>
      </View>
      <FlatList
        data={planets}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        onEndReached={loadMorePlanets}
        onEndReachedThreshold={0.5}
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2e33",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#2b2e33",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlanetList;
