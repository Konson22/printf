import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type Event = {
  id: string;
  title: string;
  date: string;
  venue: string;
  price: number;
  image?: string;
  description?: string;
};

export type CartItem = {
  event: Event;
  quantity: number;
};

export type Ticket = {
  id: string;
  event: Event;
  quantity: number;
  purchasedAt: string;
};

type BookingState = {
  cartItems: CartItem[];
  tickets: Ticket[];
  events: Event[];
};

type BookingAction =
  | { type: 'ADD_TO_CART'; event: Event; quantity: number }
  | { type: 'REMOVE_FROM_CART'; eventId: string }
  | { type: 'UPDATE_QUANTITY'; eventId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'CHECKOUT' }
  | { type: 'SET_EVENTS'; events: Event[] };

const BookingContext = createContext<{
  state: BookingState;
  addToCart: (event: Event, quantity?: number) => void;
  removeFromCart: (eventId: string) => void;
  updateQuantity: (eventId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => void;
  setEvents: (events: Event[]) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
} | null>(null);

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.events };
    case 'ADD_TO_CART': {
      const existing = state.cartItems.find((item) => item.event.id === action.event.id);
      const nextItems = existing
        ? state.cartItems.map((item) =>
            item.event.id === action.event.id
              ? { ...item, quantity: item.quantity + (action.quantity || 1) }
              : item
          )
        : [...state.cartItems, { event: action.event, quantity: action.quantity || 1 }];
      return { ...state, cartItems: nextItems };
    }
    case 'REMOVE_FROM_CART': {
      return { ...state, cartItems: state.cartItems.filter((c) => c.event.id !== action.eventId) };
    }
    case 'UPDATE_QUANTITY': {
      const next = state.cartItems
        .map((c) => (c.event.id === action.eventId ? { ...c, quantity: action.quantity } : c))
        .filter((c) => c.quantity > 0);
      return { ...state, cartItems: next };
    }
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'CHECKOUT': {
      if (state.cartItems.length === 0) return state;
      const now = new Date().toISOString();
      const tickets: Ticket[] = [
        ...state.tickets,
        ...state.cartItems.map((item, idx) => ({
          id: `${item.event.id}-${now}-${idx}`,
          event: item.event,
          quantity: item.quantity,
          purchasedAt: now,
        })),
      ];
      return { ...state, cartItems: [], tickets };
    }
    default:
      return state;
  }
}

export function BookingProvider({ children, initialEvents = [] as Event[] }: { children: React.ReactNode; initialEvents?: Event[] }) {
  const [state, dispatch] = useReducer(bookingReducer, {
    cartItems: [],
    tickets: [],
    events: initialEvents,
  });

  const addToCart = (event: Event, quantity: number = 1) => dispatch({ type: 'ADD_TO_CART', event, quantity });
  const removeFromCart = (eventId: string) => dispatch({ type: 'REMOVE_FROM_CART', eventId });
  const updateQuantity = (eventId: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', eventId, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const checkout = () => dispatch({ type: 'CHECKOUT' });
  const setEvents = (events: Event[]) => dispatch({ type: 'SET_EVENTS', events });

  const getCartCount = () => state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getCartTotal = () => state.cartItems.reduce((sum, item) => sum + item.quantity * item.event.price, 0);

  const value = useMemo(
    () => ({ state, addToCart, removeFromCart, updateQuantity, clearCart, checkout, setEvents, getCartCount, getCartTotal }),
    [state]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}

