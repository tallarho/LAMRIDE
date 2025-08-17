import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '../supabaseClient';
import { SwipeListView } from 'react-native-swipe-list-view';
import { styles } from '../styles/RideHistoryScreen.style';

type Ride = {
  id: string;
  duration: number;
  created_at: string;
  distance: number; // в метрах
};

export default function RideHistoryScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('Пользователь не найден');
        setUserId(user.id);
        await fetchRides(user.id);
      } catch (err: any) {
        setError(err.message || 'Неизвестная ошибка');
        setLoading(false);
      }
    })();
  }, []);

  const fetchRides = async (uid?: string) => {
    if (!uid) return;
    setError(null);
    try {
      const { data, error: ridesError } = await supabase
        .from('rides')
        .select('id, duration, created_at, distance')
        .eq('user_id', uid)
        .order('created_at', { ascending: false });

      if (ridesError) throw ridesError;
      setRides(data || []);
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Удалить поездку?",
      "Вы уверены, что хотите удалить эту поездку?",
      [
        { text: "Отмена", style: "cancel" },
        { text: "Удалить", style: "destructive", onPress: () => deleteRide(id) },
      ]
    );
  };

  const deleteRide = async (id: string) => {
    if (!userId) return;
    try {
      const { error } = await supabase
        .from('rides')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
      setRides(prev => prev.filter(ride => ride.id !== id));
    } catch (err: any) {
      console.error('Ошибка при удалении поездки:', err);
      Alert.alert('Ошибка', 'Не удалось удалить поездку.');
    }
  };

  const repeatRide = (id: string) => {
    console.log(`Повторить заезд: ${id}`);
    // TODO: Навигация на экран старта с передачей id поездки
  };

  const onRefresh = useCallback(() => {
    if (!userId) return;
    setRefreshing(true);
    fetchRides(userId);
  }, [userId]);

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const pluralizeMinutes = (mins: number) => {
    const mod10 = mins % 10;
    const mod100 = mins % 100;
    if (mod100 >= 11 && mod100 <= 14) return 'минут';
    if (mod10 === 1) return 'минута';
    if (mod10 >= 2 && mod10 <= 4) return 'минуты';
    return 'минут';
  };

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    const minStr = `${mins} ${pluralizeMinutes(mins)}`;
    return secs > 0 ? `${minStr} и ${secs} сек` : minStr;
  };

  const formatDistance = (meters: number) => {
    return `${(meters / 1000).toFixed(2)} км`;
  };

  const renderItem = ({ item }: { item: Ride }) => (
    <View style={styles.rideItem}>
      <Text style={styles.duration}>⏱ {formatDuration(item.duration)}</Text>
      <Text style={styles.distance}>📏 {formatDistance(item.distance)}</Text>
      <Text style={styles.date}>📅 {formatDate(item.created_at)}</Text>
    </View>
  );

  const renderHiddenItem = ({ item }: { item: Ride }) => (
    <View style={styles.hiddenContainer}>
      {/* Свайп вправо — повторить */}
      <TouchableOpacity
        style={[styles.hiddenBtn, styles.repeatBtn, { left: 0 }]}
        onPress={() => repeatRide(item.id)}
      >
        <Text style={styles.hiddenText}>Повторить</Text>
      </TouchableOpacity>

      {/* Свайп влево — удалить */}
      <TouchableOpacity
        style={[styles.hiddenBtn, styles.deleteBtn, { right: 0 }]}
        onPress={() => confirmDelete(item.id)}
      >
        <Text style={styles.hiddenText}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏍 История поездок</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#10B981" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {rides.length > 0 && (
            <Text style={styles.total}>Всего поездок: {rides.length}</Text>
          )}
          <SwipeListView
            data={rides}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}   // вправо — повторить
            rightOpenValue={-75} // влево — удалить
            disableRightSwipe={false}
            disableLeftSwipe={false}
            stopLeftSwipe={150}
            stopRightSwipe={-150}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#10B981']}
              />
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>Нет записей о поездках.</Text>
            }
            contentContainerStyle={{ paddingBottom: 40, paddingTop: 12 }}
          />
        </>
      )}
    </View>
  );
}
