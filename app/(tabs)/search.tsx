import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../../src/components/SearchBar';
import MovieCard from '../../src/components/MovieCard';
import Loader from '../../src/components/Loader';
import { useSearchMovies } from '../../src/hooks/useMovieData';
import { useDebounce } from '../../src/hooks/useDebounce';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use debounce to wait 500ms after the user stops typing
  const debouncedQuery = useDebounce(searchQuery, 500);

  // Fetch movies based on the debounced query
  const { data: results, isLoading } = useSearchMovies(debouncedQuery);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />

      {isLoading ? (
        <Loader variant="full" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Grid layout for search results
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieCard movie={item} />
            </View>
          )}
          ListEmptyComponent={
            debouncedQuery.length > 2 ? (
              <Text style={styles.emptyText}>No movies found for "{debouncedQuery}"</Text>
            ) : (
              <Text style={styles.emptyText}>Start typing to search for movies...</Text>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%', // Ensure two cards fit side-by-side
    marginBottom: 10,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});