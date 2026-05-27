import React, { useState } from "react";
import { ChevronDown, MapPin, LayoutList, SlidersHorizontal, X, Search } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export const Form = ({
    propType, setPropType,
    rooms, setRooms,
    locationQuery, setLocationQuery,
    priceFrom, setPriceFrom,
    priceTo, setPriceTo,
    hasPhoto, setHasPhoto,
    isNew, setIsNew,
    fromOwner, setFromOwner,
    isCommercial, setIsCommercial,
    onSearch,
    isMapView, onToggleView,
    resultsCount,
    // Advanced
    floorFrom, setFloorFrom,
    floorTo, setFloorTo,
    totalAreaFrom, setTotalAreaFrom,
    totalAreaTo, setTotalAreaTo,
    residentialComplex, setResidentialComplex,
    // Extra advanced
    houseType, setHouseType,
    yearFrom, setYearFrom,
    yearTo, setYearTo,
    notFirstFloor, setNotFirstFloor,
    notLastFloor, setNotLastFloor,
    kitchenAreaFrom, setKitchenAreaFrom,
    kitchenAreaTo, setKitchenAreaTo,
}) => {
    const { t } = useLanguage();
    const [showAdvanced, setShowAdvanced] = useState(false);
    const checkboxLabel = "flex items-center gap-2 text-[13px] cursor-pointer hover:text-blue-700 transition-colors py-1";

    // Styles
    const inp = "h-[32px] px-2 bg-white border border-[#ccc] rounded-[2px] text-[13px] outline-none focus:border-[#2a5885] transition-colors";
    const sel = "h-[32px] pl-2 pr-6 bg-white border border-[#ccc] rounded-[2px] text-[13px] outline-none appearance-none w-full focus:border-[#2a5885]";
    const labelSmall = "text-[12px] text-[#666] mb-1 block";
    const cbLabel = "flex items-center gap-2 text-[13px] cursor-pointer hover:text-blue-700 select-none py-1";

    const roomButtons = ["1", "2", "3", "4", "5+"];

    const toggleRoom = (r) => {
        if (!setRooms) return;
        setRooms(prev => prev === r ? "" : r);
    };

    const handleClear = () => {
        setRooms && setRooms("");
        setPriceFrom && setPriceFrom("");
        setPriceTo && setPriceTo("");
        setHasPhoto && setHasPhoto(false);
        setIsNew && setIsNew(false);
        setFromOwner && setFromOwner(false);
        setHouseType && setHouseType("");
        setYearFrom && setYearFrom("");
        setYearTo && setYearTo("");
        setFloorFrom && setFloorFrom("");
        setFloorTo && setFloorTo("");
        setNotFirstFloor && setNotFirstFloor(false);
        setNotLastFloor && setNotLastFloor(false);
        setTotalAreaFrom && setTotalAreaFrom("");
        setTotalAreaTo && setTotalAreaTo("");
        setKitchenAreaFrom && setKitchenAreaFrom("");
        setKitchenAreaTo && setKitchenAreaTo("");
        setResidentialComplex && setResidentialComplex("");
        setPropType && setPropType("");
        setLocationQuery && setLocationQuery("");
    };

    return (
        /* Изменено здесь: добавили hidden md:block, чтобы форма пропадала на смартфонах */
        <div className="hidden md:block w-full bg-[#ffcc66] rounded-[4px] shadow-sm overflow-hidden">
            {/* Main Row */}
            <div className="p-4 flex flex-wrap items-end gap-4">
                {/* Property Type */}
                <div className="flex-1 min-w-[180px]">
                    <span className={labelSmall}>Что ищем</span>
                    <div className="relative">
                        <select
                            value={propType}
                            onChange={(e) => setPropType(e.target.value)}
                            className={sel}
                        >
                            <option value="">Все типы</option>
                            <option value="apartments">Квартиры</option>
                            <option value="villas">Дома / Виллы</option>
                            <option value="commercial">Коммерческая</option>
                            <option value="land">Участки</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                    </div>
                </div>

                {/* Rooms */}
                <div className="flex flex-col">
                    <span className={labelSmall}>Количество комнат</span>
                    <div className="flex ">
                        {roomButtons.map(r => (
                            <button
                                key={r}
                                onClick={() => toggleRoom(r)}
                                className={`w-8 h-[32px] text-[13px] justify-center items-center flex font-bold border transition-all
                                    ${rooms === r
                                        ? "bg-[#2a5885] text-white border-[#2a5885]"
                                        : "bg-white text-[#333] border-[#ccc] hover:border-[#2a5885] hover:text-[#2a5885]"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <span className={labelSmall}>Цена (тг)</span>
                    <div className="flex items-center gap-1">
                        <input
                            type="text"
                            placeholder="От"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className={`${inp} w-[90px]`}
                        />
                        <span className="text-[#999]">—</span>
                        <input
                            type="text"
                            placeholder="До"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className={`${inp} w-[90px]`}
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="flex-1 min-w-[200px]">
                    <span className={labelSmall}>Где искать</span>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Район, ЖК или улица"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            className={`${inp} w-full pr-8`}
                        />
                        <MapPin size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999]" />
                    </div>
                </div>

            </div>

            {/* Checkbox Row (Visible by default in Krisha) */}
            <div className="px-4 pb-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#f0c040] pt-3">
                <label className={cbLabel}>
                    <input type="checkbox" checked={hasPhoto} onChange={e => setHasPhoto(e.target.checked)} className="w-[15px] h-[15px]" />
                    есть фото
                </label>
                <label className={cbLabel}>
                    <input type="checkbox" checked={fromOwner} onChange={e => setFromOwner(e.target.checked)} className="w-[15px] h-[15px]" />
                    от хозяев
                </label>
                <label className={checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="w-[18px] h-[18px] border-[#ccc] rounded-[2px]"
                    />
                    <span>новостройки</span>
                </label>
                <label className={cbLabel}>
                    <input type="checkbox" checked={isCommercial} onChange={e => setIsCommercial(e.target.checked)} className="w-[15px] h-[15px]" />
                    проверенные специалисты
                </label>

                {/* Main Search Button */}

                <button
                    onClick={onSearch}
                    className="bg-[#2a5885] hover:bg-[#244b72] text-white h-[36px] px-8 rounded-[2px] text-[14px] font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                    <Search size={16} />
                    Показать ({resultsCount ?? 0})
                </button>
                <div className="flex-1" />
            </div>



            {/* Advanced Filters */}
            <div className="px-4 pb-6 pt-4 bg-[#fff9eb] border-t border-[#f0c040]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Column 1: Building */}
                    <div>
                        <h4 className="text-[14px] font-bold mb-3 text-[#333]">О доме</h4>
                        <div className="space-y-3">
                            <div>
                                <span className={labelSmall}>Тип постройки</span>
                                <select value={houseType} onChange={e => setHouseType(e.target.value)} className={sel}>
                                    <option value="">Любой</option>
                                    <option value="panel">Панельный</option>
                                    <option value="brick">Кирпичный</option>
                                    <option value="monolith">Монолитный</option>
                                </select>
                            </div>
                            <div>
                                <span className={labelSmall}>Год постройки</span>
                                <div className="flex items-center gap-1">
                                    <input type="text" placeholder="От" value={yearFrom} onChange={e => setYearFrom(e.target.value)} className={`${inp} w-full`} />
                                    <input type="text" placeholder="До" value={yearTo} onChange={e => setYearTo(e.target.value)} className={`${inp} w-full`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Apartment specifics */}
                    <div>
                        <h4 className="text-[14px] font-bold mb-3 text-[#333]">Характеристики</h4>
                        <div className="space-y-3">
                            <div>
                                <span className={labelSmall}>Этаж</span>
                                <div className="flex items-center gap-1">
                                    <input type="text" placeholder="От" value={floorFrom} onChange={e => setFloorFrom(e.target.value)} className={`${inp} w-full`} />
                                    <input type="text" placeholder="До" value={floorTo} onChange={e => setFloorTo(e.target.value)} className={`${inp} w-full`} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className={cbLabel}>
                                    <input type="checkbox" checked={notFirstFloor} onChange={e => setNotFirstFloor(e.target.checked)} className="w-[14px] h-[14px]" />
                                    не первый
                                </label>
                                <label className={cbLabel}>
                                    <input type="checkbox" checked={notLastFloor} onChange={e => setNotLastFloor(e.target.checked)} className="w-[14px] h-[14px]" />
                                    не последний
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Areas */}
                    <div>
                        <h4 className="text-[14px] font-bold mb-3 text-[#333]">Площадь (м²)</h4>
                        <div className="space-y-3">
                            <div>
                                <span className={labelSmall}>Общая</span>
                                <div className="flex items-center gap-1">
                                    <input type="text" placeholder="От" value={totalAreaFrom} onChange={e => setTotalAreaFrom(e.target.value)} className={`${inp} w-full`} />
                                    <input type="text" placeholder="До" value={totalAreaTo} onChange={e => setTotalAreaTo(e.target.value)} className={`${inp} w-full`} />
                                </div>
                            </div>
                            <div>
                                <span className={labelSmall}>Кухня</span>
                                <div className="flex items-center gap-1">
                                    <input type="text" placeholder="От" value={kitchenAreaFrom} onChange={e => setKitchenAreaFrom(e.target.value)} className={`${inp} w-full`} />
                                    <input type="text" placeholder="До" value={kitchenAreaTo} onChange={e => setKitchenAreaTo(e.target.value)} className={`${inp} w-full`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: More */}
                    <div>
                        <h4 className="text-[14px] font-bold mb-3 text-[#333]">Дополнительно</h4>
                        <div className="space-y-3">
                            <div>
                                <span className={labelSmall}>Жилой комплекс</span>
                                <input
                                    type="text"
                                    placeholder="Название ЖК"
                                    value={residentialComplex}
                                    onChange={e => setResidentialComplex(e.target.value)}
                                    className={`${inp} w-full`}
                                />
                            </div>
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-1.5 text-[13px] text-red-600 font-bold hover:underline mt-4"
                            >
                                <X size={14} />
                                Очистить все фильтры
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom View Switcher (Optional, if onToggleView is provided) */}
            {onToggleView && (
                <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-[#eee]">
                    <div className="text-[12px] text-[#888]">
                        Найдено <span className="font-bold text-black">{resultsCount ?? 0}</span> объявлений
                    </div>
                    <div className="flex border rounded-[3px] overflow-hidden">
                        <button
                            onClick={() => isMapView && onToggleView()}
                            className={`flex items-center gap-2 px-4 py-1.5 text-[13px] transition-colors ${!isMapView ? "bg-[#2a5885] text-white" : "bg-white text-[#555] hover:bg-gray-50"}`}
                        >
                            <LayoutList size={14} />
                            Списком
                        </button>
                        <button
                            onClick={() => !isMapView && onToggleView()}
                            className={`flex items-center gap-2 px-4 py-1.5 text-[13px] border-l transition-colors ${isMapView ? "bg-[#2a5885] text-white" : "bg-white text-[#555] hover:bg-gray-50"}`}
                        >
                            <MapPin size={14} />
                            На карте
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};