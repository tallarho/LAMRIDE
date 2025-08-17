import React, { useEffect, useState } from 'react';
import { Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface UserMarkerProps {
  coordinate: { latitude: number; longitude: number };
  heading?: number;
  anchor?: { x: number; y: number };
  flat?: boolean;
}

const UserMarker: React.FC<UserMarkerProps> = ({
  coordinate,
  heading = 0, 
  anchor = { x: 0.5, y: 0.5 },
  flat = true,
}) => {
  const [markerCoordinate, setMarkerCoordinate] = useState(coordinate);

  useEffect(() => {
    setMarkerCoordinate(coordinate);
  }, [coordinate]);

  return (
    <Marker
      coordinate={markerCoordinate}
      anchor={anchor}
      flat={flat}
    >
      <Animated.Image
        source={require('../assets/arrow.png')}
        style={{
          width: 85,
          height: 85,
          transform: [{ rotate: `${heading}deg` }],
        }}
        resizeMode="contain"
      />
    </Marker>
  );
};

export default UserMarker;
