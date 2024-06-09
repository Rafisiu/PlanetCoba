// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { WishlistProvider } from "./WishlistContext"; // Sesuaikan dengan lokasi WishlistContext.tsx
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import HomeScreen from "./index"; // Sesuaikan dengan lokasi HomeScreen.tsx
import ExploreScreen from "./explore"; // Sesuaikan dengan lokasi ExploreScreen.tsx

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <WishlistProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "red",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "List Planet",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "planet" : "planet-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Data Whislist",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "heart" : "heart-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="PlanetDetail"
          options={{
            title: "Planet Detail",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={
                  focused ? "information-circle" : "information-circle-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </WishlistProvider>
  );
}
