
import React from 'react';
import { Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onOpenAuth: () => void;
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  onToggleSidebar,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="h-16 bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200 shadow-sm z-30 relative">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-amber-900 hidden sm:block">
              Literary & Historical Maps
            </h1>
            <span className="text-lg sm:hidden">📚🗺️</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search landmarks, authors, or locations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white border-amber-200 text-amber-900 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={onOpenAuth}
            variant="outline"
            size="sm"
            className="border-amber-300 text-amber-700 hover:bg-amber-200"
          >
            <User className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
