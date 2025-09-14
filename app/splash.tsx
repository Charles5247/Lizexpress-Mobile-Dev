import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLocation } from '../hooks/useLocation';
import { useAuth } from '../contexts/AuthContext';

export default function SplashScreen() {
  const { user, loading: authLoading } = useAuth();
  const { requestLocation } = useLocation();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const progressAnim = new Animated.Value(0);

  useEffect(() => {
    const initializeApp = async () => {
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
      ]).start();

      // Wait for auth to load and animations to complete
      await new Promise(resolve => setTimeout(resolve, Math.max(2500, authLoading ? 3000 : 0)));

      // Request location permission
      try {
        await requestLocation();
      } catch (error) {
        // Show alert for location permission
        Alert.alert(
          'Location Permission',
          'LizExpress needs location access to show nearby items and improve your trading experience. You can enable this later in settings.',
          [{ text: 'OK' }]
        );
      }

      // Navigate based on auth state
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/auth/sign-in');
      }
    };

    initializeApp();
  }, [fadeAnim, scaleAnim, progressAnim, user, authLoading, requestLocation]);

  return (
    <LinearGradient
      colors={['#F7941D', '#4A0E67']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Animated.View style={styles.logo}>
          <Text style={styles.logoTextTop}>Liz</Text>
          <Text style={styles.logoTextBottom}>Express</Text>
        </Animated.View>
        <Animated.Text style={styles.brandTitle}>LizExpress</Animated.Text>
        <Animated.Text style={styles.brandSubtitle}>
          Swap what you have for what you need!
        </Animated.Text>
        
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingProgress, 
                { 
                  opacity: fadeAnim,
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
          <Animated.Text 
            style={[
              styles.loadingText,
              { opacity: fadeAnim }
            ]}
          >
            Loading your trading experience...
          </Animated.Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  logoTextTop: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A0E67',
    letterSpacing: 1,
  },
  logoTextBottom: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F7941D',
    letterSpacing: 1,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  brandSubtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 60,
  },
  loadingContainer: {
    width: 200,
    alignItems: 'center',
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});