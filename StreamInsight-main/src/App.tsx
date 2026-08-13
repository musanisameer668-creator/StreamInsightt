import { useState } from 'react';
import { StreamingItem } from './types';
import { INITIAL_STREAMING_DATA } from './data/sampleDatasets';
import { ShaderBackground } from './components/ShaderBackground';
import { ThreeLogosBackground } from './components/ThreeLogosBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorks } from './components/HowItWorks';
import { Dashboard } from './components/Dashboard';
import { DatasetUploader } from './components/DatasetUploader';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { TechStack } from './components/TechStack';
import { Footer } from './components/Footer';
import { PowerBIEmbedModal } from './components/PowerBIEmbedModal';

export default function App() {
  const [items, setItems] = useState<StreamingItem[]>(INITIAL_STREAMING_DATA);
  const [datasetName, setDatasetName] = useState<string>('Global Streaming Benchmark 2024');
  const [powerBIEmbedOpen, setPowerBIEmbedOpen] = useState(false);

  const handleUploadClick = () => {
    const uploadEl = document.getElementById('upload');
    if (uploadEl) {
      uploadEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDashboardClick = () => {
    const dashEl = document.getElementById('dashboard');
    if (dashEl) {
      dashEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDatasetLoaded = (newItems: StreamingItem[], newDatasetName: string) => {
    setItems(newItems);
    setDatasetName(newDatasetName);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F4F9] text-[#050505] selection:bg-[#FF007A] selection:text-white font-sans overflow-x-hidden">
      {/* Background Animation Layers */}
      <ShaderBackground />
      <ThreeLogosBackground />

      {/* Main App Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onUploadClick={handleUploadClick}
          onDashboardClick={handleDashboardClick}
        />

        <main className="flex-1">
          <HeroSection
            onUploadClick={handleUploadClick}
            onDashboardClick={handleDashboardClick}
          />

          <AboutSection />

          <HowItWorks />

          <Dashboard
            items={items}
            onOpenPowerBIEmbed={() => setPowerBIEmbedOpen(true)}
          />

          <DatasetUploader
            onDatasetLoaded={handleDatasetLoaded}
            currentDatasetName={datasetName}
          />

          <AIInsightsPanel
            items={items}
            datasetName={datasetName}
          />

          <TechStack />
        </main>

        <Footer />
      </div>

      {/* Fullscreen Power BI Interactive Embed Modal */}
      <PowerBIEmbedModal
        isOpen={powerBIEmbedOpen}
        onClose={() => setPowerBIEmbedOpen(false)}
        items={items}
      />
    </div>
  );
}
