import React from 'react';
import { ShoppingCart, User, Heart, Search, Menu, ChevronDown } from 'lucide-react';

const navItems = [
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
    { name: 'Contact', href: '/contact' },
];

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            {/* Top Bar (Optional: Announcements/Shipping Info) */}
            <div className="bg-indigo-600 text-white text-center text-xs py-1 hidden sm:block">
                Free shipping on orders over $50!
            </div>

            {/* Main Header Row */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                
                {/* 1. Logo and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    {/* Mobile Menu Toggle */}
                    <button 
                        aria-label="Open menu"
                        className="lg:hidden p-2 text-gray-700 hover:text-indigo-600 transition duration-150"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    
                    {/* Logo */}
                    <a href="/" className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                        E-Store
                    </a>
                </div>

                {/* 2. Search Bar (Center - Hidden on small mobile) */}
                <div className="hidden md:flex flex-grow max-w-2xl mx-8">
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            placeholder="Search products, brands, or categories..." 
                            className="w-full py-2 pl-5 pr-12 border border-gray-300 rounded-full bg-gray-50 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                        />
                        <button 
                            aria-label="Search"
                            className="absolute right-0 top-0 h-full px-4 text-white bg-indigo-600 rounded-r-full hover:bg-indigo-700 transition duration-150"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 3. Action Icons (Right) */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    
                    {/* Search Icon (Mobile Only) */}
                    <button 
                        aria-label="Search"
                        className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition duration-150"
                    >
                        <Search className="w-6 h-6" />
                    </button>

                    {/* Account */}
                    <button 
                        aria-label="Account" 
                        className="relative p-2 text-gray-700 hover:text-indigo-600 transition duration-150 group"
                    >
                        <User className="w-6 h-6" />
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 group-hover:text-indigo-600 hidden sm:block">Account</span>
                    </button>

                    {/* Wishlist */}
                    <button 
                        aria-label="Wishlist" 
                        className="relative p-2 text-gray-700 hover:text-indigo-600 transition duration-150 group"
                    >
                        <Heart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-pink-500 rounded-full transform translate-x-1/3 -translate-y-1/3 border-2 border-white">
                            3
                        </span>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 group-hover:text-indigo-600 hidden sm:block">Wishlist</span>
                    </button>

                    {/* Cart */}
                    <button 
                        aria-label="Shopping Cart" 
                        className="relative p-2 text-gray-700 hover:text-indigo-600 transition duration-150 group"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full transform translate-x-1/3 -translate-y-1/3 border-2 border-white">
                            12
                        </span>
                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 group-hover:text-indigo-600 hidden sm:block">Cart</span>
                    </button>
                </div>
            </div>

            {/* Secondary Navigation Bar (Desktop Only) */}
            <div className="hidden lg:block border-t border-gray-100 bg-gray-50">
                <div className="container mx-auto px-8 flex justify-center space-x-10 py-2">
                    
                    {/* Category Dropdown (Example) */}
                    <div className="relative group">
                        <button className="flex items-center text-sm font-semibold text-gray-700 hover:text-indigo-600 transition duration-150 py-1">
                            All Categories
                            <ChevronDown className="w-4 h-4 ml-1" />
                        </button>
                        {/* Dropdown content would go here */}
                    </div>

                    {/* Main Links */}
                    {navItems.map((item) => (
                        <a 
                            key={item.name} 
                            href={item.href} 
                            className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition duration-150 py-1 uppercase tracking-wide"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;