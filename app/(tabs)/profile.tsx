import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Alert,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Star, Package, MessageCircle, Heart, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit, ChevronRight, Award, TrendingUp, Moon } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';

const menuItems = [
  {
    id: '1',
    title: 'My Listings',
    subtitle: '5 active items',
    icon: Package,
    color: '#4A0E67',
    route: '/(tabs)/list-item'
  },
  {
    id: '2',
    title: 'Trade History',
    subtitle: '12 completed trades',
    icon: TrendingUp,
    color: '#10B981',
    route: null
  },
  {
    id: '3',
    title: 'Favorites',
    subtitle: '8 saved items',
    icon: Heart,
    color: '#EF4444',
    route: null
  },
  {
    id: '4',
    title: 'Reviews',
    subtitle: 'View your ratings',
    icon: Star,
    color: '#F7941D',
    route: null
  },
];

const settingsItems = [
  {
    id: '1',
    title: 'Dark Mode',
    icon: Moon,
    hasSwitch: true,
    route: null
  },
  {
    id: '2',
    title: 'Account Settings',
    icon: Settings,
    route: '/auth/profile-setup'
  },
  {
    id: '3',
    title: 'Privacy & Security',
    icon: Shield,
    route: null
  },
  {
    id: '4',
    title: 'Help & Support',
    icon: HelpCircle,
    route: null
  },
];

export default function ProfileScreen() {
  const { user, profile, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Redirect to sign in if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.replace('/auth/sign-in');
    }
  }, [user]);

  if (!user) {
    return null; // Will redirect
  }

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await signOut();
              router.replace('/auth/sign-in');
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }
        }
      ]
    );
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement actual dark mode logic
  };

  const handleMenuPress = (item: any) => {
    if (item.route) {
      router.push(item.route);
    } else if (item.hasSwitch) {
      handleDarkModeToggle();
    } else {
      Alert.alert('Coming Soon', `${item.title} feature is coming soon!`);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return user?.email?.[0]?.toUpperCase() || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4A0E67', '#F7941D']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {profile?.avatar_url ? (
              <Image 
                source={{ uri: profile.avatar_url }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {getInitials(profile?.full_name)}
                </Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/auth/profile-setup')}
            >
              <Edit size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>
            {profile?.full_name || 'Complete Your Profile'}
          </Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profile?.is_verified ? '✓' : '⏳'}
              </Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Trades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Achievement Badge */}
      <View style={styles.achievementContainer}>
        <View style={styles.achievementBadge}>
          <Award size={20} color="#F7941D" />
          <Text style={styles.achievementText}>
            {profile?.is_verified ? 'Verified User' : 'New Member'}
          </Text>
        </View>
      </View>

      {/* Profile Completion Alert */}
      {!profile?.full_name && (
        <View style={styles.alertContainer}>
          <View style={styles.alertBadge}>
            <Text style={styles.alertText}>
              ⚠️ Complete your profile to start listing items
            </Text>
            <TouchableOpacity 
              style={styles.alertButton}
              onPress={() => router.push('/auth/profile-setup')}
            >
              <Text style={styles.alertButtonText}>Complete Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>My Activity</Text>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
            <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
              <item.icon size={20} color="#FFFFFF" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {settingsItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item)}>
            <View style={styles.menuIcon}>
              <item.icon size={20} color="#6B7280" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            {item.hasSwitch ? (
              <Switch
                value={isDarkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: '#D1D5DB', true: '#4A0E67' }}
                thumbColor={isDarkMode ? '#F7941D' : '#FFFFFF'}
              />
            ) : (
              <ChevronRight size={20} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out */}
      <View style={styles.signOutSection}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>LizExpress v1.0.0</Text>
        <Text style={styles.footerSubtext}>Made with ❤️ for traders</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  avatarPlaceholder: {
    backgroundColor: '#F7941D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7941D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  achievementContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A0E67',
    marginLeft: 8,
  },
  alertContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  alertBadge: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  alertText: {
    fontSize: 14,
    color: '#92400E',
    textAlign: 'center',
    marginBottom: 8,
  },
  alertButton: {
    backgroundColor: '#F7941D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  signOutSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 4,
  },
});