import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" />
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 12,
    margin: 15,
    borderRadius: 10,
  },
  input: { flex: 1, color: 'white', marginLeft: 10, fontSize: 16 }
});