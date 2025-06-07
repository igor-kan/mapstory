
import React, { useState } from 'react';
import { MapContainer } from '../components/MapContainer';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { LandmarkModal } from '../components/LandmarkModal';
import { AuthModal } from '../components/AuthModal';
import { TimelineSlider } from '../components/TimelineSlider';
import { LayerControls } from '../components/LayerControls';
import { Landmark } from '../types/landmark';

const Index = () => {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [activeLayers, setActiveLayers] = useState<string[]>(['literary', 'historical']);

  return (
    <div className="h-screen bg-amber-50 flex flex-col overflow-hidden">
      <Header 
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex-1 flex relative">
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onLandmarkSelect={setSelectedLandmark}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="flex-1 relative">
          <MapContainer 
            onLandmarkSelect={setSelectedLandmark}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedEra={selectedEra}
            activeLayers={activeLayers}
          />
          
          {/* Timeline Slider */}
          <TimelineSlider 
            selectedEra={selectedEra}
            onEraChange={setSelectedEra}
          />
          
          {/* Layer Controls */}
          <LayerControls 
            activeLayers={activeLayers}
            onLayersChange={setActiveLayers}
          />
        </div>
      </div>

      {selectedLandmark && (
        <LandmarkModal 
          landmark={selectedLandmark}
          onClose={() => setSelectedLandmark(null)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
};

export default Index;
