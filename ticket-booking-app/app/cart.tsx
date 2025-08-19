import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useBooking } from '@/context/BookingContext';

export default function CartScreen() {
  const { state, updateQuantity, removeFromCart, checkout, getCartTotal } = useBooking();

  if (state.cartItems.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={styles.list}
        data={state.cartItems}
        keyExtractor={(item) => item.event.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.event.title}</Text>
            <Text style={styles.meta}>{new Date(item.event.date).toLocaleString()} • {item.event.venue}</Text>
            <View style={styles.row}>
              <View style={styles.qtyRow}>
                <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.event.id, Math.max(0, item.quantity - 1))}>
                  <Text style={styles.qtyText}>-</Text>
                </Pressable>
                <Text style={styles.qtyVal}>{item.quantity}</Text>
                <Pressable style={styles.qtyBtn} onPress={() => updateQuantity(item.event.id, item.quantity + 1)}>
                  <Text style={styles.qtyText}>+</Text>
                </Pressable>
              </View>
              <Text style={styles.price}>${(item.quantity * item.event.price).toFixed(2)}</Text>
            </View>
            <Pressable style={styles.remove} onPress={() => removeFromCart(item.event.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
      <View style={styles.checkoutBar}>
        <Text style={styles.total}>Total: ${getCartTotal().toFixed(2)}</Text>
        <Pressable style={styles.checkoutBtn} onPress={checkout}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  empty: { color: '#6b7280' },
  card: { backgroundColor: '#11182710', borderRadius: 12, padding: 12, marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#6b7280', marginTop: 2 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { backgroundColor: '#e5e7eb', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  qtyText: { fontSize: 16, fontWeight: '700' },
  qtyVal: { minWidth: 24, textAlign: 'center', fontWeight: '700' },
  price: { fontWeight: '700' },
  remove: { marginTop: 8 },
  removeText: { color: '#ef4444' },
  checkoutBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderTopWidth: 1, borderColor: '#e5e7eb' },
  total: { fontSize: 16, fontWeight: '700' },
  checkoutBtn: { backgroundColor: '#16a34a', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  checkoutText: { color: 'white', fontWeight: '700' },
});

