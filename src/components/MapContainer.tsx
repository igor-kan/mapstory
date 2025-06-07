
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorldMap } from './WorldMap';
import { ContributeForm } from './ContributeForm';
import { CharacterPathsMode } from './CharacterPathsMode';
import { Landmark } from '../types/landmark';

interface MapContainerProps {
  onLandmarkSelect: (landmark: Landmark) => void;
  searchQuery: string;
  selectedCategory: string;
  selectedEra: string;
  activeLayers: string[];
}

export const MapContainer: React.FC<MapContainerProps> = ({
  onLandmarkSelect,
  searchQuery,
  selectedCategory,
  selectedEra,
  activeLayers,
}) => {
  const [showContributeForm, setShowContributeForm] = useState(false);
  const [pathModeActive, setPathModeActive] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState<string>();

  const handleContributionSubmit = (data: any) => {
    console.log('New contribution:', data);
    // Here you would typically send the data to your backend
    setShowContributeForm(false);
    // Show success toast
  };

  return (
    <div className="flex-1 relative">
      <WorldMap 
        onLandmarkSelect={onLandmarkSelect}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedEra={selectedEra}
        activeLayers={activeLayers}
        pathModeActive={pathModeActive}
        selectedPathId={selectedPathId}
      />
      
      {/* Character Paths Mode */}
      <CharacterPathsMode
        isActive={pathModeActive}
        onToggle={() => setPathModeActive(!pathModeActive)}
        onPathSelect={setSelectedPathId}
        selectedPathId={selectedPathId}
      />
      
      {/* Floating action button */}
      <Button
        onClick={() => setShowContributeForm(true)}
        className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Contribute Form Modal */}
      <ContributeForm
        isOpen={showContributeForm}
        onClose={() => setShowContributeForm(false)}
        onSubmit={handleContributionSubmit}
      />
    </div>
  );
};
