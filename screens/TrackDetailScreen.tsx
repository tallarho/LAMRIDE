import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { styles } from '../styles/TrackDetailScreen.style'
type Coordinate = {
  latitude: number;
  longitude: number;
};

type Props = {
  route: any;
  navigation: any;
};

export default function TrackDetailScreen({ route, navigation }: Props) {
  const { track } = route.params;
  const coordinates: Coordinate[] = track.coordinates;

  const initialRegion = {
    latitude: coordinates[0]?.latitude || 55.75,
    longitude: coordinates[0]?.longitude || 37.61,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleStartTracking = () => {
    navigation.navigate('Tracking', { track });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.description}>{track.description}</Text>

        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          loadingEnabled
          mapType="mutedStandard"
        >
          <Polyline
            coordinates={coordinates}
            strokeWidth={5}
            strokeColor="#FF6F61"
          />
          <Marker
            coordinate={coordinates[0]}
            title="Старт"
            pinColor="#34D399"
          />
          <Marker
            coordinate={coordinates[coordinates.length - 1]}
            title="Финиш"
            pinColor="#F87171"
          />
        </MapView>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStartTracking}
        >
          <Text style={styles.buttonText}>🚀  Пройти маршрут</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
