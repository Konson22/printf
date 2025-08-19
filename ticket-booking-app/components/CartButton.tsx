import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useBooking } from '@/context/BookingContext';

export function CartButton() {
  const { getCartCount } = useBooking();
  const count = getCartCount();

  return (
    <Link href="/cart" asChild>
      <Pressable style={{ marginRight: 16 }} accessibilityRole="button" accessibilityLabel="Open cart">
        <View>
          <FontAwesome name="shopping-cart" size={24} />
          {count > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#e11d48',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

