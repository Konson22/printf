import { useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useBooking } from '@/context/BookingContext';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, addToCart } = useBooking();
  const event = useMemo(() => state.events.find((e) => e.id === id), [state.events, id]);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Event not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {event.image ? <Image source={{ uri: event.image }} style={styles.image} /> : null}
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{new Date(event.date).toLocaleString()}</Text>
      <Text style={styles.meta}>{event.venue}</Text>
      {event.description ? <Text style={styles.description}>{event.description}</Text> : null}
      <View style={styles.row}>
        <Text style={styles.price}>${event.price.toFixed(2)}</Text>
        <Pressable style={styles.button} onPress={() => addToCart(event)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700',
  },
  meta: {
    marginTop: 4,
    color: '#6b7280',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  row: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});

