import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavoritesStore } from '../../src/store/useFavouriteStore';
import MovieCard from '../../src/components/MovieCard';

export default function FavoritesScreen() {
  // Get the list of favorites directly from our Zustand store
  const { favorites } = useFavoritesStore();

  return (
    <SafeAreaView style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your watchlist is empty.</Text>
          <Text style={styles.subText}>Movies you heart will appear here!</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieCard movie={item} />
            </View>
          )}
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});