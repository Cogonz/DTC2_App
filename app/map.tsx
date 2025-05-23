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
import { useRouter } from 'expo-router';

const PURPLE = '#4E2A84';

type Vehicle = {
  id: string;
  licenseplate: string;
  licensecolor: string;
  latitude: number;
  longitude: number;
  fuelEstimate: number;  // 0–1
};

const vehicles: Vehicle[] = [
  { id: 'v1', licenseplate: 'AYNL 794', licensecolor: 'red',   latitude: 42.0583, longitude: -87.6751, fuelEstimate: 0.72 },
  { id: 'v2', licenseplate: 'GTT 240', licensecolor: 'green', latitude: 42.0600, longitude: -87.6690, fuelEstimate: 0.45 },
  { id: 'v3', licenseplate: 'FLT4FUN', licensecolor: 'plaid', latitude: 42.0500, longitude: -87.6800, fuelEstimate: 0.30 },
  // outside Evanston; will be filtered out
  { id: 'v4', licenseplate: 'PZR 260', licensecolor: 'pink',  latitude: 41.8800, longitude: -87.6200, fuelEstimate: 0.50 },
];

const EVANSTON_BOUNDS = {
  minLat: 42.02,
  maxLat: 42.09,
  minLng: -87.74,
  maxLng: -87.60,
};

export default function MapPage() {
  const router = useRouter();
  const [region, setRegion] = useState<Region>({
    latitude: 42.0583,
    longitude: -87.6751,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });
  const [loading, setLoading] = useState(true);

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
        const loc = await Location.getCurrentPositionAsync();
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

  const onRentPress = (v: Vehicle) => {
    // navigate to rental.tsx with the selected vehicle id
    router.push({ pathname: '/rental', params: { id: v.id } });
  };

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
          onCalloutPress={() => onRentPress(v)}
        >
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.calloutText}>
                <Text style={styles.calloutLabel}>License Plate: </Text>
                {v.licenseplate}
              </Text>
              <Text style={styles.calloutText}>
                <Text style={styles.calloutLabel}>License Color: </Text>
                <Text style={{ color: v.licensecolor }}>
                  {v.licensecolor}
                </Text>
              </Text>
              <Text style={styles.calloutText}>
                <Text style={styles.calloutLabel}>Fuel: </Text>
                {Math.round(v.fuelEstimate * 100)}%
              </Text>
              <View style={styles.calloutButton}>
                <Text style={styles.calloutButtonText}>Rent</Text>
              </View>
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
    width: 180,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 4,
  },
  calloutText: {
    marginBottom: 4,
  },
  calloutLabel: {
    fontWeight: 'bold',
  },
  calloutButton: {
    marginTop: 8,
    backgroundColor: PURPLE,  // purple button
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
