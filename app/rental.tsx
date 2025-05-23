// app/rental.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Northwestern purple
const PURPLE = '#4E2A84';

// Vehicle type
type Vehicle = {
    id: string;
    licenseplate: string;
    licensecolor: string;
    latitude: number;
    longitude: number;
    fuelEstimate: number;  // 0–1
  };

// Sample data (should match your map.tsx data source)
const vehicles: Vehicle[] = [
  { id: 'v1', licenseplate: 'AYNL 794', licensecolor: 'red',  latitude: 42.0583, longitude: -87.6751, fuelEstimate: 0.72 },
  { id: 'v2', licenseplate: 'GTT 240', licensecolor: 'green', latitude: 42.0600, longitude: -87.6690, fuelEstimate: 0.45 },
  { id: 'v3', licenseplate: 'FLT4FUN', licensecolor: 'plaid', latitude: 42.0500, longitude: -87.6800, fuelEstimate: 0.30 },
];

export default function RentalPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vehicle = vehicles.find(v => v.id === id);

  const PRICE_PER_MINUTE = 0.45; // example pricing

  if (!vehicle) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Vehicle not found.</Text>
      </View>
    );
  }

  const handlePurchase = () => {
    Alert.alert(
      'Purchase Confirmed',
      `You have rented ${vehicle.licenseplate} at $${PRICE_PER_MINUTE}/min.`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Rental Details</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>License Plate:</Text>
        <Text style={styles.value}>{vehicle.licenseplate}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>License Color:</Text>
        <Text style={[styles.value, { color: vehicle.licensecolor }]}>
          {vehicle.licensecolor}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Fuel Estimate:</Text>
        <Text style={styles.value}>
          {Math.round(vehicle.fuelEstimate * 100)}%
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Base Price:</Text>
        <Text style={styles.value}>$1.50</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Per Minute:</Text>
        <Text style={styles.value}>${PRICE_PER_MINUTE}/min</Text>
      </View>

      <Text style={styles.disclaimer}>
        Disclaimer: Please check the fuel level yourself before renting. We
        cannot guarantee the accuracy of the fuel sensor.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Purchase</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    fontSize: 18,
    color: '#444',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PURPLE,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    width: 120,
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  disclaimer: {
    marginVertical: 20,
    color: '#666',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
