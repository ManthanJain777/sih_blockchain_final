import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { VerifyPage } from './pages/VerifyPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Handle initial hash
    const hash = window.location.hash.slice(1) || 'home';
    setCurrentPage(hash);

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) || 'home';
      setCurrentPage(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    window.location.hash = page;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} />;
      case 'upload':
        return <UploadPage />;
      case 'verify':
        return <VerifyPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
      </main>
      
      <footer className="bg-white border-t border-muted py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground">
            IPFS File Hasher &amp; Blockchain Verification System
          </p>
          <p className="text-muted-foreground mt-2">
            Powered by SHA256, IPFS, and Blockchain Technology
          </p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}
