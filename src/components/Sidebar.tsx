import { LayoutDashboard, Trash2, FileText, Settings } from 'lucide-react';

type Page = 'dashboard' | 'wipe' | 'logs' | 'settings';

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
}

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard' as Page, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'wipe' as Page, icon: Trash2, label: 'Wipe' },
    { id: 'logs' as Page, icon: FileText, label: 'Logs' },
    { id: 'settings' as Page, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-20 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col items-center py-8 gap-6">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white">ZT</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
              }`}
              title={item.label}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" />
              )}
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
