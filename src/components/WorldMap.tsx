
import React, { useState } from 'react';
import { MapPin, BookOpen, Landmark as LandmarkIcon, Palette, Brain, Scroll } from 'lucide-react';
import { Landmark } from '../types/landmark';
import { mockLandmarks } from '../data/mockLandmarks';

interface WorldMapProps {
  onLandmarkSelect: (landmark: Landmark) => void;
  searchQuery: string;
  selectedCategory: string;
  selectedEra: string;
  activeLayers: string[];
  pathModeActive?: boolean;
  selectedPathId?: string;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  onLandmarkSelect,
  searchQuery,
  selectedCategory,
  selectedEra,
  activeLayers,
  pathModeActive = false,
  selectedPathId,
}) => {
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  const filteredLandmarks = mockLandmarks.filter(landmark => {
    const matchesSearch = landmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         landmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         landmark.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || landmark.category === selectedCategory;
    const matchesLayer = activeLayers.includes(landmark.category);
    
    // Era filtering logic
    const matchesEra = selectedEra === 'all' || checkEraMatch(landmark, selectedEra);
    
    return matchesSearch && matchesCategory && matchesLayer && matchesEra;
  });

  const checkEraMatch = (landmark: Landmark, era: string): boolean => {
    if (era === 'all') return true;
    
    const year = landmark.yearBuilt || getApproximateYear(landmark);
    
    switch (era) {
      case 'ancient': return year < 500;
      case 'medieval': return year >= 500 && year < 1500;
      case 'renaissance': return year >= 1500 && year < 1700;
      case 'modern': return year >= 1700 && year < 1900;
      case 'contemporary': return year >= 1900;
      default: return true;
    }
  };

  const getApproximateYear = (landmark: Landmark): number => {
    // Fallback logic for landmarks without explicit year
    if (landmark.literaryWork?.includes('Ulysses')) return 1904;
    if (landmark.title.includes('Trinity College')) return 1600;
    if (landmark.title.includes('Shakespeare')) return 1600;
    if (landmark.title.includes('Machu Picchu')) return 1450;
    return 1800; // Default fallback
  };

  // Convert lat/lng to percentage positions for a world map view
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'literary': return BookOpen;
      case 'historical': return LandmarkIcon;
      case 'art': return Palette;
      case 'philosophy': return Brain;
      case 'myths': return Scroll;
      default: return MapPin;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'literary': return 'bg-emerald-500 hover:bg-emerald-600';
      case 'historical': return 'bg-blue-500 hover:bg-blue-600';
      case 'art': return 'bg-purple-500 hover:bg-purple-600';
      case 'philosophy': return 'bg-indigo-500 hover:bg-indigo-600';
      case 'myths': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'literary': return '📚';
      case 'historical': return '🏛️';
      case 'art': return '🎨';
      case 'philosophy': return '🧠';
      case 'myths': return '🗿';
      default: return '📍';
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 overflow-hidden">
      {/* World map background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          {/* Simplified world map outlines */}
          <g fill="currentColor" className="text-amber-800">
            {/* North America */}
            <path d="M100,150 Q200,100 300,150 L280,250 Q200,280 100,250 Z" />
            {/* Europe */}
            <path d="M450,140 Q520,120 580,140 L570,200 Q520,220 450,200 Z" />
            {/* Asia */}
            <path d="M580,120 Q750,100 850,150 L830,250 Q700,280 580,220 Z" />
            {/* Africa */}
            <path d="M450,200 Q520,180 580,220 L570,350 Q520,380 450,350 Z" />
            {/* South America */}
            <path d="M200,280 Q250,260 300,280 L280,400 Q230,420 200,400 Z" />
            {/* Australia */}
            <path d="M750,350 Q820,330 850,350 L840,400 Q780,420 750,400 Z" />
          </g>
        </svg>
      </div>

      {/* Character path overlay */}
      {pathModeActive && selectedPathId === 'bloom-ulysses' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
            </marker>
          </defs>
          <path
            d="M 48% 28% Q 48.5% 28.2% 49% 28.5% T 49.5% 29%"
            stroke="#059669"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            markerEnd="url(#arrowhead)"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* Landmark markers */}
      {filteredLandmarks.map((landmark) => {
        const position = getPosition(landmark.latitude, landmark.longitude);
        const IconComponent = getCategoryIcon(landmark.category);
        const isPathHighlighted = pathModeActive && selectedPathId === 'bloom-ulysses' && 
                                 landmark.city === 'Dublin' && landmark.category === 'literary';
        
        return (
          <div
            key={landmark.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            onClick={() => onLandmarkSelect(landmark)}
            onMouseEnter={() => setHoveredLandmark(landmark.id)}
            onMouseLeave={() => setHoveredLandmark(null)}
          >
            {/* Marker */}
            <div className={`
              relative transition-all duration-200 
              ${hoveredLandmark === landmark.id ? 'scale-125' : 'scale-100'}
              ${isPathHighlighted ? 'scale-110 ring-2 ring-emerald-400' : ''}
            `}>
              <div className={`
                w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center
                ${getCategoryColor(landmark.category)}
                ${isPathHighlighted ? 'ring-2 ring-emerald-300' : ''}
              `}>
                <IconComponent className="h-4 w-4 text-white" />
              </div>
              
              {/* Pulse animation */}
              <div className={`
                absolute inset-0 rounded-full 
                ${isPathHighlighted ? 'animate-ping bg-emerald-400' : 'animate-pulse'}
                ${!isPathHighlighted && landmark.category === 'literary' ? 'bg-emerald-400' : ''}
                ${!isPathHighlighted && landmark.category === 'historical' ? 'bg-blue-400' : ''}
                ${!isPathHighlighted && landmark.category === 'art' ? 'bg-purple-400' : ''}
                ${!isPathHighlighted && landmark.category === 'philosophy' ? 'bg-indigo-400' : ''}
                ${!isPathHighlighted && landmark.category === 'myths' ? 'bg-orange-400' : ''}
              `} style={{ animationDuration: '2s' }} />
            </div>

            {/* Tooltip */}
            {hoveredLandmark === landmark.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30">
                <div className="bg-white rounded-lg shadow-lg border border-amber-200 p-3 min-w-48 max-w-64">
                  <h4 className="font-semibold text-amber-900 text-sm">{landmark.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{landmark.description}</p>
                  <p className="text-xs text-amber-700 mt-1">📍 {landmark.city}, {landmark.country}</p>
                  {landmark.literaryWork && (
                    <p className="text-xs text-emerald-600 mt-1">{getCategoryEmoji(landmark.category)} {landmark.literaryWork}</p>
                  )}
                  {isPathHighlighted && (
                    <p className="text-xs text-emerald-600 mt-1 font-medium">📍 On Bloom's Path</p>
                  )}
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            )}
          </div>
        );
      })}

      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-amber-200">
        <h3 className="font-semibold text-amber-900 text-sm mb-2">Active Layers</h3>
        <div className="space-y-2">
          {activeLayers.map(layer => {
            const IconComponent = getCategoryIcon(layer);
            const emoji = getCategoryEmoji(layer);
            const label = layer.charAt(0).toUpperCase() + layer.slice(1);
            
            return (
              <div key={layer} className="flex items-center text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${getCategoryColor(layer).split(' ')[0]}`}>
                  <IconComponent className="h-2 w-2 text-white" />
                </div>
                {emoji} {label}
              </div>
            );
          })}
        </div>
        <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-gray-600">
          Showing {filteredLandmarks.length} locations
          {pathModeActive && selectedPathId && (
            <div className="text-emerald-600 font-medium mt-1">
              🚶‍♂️ Character Path Mode Active
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
