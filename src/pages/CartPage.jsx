import React, { useState, useMemo, useCallback } from 'react';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

// --- Utility Functions ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// --- Mock Data (Replace with actual Redux/Context state management) ---
const initialCartItems = [
  {
    id: 101,
    name: 'Pro Mechanical Keyboard K-900',
    price: 189.99,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1587829713735-263a48e7e1f4?auto=format&fit=crop&w=150&q=80',
    color: 'Black',
    sku: 'KB-900-BLK',
  },
  {
    id: 102,
    name: 'Ergonomic Vertical Mouse',
    price: 49.50,
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1542393545-10f5c2439ad7?auto=format&fit=crop&w=150&q=80',
    color: 'White',
    sku: 'MS-VERT-WHT',
  },
  {
    id: 103,
    name: 'Noise Cancelling Headphones X-Pro',
    price: 299.00,
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5eef0b2184aa?auto=format&fit=crop&w=150&q=80',
    color: 'Silver',
    sku: 'HP-NC-XPRO',
  },
];

// --- Cart Item Component ---
const CartItem = ({ item, updateQuantity, removeItem }) => {
  const handleQuantityChange = (newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (quantity >= 1) {
      updateQuantity(item.id, quantity);
    }
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200 hover:bg-gray-50 transition duration-150">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 mr-4 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }}
        />
      </div>

      {/* Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">Color: {item.color}</p>
        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center mx-4">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-2 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus size={14} />
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="w-12 text-center border-t border-b border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          min="1"
          aria-label={`Current quantity of ${item.name}`}
        />
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-2 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end w-32">
        <p className="text-lg font-medium text-gray-900 mb-1">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <p className="text-sm text-gray-500">
          ({formatCurrency(item.price)} / unit)
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="mt-2 text-red-600 hover:text-red-800 flex items-center text-sm transition"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 size={16} className="mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

// --- Order Summary Component ---
const OrderSummary = ({ cartItems }) => {
  const SHIPPING_THRESHOLD = 250;
  const SHIPPING_COST = 15.00;
  const TAX_RATE = 0.075; // 7.5%

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const shipping = useMemo(() => {
    return subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  }, [subtotal]);

  const estimatedTax = useMemo(() => {
    return subtotal * TAX_RATE;
  }, [subtotal]);

  const total = subtotal + shipping + estimatedTax;

  const SummaryRow = ({ label, value, isTotal = false }) => (
    <div className={`flex justify-between ${isTotal ? 'text-xl font-bold pt-4 border-t border-gray-300 mt-4' : 'text-gray-700'}`}>
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  );

  return (
    <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg sticky top-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

      <div className="space-y-3">
        <SummaryRow label="Subtotal" value={subtotal} />
        <div className="flex justify-between text-gray-700">
          <span>Shipping Estimate</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'Free' : formatCurrency(shipping)}
          </span>
        </div>
        <p className="text-xs text-gray-500 text-right -mt-2">
          {subtotal < SHIPPING_THRESHOLD ? `Spend ${formatCurrency(SHIPPING_THRESHOLD - subtotal)} more for free shipping.` : 'You qualify for free shipping!'}
        </p>
        <SummaryRow label="Estimated Tax (7.5%)" value={estimatedTax} />
      </div>

      <SummaryRow label="Order Total" value={total} isTotal={true} />

      <button
        onClick={() => console.log('Proceeding to Checkout...')}
        className="w-full mt-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center disabled:bg-indigo-400"
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Taxes and shipping calculated at checkout.
      </p>
    </div>
  );
};

// --- Main Cart Page Component ---
const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = useCallback((id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-10">
          Your Shopping Cart
        </h1>

        {isCartEmpty ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-200">
            <ShoppingBag className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added anything yet. Start shopping!</p>
            <button
              onClick={() => console.log('Navigate to Shop')}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items List (2/3 width on desktop) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary (1/3 width on desktop) */}
            <div className="lg:col-span-1">
              <OrderSummary cartItems={cartItems} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;