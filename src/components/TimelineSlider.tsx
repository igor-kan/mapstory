
import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface TimelineSliderProps {
  selectedEra: string;
  onEraChange: (era: string) => void;
}

const eras = [
  { id: 'ancient', label: 'Ancient Times', range: 'Before 500 CE', value: 0 },
  { id: 'medieval', label: 'Medieval', range: '500-1500 CE', value: 25 },
  { id: 'renaissance', label: 'Renaissance', range: '1500-1700 CE', value: 50 },
  { id: 'modern', label: 'Modern Era', range: '1700-1900 CE', value: 75 },
  { id: 'contemporary', label: 'Contemporary', range: '1900-Present', value: 100 },
  { id: 'all', label: 'All Eras', range: 'All Time', value: -1 }
];

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  selectedEra,
  onEraChange,
}) => {
  const handleSliderChange = (values: number[]) => {
    const value = values[0];
    const era = eras.find(e => e.value === value) || eras[eras.length - 1];
    onEraChange(era.id);
  };

  const currentEra = eras.find(e => e.id === selectedEra) || eras[eras.length - 1];

  return (
    <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-amber-200 z-20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-amber-700" />
          <h3 className="font-semibold text-amber-900 text-sm">Timeline</h3>
        </div>
        <Badge variant="secondary" className="bg-amber-100 text-amber-700">
          {currentEra.label}
        </Badge>
      </div>
      
      {selectedEra !== 'all' && (
        <div className="mb-3">
          <Slider
            value={[currentEra.value]}
            onValueChange={handleSliderChange}
            max={100}
            min={0}
            step={25}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Ancient</span>
            <span>Medieval</span>
            <span>Renaissance</span>
            <span>Modern</span>
            <span>Now</span>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {eras.map((era) => (
          <button
            key={era.id}
            onClick={() => onEraChange(era.id)}
            className={`text-xs p-2 rounded transition-colors ${
              selectedEra === era.id
                ? 'bg-amber-600 text-white'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>
      
      <p className="text-xs text-gray-600 mt-2 text-center">
        {currentEra.range}
      </p>
    </div>
  );
};
