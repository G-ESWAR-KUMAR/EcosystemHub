import React, { useState } from 'react';
import { FluidCanvas } from './components/FluidCanvas';
import { EcosystemHero } from './components/EcosystemHero';
import { HoverExpandGallery } from './components/HoverExpandGallery';
import { SectorGridCatalog } from './components/SectorGridCatalog';
import { HumanConnectionSection } from './components/HumanConnectionSection';
import { EcosystemFooter } from './components/EcosystemFooter';
import { SectorModal } from './components/SectorModal';
import { SECTORS } from './data/services';
import { sounds } from './utils/audio';

export function App() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggleSound = () => {
    const newState = sounds.toggle();
    setSoundEnabled(newState);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToManifesto = () => {
    const el = document.getElementById('connection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#f5f4f3] text-[#1a1a1a] font-sans antialiased selection:bg-[#8c6d46] selection:text-white overflow-x-hidden">
      
      {/* Subtle Ambient Background Mesh */}
      <FluidCanvas />

      {/* Main Flow */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <div id="top" />
        <EcosystemHero 
          onExploreClick={scrollToGallery}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenManifesto={scrollToManifesto}
        />

        {/* HoverExpand Gallery Section (The 10 Sectors Interactive Strip) */}
        <section id="gallery-section" className="py-6">
          <HoverExpandGallery 
            sectors={SECTORS}
            onSelectSector={(sector) => setSelectedSector(sector)}
          />
        </section>

        {/* Complete Directory Index with Category Filters & Search */}
        <SectorGridCatalog 
          sectors={SECTORS}
          onSelectSector={(sector) => setSelectedSector(sector)}
        />

        {/* Rooted in Connection Manifesto & Concierge Desk */}
        <HumanConnectionSection />

      </main>

      {/* Elevated Living Footer */}
      <EcosystemFooter 
        sectors={SECTORS}
        onSelectSector={(sector) => setSelectedSector(sector)}
        onBackToTop={scrollToTop}
      />

      {/* Sector Deep-Dive Inspection Modal */}
      {selectedSector && (
        <SectorModal 
          sector={selectedSector}
          onClose={() => setSelectedSector(null)}
        />
      )}

    </div>
  );
}

export default App;
