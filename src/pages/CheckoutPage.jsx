import React, { useState, useMemo } from 'react';

// --- Dummy Data (In a real app, this would come from Redux/Context/API) ---
const initialCartItems = [
  { id: 1, name: 'Premium Espresso Blend', price: 19.99, quantity: 2, image: 'coffee-1.jpg' },
  { id: 2, name: 'Ceramic Pour-Over Mug', price: 24.50, quantity: 1, image: 'mug-2.jpg' },
];

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', cost: 5.00, delivery: '4-7 business days' },
  { id: 'express', name: 'Express Shipping', cost: 15.00, delivery: '1-2 business days' },
];

const initialShippingInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: 'USA',
  zip: '',
};

const CheckoutPage = () => {
  const [cartItems] = useState(initialCartItems);
  const [shippingInfo, setShippingInfo] = useState(initialShippingInfo);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Calculations ---
  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), 
    [cartItems]
  );
  
  const shippingCost = selectedShipping.cost;
  const taxRate = 0.08; // 8% tax
  const taxAmount = (subtotal + shippingCost) * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!shippingInfo.firstName) newErrors.firstName = 'First name is required.';
    if (!shippingInfo.address) newErrors.address = 'Address is required.';
    if (!shippingInfo.email || !/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = 'Valid email is required.';
    if (!shippingInfo.zip) newErrors.zip = 'Zip code is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Order Placed:', {
        shippingInfo,
        selectedShipping,
        paymentMethod,
        total: total.toFixed(2),
      });
      setIsProcessing(false);
      alert('Order successfully placed! Thank you.');
      // In a real app, redirect to confirmation page
    }, 2000);
  };

  // --- Reusable Input Component ---
  const InputField = ({ label, name, type = 'text', required = false, placeholder = '' }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={shippingInfo[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border ${errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} shadow-sm p-3 transition duration-150 sm:text-sm`}
      />
      {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
    </div>
  );

  // --- JSX Structure ---
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-10">
          Secure Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
          
          {/* Column 1 & 2: Forms (2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1. Shipping Information */}
            <div className="bg-white p-8 shadow-lg rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">
                1. Shipping Details
              </h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                <InputField label="First Name" name="firstName" required />
                <InputField label="Last Name" name="lastName" />
                <InputField label="Email Address" name="email" type="email" required />
                <InputField label="Phone Number" name="phone" type="tel" />
              </div>
              <div className="mt-6">
                <InputField label="Street Address" name="address" required />
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6 mt-4">
                  <InputField label="City" name="city" />
                  <InputField label="Zip / Postal Code" name="zip" required />
                  <InputField label="Country" name="country" />
                </div>
              </div>
            </div>

            {/* 2. Shipping Method */}
            <div className="bg-white p-8 shadow-lg rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">
                2. Shipping Method
              </h2>
              <div className="space-y-4">
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border rounded-lg cursor-pointer transition duration-150 ${
                      selectedShipping.id === option.id
                        ? 'border-indigo-600 ring-2 ring-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedShipping(option)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <input
                          id={option.id}
                          name="shipping-method"
                          type="radio"
                          checked={selectedShipping.id === option.id}
                          onChange={() => setSelectedShipping(option)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor={option.id} className="ml-3 block text-base font-medium text-gray-900">
                          {option.name}
                        </label>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">
                        ${option.cost.toFixed(2)}
                      </span>
                    </div>
                    <p className="ml-7 text-sm text-gray-500">{option.delivery}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Payment Information */}
            <div className="bg-white p-8 shadow-lg rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">
                3. Payment
              </h2>
              
              <div className="space-y-4">
                {['credit_card', 'paypal'].map((method) => (
                    <div 
                        key={method}
                        className={`p-4 border rounded-lg cursor-pointer transition duration-150 ${
                            paymentMethod === method
                                ? 'border-indigo-600 ring-2 ring-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-400'
                        }`}
                        onClick={() => setPaymentMethod(method)}
                    >
                        <div className="flex items-center">
                            <input
                                id={method}
                                name="payment-method"
                                type="radio"
                                checked={paymentMethod === method}
                                onChange={() => setPaymentMethod(method)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <label htmlFor={method} className="ml-3 block text-base font-medium text-gray-900 capitalize">
                                {method.replace('_', ' ')}
                            </label>
                        </div>
                        {paymentMethod === method && method === 'credit_card' && (
                            <div className="mt-4 p-4 bg-white rounded-md border border-gray-200">
                                <p className="text-sm text-gray-500 italic">
                                    (Placeholder for secure payment gateway integration)
                                </p>
                                <div className="mt-3">
                                    <InputField label="Card Number" name="cardNumber" placeholder="XXXX XXXX XXXX XXXX" required={false} />
                                    <div className="grid grid-cols-3 gap-4">
                                        <InputField label="Expiration" name="expiry" placeholder="MM/YY" required={false} />
                                        <InputField label="CVC" name="cvc" placeholder="123" required={false} />
                                        <InputField label="Name on Card" name="cardName" required={false} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Order Summary (1/3 width) */}
          <div className="mt-10 lg:mt-0">
            <div className="sticky top-8 bg-white p-8 shadow-2xl rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-3">
                Order Summary
              </h2>

              {/* Item List */}
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                      <img
                        src={`/images/${item.image}`} // Placeholder path
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Shipping ({selectedShipping.name})</dt>
                  <dd className="font-medium text-gray-900">${shippingCost.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Taxes (8%)</dt>
                  <dd className="font-medium text-gray-900">${taxAmount.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-bold">
                  <dt className="text-gray-900">Order Total</dt>
                  <dd className="text-indigo-600">${total.toFixed(2)}</dd>
                </div>
              </dl>

              {/* Place Order Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isProcessing || cartItems.length === 0}
                  className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition duration-200 ${
                    isProcessing || cartItems.length === 0
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Place Order (${total.toFixed(2)})`
                  )}
                </button>
              </div>
              <p className="mt-6 text-center text-sm text-gray-500">
                By placing your order, you agree to our Terms and Conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;