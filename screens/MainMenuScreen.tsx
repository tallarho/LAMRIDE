import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  useColorScheme,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { supabase } from "../supabaseClient";
import { styles } from "../styles/MainMenuScreen.style";
import { LinearGradient } from "expo-linear-gradient";

type MainMenuScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MainMenu"
>;

const { width } = Dimensions.get("window");

export default function MainMenuScreen() {
  const navigation = useNavigation<MainMenuScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRides: 0,
    totalDistance: 0,
    averageDuration: 0,
  });
  const [userName, setUserName] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const statsAnim = useRef(new Animated.Value(0)).current;

  const menuItems: {
    key: string;
    label: string;
    screen: keyof RootStackParamList | null;
    emoji: string;
  }[] = [
    {
      key: "rideHistory",
      label: "История",
      screen: "RideHistory",
      emoji: "📜",
    },
    {
      key: "achievements",
      label: "Достижения",
      screen: "Achievements",
      emoji: "🏆",
    },
    { key: "profile", label: "Профиль", screen: "Profile", emoji: "👤" },
    { key: "settings", label: "Настройки", screen: "Settings", emoji: "⚙️" },
  ];

  const menuAnims = useRef(menuItems.map(() => new Animated.Value(0))).current;

  const colors = {
    bg: isDark ? "#0D0D0D" : "#FBFDFF",
    text: isDark ? "#FFFFFF" : "#111827",
    subText: isDark ? "#BDBDBD" : "#6B7280",
    cardBg: isDark ? "#121212" : "#FFFFFF",
    buttonGradient: ["#fc6f6fff", "#ff1f1fff"] as [string, string],
    buttonText: "#fff",
  };

  useEffect(() => {
    async function fetchStats() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) throw new Error("User not found");

        setUserName(user.user_metadata?.full_name || user.email || "User");

        const { data: rides, error } = await supabase
          .from("rides")
          .select("duration, distance")
          .eq("user_id", user.id);

        if (error) throw error;

        const totalRides = Array.isArray(rides) ? rides.length : 0;
        const totalDistance = (rides || []).reduce(
          (acc: number, r: any) => acc + (r.distance || 0),
          0
        );
        const averageDuration =
          totalRides > 0
            ? Math.floor(
                (rides || []).reduce(
                  (acc: number, r: any) => acc + (r.duration || 0),
                  0
                ) / totalRides
              )
            : 0;

        setStats({ totalRides, totalDistance, averageDuration });

        Animated.parallel([
          Animated.timing(statsAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
          Animated.stagger(
            90,
            menuAnims.map((a) =>
              Animated.timing(a, {
                toValue: 1,
                duration: 420,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
              })
            )
          ),
        ]).start();
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    return `${mins} мин`;
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text
          style={[
            styles.title,
            { color: colors.text },
            {
              opacity: statsAnim,
              transform: [
                {
                  translateY: statsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Добро пожаловать,{" "}
          <Text style={{ fontWeight: "900" }}>{userName}</Text>!
        </Animated.Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.buttonGradient[0]}
            style={{ marginTop: 36 }}
          />
        ) : (
          <Animated.View
            style={[
              styles.statsContainer,
              { backgroundColor: colors.cardBg },
              {
                opacity: statsAnim,
                transform: [
                  {
                    translateY: statsAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [12, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🚴‍♂️</Text>
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {stats.totalRides}
              </Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>
                Поездок
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>🛣️</Text>
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {stats.totalDistance.toFixed(1)} км
              </Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>
                Дистанция
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statEmoji}>⏱️</Text>
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {formatDuration(stats.averageDuration)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.subText }]}>
                Среднее время
              </Text>
            </View>
          </Animated.View>
        )}

        <Animated.View
          style={{ transform: [{ scale: scaleAnim }], marginBottom: 18 }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate("TrackList")}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={{ width: width - 40 }}
          >
            <LinearGradient
              colors={colors.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButtonGradient}
            >
              <Text
                style={[styles.startButtonText, { color: colors.buttonText }]}
              >
                🚴 Начать поездку
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <Text style={[styles.menuTitle, { color: colors.text }]}>Меню</Text>

        <View style={styles.menuList}>
          {menuItems
            .filter((item) => item.screen)
            .map((it, idx) => {
              const anim = menuAnims[idx];
              const animatedStyle = {
                opacity: anim,
                transform: [
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.98, 1],
                    }),
                  },
                ],
              };

              return (
                <Animated.View
                  key={it.key}
                  style={[styles.menuCardWrapper, animatedStyle]}
                >
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={[
                      styles.menuItem,
                      { backgroundColor: colors.cardBg },
                    ]}
                    onPress={() => {
                      if (it.screen) {
                        navigation.navigate(
                          it.screen as
                            | "RideHistory"
                            | "Achievements"
                            | "Profile"
                            | "Settings"
                        );
                      }
                    }}
                  >
                    <Text style={styles.menuEmoji}>{it.emoji}</Text>
                    <Text style={[styles.menuLabel, { color: colors.text }]}>
                      {it.label}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
