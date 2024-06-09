import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useWishlist } from "./WishlistContext"; // Sesuaikan dengan lokasi WishlistContext.tsx

type RootStackParamList = {
  PlanetDetail: {
    planet: {
      name: string;
      diameter: string;
      climate: string;
      terrain: string;
    };
  };
};

type PlanetDetailRouteProp = RouteProp<RootStackParamList, "PlanetDetail">;

const PlanetDetail: React.FC = () => {
  const route = useRoute<PlanetDetailRouteProp>();
  const { planet } = route.params;
  const { addToWishlist } = useWishlist();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{planet.name}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Diameter:</Text>
          <Text style={styles.value}>{planet.diameter}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Climate:</Text>
          <Text style={styles.value}>{planet.climate}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Terrain:</Text>
          <Text style={styles.value}>{planet.terrain}</Text>
        </View>
        <Button title="Add to Wishlist" onPress={() => addToWishlist(planet)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2b2e33",
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: "#777",
    flex: 1,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraf: {
    fontSize: 16,
    fontWeight: "300", // use "300" for thin font weight
    marginVertical: 5,
  },
});

export default PlanetDetail;
