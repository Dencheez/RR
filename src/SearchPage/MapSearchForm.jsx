import React, { useState } from "react";
import { ChevronDown, Map, LayoutList, } from "lucide-react";
import { useLanguage } from "../components/LanguageContext";

export const MapSearchForm = ({
  propType, setPropType,
  rooms, setRooms,
  locationQuery,
  priceFrom, setPriceFrom,
  priceTo, setPriceTo,
  hasPhoto, setHasPhoto,
  isNew, setIsNew,
  fromOwner, setFromOwner,
  onSearch,
  isMapView, onToggleView,
  resultsCount,
  // New Advanced Props
  floorFrom, setFloorFrom,
  floorTo, setFloorTo,
  totalAreaFrom, setTotalAreaFrom,
  totalAreaTo, setTotalAreaTo,
  residentialComplex, setResidentialComplex
}) => {
  const { t, isDark } = useLanguage();


  const textColor = isDark ? "white" : "#1a1a1a";
  const inputBg = isDark ? "bg-white/5" : "bg-black/5";

  const btnClass = (active) => `px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${active
    ? 'bg-[#c9a227] text-white shadow-none'
    : ` ${isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`
    }`;

  const labelClass = "text-[10px] font-black uppercase tracking-widest opacity-40 mb-1.5 block";
  const groupWrap = "flex flex-col";


  return (
    <div
      className={`w-full rounded-[32px] p-8 mb-8 transition-all border ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white/90 backdrop-blur-xl border-black/5 shadow-2xl shadow-black/5'
        }`}
      style={{ color: isDark ? 'white' : '#1a1a1a' }}
    >
      {/* ROW 1: BASIC FILTERS */}
      <div className="flex flex-wrap items-end gap-6 mb-8">
        {/* Rooms Selection */}
        <div className={groupWrap}>
          <span className={labelClass}>{t('formRooms')}</span>
          <div className={`flex items-center gap-1 ${inputBg} p-1 rounded-xl`}>
            {["1", "2", "3", "4", "5+"].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setRooms(num)}
                className={btnClass(rooms === num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className={groupWrap}>
          <span className={labelClass}>{t('formType')}</span>
          <div className="relative">
            <select
              value={propType}
              onChange={(e) => setPropType(e.target.value)}
              className={`h-11 pl-4 pr-10 rounded-xl font-bold text-sm transition-colors ${inputBg}  appearance-none min-w-[140px]`}
            >
              <option value="">{t('bannerAll')}</option>
              <option value="villa">{t('formVilla')}</option>
              <option value="apartment">{t('formApartment')}</option>
              <option value="townhouse">{t('formTownhouse')}</option>
              <option value="penthouse">{t('bannerPenthouses')}</option>
              <option value="commercial">{t('formCommercial')}</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className={groupWrap}>
          <span className={labelClass}>{t('bannerLocation')}</span>
          <button type="button" className={`h-11 flex items-center gap-3 px-4 rounded-xl font-bold text-sm transition-colors ${inputBg}`}>
            {locationQuery || t('bannerLocationValue')}
            <ChevronDown size={14} className="opacity-40" />
          </button>
        </div>

        {/* Price Range */}
        <div className={groupWrap}>
          <span className={labelClass}>{t('hotDealsSubtitle')}</span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={t('from')}
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className={`w-28 h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold ${inputBg}`}
            />
            <span className="opacity-40">—</span>
            <input
              type="text"
              placeholder={t('to')}
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className={`w-28 h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold ${inputBg}`}
            />
          </div>
        </div>

        {/* Basic Checkboxes */}
        <div className="flex items-center gap-6 pb-3 ml-auto">
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest cursor-pointer group">
            <input type="checkbox" checked={hasPhoto} onChange={e => setHasPhoto(e.target.checked)} className="w-4 h-4 accent-[#c9a227] rounded" />
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">{t('checkHasPhoto')}</span>
          </label>
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest cursor-pointer group">
            <input type="checkbox" checked={isNew} onChange={e => setIsNew(e.target.checked)} className="w-4 h-4 accent-[#c9a227] rounded" />
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">{t('checkNewBuilding')}</span>
          </label>
          <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest cursor-pointer group">
            <input type="checkbox" checked={fromOwner} onChange={e => setFromOwner(e.target.checked)} className="w-4 h-4 accent-[#c9a227] rounded" />
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">{t('checkFromOwner')}</span>
          </label>
        </div>
      </div>

      {/* ADVANCED FILTERS (Always Visible) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-black/5 dark:border-white/5 mb-8">

        {/* Column 2: Floor Details */}
        <div className="space-y-6">
          <div className={groupWrap}>
            <span className={labelClass}>{t('floor')}</span>
            <div className="flex items-center gap-2">
              <input type="text" placeholder={t('from')} value={floorFrom} onChange={e => setFloorFrom(e.target.value)} className={`w-full h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold ${inputBg}`} />
              <input type="text" placeholder={t('to')} value={floorTo} onChange={e => setFloorTo(e.target.value)} className={`w-full h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold ${inputBg}`} />
            </div>
          </div>
        </div>

        {/* Column 3: Area Details */}
        <div className="space-y-6">
          <div className={groupWrap}>
            <span className={labelClass}>{t('totalArea')}</span>
            <div className="flex items-center gap-2">
              <input type="text" placeholder={t('from')} value={totalAreaFrom} onChange={e => setTotalAreaFrom(e.target.value)} className={`w-full h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold ${inputBg}`} />
              <input type="text" placeholder={t('to')} value={totalAreaTo} onChange={e => setTotalAreaTo(e.target.value)} className={`w-full h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold ${inputBg}`} />
            </div>
          </div>
        </div>

        {/* Column 4: Extra */}
        <div className="space-y-6">
          <div className={groupWrap}>
            <span className={labelClass}>{t('resComplex')}</span>
            <div className="relative">
              <select
                value={residentialComplex}
                onChange={e => setResidentialComplex(e.target.value)}
                className={`w-full h-11 px-4 rounded-xl border-0 outline-none text-sm font-bold appearance-none ${inputBg}`}
              >
                <option>{t('formAny')}</option>
                <option>Al Malqa Residence</option>
                <option>KAFD Towers</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BAR */}
      <div className="flex flex-wrap items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onSearch}
            className="bg-[#c9a227] text-white px-10 py-3.5 rounded-2xl font-black text-sm uppercase tracking-[0.1em] hover:bg-[#c9a227]/80 active:scale-95 transition-all shadow-xl"
          >
            {t('showResults')} ({resultsCount})
          </button>

          <div className={`flex items-center ${inputBg} rounded-2xl p-1`}>
            <button
              type="button"
              onClick={() => isMapView && onToggleView()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isMapView ? 'bg-white text-black shadow-md' : 'opacity-40 hover:opacity-100'}`}
            >
              <LayoutList size={14} />
              {t('viewList')}
            </button>
            <button
              type="button"
              onClick={() => !isMapView && onToggleView()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isMapView ? 'bg-white text-black shadow-md' : 'opacity-40 hover:opacity-100'}`}
            >
              <Map size={14} />
              {t('viewMap')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
