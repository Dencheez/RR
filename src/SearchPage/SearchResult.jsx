import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as turf from '@turf/turf';
import { SearchHeader } from "./SearchHeader";
import { SearchCard } from "./SearchCard";
import { MapSearchForm } from "./MapSearchForm";
import { useLanguage } from "../components/LanguageContext";
import PropertyMap from "./PropertyMap";
import { Flame, ArrowUpDown } from "lucide-react";

export default function SearchResult({ isMapView }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, isDark } = useLanguage();

  const [savedIds, setSavedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form States
  const [action, setAction] = useState(searchParams.get('action') || 'buy');
  const [propType, setPropType] = useState(searchParams.get('type') || '');
  const [rooms, setRooms] = useState(searchParams.get('rooms') || '');
  const [priceFrom, setPriceFrom] = useState(searchParams.get('priceFrom') || '');
  const [priceTo, setPriceTo] = useState(searchParams.get('priceTo') || '');
  const [locationQuery, setLocationQuery] = useState(searchParams.get('locationQuery') || '');
  const [hasPhoto, setHasPhoto] = useState(searchParams.get('hasPhoto') === '1');
  const [isNew, setIsNew] = useState(searchParams.get('new') === '1');
  const [fromOwner, setFromOwner] = useState(searchParams.get('fromOwner') === '1');
  const [isCommercial, setIsCommercial] = useState(searchParams.get('commercial') === '1');

  // Advanced States
  const [houseType, setHouseType] = useState(searchParams.get('houseType') || '');
  const [floorFrom, setFloorFrom] = useState(searchParams.get('floorFrom') || '');
  const [floorTo, setFloorTo] = useState(searchParams.get('floorTo') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');
  const [yearTo, setYearTo] = useState(searchParams.get('yearTo') || '');
  const [notFirstFloor, setNotFirstFloor] = useState(searchParams.get('notFirstFloor') === '1');
  const [notLastFloor, setNotLastFloor] = useState(searchParams.get('notLastFloor') === '1');
  const [totalAreaFrom, setTotalAreaFrom] = useState(searchParams.get('totalAreaFrom') || '');
  const [totalAreaTo, setTotalAreaTo] = useState(searchParams.get('totalAreaTo') || '');
  const [kitchenAreaFrom, setKitchenAreaFrom] = useState(searchParams.get('kitchenAreaFrom') || '');
  const [kitchenAreaTo, setKitchenAreaTo] = useState(searchParams.get('kitchenAreaTo') || '');
  const [residentialComplex, setResidentialComplex] = useState(searchParams.get('residentialComplex') || '');

  const [sortBy, setSortBy] = useState("sortNew");
  const [polygonFilter, setPolygonFilter] = useState(null);

  // Sync state with URL parameters when they change
  useEffect(() => {
    setAction(searchParams.get('action') || 'buy');
    setPropType(searchParams.get('type') || '');
    setRooms(searchParams.get('rooms') || '');
    setPriceFrom(searchParams.get('priceFrom') || '');
    setPriceTo(searchParams.get('priceTo') || '');
    setLocationQuery(searchParams.get('locationQuery') || '');
    setHasPhoto(searchParams.get('hasPhoto') === '1');
    setIsNew(searchParams.get('new') === '1');
    setFromOwner(searchParams.get('fromOwner') === '1');
    setIsCommercial(searchParams.get('commercial') === '1');

    setHouseType(searchParams.get('houseType') || '');
    setFloorFrom(searchParams.get('floorFrom') || '');
    setFloorTo(searchParams.get('floorTo') || '');
    setYearFrom(searchParams.get('yearFrom') || '');
    setYearTo(searchParams.get('yearTo') || '');
    setNotFirstFloor(searchParams.get('notFirstFloor') === '1');
    setNotLastFloor(searchParams.get('notLastFloor') === '1');
    setTotalAreaFrom(searchParams.get('totalAreaFrom') || '');
    setTotalAreaTo(searchParams.get('totalAreaTo') || '');
    setKitchenAreaFrom(searchParams.get('kitchenAreaFrom') || '');
    setKitchenAreaTo(searchParams.get('kitchenAreaTo') || '');
    setResidentialComplex(searchParams.get('residentialComplex') || '');
  }, [searchParams]);

  const pageBg = isDark ? "bg-[#0d0d0d]" : "bg-[#f7f5f0]";
  const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('action', action);
    if (propType) params.set('type', propType);
    if (rooms) params.set('rooms', rooms);
    if (priceFrom) params.set('priceFrom', priceFrom);
    if (priceTo) params.set('priceTo', priceTo);
    if (locationQuery) params.set('locationQuery', locationQuery);
    if (hasPhoto) params.set('hasPhoto', '1');
    if (isNew) params.set('new', '1');
    if (fromOwner) params.set('fromOwner', '1');
    if (isCommercial) params.set('commercial', '1');

    if (houseType) params.set('houseType', houseType);
    if (floorFrom) params.set('floorFrom', floorFrom);
    if (floorTo) params.set('floorTo', floorTo);
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (yearTo) params.set('yearTo', yearTo);
    if (notFirstFloor) params.set('notFirstFloor', '1');
    if (notLastFloor) params.set('notLastFloor', '1');
    if (totalAreaFrom) params.set('totalAreaFrom', totalAreaFrom);
    if (totalAreaTo) params.set('totalAreaTo', totalAreaTo);
    if (kitchenAreaFrom) params.set('kitchenAreaFrom', kitchenAreaFrom);
    if (kitchenAreaTo) params.set('kitchenAreaTo', kitchenAreaTo);
    if (residentialComplex) params.set('residentialComplex', residentialComplex);

    navigate(`/${isMapView ? 'map' : 'search'}?${params.toString()}`);

    if (isMapView) {
      setTimeout(() => {
        document.getElementById('results-list')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleToggleView = () => {
    const params = new URLSearchParams(searchParams);
    navigate(`/${isMapView ? 'search' : 'map'}?${params.toString()}`);
  };

  const toggleSave = (id) => {
    setSavedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
  };

  // Mock Data
  const buildings = [
    {
      id: 1,
      name: "Al Malqa Luxury Villa",
      status: "Available",
      price: 2,
      image: "RR/ThePalmVilla.png",
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      area: 350,
      location: "Al Malqa District • Riyadh",
      features: "Private Pool • Garden • Smart Home",
      distance: 5.5,
      category: "Villas",
      type: "For Sale",
      coords: [24.7836, 46.6153],
      date: "2024-05-08"
    },
    {
      id: 2,
      name: "KAFD Sky Penthouse",
      status: "Available",
      price: 15000,
      image: "RR/SKYLINE.png",
      bedrooms: 2,
      bathrooms: 2,
      beds: 2,
      area: 150,
      location: "KAFD • Riyadh",
      features: "City View • High Floor • Premium",
      distance: 2.0,
      category: "Penthouses",
      type: "For rent",
      coords: [24.7618, 46.6402],
      date: "2024-05-07"
    },
    {
      id: 6,
      name: "Al Narjis Modern Loft",
      status: "Available",
      price: 8500,
      image: "RR/3ProductCard.jpg",
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      area: 85,
      location: "Al Narjis • Riyadh",
      features: "Modern Loft • High Ceilings",
      distance: 12.0,
      category: "Apartments",
      type: "For rent",
      coords: [24.8210, 46.6850],
      date: "2024-05-09"
    },
    {
      id: 3,
      name: "Diplomatic Quarter Estate",
      status: "Sold",
      price: 5.0,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000",
      bedrooms: 5,
      bathrooms: 6,
      beds: 6,
      area: 600,
      location: "DQ • Riyadh",
      features: "Security • Large Plot • Guest House",
      distance: 10.0,
      category: "Estates",
      type: "For Sale",
      coords: [24.6750, 46.6250],
      date: "2024-05-06"
    },
    {
      id: 4,
      name: "Al Malqa Luxury Villa",
      status: "Available",
      price: 2,
      image: "RR/ThePalmVilla.png",
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      area: 350,
      location: "Al Malqa District • Riyadh",
      features: "Private Pool • Garden • Smart Home",
      distance: 5.5,
      category: "Villas",
      type: "For Sale",
      coords: [24.7836, 46.6153],
      date: "2024-05-08"
    },
    {
      id: 5,
      name: "Al Malqa Luxury Villa",
      status: "Available",
      price: 2,
      image: "RR/ThePalmVilla.png",
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      area: 350,
      location: "Al Malqa District • Riyadh",
      features: "Private Pool • Garden • Smart Home",
      distance: 5.5,
      category: "Villas",
      type: "For Sale",
      coords: [24.7836, 46.6153],
      date: "2024-05-08"
    },
  ];

  const filteredBuildings = useMemo(() => {
    let result = buildings.filter(b => {
      // Action filtering (Buy/Rent)
      const matchesAction = action === 'buy' ? b.type === "For Sale" : b.type === "For rent";
      if (!matchesAction) return false;

      if (rooms && b.bedrooms.toString() !== rooms) return false;
      if (propType && b.category.toLowerCase() !== propType.toLowerCase()) return false;
      return true;
    });

    // Sorting Logic
    if (sortBy === 'sortCheap') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'sortExpensive') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sortNew') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [buildings, rooms, propType, action, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [rooms, propType, action, priceFrom, priceTo, locationQuery]);

  const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);
  const paginatedBuildings = filteredBuildings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hotOffers = [
    { id: 101, title: "2-room apartment • 72.2 m²", price: "17 700 000", location: "Al Malqa District", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200" },
    { id: 102, title: "4-room villa • 240 m²", price: "69 000 000", location: "Olaya Street", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200" },
    { id: 103, title: "Studio • 45 m²", price: "12 500 000", location: "KAFD Area", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200" },
    { id: 104, title: "Penthouse • 350 m²", price: "85 000 000", location: "Al Narjis District", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200" },
    { id: 105, title: "3-room apartment • 115 m²", price: "24 200 000", location: "Al Wadi District", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200" },
    { id: 106, title: "Townhouse • 180 m²", price: "32 500 000", location: "Al Yasmin District", image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=200" },
    { id: 107, title: "Villa • 420 m²", price: "120 000 000", location: "Hittin District", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200" },
    { id: 108, title: "Duplex • 210 m²", price: "45 000 000", location: "Al Aqiq District", image: "https://brickwoodhomes.com.au/wp-content/uploads/2024/03/IMG-20211123-WA0003.jpg" },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${pageBg}`}>
      <SearchHeader />

      <main className="max-w-[1440px] mx-auto px-4 md:px-10 pt-28 pb-20">

        {/* TOP SEARCH FORM */}
        <MapSearchForm
          action={action} setAction={setAction}
          propType={propType} setPropType={setPropType}
          rooms={rooms} setRooms={setRooms}
          locationQuery={locationQuery} setLocationQuery={setLocationQuery}
          priceFrom={priceFrom} setPriceFrom={setPriceFrom}
          priceTo={priceTo} setPriceTo={setPriceTo}
          hasPhoto={hasPhoto} setHasPhoto={setHasPhoto}
          isNew={isNew} setIsNew={setIsNew}
          fromOwner={fromOwner} setFromOwner={setFromOwner}
          isCommercial={isCommercial} setIsCommercial={setIsCommercial}
          onSearch={handleSearch}
          isMapView={isMapView} onToggleView={handleToggleView}
          resultsCount={filteredBuildings.length}
          // New Advanced Props
          houseType={houseType} setHouseType={setHouseType}
          floorFrom={floorFrom} setFloorFrom={setFloorFrom}
          floorTo={floorTo} setFloorTo={setFloorTo}
          yearFrom={yearFrom} setYearFrom={setYearFrom}
          yearTo={yearTo} setYearTo={setYearTo}
          notFirstFloor={notFirstFloor} setNotFirstFloor={setNotFirstFloor}
          notLastFloor={notLastFloor} setNotLastFloor={setNotLastFloor}
          totalAreaFrom={totalAreaFrom} setTotalAreaFrom={setTotalAreaFrom}
          totalAreaTo={totalAreaTo} setTotalAreaTo={setTotalAreaTo}
          kitchenAreaFrom={kitchenAreaFrom} setKitchenAreaFrom={setKitchenAreaFrom}
          kitchenAreaTo={kitchenAreaTo} setKitchenAreaTo={setKitchenAreaTo}
          residentialComplex={residentialComplex} setResidentialComplex={setResidentialComplex}
        />

        <div className="flex flex-col lg:flex-row gap-10 mt-10">

          {/* MAIN CONTENT COLUMN */}
          <div className="flex-1">

            {/* Header Block & Sorting */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className={`text-4xl font-extrabold mb-2 ${titleColor}`}>
                  {action === 'buy' ? t('navSale') : t('navRent')} {t('hotDealsSubtitle')}
                </h1>
                <p className={`text-sm opacity-50 ${titleColor}`}>
                  {t('Ads Found')}: {filteredBuildings.length}
                </p>
              </div>
            </div>
            {/* Sorting Pills */}

            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className={`text-[10px] font-black uppercase tracking-widest opacity-40 mr-2 ${titleColor}`}>
                {t('sortBy')}
              </span>
              {[
                { id: 'sortNew', label: t('sortNew') },
                { id: 'sortCheap', label: t('sortCheap') },
                { id: 'sortExpensive', label: t('sortExpensive') }
              ].map(sort => (
                <button
                  key={sort.id}
                  onClick={() => setSortBy(sort.id)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                      ${sortBy === sort.id
                      ? 'bg-[#c9a227] text-white shadow-lg scale-105'
                      : `bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 ${titleColor} opacity-60 hover:opacity-100`}`}
                >
                  {sort.label}
                </button>
              ))}
            </div>

            {/* Results Section */}
            {isMapView ? (
              <div className="flex flex-col gap-8">
                <div className={`w-full h-[600px] rounded-[32px] overflow-hidden border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <PropertyMap buildings={filteredBuildings} onPolygonChange={setPolygonFilter} />
                </div>
                <div id="results-list" className="flex flex-col gap-6">
                  {paginatedBuildings.map(house => (
                    <SearchCard key={house.id} building={house} isSaved={savedIds.includes(house.id)} onToggleSave={toggleSave} />
                  ))}
                </div>
                {/* Pagination in Map View */}
                {filteredBuildings.length > itemsPerPage && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          document.getElementById('results-list')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                            ${page === currentPage ? 'bg-[#c9a227] text-white shadow-lg' : `bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 ${titleColor}`}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  {paginatedBuildings.map(house => (
                    <SearchCard key={house.id} building={house} isSaved={savedIds.includes(house.id)} onToggleSave={toggleSave} />
                  ))}
                </div>

                {/* Пагинация ( если > 5 карточек) */}
                {filteredBuildings.length > itemsPerPage && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                            ${page === currentPage ? 'bg-[#c9a227] text-white shadow-lg' : `bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 ${titleColor}`}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Hot Offers (Hidden on Map View) */}
          {!isMapView && (
            <div className="w-full lg:w-[320px] shrink-0">
              <div className={` top-28 p-6 rounded-3xl border ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-black/5'}`}>
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="text-[#c9a227]" size={20} />
                  <h2 className={`text-xl font-black uppercase tracking-tight ${titleColor}`}>{t('hotOffers')}</h2>
                </div>

                <div className="space-y-6">
                  {hotOffers.map(offer => (
                    <div
                      key={offer.id}
                      className="group cursor-pointer"
                      onClick={() => navigate(`/property/${offer.id}`)}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-black/5 dark:border-white/5">
                          <img src={offer.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-[#2a81dd] text-[13px] font-bold leading-tight hover:underline mb-1">
                            {offer.title}
                          </h4>
                          <div className={`text-sm font-black ${titleColor} mb-1`}>
                            {offer.price} <span className="text-[10px] opacity-40">SAR</span>
                          </div>
                          <p className={`text-[11px] opacity-40 ${titleColor}`}>
                            {offer.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}