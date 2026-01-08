import React from 'react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';

/**
 * Renders a modern, responsive product card component.
 *
 * @param {object} props
 * @param {object} props.product - The product data object.
 * @param {string} props.product.id
 * @param {string} props.product.name
 * @param {number} props.product.price
 * @param {string} props.product.imageUrl
 * @param {number} [props.product.rating=4.5]
 * @param {number} [props.product.discountPrice]
 */
const ProductCard = ({ product }) => {
  const {
    name,
    price,
    imageUrl,
    rating = 4.5,
    discountPrice,
  } = product;

  const displayPrice = discountPrice ? discountPrice : price;
  const isDiscounted = !!discountPrice;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      {/* Image Container */}
      <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden bg-gray-200 h-56 sm:h-72">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Optional Badge */}
        {isDiscounted && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase text-white shadow-md">
            Sale
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          <a href={`/products/${product.id}`} className="hover:text-indigo-600 transition-colors duration-200">
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </a>
        </h3>

        {/* Rating */}
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 ${
                rating > star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
              aria-hidden="true"
            />
          ))}
          <p className="ml-2 text-sm text-gray-500">({rating})</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-between mt-auto">
          <p className={`text-xl font-extrabold ${isDiscounted ? 'text-red-600' : 'text-gray-900'}`}>
            {formatCurrency(displayPrice)}
          </p>
          {isDiscounted && (
            <p className="text-sm text-gray-500 line-through ml-2">
              {formatCurrency(price)}
            </p>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-b-xl bg-indigo-600 px-4 py-3 text-base font-medium text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => console.log(`Added ${name} to cart`)}
      >
        <ShoppingCartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;