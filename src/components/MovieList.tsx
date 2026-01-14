import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Movie } from '../types/tmdb';
import MovieCard from './MovieCard';

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieList({ title, movies }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 15, paddingLeft: 15 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});