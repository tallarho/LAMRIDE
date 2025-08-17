import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { supabase } from "../supabaseClient";
import { styles } from "../styles/TrackListScreen.style";

type Props = NativeStackScreenProps<RootStackParamList, "TrackList">;

type Track = {
  id: string;
  name: string;
  description: string;
  coordinates: { latitude: number; longitude: number }[];
};

export default function TrackListScreen({ navigation }: Props) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("tracks").select("*");
      if (error) {
        console.error("Ошибка при загрузке треков:", error);
      } else {
        setTracks(data || []);
      }
      setLoading(false);
    };

    fetchTracks();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const renderItem = ({ item }: { item: Track }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.pointsCount}>~ {item.coordinates?.length ?? 0} точек</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("TrackDetail", { track: item })}
        activeOpacity={0.7}
      >
        <Text style={styles.detailButtonText}>Подробнее</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🗺️ Доступные маршруты</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6F61" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Маршруты не найдены.</Text>
          }
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("RideHistory")}
          activeOpacity={0.7}
        >
          <Text style={styles.footerButtonText}>📜 История поездок</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
