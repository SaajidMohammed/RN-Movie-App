import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// Updated to match your actual hook names
import { useMovieDetails } from '../../src/hooks/useMovieData'; 
import { useFavoritesStore } from '../../src/store/useFavouriteStore';
import Loader from '../../src/components/Loader';
import { getPosterImage, formatYear, formatRuntime, formatRating } from '../../src/utils/formatters';

const { width } = Dimensions.get('window');

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const { data: movie, isLoading } = useMovieDetails(id as string);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (isLoading) return <Loader variant="full" />;
  if (!movie) return null;

  const isFav = isFavorite(movie.id);

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Construct the image URL
  const imageSource = getPosterImage(movie.backdrop_path || movie.poster_path);

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Header Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: imageSource }} 
            style={styles.backdrop}
            resizeMode="cover"
          />
          {/* Back Button positioned over the image */}
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{movie.title}</Text>
            <Pressable onPress={toggleFavorite} hitSlop={10}>
              <Ionicons 
                name={isFav ? "heart" : "heart-outline"} 
                size={32} 
                color={isFav ? "#E50914" : "white"} 
              />
            </Pressable>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{formatYear(movie.release_date)}</Text>
            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>{formatRuntime(movie.runtime)}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}> {formatRating(movie.vote_average)}</Text>
            </View>
          </View>

          <View style={styles.genreContainer}>
            {movie.genres?.map((genre) => (
              <View key={genre.id} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
          
          {/* Extra padding at the bottom for scroll space */}
          <View style={{ height: 50 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  imageContainer: {
    width: width,
    height: 450,
    backgroundColor: '#1a1a1a', // Placeholder color if image fails
  },
  backdrop: { 
    width: '100%', 
    height: '100%',
  },
  backButton: { 
    position: 'absolute', 
    top: Platform.OS === 'ios' ? 60 : 40, 
    left: 20, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 25, 
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: { 
    padding: 20, 
    marginTop: -30, 
    backgroundColor: '#000', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    minHeight: 500,
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 10 
  },
  title: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold', 
    flex: 1, 
    marginRight: 10 
  },
  metaRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  metaText: { 
    color: '#999', 
    fontSize: 15,
    marginRight: 8
  },
  ratingBadge: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8,
    marginLeft: 10
  },
  ratingText: { 
    color: '#FFD700', 
    fontWeight: 'bold',
    fontSize: 14
  },
  genreContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 25 
  },
  genreBadge: { 
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 14, 
    paddingVertical: 6, 
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333'
  },
  genreText: { 
    color: '#fff', 
    fontSize: 13,
    fontWeight: '500'
  },
  overviewTitle: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 12 
  },
  overviewText: { 
    color: '#aaa', 
    fontSize: 16, 
    lineHeight: 24,
    letterSpacing: 0.3
  },
});