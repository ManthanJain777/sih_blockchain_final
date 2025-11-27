import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { VerifyPage } from './pages/VerifyPage';
import { AboutPage } from './pages/AboutPage';
import { CertificateUploadPage } from './pages/CertificateUploadPage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { PolkadotHeader } from './components/PolkadotHeader'; // NEW

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPolkadotConnected, setIsPolkadotConnected] = useState(false); // NEW

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

  // NEW: Polkadot connection handler
  const handlePolkadotConnection = (connected: boolean) => {
    setIsPolkadotConnected(connected);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handlePageChange} isPolkadotConnected={isPolkadotConnected} />;
      case 'upload':
        return <UploadPage isPolkadotConnected={isPolkadotConnected} />;
      case 'certificate':
        return <CertificateUploadPage isPolkadotConnected={isPolkadotConnected} />;
      case 'transactions':
        return <TransactionHistoryPage />;
      case 'verify':
        return <VerifyPage isPolkadotConnected={isPolkadotConnected} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handlePageChange} isPolkadotConnected={isPolkadotConnected} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NEW: Polkadot Header */}
      <PolkadotHeader onConnectionChange={handlePolkadotConnection} />
      
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
      </main>
      
      <footer className="bg-card border-t-2 border-border/50 py-8 mt-20 relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 w-60 h-60 bg-[#8B5CF6]/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-card-foreground font-bold uppercase tracking-wide mb-2">
            Polkadot File Verifier
          </p>
          <p className="text-card-foreground/60">
            Powered by SHA256 and Polkadot Blockchain Technology
          </p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}