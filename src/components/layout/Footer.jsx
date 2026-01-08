import React from 'react';

const Footer = () => {
    // Helper component for consistent link styling
    const FooterLink = ({ href, children }) => (
        <a
            href={href}
            className="text-sm text-gray-400 hover:text-indigo-400 transition duration-200 block"
        >
            {children}
        </a>
    );

    return (
        <footer className="bg-gray-900 text-white mt-16 border-t border-gray-800" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Main Grid Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
                    
                    {/* Column 1: Brand & Mission */}
                    <div>
                        <h3 className="text-3xl font-extrabold text-indigo-400 tracking-wider">
                            E-Shop
                        </h3>
                        <p className="mt-4 text-sm text-gray-400 max-w-xs">
                            وجهتك الأولى للتسوق الإلكتروني. نقدم أحدث المنتجات بجودة لا مثيل لها.
                        </p>
                    </div>

                    {/* Column 2: Quick Links (التسوق) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">التسوق</h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/shop">جميع المنتجات</FooterLink></li>
                            <li><FooterLink href="/categories/new">المنتجات الجديدة</FooterLink></li>
                            <li><FooterLink href="/categories/offers">العروض الخاصة</FooterLink></li>
                            <li><FooterLink href="/gift-cards">بطاقات الهدايا</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service (خدمة العملاء) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">خدمة العملاء</h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/contact">اتصل بنا</FooterLink></li>
                            <li><FooterLink href="/faq">الأسئلة الشائعة</FooterLink></li>
                            <li><FooterLink href="/shipping">الشحن والتوصيل</FooterLink></li>
                            <li><FooterLink href="/returns">سياسة الإرجاع</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 4: Company (الشركة) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">الشركة</h4>
                        <ul className="space-y-3">
                            <li><FooterLink href="/about">من نحن</FooterLink></li>
                            <li><FooterLink href="/blog">مدونة المتجر</FooterLink></li>
                            <li><FooterLink href="/privacy">سياسة الخصوصية</FooterLink></li>
                            <li><FooterLink href="/terms">شروط الاستخدام</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 5: Social Media & Newsletter CTA */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="text-lg font-semibold mb-4 text-white">تابعنا</h4>
                        
                        {/* Social Icons */}
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            {/* Facebook */}
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-indigo-400 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.657 9.184 8.438 9.874V14.82h-2.93v-2.82h2.93v-2.13c0-2.906 1.77-4.49 4.368-4.49 1.246 0 2.31.092 2.625.134v2.75h-1.64c-1.29 0-1.54.614-1.54 1.51v1.92h3.06l-.4 2.82h-2.66v6.054C18.343 21.184 22 17.016 22 12c0-5.523-4.477-10-10-10z"/></svg>
                            </a>
                            {/* Instagram */}
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-indigo-400 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2.2c-1.9 0-3.4 1.5-3.4 3.4v8.4c0 1.9 1.5 3.4 3.4 3.4h8.4c1.9 0 3.4-1.5 3.4-3.4V7.8c0-1.9-1.5-3.4-3.4-3.4H7.6zm9.6 1.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 4.8c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8z"/></svg>
                            </a>
                            {/* Twitter/X */}
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-indigo-400 transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.34-1.6.56-2.46.69.88-.53 1.56-1.37 1.88-2.37-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.37 0-4.3 1.93-4.3 4.3 0 .34.04.67.11.99C8.7 9.29 5.8 7.7 3.88 5.15c-.37.63-.58 1.36-.58 2.14 0 1.49.76 2.8 1.92 3.56-.7-.02-1.35-.21-1.92-.53v.05c0 2.09 1.49 3.83 3.47 4.22-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.72 2.15 2.97 4.05 3.01-1.48 1.16-3.35 1.85-5.38 1.85-.35 0-.7-.02-1.04-.06C3.4 20.4 5.5 21 7.6 21c8.16 0 12.6-6.75 12.6-12.6 0-.19-.01-.37-.01-.56.87-.63 1.62-1.42 2.22-2.32z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar (Copyright & Credits) */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-right">
                    
                    {/* Copyright */}
                    <p className="text-sm text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {new Date().getFullYear()} E-Shop. جميع الحقوق محفوظة.
                    </p>
                    
                    {/* Credits/Tech Stack */}
                    <div className="flex space-x-6 rtl:space-x-reverse order-1 md:order-2">
                        <span className="text-xs font-medium text-gray-600">
                            بني بواسطة React & Tailwind CSS
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;