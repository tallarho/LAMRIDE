import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../supabaseClient";
import { styles } from "../styles/ProfileScreen.style";
import RatingBlock from "../components/RatingBlock";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<{
    full_name?: string;
    email?: string;
    avatar_url?: string;
  }>({});
  const [stats, setStats] = useState({
    distance: 0,
    time: 0,
    rides: 0,
  });

  const getUserLevel = (points: number) => {
    if (points >= 1000) return "Эксперт";
    if (points >= 500) return "Продвинутый";
    if (points >= 100) return "Средний";
    return "Начинающий";
  };

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  // Рассчитываем очки на основе дистанции и поездок
  const calculatedPoints = Math.floor(stats.distance * 10 + stats.rides * 20);
  const userLevel = getUserLevel(calculatedPoints);

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) return;

      setProfile({
        full_name: user.user_metadata?.full_name || "",
        email: user.email,
        avatar_url: user.user_metadata?.avatar_url || "",
      });
    } catch (error: any) {
      Alert.alert("Ошибка", error.message);
    }
  };

  const fetchStats = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      if (!user) return;

      const { data, error: statsError } = await supabase
        .from("stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (statsError) throw statsError;

      if (data) {
        setStats({
          distance: data.total_distance ?? 0,
          time: data.total_time ?? 0,
          rides: data.ride_count ?? 0,
        });
      } else {
        setStats({ distance: 0, time: 0, rides: 0 });
      }
    } catch (error: any) {
      Alert.alert("Ошибка загрузки статистики", error.message);
    }
  };

  const pickAvatar = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Разрешение нужно для выбора изображения");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.6,
      });

      if (!result.canceled && result.assets.length > 0) {
        const avatar = result.assets[0];
        const ext = avatar.uri.split(".").pop();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) {
          Alert.alert("Ошибка", "Пользователь не найден");
          return;
        }

        const filename = `${user.id}/${Date.now()}.${ext}`;

        const response = await fetch(avatar.uri);
        const blob = await response.blob();

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filename, blob, {
            contentType: "image/*",
            upsert: true,
          });

        if (uploadError) {
          Alert.alert("Ошибка загрузки", uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filename);
        if (!data?.publicUrl) {
          Alert.alert("Ошибка получения ссылки");
          return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
          data: { avatar_url: data.publicUrl },
        });
        if (updateError) {
          Alert.alert("Ошибка обновления профиля", updateError.message);
          return;
        }

        setProfile((prev) => ({ ...prev, avatar_url: data.publicUrl }));
      }
    } catch (error: any) {
      Alert.alert("Ошибка", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      Alert.alert("Ошибка выхода", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickAvatar} style={styles.avatarWrapper}>
        <Image
          source={
            profile.avatar_url
              ? { uri: profile.avatar_url }
              : require("../img/default-avatar.png")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.name}>{profile.full_name || "..."}</Text>
      <Text style={styles.email}>{profile.email}</Text>

      <View style={styles.statsBox}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.distance.toFixed(1)} км</Text>
          <Text style={styles.statLabel}>🌍 Пройдено</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Math.floor(stats.time / 60)} ч</Text>
          <Text style={styles.statLabel}>⏱️ Время</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.rides}</Text>
          <Text style={styles.statLabel}>🚴 Поездки</Text>
        </View>
      </View>

      <RatingBlock
        level={userLevel}
        points={calculatedPoints}
        achievements={[
          { id: "1", title: "Первый километр", condition: stats.distance >= 1 },
          {
            id: "2",
            title: "100 км за поездку",
            condition: stats.distance >= 100,
          },
          { id: "3", title: "10 поездок", condition: stats.rides >= 10 },
          // добавляй свои достижения
        ]}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>🚪 Выйти из аккаунта</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
