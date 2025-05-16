import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import * as Location from 'expo-location';

// Northwestern colors
const colors = {
  purple: '#4E2A84',
  white: '#FFFFFF',
};

// Example bike station data (replace with real API fetch)
const bikeStations = [
  { id: '1', name: 'Station A', latitude: 42.0584, longitude: -87.6753, availableBikes: 5 },
  { id: '2', name: 'Station B', latitude: 42.0575, longitude: -87.6781, availableBikes: 2 },
  { id: '3', name: 'Station C', latitude: 42.0562, longitude: -87.6712, availableBikes: 8 },
];

export default function MapPage() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required to view the map.');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLoading(false);
    })();
  }, []);

  if (loading || !region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation>
        {bikeStations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{ latitude: station.latitude, longitude: station.longitude }}
          >
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.bikeCount}>{station.availableBikes} bikes available</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  callout: {
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 4,
  },
  stationName: {
    fontWeight: 'bold',
    color: colors.purple,
  },
  bikeCount: {
    marginTop: 4,
    color: colors.purple,
  },
});
