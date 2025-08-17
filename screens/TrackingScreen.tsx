import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { supabase } from "../supabaseClient";
import { useRouteTracking } from "../hooks/useRouteTracking";
import haversine from "haversine-distance";
import { calculateBearing } from "../utils/geo";
import arrowImg from "../assets/arrow.png";
import UserMarker from "../components/UserMarker";
import { styles } from '../styles/TrackingScreen.style'

type Props = NativeStackScreenProps<RootStackParamList, "Tracking">;

const TrackingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { track } = route.params;
  const finishPoint = track.coordinates[track.coordinates.length - 1];

  const [speed, setSpeed] = useState<number>(0);
  const [resultSaved, setResultSaved] = useState(false);
  const [finishAlertShown, setFinishAlertShown] = useState(false);
  const [bearingToFinish, setBearingToFinish] = useState<number>(0);
  const { location, timer, path, distance, hasArrived, heading } =
    useRouteTracking(finishPoint);

  const onFinish = async () => {
    if (resultSaved || path.length < 2) return;

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) throw new Error("Пользователь не найден");

      const { error: insertError } = await supabase.from("rides").insert([
        {
          user_id: user.id,
          track_id: track.id,
          duration: timer,
          path,
          distance,
        },
      ]);

      if (insertError) throw insertError;

      setResultSaved(true);
      navigation.navigate("MainMenu");
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      Alert.alert("Ошибка", "Не удалось сохранить результат");
    }
  };

  const forceFinish = async () => {
    if (resultSaved) return;

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) throw new Error("Пользователь не найден");

      const { error: insertError } = await supabase.from("rides").insert([
        {
          user_id: user.id,
          track_id: track.id,
          duration: timer,
          path,
          distance,
        },
      ]);

      if (insertError) throw insertError;

      setResultSaved(true);
      navigation.navigate("MainMenu");
    } catch (err) {
      console.error("Ошибка при сохранении:", err);
      Alert.alert("Ошибка", "Не удалось сохранить результат");
    }
  };

  const handleFinish = async () => {
    await onFinish();   
  };

  const handleForceFinish = () => {
    Alert.alert(
      "Подтверждение",
      "Вы действительно хотите завершить маршрут принудительно? Результат будет сохранён.",
      [
        { text: "Отмена", style: "cancel" },
        {
          text: "Завершить",
          style: "destructive",
          onPress: forceFinish,
        },
      ]
    );
  };

  useEffect(() => {
    if (!location || !location.coords) return;

    const gpsSpeed = location.coords.speed;
    if (gpsSpeed !== null && gpsSpeed >= 0) {
      setSpeed(gpsSpeed * 3.6); // м/с → км/ч
    }

    const distToFinish = haversine(location.coords, finishPoint);
    if (distToFinish < 30 && hasArrived && !finishAlertShown) {
      setFinishAlertShown(true);
      Alert.alert(
        "🎉 Финиш!",
        "Вы достигли финиша. Нажмите 'Завершить', чтобы сохранить результат."
      );
    }

    // 👉 вычисляем направление к финишу
    const bearing = calculateBearing(location.coords, finishPoint);
    setBearingToFinish(bearing);
  }, [location, hasArrived]);

  if (!location || !location.coords) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 16 }}>Загрузка GPS...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <UserMarker
          coordinate={location.coords}
          heading={bearingToFinish}
          anchor={{ x: 0.5, y: 0.5 }}
          flat
        />

        <Polyline
          coordinates={track.coordinates}
          strokeColor="#EF4444"
          strokeWidth={4}
        />
        <Polyline coordinates={path} strokeColor="#3B82F6" strokeWidth={4} />
      </MapView>

      <View style={styles.bottomPanel}>
        <Text style={styles.timerText}>⏱ Время: {timer} сек</Text>
        <Text style={styles.speedText}>
          🚴 Скорость: {speed.toFixed(1)} км/ч
        </Text>
        <Text style={styles.speedText}>
          📏 Расстояние: {distance.toFixed(2)} км
        </Text>
        {hasArrived && <Text style={styles.finishNotice}>✅ Вы у финиша</Text>}

        {hasArrived && (
          <TouchableOpacity
            style={[
              styles.finishButton,
              resultSaved ? { backgroundColor: "#9CA3AF" } : {},
            ]}
            onPress={handleFinish}
            disabled={resultSaved}
          >
            <Text style={styles.finishButtonText}>
              {resultSaved ? "Сохранено" : "Завершить"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Кнопка принудительного завершения */}
        {!resultSaved && (
          <TouchableOpacity
            style={styles.forceFinishButton}
            onPress={handleForceFinish}
            activeOpacity={0.8}
          >
            <Text style={styles.forceFinishButtonText}>Завершить</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default TrackingScreen