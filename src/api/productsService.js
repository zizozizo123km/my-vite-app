// src/api/productsService.js

/**
 * @fileoverview Service layer for handling product-related API calls.
 * Currently uses mock data to simulate a backend API response, including latency.
 */

// --- Configuration ---
const API_BASE_URL = '/api/v1/products';
const NETWORK_DELAY_MS = 400; // Simulate realistic network latency

// --- Mock Data Structure ---
const MOCK_PRODUCTS = [
    {
        id: 'p1001',
        name: 'Premium Wireless Headphones',
        description: 'Experience crystal clear audio with noise cancellation and 30 hours of battery life.',
        price: 199.99,
        category: 'electronics',
        slug: 'premium-wireless-headphones',
        stock: 45,
        rating: 4.7,
        imageUrl: '/images/headphones.jpg',
        details: { color: 'Black', connectivity: 'Bluetooth 5.2' }
    },
    {
        id: 'p1002',
        name: 'Organic Cotton T-Shirt',
        description: 'Soft, breathable, and sustainably sourced organic cotton tee.',
        price: 29.50,
        category: 'apparel',
        slug: 'organic-cotton-tshirt',
        stock: 120,
        rating: 4.5,
        imageUrl: '/images/tshirt.jpg',
        details: { material: '100% Organic Cotton', size: ['S', 'M', 'L', 'XL'] }
    },
    {
        id: 'p1003',
        name: '4K Ultra HD Monitor 32"',
        description: 'Stunning visuals and high refresh rate perfect for gaming and professional design.',
        price: 450.00,
        category: 'electronics',
        slug: '4k-ultra-hd-monitor',
        stock: 15,
        rating: 4.9,
        imageUrl: '/images/monitor.jpg',
        details: { resolution: '3840x2160', refreshRate: '144Hz' }
    },
    {
        id: 'p1004',
        name: 'Minimalist Leather Wallet',
        description: 'Slim profile, genuine leather, and RFID blocking technology.',
        price: 55.00,
        category: 'accessories',
        slug: 'minimalist-leather-wallet',
        stock: 80,
        rating: 4.6,
        imageUrl: '/images/wallet.jpg',
        details: { material: 'Genuine Leather', slots: 6 }
    },
    {
        id: 'p1005',
        name: 'Espresso Machine Pro',
        description: 'Professional grade espresso machine for the perfect morning brew.',
        price: 799.99,
        category: 'home-goods',
        slug: 'espresso-machine-pro',
        stock: 8,
        rating: 4.8,
        imageUrl: '/images/espresso.jpg',
        details: { pressure: '15 Bar', capacity: '2L' }
    },
    {
        id: 'p1006',
        name: 'Running Shoes X-Series',
        description: 'Lightweight and responsive running shoes designed for long distances.',
        price: 120.00,
        category: 'apparel',
        slug: 'running-shoes-x-series',
        stock: 60,
        rating: 4.4,
        imageUrl: '/images/shoes.jpg',
        details: { size: [7, 8, 9, 10, 11, 12], color: 'Grey/Neon' }
    },
];

// --- Utility Functions ---

/**
 * Simulates network latency using a Promise.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- Service Functions ---

/**
 * Fetches a list of products with optional filtering and pagination.
 * In a real application, this would use `fetch(API_BASE_URL + queryParams)`.
 *
 * @param {object} params
 * @param {number} [params.page=1] - The current page number (1-indexed).
 * @param {number} [params.limit=10] - The number of items per page.
 * @param {string} [params.category='all'] - Filter by category slug.
 * @returns {Promise<{products: Array<object>, total: number, page: number, limit: number, totalPages: number}>}
 */
async function getAllProducts({ page = 1, limit = 10, category = 'all' } = {}) {
    await delay(NETWORK_DELAY_MS);

    try {
        let filteredProducts = MOCK_PRODUCTS;

        // Apply category filter
        if (category && category !== 'all') {
            filteredProducts = MOCK_PRODUCTS.filter(p => p.category === category);
        }

        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / limit);

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const products = filteredProducts.slice(startIndex, endIndex);

        return {
            products,
            total,
            page,
            limit,
            totalPages
        };

    } catch (error) {
        console.error(`[ProductsService] Error fetching products (Category: ${category}):`, error);
        // Re-throw a standardized error for the UI layer to handle
        throw new Error("Failed to retrieve products due to a server error.");
    }
}

/**
 * Fetches a single product by its unique ID.
 *
 * @param {string} id - The unique identifier of the product.
 * @returns {Promise<object>} The product object.
 * @throws {Error} If the product is not found.
 */
async function getProductById(id) {
    await delay(NETWORK_DELAY_MS);

    try {
        const product = MOCK_PRODUCTS.find(p => p.id === id);

        if (!product) {
            // Simulate a 404 response
            throw new Error(`Product with ID ${id} not found.`);
        }

        // Simulate a successful API response structure
        return product;

    } catch (error) {
        console.error(`[ProductsService] Error fetching product ID ${id}:`, error);
        throw error; // Re-throw the specific error (e.g., Not Found)
    }
}

/**
 * Fetches a list of unique categories available in the store.
 * @returns {Promise<Array<string>>}
 */
async function getProductCategories() {
    await delay(NETWORK_DELAY_MS / 2); // Faster response for metadata

    try {
        const categories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];
        
        // Add a default 'all' category for filtering UI
        return ['all', ...categories];
    } catch (error) {
        console.error("[ProductsService] Error fetching categories:", error);
        return ['all'];
    }
}


// --- Export Service Object ---

const productsService = {
    getAllProducts,
    getProductById,
    getProductCategories,
    // Add other product-related functions here (e.g., searchProducts, createProduct)
};

export default productsService;