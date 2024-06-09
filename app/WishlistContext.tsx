// app/WishlistContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Planet {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
}

interface WishlistContextType {
  wishlist: Planet[];
  addToWishlist: (planet: Planet) => void;
  removeFromWishlist: (planet: Planet) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Planet[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const saveWishlist = async (updatedWishlist: Planet[]) => {
    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const addToWishlist = (planet: Planet) => {
    // Check if planet already exists in wishlist
    if (!wishlist.some((item) => item.name === planet.name)) {
      const updatedWishlist = [...wishlist, planet];
      // Sort wishlist by name
      updatedWishlist.sort((a, b) => a.name.localeCompare(b.name));
      saveWishlist(updatedWishlist);
    }
  };

  const removeFromWishlist = (planet: Planet) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== planet.name
    );
    saveWishlist(updatedWishlist);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
