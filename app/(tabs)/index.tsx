import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, MapPin, Bell, Star, Smartphone, Laptop, Tv, Tag, MoveHorizontal as MoreHorizontal, Heart, ShoppingCart } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../hooks/useLocation';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Phones', icon: Smartphone, color: '#FF6B6B' },
  { id: '2', name: 'Laptops', icon: Laptop, color: '#4ECDC4' },
  { id: '3', name: 'TVs', icon: Tv, color: '#45B7D1' },
  { id: '4', name: 'Deals', icon: Tag, color: '#96CEB4' },
  { id: '5', name: 'More', icon: MoreHorizontal, color: '#FFEAA7' },
];

const quickDeals = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    price: '$899.99',
    originalPrice: '$1199.99',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '25% Off'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: '$999.99',
    originalPrice: '$1299.99',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '23% Off'
  },
  {
    id: '3',
    name: 'Samsung Galaxy Watch',
    price: '$249.99',
    originalPrice: '$349.99',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount: '29% Off'
  },
];

export default function HomeScreen() {
  const { user, profile } = useAuth();
  const { location } = useLocation();

  const handleMessageUser = () => {
    if (!user) {
      router.push('/auth/sign-in');
      return;
    }
    // Navigate to messages or specific chat
  };

  const handleListItem = () => {
    if (!user) {
      router.push('/auth/sign-in');
      return;
    }
    router.push('/(tabs)/list-item');
  };
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
        <item.icon size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderQuickDeal = ({ item }) => (
    <TouchableOpacity style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <Image source={{ uri: item.image }} style={styles.dealImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={16} color="#FF6B6B" />
        </TouchableOpacity>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      </View>
      <View style={styles.dealInfo}>
        <Text style={styles.dealName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.dealPrice}>{item.price}</Text>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={12} 
              color={i < Math.floor(item.rating) ? '#F7941D' : '#E5E5E5'} 
              fill={i < Math.floor(item.rating) ? '#F7941D' : '#E5E5E5'}
            />
          ))}
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={handleMessageUser}>
          <LinearGradient
            colors={['#F7941D', '#4A0E67']}
            style={styles.orderGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ShoppingCart size={14} color="#FFFFFF" />
            <Text style={styles.orderText}>{user ? 'Message' : 'Sign In'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4A0E67', '#F7941D']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.locationText}>
              {location?.address || 'Getting location...'}
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={20} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => user ? router.push('/(tabs)/profile') : router.push('/auth/sign-in')}
            >
              <View style={styles.profileIcon}>
                <Text style={styles.profileText}>
                  {user ? (profile?.full_name?.[0] || user.email?.[0] || 'U') : 'G'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.greeting}>
          {user ? `Hello, ${profile?.full_name?.split(' ')[0] || 'User'}!` : 'Welcome to LizExpress'}
        </Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            placeholderTextColor="#6B7280"
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Featured Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#4A0E67', '#F7941D']}
            style={styles.banner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>New Items</Text>
              <Text style={styles.bannerSubtitle}>Fresh swaps up to</Text>
              <Text style={styles.bannerDiscount}>100% Trade</Text>
              <TouchableOpacity style={styles.shopButton} onPress={() => router.push('/(tabs)/browse')}>
                <Text style={styles.shopButtonText}>Browse Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerImageContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.bannerImage}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Quick Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Swaps</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={quickDeals}
            renderItem={renderQuickDeal}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsList}
          />
        </View>

        {/* Call to Action for Non-Users */}
        {!user && (
          <View style={styles.ctaSection}>
            <LinearGradient
              colors={['#F7941D', '#4A0E67']}
              style={styles.ctaBanner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.ctaTitle}>Ready to Start Trading?</Text>
              <Text style={styles.ctaSubtitle}>
                Join thousands of users swapping items they love
              </Text>
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  style={styles.ctaButton}
                  onPress={() => router.push('/auth/sign-up')}
                >
                  <Text style={styles.ctaButtonText}>Sign Up Free</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.ctaButton, styles.ctaButtonSecondary]}
                  onPress={() => router.push('/auth/sign-in')}
                >
                  <Text style={[styles.ctaButtonText, styles.ctaButtonTextSecondary]}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7941D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7941D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  bannerContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  banner: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 140,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
  },
  bannerDiscount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  shopButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  bannerImageContainer: {
    width: 80,
    height: 80,
    marginLeft: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#F7941D',
    fontWeight: '600',
  },
  categoriesList: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  dealsList: {
    paddingRight: 20,
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    width: width * 0.45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dealImageContainer: {
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dealInfo: {
    padding: 12,
  },
  dealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  orderButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  orderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  orderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  ctaBanner: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  ctaButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ctaButtonSecondary: {
    backgroundColor: '#FFFFFF',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  ctaButtonTextSecondary: {
    color: '#4A0E67',
  },
});