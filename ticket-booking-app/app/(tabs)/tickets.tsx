import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useBooking } from '@/context/BookingContext';

export default function TicketsScreen() {
  const { state } = useBooking();
  const { tickets } = state;

  if (tickets.length === 0) {
    return (
      <View style={styles.center}> 
        <Text style={styles.empty}>No tickets yet. Buy something from Events.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={tickets}
      keyExtractor={(t) => t.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.event.title}</Text>
          <Text style={styles.meta}>{new Date(item.event.date).toLocaleString()}</Text>
          <Text style={styles.meta}>{item.event.venue}</Text>
          <Text style={styles.meta}>Qty: {item.quantity}</Text>
          <Text style={styles.meta}>Purchased: {new Date(item.purchasedAt).toLocaleString()}</Text>
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  empty: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#11182710',
    borderRadius: 12,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    color: '#6b7280',
    marginTop: 2,
  },
});

