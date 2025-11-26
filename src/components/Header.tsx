import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="h-16 bg-[#1f1f1f] border-b border-[#2a2a2a] flex items-center justify-between px-8">
      <h1 className="text-white capitalize">{title}</h1>
      
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-all">
          <Search size={20} />
        </button>
        
        <button className="relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        
        <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <User size={20} />
        </button>
      </div>
    </div>
  );
}
