import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ChatBot } from './components/ChatBot';
import { VerifyPage } from './pages/VerifyPage';
import { CertificateUploadPage } from './pages/CertificateUploadPage';
import { TransactionHistoryPage } from './pages/TransactionHistoryPage';
import { PolkadotHeader } from './components/PolkadotHeader'; // NEW

export default function App() {
  const allowedPages = ['certificate', 'transactions', 'verify'] as const;
  type Page = typeof allowedPages[number];

  const [currentPage, setCurrentPage] = useState<Page>('certificate');
  const [isPolkadotConnected, setIsPolkadotConnected] = useState(false); // NEW

  const normalizePage = (page: string): Page => {
    return allowedPages.includes(page as Page) ? (page as Page) : 'certificate';
  };

  useEffect(() => {
    // Handle initial hash with fallback to certificate
    const initialHash = window.location.hash.slice(1);
    const normalizedInitial = normalizePage(initialHash);
    setCurrentPage(normalizedInitial);
    if (initialHash !== normalizedInitial) {
      window.location.hash = normalizedInitial;
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1);
      const normalizedHash = normalizePage(newHash);
      setCurrentPage(normalizedHash);
      if (newHash !== normalizedHash) {
        window.location.hash = normalizedHash;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: Page) => {
    window.location.hash = page;
  };

  // NEW: Polkadot connection handler
  const handlePolkadotConnection = (connected: boolean) => {
    setIsPolkadotConnected(connected);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'certificate':
        return <CertificateUploadPage isPolkadotConnected={isPolkadotConnected} />;
      case 'transactions':
        return <TransactionHistoryPage isPolkadotConnected={isPolkadotConnected} />;
      case 'verify':
        return <VerifyPage isPolkadotConnected={isPolkadotConnected} />;
      default:
        return <CertificateUploadPage isPolkadotConnected={isPolkadotConnected} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* NEW: Polkadot Header */}
      <PolkadotHeader onConnectionChange={handlePolkadotConnection} />
      
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="bg-slate-950">
        {renderPage()}
      </main>
      
      <footer className="bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/20 py-12 mt-32 relative overflow-hidden">
        <div className="absolute -bottom-20 -left-32 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-slate-200 font-bold uppercase tracking-widest mb-2">
            Polkadot File Verifier
          </p>
          <p className="text-slate-400 text-sm">
            Enterprise Security | SHA256 Hashing | Polkadot Blockchain
          </p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}