import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useHomeData } from '../../src/hooks/useMovieData';
import MovieCard from '../../src/components/MovieCard';
import Loader from '../../src/components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// 1. Define the spacing/gap value
const SPACING = 12; 
// 2. Calculate card width: (Total Width - (Padding * 2) - (Gaps between 3 cards)) / 3
const cardWidth = (width - (SPACING * 2) - (SPACING * 2)) / 3;

export default function HomeScreen() {
  const { data, isLoading, error } = useHomeData();

  if (isLoading) return <Loader variant="full" />;

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load movies. Check your connection.</Text>
      </View>
    );
  }

  // Flattening data for the grid
  const allMovies = [
    ...(data?.trending || []),
    ...(data?.popular || []),
    ...(data?.topRated || []),
    ...(data?.upcoming || []),
  ];

  const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={uniqueMovies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper} // Handles the horizontal gap
        renderItem={({ item }) => (
          <View style={{ width: cardWidth, marginBottom: SPACING }}>
            <MovieCard movie={item} />
          </View>
        )}
        ListHeaderComponent={
          <Text style={styles.gridTitle}>Browse All</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Cinema black
  },
  listContent: {
    paddingHorizontal: SPACING, // Side padding for the whole list
    paddingTop: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'flex-start', // Keeps cards aligned to the left
    gap: SPACING, // Modern React Native property for spacing between columns
  },
  gridTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#888',
    fontSize: 16,
  },
});