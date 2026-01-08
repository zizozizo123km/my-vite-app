import React from 'react';
import { ShoppingBag, Truck, ShieldCheck, ArrowRight, Star } from 'lucide-react';

// --- MOCK DATA (Replace with actual API calls in production) ---
const mockProducts = [
  { id: 1, name: 'سماعات رأس لاسلكية فاخرة', price: 299.99, rating: 4.8, imageUrl: 'https://via.placeholder.com/400x400/1e293b/ffffff?text=Product+1', isNew: true },
  { id: 2, name: 'ساعة ذكية رياضية', price: 149.50, rating: 4.5, imageUrl: 'https://via.placeholder.com/400x400/334155/ffffff?text=Product+2', isNew: false },
  { id: 3, name: 'حقيبة ظهر جلدية عصرية', price: 89.00, rating: 4.9, imageUrl: 'https://via.placeholder.com/400x400/475569/ffffff?text=Product+3', isNew: false },
  { id: 4, name: 'كاميرا فورية احترافية', price: 399.99, rating: 4.7, imageUrl: 'https://via.placeholder.com/400x400/64748b/ffffff?text=Product+4', isNew: true },
];

const mockCategories = [
  { id: 1, name: 'الإلكترونيات', icon: ShoppingBag, slug: 'electronics' },
  { id: 2, name: 'الأزياء والملابس', icon: Truck, slug: 'fashion' },
  { id: 3, name: 'المنزل والمطبخ', icon: ShieldCheck, slug: 'home' },
];

// --- HELPER COMPONENTS ---

const ProductCard = ({ product }) => {
  // Utility function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < fullStars ? "currentColor" : "none"}
        strokeWidth={1.5}
        className="text-yellow-500"
      />
    ));
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
            جديد
          </span>
        )}
        <a
          href={`/product/${product.id}`}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`عرض تفاصيل ${product.name}`}
        >
          <span className="text-white text-lg font-semibold border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors">
            عرض المنتج
          </span>
        </a>
      </div>
      <div className="p-4 text-right">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
        <div className="flex justify-end items-center mb-2">
          <span className="flex ltr:flex-row-reverse rtl:flex-row">
            {renderStars(product.rating)}
          </span>
          <span className="text-sm text-gray-500 mr-2">({product.rating})</span>
        </div>
        <p className="text-2xl font-bold text-indigo-600">
          {product.price.toFixed(2)} ر.س
        </p>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }) => (
  <a
    href={`/category/${category.slug}`}
    className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
  >
    <category.icon className="w-10 h-10 text-indigo-600 mb-3" />
    <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
  </a>
);

// --- MAIN PAGE ---

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section */}
      <header className="relative bg-gray-900 h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image/Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275371099-b141a189037e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} role="img" aria-label="خلفية لمنتجات تقنية"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            اكتشف أحدث المنتجات التقنية
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            تسوق الآن واستفد من عروض حصرية لا مثيل لها على أفضل الماركات العالمية.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition duration-300 transform hover:scale-105"
          >
            ابدأ التسوق الآن
            <ArrowRight className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">

        {/* 2. Value Proposition / Trust Badges */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center p-4">
            <Truck className="w-10 h-10 text-indigo-600 mb-3" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-800">شحن مجاني وسريع</h3>
            <p className="text-sm text-gray-500">لجميع الطلبات التي تزيد قيمتها عن 300 ر.س.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <ShieldCheck className="w-10 h-10 text-indigo-600 mb-3" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-800">ضمان الجودة</h3>
            <p className="text-sm text-gray-500">منتجات أصلية 100% مع ضمان استرجاع.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <ShoppingBag className="w-10 h-10 text-indigo-600 mb-3" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-gray-800">دعم 24/7</h3>
            <p className="text-sm text-gray-500">فريق دعم فني جاهز للإجابة على استفساراتك.</p>
          </div>
        </section>

        {/* 3. Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">تصفح حسب الفئات</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
            {mockCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* 4. Featured Products (Best Sellers) */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">المنتجات الأكثر مبيعاً</h2>
            <a href="/shop" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              عرض الكل
              <ArrowRight className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0 transform rtl:rotate-180" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. Promotional Banner */}
        <section className="bg-indigo-700 rounded-xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            خصم 20% على أول طلب!
          </h2>
          <p className="text-lg text-indigo-200 mb-6">
            اشترك في نشرتنا البريدية للحصول على الكود الخاص بك.
          </p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full px-5 py-3 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-0 shadow-inner text-right"
              required
              aria-label="البريد الإلكتروني للاشتراك"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
            >
              اشترك الآن
            </button>
          </form>
        </section>

      </main>
    </div>
  );
};

export default HomePage;