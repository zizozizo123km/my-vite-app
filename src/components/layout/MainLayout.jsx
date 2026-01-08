import React from 'react';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';

/**
 * MainLayout Component
 * Wraps the entire application content, providing consistent Header, Footer,
 * and ensuring the content area expands correctly using flexbox (min-h-screen).
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to be displayed within the layout.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 antialiased">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      {/* flex-grow ensures this section takes up all available vertical space, pushing the footer down */}
      <main className="flex-grow w-full">
        {/* Standard container for centering content and applying responsive padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;