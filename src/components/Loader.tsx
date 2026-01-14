import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

interface Props {
  variant?: 'full' | 'card' | 'list';
}

const { width } = Dimensions.get('window');

export default function Loader({ variant = 'full' }: Props) {
  // 1. Full Screen Spinner (Initial App Load)
  if (variant === 'full') {
    return (
      <View style={styles.fullScreen}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  // 2. Card Skeleton (Placeholder for MovieCard)
  if (variant === 'card') {
    return <View style={styles.cardSkeleton} />;
  }

  // 3. List Skeleton (A row of loading cards)
  if (variant === 'list') {
    return (
      <View style={styles.listContainer}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.cardSkeleton} />
        ))}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Matches movie app dark theme
  },
  listContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginVertical: 10,
  },
  cardSkeleton: {
    width: 150,
    height: 225,
    borderRadius: 12,
    backgroundColor: '#222', // Dark grey placeholder
    marginRight: 15,
  },
});