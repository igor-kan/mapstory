
import React from 'react';
import { X, BookOpen, Landmark as LandmarkIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Landmark } from '../types/landmark';
import { mockLandmarks } from '../data/mockLandmarks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLandmarkSelect: (landmark: Landmark) => void;
  searchQuery: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onLandmarkSelect,
  searchQuery,
  selectedCategory,
  onCategoryChange,
}) => {
  const filteredLandmarks = mockLandmarks.filter(landmark => {
    const matchesSearch = landmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         landmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         landmark.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || landmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative w-80 h-full bg-amber-50 border-r border-amber-200 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b border-amber-200 bg-gradient-to-r from-amber-100 to-amber-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-amber-900">Explore Landmarks</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-amber-700 hover:text-amber-900 md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile search */}
          <div className="relative mb-4 md:hidden">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search landmarks..."
              className="pl-10 bg-white border-amber-200 text-amber-900"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange('all')}
              className={selectedCategory === 'all' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-300 text-amber-700 hover:bg-amber-100'}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'literary' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange('literary')}
              className={selectedCategory === 'literary' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-300 text-amber-700 hover:bg-amber-100'}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Literary
            </Button>
            <Button
              variant={selectedCategory === 'historical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange('historical')}
              className={selectedCategory === 'historical' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-300 text-amber-700 hover:bg-amber-100'}
            >
              <LandmarkIcon className="h-3 w-3 mr-1" />
              Historical
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredLandmarks.map((landmark) => (
              <div
                key={landmark.id}
                onClick={() => onLandmarkSelect(landmark)}
                className="p-4 rounded-lg border border-amber-200 bg-white hover:bg-amber-50 cursor-pointer transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-amber-900 group-hover:text-amber-800 line-clamp-1">
                    {landmark.title}
                  </h3>
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      landmark.category === 'literary' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {landmark.category === 'literary' ? (
                      <BookOpen className="h-3 w-3 mr-1" />
                    ) : (
                      <LandmarkIcon className="h-3 w-3 mr-1" />
                    )}
                    {landmark.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {landmark.description}
                </p>
                
                <div className="text-xs text-amber-700">
                  📍 {landmark.city}, {landmark.country}
                </div>
                
                {landmark.literaryWork && (
                  <div className="text-xs text-emerald-600 mt-1">
                    📚 {landmark.literaryWork} by {landmark.author}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
