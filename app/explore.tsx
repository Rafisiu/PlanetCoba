// app/explore.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useWishlist } from "./WishlistContext";

interface Planet {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
}

const ExploreScreen: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const renderItem = ({ item }: { item: Planet }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Diameter :</Text>
        <Text style={styles.value}>{item.diameter}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Climate :</Text>
        <Text style={styles.value}>{item.climate}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Terrain :</Text>
        <Text style={styles.value}>{item.terrain}</Text>
      </View>
      <Button
        title="Remove from Wishlist"
        onPress={() => removeFromWishlist(item)}
      />
    </View>
  );

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Whislist</Text>
      </View>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#2b2e33",
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#2b2e33",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    color: "#777",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default ExploreScreen;
