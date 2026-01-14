import React from 'react';
import { Pressable, Text, Image, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { Movie } from '../types/tmdb';
import { getPosterImage } from '../utils/formatters';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  // Ensure we have a valid URI string
  const uri = getPosterImage(movie.poster_path);

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable style={styles.container}>
        {/* 1. Image with explicit Aspect Ratio */}
        <View style={styles.imageWrapper}>
          <Image 
            source={{ uri: uri }} 
            style={styles.image} 
            resizeMode="cover"
          />
        </View>

        {/* 2. Text container with fixed height to prevent overlap */}
        <View style={styles.textContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {movie.title}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%', 
    backgroundColor: 'transparent',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 2 / 3, // Standard movie poster proportions
    borderRadius: 10,
    overflow: 'hidden', // Ensures image corners are rounded
    backgroundColor: '#1a1a1a', // Placeholder color while loading
  },
  image: { 
    width: '100%', 
    height: '100%', 
  },
  textContainer: {
    marginTop: 8,
    height: 40, // Fixed height ensures names don't get covered by the next row
    justifyContent: 'flex-start',
  },
  title: { 
    color: '#FFFFFF', 
    fontSize: 12, 
    fontWeight: '600',
    lineHeight: 16,
  }
});