if (typeof globalThis.structuredClone !== "function") {
  globalThis.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import AuthScreen from "./screens/RegistrationScreen";
import TrackListScreen from "./screens/TrackListScreen";
import TrackDetailScreen from "./screens/TrackDetailScreen";
import TrackingScreen from "./screens/TrackingScreen";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import MainMenuScreen from "./screens/MainMenuScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AchievementsScreen from './screens/AchievementsScreen'
import { supabase } from "./supabaseClient";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null); // вот тут он должен обновиться при входе
      }
    );

    init();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen
              name="MainMenu"
              component={MainMenuScreen}
              options={{ headerShown: true, title: "Главное меню" }}
            />
            <Stack.Screen
              name="TrackList"
              component={TrackListScreen}
              options={{ headerShown: true, title: "Список треков" }}
            />
            <Stack.Screen
              name="TrackDetail"
              component={TrackDetailScreen}
              options={{ headerShown: true, title: "Детали трека" }}
            />
            <Stack.Screen
              name="Tracking"
              component={TrackingScreen}
              options={{ headerShown: true, title: "" }}
            />
            <Stack.Screen
              name="RideHistory"
              component={RideHistoryScreen}
              options={{ headerShown: true, title: "История" }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: true, title: "Профиль" }}
            />
            <Stack.Screen
              name="Achievements"
              component={AchievementsScreen}
              options={{ headerShown: true, title: "Достижения" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
