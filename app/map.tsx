// app/map.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import * as Location from 'expo-location';

// Northwestern purple
const PURPLE = '#4E2A84';

// Sample vehicles (replace with your live data)
type Vehicle = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  fuelEstimate: number;  // 0–1
};

const vehicles: Vehicle[] = [
  { id: 'v1', name: 'Vehicle 1', latitude: 42.0583, longitude: -87.6751, fuelEstimate: 0.72 },
  { id: 'v2', name: 'Vehicle 2', latitude: 42.0600, longitude: -87.6690, fuelEstimate: 0.45 },
  { id: 'v3', name: 'Vehicle 3', latitude: 42.0500, longitude: -87.6800, fuelEstimate: 0.30 },
  // This one is outside Evanston bounds and will be filtered out:
  { id: 'v4', name: 'Vehicle 4', latitude: 41.88,   longitude: -87.62,   fuelEstimate: 0.50 },
];

// Define Evanston campus bounding box
const EVANSTON_BOUNDS = {
  minLat: 42.02,
  maxLat: 42.09,
  minLng: -87.74,
  maxLng: -87.60,
};

export default function MapPage() {
  const [region, setRegion] = useState<Region>({
    // Center on Evanston campus
    latitude: 42.0583,
    longitude: -87.6751,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });
  const [loading, setLoading] = useState(true);

  // Filter vehicles to only those inside our Evanston box
  const visibleVehicles = vehicles.filter(v =>
    v.latitude  >= EVANSTON_BOUNDS.minLat &&
    v.latitude  <= EVANSTON_BOUNDS.maxLat &&
    v.longitude >= EVANSTON_BOUNDS.minLng &&
    v.longitude <= EVANSTON_BOUNDS.maxLng
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === Location.PermissionStatus.GRANTED) {
        const loc = await Location.getCurrentPositionAsync({});
        setRegion(r => ({
          ...r,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      region={region}
      showsUserLocation
      showsMyLocationButton
    >
      {visibleVehicles.map(v => (
        <Marker
          key={v.id}
          coordinate={{ latitude: v.latitude, longitude: v.longitude }}
          pinColor={PURPLE}
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{v.name}</Text>
              <Text>Fuel: {Math.round(v.fuelEstimate * 100)}%</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callout: {
    width: 140,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
