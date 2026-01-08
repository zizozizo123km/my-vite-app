import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

// ----------------------------------------------------------------------
// 1. Define Types and Initial State
// ----------------------------------------------------------------------

/**
 * @typedef {Object} CartItem
 * @property {string | number} id - Unique product identifier.
 * @property {string} name - Product name.
 * @property {number} price - Unit price of the product.
 * @property {number} quantity - Quantity of the product in the cart.
 */

/**
 * @typedef {Object} CartContextValue
 * @property {CartItem[]} items - Array of items currently in the cart.
 * @property {number} subtotal - Total cost of all items (price * quantity).
 * @property {number} totalItems - Total count of all product quantities.
 * @property {(product: Omit<CartItem, 'quantity'>, quantity?: number) => void} addItem - Function to add an item to the cart or increase its quantity.
 * @property {(productId: string | number) => void} removeItem - Function to remove an item completely from the cart.
 * @property {(productId: string | number, newQuantity: number) => void} updateItemQuantity - Function to set a specific quantity for an item.
 * @property {() => void} clearCart - Function to empty the entire cart.
 */

const CartContext = createContext(undefined);

// ----------------------------------------------------------------------
// 2. Custom Hook for Context Consumption
// ----------------------------------------------------------------------

/**
 * Hook to access the cart state and actions.
 * @returns {CartContextValue}
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// ----------------------------------------------------------------------
// 3. Cart Provider Component
// ----------------------------------------------------------------------

/**
 * Provides the cart state and logic to the application.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // --- Actions ---

  const addItem = useCallback((product, quantity = 1) => {
    setItems(prevItems => {
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

  const removeItem = useCallback((productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateItemQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // --- Derived State (Calculations) ---

  const { subtotal, totalItems } = useMemo(() => {
    let calculatedSubtotal = 0;
    let calculatedTotalItems = 0;

    items.forEach(item => {
      calculatedSubtotal += item.price * item.quantity;
      calculatedTotalItems += item.quantity;
    });

    // Use Math.round for safer currency calculation (though a dedicated library is better for high precision)
    const roundedSubtotal = Math.round(calculatedSubtotal * 100) / 100;

    return {
      subtotal: roundedSubtotal,
      totalItems: calculatedTotalItems,
    };
  }, [items]);

  // --- Context Value Memoization ---

  const contextValue = useMemo(() => ({
    items,
    subtotal,
    totalItems,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
  }), [
    items,
    subtotal,
    totalItems,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;