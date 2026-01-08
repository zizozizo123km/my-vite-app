import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';

// Helper component for consistent navigation links
const NavItem = ({ children }) => (
  <a 
    href="#" 
    className="text-gray-600 hover:text-indigo-600 transition duration-150 font-medium px-3 py-2 text-lg"
  >
    {children}
  </a>
);

function App() {
  const [cartCount, setCartCount] = useState(2); // Example state for cart items
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-right" dir="rtl">
      
      {/* --- Header / Navigation Bar --- */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-3xl font-extrabold text-indigo-700 tracking-tight cursor-pointer">
                E-Store
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 space-x-reverse">
              <NavItem>الرئيسية</NavItem>
              <NavItem>المنتجات</NavItem>
              <NavItem>العروض الخاصة</NavItem>
              <NavItem>تواصل معنا</NavItem>
            </nav>

            {/* Actions (Search, Cart, Menu Toggle) */}
            <div className="flex items-center space-x-4 space-x-reverse">
              
              {/* Search Button */}
              <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100">
                <Search className="w-6 h-6" />
              </button>

              {/* Cart Button */}
              <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 left-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-inner pb-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">الرئيسية</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">المنتجات</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">العروض الخاصة</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">تواصل معنا</a>
            </div>
          </div>
        )}
      </header>

      {/* --- Main Content Area (Router Outlet) --- */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4 border-indigo-100">
          اكتشف أحدث المنتجات
        </h1>
        
        {/* Placeholder for Product Grid or Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Hero/Banner Placeholder */}
          <div className="lg:col-span-2 bg-indigo-600 text-white p-10 rounded-xl shadow-2xl flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-2">تخفيضات الصيف الكبرى!</h2>
            <p className="text-indigo-100 text-lg mb-6">خصومات تصل إلى 50% على الإلكترونيات والأزياء.</p>
            <button className="self-start bg-white text-indigo-700 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300">
              تسوق الآن
            </button>
          </div>

          {/* Featured Category Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">أفضل المبيعات</h3>
            <ul className="space-y-3">
              <li className="text-gray-600 hover:text-indigo-600 cursor-pointer transition">هواتف ذكية</li>
              <li className="text-gray-600 hover:text-indigo-600 cursor-pointer transition">ملابس رجالية</li>
              <li className="text-gray-600 hover:text-indigo-600 cursor-pointer transition">أدوات منزلية</li>
            </ul>
            <a href="#" className="mt-4 text-indigo-600 font-medium hover:underline">عرض الكل &larr;</a>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-700">
                هذا هو الهيكل الأساسي لتطبيق React، جاهز لاستقبال مكونات الصفحات (مثل <code>&lt;ProductPage /&gt;</code> أو <code>&lt;Checkout /&gt;</code>) عبر React Router.
            </p>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 mt-16">
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-right">
            
            {/* Column 1: Store Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">E-Store</h4>
              <p className="text-gray-400 text-sm">
                متجرك المفضل للتسوق عبر الإنترنت. جودة عالية وأسعار منافسة.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm">من نحن</a></li>
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm">الأسئلة الشائعة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm">تتبع الطلب</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">الدعم القانوني</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm">سياسة الخصوصية</a></li>
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm">شروط الاستخدام</a></li>
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition text-sm">سياسة الإرجاع</a></li>
              </ul>
            </div>
            
            {/* Column 4: Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">تواصل معنا</h4>
              <p className="text-gray-400 text-sm">البريد: info@estore.com</p>
              <p className="text-gray-400 text-sm mt-1">الهاتف: 966500000000+</p>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} E-Store. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;