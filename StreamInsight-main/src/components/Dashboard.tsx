import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';
import { StreamingItem, FilterOptions, PlatformName } from '../types';

interface DashboardProps {
  items: StreamingItem[];
  onOpenPowerBIEmbed: () => void;
}

const PLATFORM_COLORS: Record<string, string> = {
  Netflix: '#FF007A',
  'Prime Video': '#00F0FF',
  'Disney+': '#7000FF',
  'HBO Max': '#FFD600',
  Hulu: '#1CD760',
  'Apple TV+': '#050505',
};

export const Dashboard: React.FC<DashboardProps> = ({
  items,
  onOpenPowerBIEmbed,
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'platforms' | 'genres' | 'ratings' | 'table'>('overview');

  const [filters, setFilters] = useState<FilterOptions>({
    platform: 'All',
    type: 'All',
    genre: 'All',
    searchQuery: '',
    minYear: 2015,
    maxYear: 2025,
    sortBy: 'hours',
    sortOrder: 'desc',
  });

  const availableGenres = useMemo(() => {
    const genresSet = new Set<string>();
    items.forEach((i) => genresSet.add(i.genre));
    return ['All', ...Array.from(genresSet)];
  }, [items]);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items
      .filter((i) => {
        if (filters.platform !== 'All' && i.platform !== filters.platform) return false;
        if (filters.type !== 'All' && i.type !== filters.type) return false;
        if (filters.genre !== 'All' && i.genre !== filters.genre) return false;
        if (i.releaseYear < filters.minYear || i.releaseYear > filters.maxYear) return false;
        if (
          filters.searchQuery &&
          !i.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
          !i.genre.toLowerCase().includes(filters.searchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        let valA: any = a[filters.sortBy === 'rating' ? 'imdbRating' : filters.sortBy === 'hours' ? 'streamHoursMillions' : filters.sortBy === 'year' ? 'releaseYear' : 'title'];
        let valB: any = b[filters.sortBy === 'rating' ? 'imdbRating' : filters.sortBy === 'hours' ? 'streamHoursMillions' : filters.sortBy === 'year' ? 'releaseYear' : 'title'];

        if (typeof valA === 'string') {
          return filters.sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return filters.sortOrder === 'asc' ? valA - valB : valB - valA;
      });
  }, [items, filters]);

  // KPIs
  const totalTitles = filteredItems.length;
  const totalMovies = filteredItems.filter((i) => i.type === 'Movie').length;
  const totalTVShows = filteredItems.filter((i) => i.type === 'TV Show').length;
  const totalStreamHours = filteredItems.reduce((acc, curr) => acc + curr.streamHoursMillions, 0);
  const avgRating = totalTitles
    ? (filteredItems.reduce((acc, curr) => acc + curr.imdbRating, 0) / totalTitles).toFixed(1)
    : '0';

  // Platform Breakdown Chart Data
  const platformChartData = useMemo(() => {
    const map: Record<string, { count: number; hours: number; avgRatingAcc: number }> = {};
    filteredItems.forEach((i) => {
      if (!map[i.platform]) {
        map[i.platform] = { count: 0, hours: 0, avgRatingAcc: 0 };
      }
      map[i.platform].count += 1;
      map[i.platform].hours += i.streamHoursMillions;
      map[i.platform].avgRatingAcc += i.imdbRating;
    });

    return Object.entries(map).map(([platform, val]) => ({
      platform,
      count: val.count,
      hours: Math.round(val.hours),
      avgRating: Number((val.avgRatingAcc / val.count).toFixed(1)),
      color: PLATFORM_COLORS[platform] || '#00A8E1',
    }));
  }, [filteredItems]);

  // Release Trends Chart Data (Yearly)
  const yearlyTrendData = useMemo(() => {
    const map: Record<number, { year: number; hours: number; count: number }> = {};
    for (let yr = filters.minYear; yr <= filters.maxYear; yr++) {
      map[yr] = { year: yr, hours: 0, count: 0 };
    }
    filteredItems.forEach((i) => {
      if (map[i.releaseYear]) {
        map[i.releaseYear].hours += i.streamHoursMillions;
        map[i.releaseYear].count += 1;
      }
    });
    return Object.values(map);
  }, [filteredItems, filters.minYear, filters.maxYear]);

  // Genre Distribution Chart Data
  const genreChartData = useMemo(() => {
    const map: Record<string, number> = {};
    filteredItems.forEach((i) => {
      map[i.genre] = (map[i.genre] || 0) + 1;
    });
    const colorsList = ['#E50914', '#00A8E1', '#7C3AED', '#1CD760', '#F59E0B', '#EC4899', '#3B82F6', '#10B981'];
    return Object.entries(map).map(([name, value], idx) => ({
      name,
      value,
      color: colorsList[idx % colorsList.length],
    }));
  }, [filteredItems]);

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto space-y-8">
      {/* Header & Power BI Workspace Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F0FF] border-2 border-[#050505] shadow-[3px_3px_0_#050505] text-xs font-black text-[#050505] mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF007A] animate-ping" />
            <span>Power BI Embedded Engine</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#050505]">
            Streaming Catalog Dashboard
          </h2>
          <p className="text-[#050505]/80 text-base font-bold mt-1">
            Real-time multi-platform content distribution, viewership engagement, and genre performance.
          </p>
        </div>

        <button
          onClick={onOpenPowerBIEmbed}
          className="bg-[#7000FF] hover:bg-[#FF007A] text-white font-black px-6 py-4 rounded-2xl border-3 border-[#050505] shadow-[5px_5px_0_#050505] transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5 text-[#FFD600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8V4m0 0h4M4 4l5 5m11-2V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>Open Full Power BI Report Workspace</span>
        </button>
      </div>

      {/* Filter Control Shell */}
      <div className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#7000FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-black text-[#050505] uppercase tracking-wider">
              Filter Slicers
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#050505]/70 font-bold">
            <span>Showing <strong className="text-[#050505] font-black">{filteredItems.length}</strong> of {items.length} titles</span>
            <button
              onClick={() =>
                setFilters({
                  platform: 'All',
                  type: 'All',
                  genre: 'All',
                  searchQuery: '',
                  minYear: 2015,
                  maxYear: 2025,
                  sortBy: 'hours',
                  sortOrder: 'desc',
                })
              }
              className="ml-2 text-[#7000FF] underline font-black hover:text-[#FF007A] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search title or genre..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-[#F4F4F9] border-2 border-[#050505] rounded-xl px-3 py-2 text-xs text-[#050505] font-bold placeholder-gray-500 focus:outline-none focus:bg-white"
            />
          </div>

          {/* Platform Filter */}
          <div>
            <select
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value as any })}
              className="w-full bg-[#F4F4F9] border-2 border-[#050505] rounded-xl px-3 py-2 text-xs text-[#050505] font-bold focus:outline-none focus:bg-white cursor-pointer"
            >
              <option value="All">All Platforms</option>
              <option value="Netflix">Netflix</option>
              <option value="Prime Video">Prime Video</option>
              <option value="Disney+">Disney+</option>
              <option value="HBO Max">HBO Max</option>
              <option value="Hulu">Hulu</option>
              <option value="Apple TV+">Apple TV+</option>
            </select>
          </div>

          {/* Content Type Filter */}
          <div>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
              className="w-full bg-[#F4F4F9] border-2 border-[#050505] rounded-xl px-3 py-2 text-xs text-[#050505] font-bold focus:outline-none focus:bg-white cursor-pointer"
            >
              <option value="All">All Types (Movie & TV)</option>
              <option value="Movie">Movies Only</option>
              <option value="TV Show">TV Shows Only</option>
            </select>
          </div>

          {/* Genre Filter */}
          <div>
            <select
              value={filters.genre}
              onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
              className="w-full bg-[#F4F4F9] border-2 border-[#050505] rounded-xl px-3 py-2 text-xs text-[#050505] font-bold focus:outline-none focus:bg-white cursor-pointer"
            >
              {availableGenres.map((g) => (
                <option key={g} value={g}>
                  {g === 'All' ? 'All Genres' : g}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="w-full bg-[#F4F4F9] border-2 border-[#050505] rounded-xl px-3 py-2 text-xs text-[#050505] font-bold focus:outline-none focus:bg-white cursor-pointer"
            >
              <option value="hours">Sort by Stream Hours</option>
              <option value="rating">Sort by IMDb Score</option>
              <option value="year">Sort by Release Year</option>
              <option value="title">Sort Alphabetically</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border-3 border-[#050505] shadow-[4px_4px_0_#050505] relative overflow-hidden group">
          <p className="text-xs font-black text-[#050505]/70 uppercase tracking-wider">Total Titles</p>
          <h3 className="text-3xl font-black text-[#050505] mt-1">{totalTitles}</h3>
          <span className="text-[11px] text-[#FF007A] font-black mt-2 flex items-center gap-1">
            ▲ +14% YoY Catalog
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#00F0FF] p-5 rounded-2xl border-3 border-[#050505] shadow-[4px_4px_0_#050505] relative overflow-hidden group">
          <p className="text-xs font-black text-[#050505]/80 uppercase tracking-wider">Movies</p>
          <h3 className="text-3xl font-black text-[#050505] mt-1">{totalMovies}</h3>
          <span className="text-[11px] text-[#050505] font-bold mt-2 block">
            {totalTitles ? Math.round((totalMovies / totalTitles) * 100) : 0}% of catalog
          </span>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#7000FF] p-5 rounded-2xl border-3 border-[#050505] shadow-[4px_4px_0_#050505] relative overflow-hidden group">
          <p className="text-xs font-black text-white/80 uppercase tracking-wider">TV Shows</p>
          <h3 className="text-3xl font-black text-white mt-1">{totalTVShows}</h3>
          <span className="text-[11px] text-white/90 font-bold mt-2 block">
            {totalTitles ? Math.round((totalTVShows / totalTitles) * 100) : 0}% of catalog
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#FFD600] p-5 rounded-2xl border-3 border-[#050505] shadow-[4px_4px_0_#050505] relative overflow-hidden group">
          <p className="text-xs font-black text-[#050505]/80 uppercase tracking-wider">Avg IMDb Score</p>
          <h3 className="text-3xl font-black text-[#050505] mt-1">{avgRating}<span className="text-sm font-bold text-[#050505]/70">/10</span></h3>
          <span className="text-[11px] text-[#050505] font-bold mt-2 block">
            High Quality Benchmark
          </span>
        </div>

        {/* KPI 5 */}
        <div className="bg-[#FF007A] p-5 rounded-2xl border-3 border-[#050505] shadow-[4px_4px_0_#050505] col-span-2 lg:col-span-1 relative overflow-hidden group text-white">
          <p className="text-xs font-black text-white/80 uppercase tracking-wider">Stream Volume</p>
          <h3 className="text-3xl font-black text-white mt-1">{totalStreamHours.toFixed(1)} M</h3>
          <span className="text-[11px] text-white/90 font-bold mt-2 block">
            Million hours watched
          </span>
        </div>
      </div>

      {/* Dashboard View Navigation Tabs */}
      <div className="flex gap-3 text-sm font-black overflow-x-auto pb-2">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-2.5 rounded-xl border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap ${
            activeView === 'overview'
              ? 'bg-[#FFD600] text-[#050505] shadow-[3px_3px_0_#050505]'
              : 'bg-white text-[#050505] hover:bg-[#F4F4F9]'
          }`}
        >
          📊 Overview Charts
        </button>
        <button
          onClick={() => setActiveView('platforms')}
          className={`px-4 py-2.5 rounded-xl border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap ${
            activeView === 'platforms'
              ? 'bg-[#00F0FF] text-[#050505] shadow-[3px_3px_0_#050505]'
              : 'bg-white text-[#050505] hover:bg-[#F4F4F9]'
          }`}
        >
          🏢 Platform Dominance
        </button>
        <button
          onClick={() => setActiveView('genres')}
          className={`px-4 py-2.5 rounded-xl border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap ${
            activeView === 'genres'
              ? 'bg-[#7000FF] text-white shadow-[3px_3px_0_#050505]'
              : 'bg-white text-[#050505] hover:bg-[#F4F4F9]'
          }`}
        >
          🍕 Genre Breakdown
        </button>
        <button
          onClick={() => setActiveView('ratings')}
          className={`px-4 py-2.5 rounded-xl border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap ${
            activeView === 'ratings'
              ? 'bg-[#FF007A] text-white shadow-[3px_3px_0_#050505]'
              : 'bg-white text-[#050505] hover:bg-[#F4F4F9]'
          }`}
        >
          ⭐ IMDb vs Engagement
        </button>
        <button
          onClick={() => setActiveView('table')}
          className={`px-4 py-2.5 rounded-xl border-2 border-[#050505] transition-all cursor-pointer whitespace-nowrap ${
            activeView === 'table'
              ? 'bg-[#050505] text-white shadow-[3px_3px_0_#FFD600]'
              : 'bg-white text-[#050505] hover:bg-[#F4F4F9]'
          }`}
        >
          📋 Catalog Data Grid ({filteredItems.length})
        </button>
      </div>

      {/* View Content */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Platform Share */}
          <div className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-[#050505] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF007A] border border-[#050505]" />
                Content Share by Streaming Platform
              </h3>
              <span className="text-xs font-black text-[#050505]/70">Total Hours (M)</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="platform" stroke="#050505" fontSize={11} fontWeight={800} />
                  <YAxis stroke="#050505" fontSize={11} fontWeight={800} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#050505', borderWidth: '2px', borderRadius: '12px', boxShadow: '4px 4px 0px #050505' }}
                    itemStyle={{ color: '#050505', fontWeight: 800 }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]} stroke="#050505" strokeWidth={2}>
                    {platformChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Release Trends */}
          <div className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-[#050505] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00F0FF] border border-[#050505]" />
                Stream Volume Velocity over Release Years
              </h3>
              <span className="text-xs font-black text-[#050505]/70">2015 - 2025</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7000FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7000FF" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#050505" fontSize={11} fontWeight={800} />
                  <YAxis stroke="#050505" fontSize={11} fontWeight={800} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#050505', borderWidth: '2px', borderRadius: '12px', boxShadow: '4px 4px 0px #050505' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#7000FF" strokeWidth={3} fillOpacity={1} fill="url(#areaGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeView === 'platforms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformChartData.map((p) => (
            <div
              key={p.platform}
              className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] hover:translate-y-[-2px] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="px-3.5 py-1.5 rounded-xl text-xs font-black text-white border-2 border-[#050505] shadow-[2px_2px_0_#050505]"
                    style={{ backgroundColor: p.color, color: p.color === '#FFD600' || p.color === '#00F0FF' ? '#050505' : '#ffffff' }}
                  >
                    {p.platform}
                  </span>
                  <span className="text-xs font-black text-[#050505]">
                    {p.count} Titles
                  </span>
                </div>

                <div className="space-y-3 my-4">
                  <div>
                    <div className="flex justify-between text-xs text-[#050505] font-bold mb-1">
                      <span>Stream Volume</span>
                      <span className="font-black text-[#7000FF]">{p.hours}M hrs</span>
                    </div>
                    <div className="w-full bg-[#F4F4F9] border-2 border-[#050505] h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: p.color,
                          width: `${Math.min(100, (p.hours / (totalStreamHours || 1)) * 100 * 2.5)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t-2 border-[#050505]/10">
                    <span className="text-[#050505]/70 font-bold">Average IMDb Score:</span>
                    <span className="font-black text-[#050505] bg-[#FFD600] px-2 py-0.5 rounded-md border border-[#050505]">★ {p.avgRating} / 10</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setFilters({ ...filters, platform: p.platform })}
                className="w-full mt-2 py-2.5 rounded-xl bg-[#050505] text-white font-black hover:bg-[#FF007A] text-xs border-2 border-[#050505] transition-colors cursor-pointer"
              >
                Filter by {p.platform}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeView === 'genres' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] space-y-4">
            <h3 className="text-lg font-black text-[#050505]">Genre Catalog Distribution</h3>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#050505', borderWidth: '2px', borderRadius: '12px', boxShadow: '4px 4px 0px #050505' }}
                  />
                  <Pie
                    data={genreChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={4}
                    stroke="#050505"
                    strokeWidth={2}
                  >
                    {genreChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] space-y-4">
            <h3 className="text-lg font-black text-[#050505]">Genre Share Summary</h3>
            <div className="space-y-3">
              {genreChartData.map((g) => (
                <div key={g.name} className="flex items-center justify-between p-3 rounded-2xl bg-[#F4F4F9] border-2 border-[#050505]">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-md border border-[#050505]" style={{ backgroundColor: g.color }} />
                    <span className="text-sm font-black text-[#050505]">{g.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-black">
                    <span className="text-[#050505]/70">{g.value} Titles</span>
                    <span className="text-[#7000FF] bg-white px-2 py-0.5 rounded-md border border-[#050505]">
                      {totalTitles ? Math.round((g.value / totalTitles) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeView === 'ratings' && (
        <div className="bg-white p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] space-y-4">
          <h3 className="text-lg font-black text-[#050505]">IMDb Score vs Viewership Hours Scatter Matrix</h3>
          <p className="text-xs text-[#050505]/80 font-bold">
            Bubble size indicates title runtime. High rating + high stream hours indicate breakout global hits.
          </p>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <XAxis type="number" dataKey="imdbRating" name="IMDb Score" domain={[5, 10]} stroke="#050505" fontSize={11} fontWeight={800} />
                <YAxis type="number" dataKey="streamHoursMillions" name="Stream Hours (M)" stroke="#050505" fontSize={11} fontWeight={800} />
                <ZAxis type="number" dataKey="runtimeMinutes" range={[100, 400]} name="Runtime" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload as StreamingItem;
                      return (
                        <div className="bg-white p-3 rounded-2xl border-2 border-[#050505] shadow-[4px_4px_0_#050505] text-xs space-y-1">
                          <p className="font-black text-[#050505]">{data.title}</p>
                          <p className="text-[#050505]/80 font-bold">{data.platform} • {data.genre}</p>
                          <p className="text-[#7000FF] font-black">IMDb: ★ {data.imdbRating}</p>
                          <p className="text-[#FF007A] font-black">Streamed: {data.streamHoursMillions}M hrs</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Titles" data={filteredItems} fill="#FF007A" stroke="#050505" strokeWidth={1} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeView === 'table' && (
        <div className="bg-white rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] overflow-hidden">
          <div className="p-4 bg-[#FFD600] border-b-3 border-[#050505] flex justify-between items-center text-xs">
            <span className="font-black text-[#050505] uppercase tracking-wider">Catalog Records ({filteredItems.length})</span>
            <span className="text-[#050505] font-bold">Click column header to sort</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#050505]">
              <thead className="bg-[#F4F4F9] text-[#050505] font-black uppercase border-b-2 border-[#050505]">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Genre</th>
                  <th className="p-3">Year</th>
                  <th className="p-3">IMDb</th>
                  <th className="p-3">Stream Hours</th>
                  <th className="p-3">Certification</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#050505]/10 font-bold">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#00F0FF]/20 transition-colors">
                    <td className="p-3 font-black text-[#050505] flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.seasons && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#050505] text-white font-black">
                          S{item.seasons}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-black text-white border border-[#050505]"
                        style={{
                          backgroundColor: PLATFORM_COLORS[item.platform] || '#7000FF',
                          color: item.platform === 'Prime Video' || item.platform === 'HBO Max' ? '#050505' : '#ffffff'
                        }}
                      >
                        {item.platform}
                      </span>
                    </td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.genre}</td>
                    <td className="p-3 font-black">{item.releaseYear}</td>
                    <td className="p-3 text-[#7000FF] font-black">★ {item.imdbRating}</td>
                    <td className="p-3 text-[#FF007A] font-black">{item.streamHoursMillions}M</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-[#F4F4F9] text-[#050505] border border-[#050505] text-[10px] font-black">
                        {item.ageCertification}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
