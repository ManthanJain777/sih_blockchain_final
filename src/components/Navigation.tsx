import { Search, Award, Activity } from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  currentPage: 'certificate' | 'transactions' | 'verify';
  onPageChange: (page: 'certificate' | 'transactions' | 'verify') => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'certificate', label: 'Upload', icon: Award },
    { id: 'transactions', label: 'Transactions', icon: Activity },
    { id: 'verify', label: 'Verify', icon: Search },
  ] as const;

  return (
    <nav className="bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 sticky top-20 z-40 shadow-xl shadow-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 py-4">
          <button
            onClick={() => onPageChange('certificate')}
            className="flex items-center gap-3 group transition-all duration-300 active:scale-95"
          >
            <Logo size={48} />
            <div>
              <h2 className="text-slate-100 uppercase tracking-widest font-bold text-lg group-hover:text-cyan-400 transition-colors">Polkadot Verifier</h2>
            </div>
          </button>

          <div className="flex gap-3">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all lowercase relative group overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-slate-900/50 border border-slate-700/50 text-slate-300 hover:text-slate-100 hover:border-cyan-500/30 active:scale-95'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  <Icon size={18} className="relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
