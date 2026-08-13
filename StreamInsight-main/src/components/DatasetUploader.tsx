import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { StreamingItem, PlatformName, ContentType } from '../types';
import { SAMPLE_PRESETS } from '../data/sampleDatasets';
import { PowerBILauncherModal, DetectedPlatform } from './PowerBILauncherModal';

interface DatasetUploaderProps {
  onDatasetLoaded: (items: StreamingItem[], datasetName: string) => void;
  currentDatasetName: string;
}

/**
 * Detects which OTT platform a dataset belongs to purely from its filename.
 * No file content is ever uploaded to a server — this is a local, client-side
 * simulation used to route the user to the correct Power BI analytics workspace.
 */
const detectPlatformFromFileName = (fileName: string): DetectedPlatform | null => {
  const name = fileName.toLowerCase();

  if (name.includes('netflix')) return 'netflix';
  if (name.includes('prime') || name.includes('amazon')) return 'prime';
  if (name.includes('hotstar') || name.includes('disney')) return 'hotstar';

  return null;
};

export const DatasetUploader: React.FC<DatasetUploaderProps> = ({
  onDatasetLoaded,
  currentDatasetName,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Power BI Analytics Launcher state
  const [platform, setPlatform] = useState<DetectedPlatform | null>(null);
  const [showLauncher, setShowLauncher] = useState(false);
  const [launcherFileName, setLauncherFileName] = useState('');

  const parseAndSetCSV = (file: File) => {
    setIsProcessing(true);
    setStatusMessage('Parsing CSV dataset schema...');

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedItems: StreamingItem[] = results.data.map((row: any, idx: number) => {
            const platform: PlatformName = (
              row.platform || row.Platform || row.service || 'Netflix'
            ) as PlatformName;

            const type: ContentType = (
              row.type || row.Type || row.category || 'Movie'
            ).toString().toLowerCase().includes('tv')
              ? 'TV Show'
              : 'Movie';

            return {
              id: `custom-${idx}-${Date.now()}`,
              title: row.title || row.Title || row.name || `Title ${idx + 1}`,
              platform,
              type,
              releaseYear: parseInt(row.releaseYear || row.release_year || row.year || '2023', 10),
              genre: row.genre || row.Genre || 'Drama',
              imdbRating: parseFloat(row.imdbRating || row.rating || row.score || '7.5'),
              streamHoursMillions: parseFloat(
                row.streamHoursMillions || row.hours_streamed || row.views || '150'
              ),
              country: row.country || row.Country || 'United States',
              ageCertification: row.ageCertification || row.certification || 'TV-MA',
              runtimeMinutes: parseInt(row.runtimeMinutes || row.duration || '90', 10),
              addedYear: parseInt(row.addedYear || row.year_added || '2023', 10),
            };
          });

          if (parsedItems.length === 0) {
            setStatusMessage('Error: No valid catalog records found in file.');
            setIsProcessing(false);
            return;
          }

          onDatasetLoaded(parsedItems, file.name);
          setStatusMessage(`Successfully loaded ${parsedItems.length} titles from "${file.name}"!`);
          setIsProcessing(false);
        } catch (err: any) {
          setStatusMessage(`Failed to parse CSV: ${err.message}`);
          setIsProcessing(false);
        }
      },
      error: (error) => {
        setStatusMessage(`CSV Error: ${error.message}`);
        setIsProcessing(false);
      },
    });
  };

  /**
   * Reads the selected file name, detects the OTT platform, and opens the
   * Power BI Analytics Launcher modal. The file itself is never sent to a
   * server — this is purely local filename-based routing/detection.
   */
  const handleUpload = (file: File) => {
    const fileName = file.name.toLowerCase();
    const isSupported = /\.(csv|xlsx|txt)$/i.test(fileName);

    if (!isSupported) {
      setStatusMessage('Error: Unsupported file type. Please upload a .csv, .xlsx, or .txt file.');
      return;
    }

    const detectedPlatform = detectPlatformFromFileName(fileName);

    if (!detectedPlatform) {
      setStatusMessage(
        'Could not detect an OTT platform from that filename. Try including "netflix", "prime"/"amazon", or "hotstar"/"disney" in the file name.'
      );
      return;
    }

    setPlatform(detectedPlatform);
    setLauncherFileName(file.name);
    setShowLauncher(true);

    // Preserve the existing behavior: actual CSV files still get parsed
    // client-side and used to update the live dashboard. XLSX/TXT files are
    // used for platform detection/routing simulation only.
    if (fileName.endsWith('.csv')) {
      parseAndSetCSV(file);
    } else {
      setStatusMessage(
        `Detected file "${file.name}" — routed to the ${detectedPlatform === 'prime' ? 'Amazon Prime Video' : detectedPlatform === 'hotstar' ? 'Disney Hotstar' : 'Netflix'} Power BI workspace.`
      );
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
    // allow re-uploading the same file name twice in a row
    e.target.value = '';
  };

  return (
    <section id="upload" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-[#00F0FF] text-[#050505] text-xs font-black uppercase tracking-widest border-2 border-[#050505] shadow-[2px_2px_0_#050505] inline-block mb-2">
              Data Ingestion Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#050505] mt-1 mb-2">
              Upload Your Streaming Catalog
            </h2>
            <p className="text-[#050505]/80 text-sm font-bold">
              Upload custom CSV datasets or choose pre-built benchmark snapshots to instantly update Power BI metrics.
            </p>
          </div>

          {/* Drag & Drop Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#7000FF] bg-[#00F0FF]/30 scale-[1.01]'
                : 'border-[#050505] bg-[#F4F4F9] hover:bg-white hover:shadow-[4px_4px_0_#050505]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-[#FF007A] border-3 border-[#050505] flex items-center justify-center text-white shadow-[4px_4px_0_#050505]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <div>
                <p className="text-[#050505] font-black text-lg">
                  Drag & Drop CSV / XLSX / TXT Dataset here, or <span className="text-[#7000FF] underline">Browse</span>
                </p>
                <p className="text-xs text-[#050505]/70 font-bold mt-1">
                  Name your file with "netflix", "prime"/"amazon", or "hotstar"/"disney" to auto-launch its Power BI workspace
                </p>
              </div>
            </div>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <div className={`p-4 rounded-xl text-xs font-black flex items-center gap-3 border-2 border-[#050505] shadow-[3px_3px_0_#050505] ${
              statusMessage.includes('Failed') || statusMessage.includes('Error')
                ? 'bg-[#FF007A] text-white'
                : 'bg-[#1CD760] text-[#050505]'
            }`}>
              <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Presets Picker */}
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#050505] mb-3">
              Or Select Benchmark Catalog Preset:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onDatasetLoaded(preset.data, preset.name);
                    setStatusMessage(`Switched to preset: "${preset.name}" (${preset.data.length} titles)`);
                  }}
                  className={`p-4 rounded-2xl text-left border-3 border-[#050505] transition-all cursor-pointer ${
                    currentDatasetName === preset.name
                      ? 'bg-[#FFD600] text-[#050505] shadow-[4px_4px_0_#050505]'
                      : 'bg-[#F4F4F9] hover:bg-white text-[#050505]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-black text-sm text-[#050505]">{preset.name}</span>
                    {currentDatasetName === preset.name && (
                      <span className="text-[10px] font-black bg-[#050505] text-white px-2 py-0.5 rounded border border-[#050505]">Active</span>
                    )}
                  </div>
                  <p className="text-xs text-[#050505]/80 font-bold mt-2 line-clamp-2">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Power BI Analytics Launcher — shown after a valid dataset upload */}
      <PowerBILauncherModal
        isOpen={showLauncher}
        onClose={() => setShowLauncher(false)}
        platform={platform}
        fileName={launcherFileName}
      />
    </section>
  );
};
