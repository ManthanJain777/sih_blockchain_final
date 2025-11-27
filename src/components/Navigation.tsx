import { Home, Upload, Search, Info, Award, Activity } from 'lucide-react';
import { Logo } from './Logo';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'File Upload', icon: Upload },
    { id: 'certificate', label: 'Certificate', icon: Award },
    { id: 'transactions', label: 'Transactions', icon: Activity },
    { id: 'verify', label: 'Verify', icon: Search },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => onPageChange('home')}
            className="flex items-center gap-3 group"
          >
            <Logo size={48} />
            <div>
              <h2 className="text-card-foreground uppercase tracking-wide font-bold text-xl group-hover:text-primary transition-colors">Polkadot Verifier</h2>
            </div>
          </button>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all lowercase ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                      : 'bg-transparent text-card-foreground/70 hover:bg-card-foreground/5 hover:text-card-foreground'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
