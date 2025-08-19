import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useBooking } from '@/context/BookingContext';

export default function EventsScreen() {
  const { state, addToCart } = useBooking();

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={state.events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.image} />
          ) : null}
          <View style={styles.cardBody}>
            <Link href={`/events/${item.id}`}>
              <Text style={styles.title}>{item.title}</Text>
            </Link>
            <Text style={styles.meta}>{new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.meta}>{item.venue}</Text>
            <View style={styles.row}>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <Pressable style={styles.button} onPress={() => addToCart(item)}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#11182710',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    color: '#6b7280',
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
