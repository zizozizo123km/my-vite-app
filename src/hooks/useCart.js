import { useState, useEffect, useMemo, useCallback } from 'react';

// Define the key for localStorage persistence
const CART_STORAGE_KEY = 'ecom_cart_items';

/**
 * Custom hook for managing the shopping cart state, persistence, and calculations.
 *
 * @returns {{
 *   cartItems: Array<{ id: string | number, name: string, price: number, quantity: number }>,
 *   addItem: (product: { id: string | number, name: string, price: number }, quantity?: number) => void,
 *   removeItem: (productId: string | number) => void,
 *   updateQuantity: (productId: string | number, newQuantity: number) => void,
 *   clearCart: () => void,
 *   totalItems: number,
 *   totalPrice: number,
 *   isCartEmpty: boolean
 * }}
 */
export const useCart = () => {
  // 1. State Initialization: Load from localStorage on initial render
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem(CART_STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // 2. Persistence: Save state to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // 3. Actions

  /**
   * Adds a product to the cart or increases its quantity if it already exists.
   * @param {{ id: string | number, name: string, price: number }} product
   * @param {number} [quantity=1]
   */
  const addItem = useCallback((product, quantity = 1) => {
    if (quantity <= 0) return;

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Item exists: Update quantity immutably
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
        return newItems;
      } else {
        // Item is new: Add to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  /**
   * Removes one unit of the product from the cart. If quantity reaches 0, the item is removed entirely.
   * @param {string | number} productId
   */
  const removeItem = useCallback((productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);

      if (!existingItem) return prevItems;

      if (existingItem.quantity > 1) {
        // Decrease quantity
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Remove item entirely
        return prevItems.filter(item => item.id !== productId);
      }
    });
  }, []);

  /**
   * Sets the quantity of a specific item directly. Removes the item if newQuantity is 0 or less.
   * @param {string | number} productId
   * @param {number} newQuantity
   */
  const updateQuantity = useCallback((productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }

      return prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  }, []);

  /**
   * Clears all items from the cart.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // 4. Calculations (Memoized for performance)

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const isCartEmpty = useMemo(() => totalItems === 0, [totalItems]);

  // 5. Return Hook Interface
  return {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartEmpty,
  };
};

export default useCart;