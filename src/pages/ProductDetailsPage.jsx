import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, Star, Loader2 } from 'lucide-react';

// --- MOCK DATA ---
const mockProduct = {
  id: 'p101',
  name: 'Premium Ergonomic Office Chair',
  price: 499.99,
  currency: 'USD',
  description: 'Experience unparalleled comfort and support with our Premium Ergonomic Office Chair. Featuring adjustable lumbar support, 4D armrests, and a breathable mesh back, this chair is designed for long hours of productivity.',
  details: [
    'Adjustable Lumbar Support',
    '4D Multi-directional Armrests',
    'High-density Cold-cure Foam Seat',
    'Breathable Mesh Backing',
    'Weight Capacity: 350 lbs',
  ],
  stock: 15,
  rating: 4.7,
  reviewCount: 124,
  images: [
    'https://images.unsplash.com/photo-1596558448866-98188289895c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596558448866-98188289895c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596558448866-98188289895c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1596558448866-98188289895c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  ],
};

// --- HELPER FUNCTIONS ---
const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

const ProductDetailsPage = () => {
  // In a real app, we would use `useParams` to get the product ID
  // const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // --- Data Fetching Simulation ---
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Assume successful fetch
        setProduct(mockProduct);
        setSelectedImage(mockProduct.images[0]);
      } catch (err) {
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []); // Dependency array is empty to run once on mount

  // --- Handlers ---
  const handleQuantityChange = useCallback((change) => {
    setQuantity(prev => {
      const newQty = prev + change;
      // Prevent quantity from going below 1 or exceeding stock
      if (newQty < 1) return 1;
      if (product && newQty > product.stock) return product.stock;
      return newQty;
    });
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    console.log(`Added ${quantity} x ${product.name} to cart.`);
    // In a real app: dispatch action to Redux/Context, show toast notification.
    navigate('/cart'); // Simulate redirecting to cart
  };

  // --- Render States ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" role="status" aria-label="Loading product details" />
        <p className="ml-3 text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-red-50">
        <h2 className="text-2xl font-bold text-red-700">Error</h2>
        <p className="mt-2 text-red-600">{error || 'Product not found.'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
        >
          Go Home
        </button>
      </div>
    );
  }

  // --- Main Content Rendering ---

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <ol className="flex space-x-2">
            <li><a href="/" className="text-gray-500 hover:text-gray-700">Home</a></li>
            <li className="text-gray-400">/</li>
            <li><a href="/products" className="text-gray-500 hover:text-gray-700">Products</a></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Product Image Gallery (Left Column) */}
          <div className="lg:sticky lg:top-8">
            {/* Main Image */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
              <img
                src={selectedImage}
                alt={`${product.name} main view`}
                className="h-full w-full object-cover object-center transition duration-300 ease-in-out hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-6">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition duration-200 ${
                      selectedImage === image ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-200 hover:border-gray-400'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details (Right Column) */}
          <div className="mt-10 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Price and Rating */}
            <div className="mt-3 flex items-center justify-between">
              <p className="text-4xl font-bold text-indigo-600">
                {formatPrice(product.price, product.currency)}
              </p>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        product.rating >= i + 1 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mt-4">
              <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                {isOutOfStock ? 'Out of Stock' : `In Stock (${product.stock} available)`}
              </p>
            </div>

            {/* Controls: Quantity and Add to Cart */}
            <div className="mt-10">
              <div className="flex items-center space-x-6">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center border-x border-gray-300 py-2 text-lg font-medium focus:outline-none"
                    aria-live="polite"
                    aria-label={`Current quantity: ${quantity}`}
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="p-3 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white transition duration-200 ${
                    isOutOfStock
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-xl font-bold text-gray-900">Specifications</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;