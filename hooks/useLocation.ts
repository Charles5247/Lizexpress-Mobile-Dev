import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const requestLocation = async () => {
    try {
      if (mountedRef.current) {
        setLoading(true);
        setError(null);
      }

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission denied');
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const locationData: LocationData = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      // Try to get address
      try {
        const addresses = await Location.reverseGeocodeAsync({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        });

        if (addresses.length > 0) {
          const address = addresses[0];
          locationData.address = `${address.city}, ${address.region}, ${address.country}`;
        }
      } catch (addressError) {
        console.warn('Could not get address:', addressError);
      }

      if (mountedRef.current) {
        setLocation(locationData);
      }
      return locationData;
    } catch (err: any) {
      if (mountedRef.current) {
        setError(err.message);
      }
      throw err;
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Auto-request location on mount
    if (mountedRef.current) {
      requestLocation().catch(() => {
        // Silently fail - user can manually request later
      });
    }
  }, []);

  return {
    location,
    loading,
    error,
    requestLocation,
  };
};