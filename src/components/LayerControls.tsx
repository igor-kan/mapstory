
import React from 'react';
import { Layers, BookOpen, Landmark, Palette, Brain, Scroll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LayerControlsProps {
  activeLayers: string[];
  onLayersChange: (layers: string[]) => void;
}

const layerTypes = [
  { id: 'literary', label: 'Literature', icon: BookOpen, color: 'emerald', emoji: '📚' },
  { id: 'historical', label: 'History', icon: Landmark, color: 'blue', emoji: '🏛️' },
  { id: 'art', label: 'Art', icon: Palette, color: 'purple', emoji: '🎨' },
  { id: 'philosophy', label: 'Philosophy', icon: Brain, color: 'indigo', emoji: '🧠' },
  { id: 'myths', label: 'Myths & Legends', icon: Scroll, color: 'orange', emoji: '🗿' }
];

export const LayerControls: React.FC<LayerControlsProps> = ({
  activeLayers,
  onLayersChange,
}) => {
  const toggleLayer = (layerId: string) => {
    if (activeLayers.includes(layerId)) {
      onLayersChange(activeLayers.filter(id => id !== layerId));
    } else {
      onLayersChange([...activeLayers, layerId]);
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-amber-200 z-20 max-w-xs">
      <div className="flex items-center space-x-2 mb-3">
        <Layers className="h-4 w-4 text-amber-700" />
        <h3 className="font-semibold text-amber-900 text-sm">Map Layers</h3>
        <Badge variant="secondary" className="bg-amber-100 text-amber-700">
          {activeLayers.length}
        </Badge>
      </div>
      
      <div className="space-y-2">
        {layerTypes.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          const IconComponent = layer.icon;
          
          return (
            <Button
              key={layer.id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleLayer(layer.id)}
              className={`w-full justify-start text-xs transition-colors ${
                isActive
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'border-amber-200 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span className="mr-2">{layer.emoji}</span>
              <IconComponent className="h-3 w-3 mr-2" />
              {layer.label}
            </Button>
          );
        })}
      </div>
      
      <div className="mt-3 pt-3 border-t border-amber-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLayersChange(layerTypes.map(l => l.id))}
          className="w-full text-xs text-amber-700 hover:bg-amber-100"
        >
          Show All Layers
        </Button>
      </div>
    </div>
  );
};
