import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import { ChevronDown, MapPin, Search } from "lucide-react";

import MobileGridMenu from "./MobileGridMenu";

const MainForm = ({ initialAction = "buy", initialType = "" }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // State для десктопной формы
    const [action, setAction] = useState(initialAction);
    const [propType, setPropType] = useState(initialType || "apartments");
    const [rooms, setRooms] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [locationQuery, setLocationQuery] = useState("");

    // Checkboxes
    const [hasPhoto, setHasPhoto] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [fromOwner, setFromOwner] = useState(false);
    const [isCommercial, setIsCommercial] = useState(false);

    // Синхронизируем тип, если он прилетел из URL
    useEffect(() => {
        if (initialType) {
            setPropType(initialType);
        }
    }, [initialType]);

    // Функция генерации строки и редиректа на страницу поиска
    const buildAndNavigateSearch = (updatedParams = {}) => {
        const params = new URLSearchParams();

        // Берем либо новые переданные значения из мобилки, либо текущие из стейта
        const finalAction = updatedParams.action !== undefined ? updatedParams.action : action;
        const finalPropType = updatedParams.propType !== undefined ? updatedParams.propType : propType;
        const finalIsNew = updatedParams.isNew !== undefined ? updatedParams.isNew : isNew;

        params.set('action', finalAction);
        if (finalPropType) params.set('type', finalPropType);
        if (rooms) params.set('rooms', rooms);
        if (priceFrom) params.set('priceFrom', priceFrom);
        if (priceTo) params.set('priceTo', priceTo);
        if (locationQuery) params.set('locationQuery', locationQuery);
        if (hasPhoto) params.set('hasPhoto', '1');
        if (finalIsNew) params.set('new', '1');
        if (fromOwner) params.set('fromOwner', '1');
        if (isCommercial) params.set('commercial', '1');

        navigate(`/search?${params.toString()}`);
    };

    // Обычный поиск по кнопке «Найти» на десктопе
    const onSearch = () => {
        buildAndNavigateSearch();
    };

    const inputClasses = "h-[40px] px-3 bg-white border border-[#ccc] rounded-[2px] text-[14px] outline-none focus:border-[#2a5885] appearance-none w-full transition-colors";
    const labelClasses = "text-[12px] text-[#333] mb-1.5 block font-medium";
    const checkboxLabel = "flex items-center gap-2 text-[13px] cursor-pointer hover:text-blue-700 transition-colors py-1";

    if (isMobile) {
        if (initialType) {
            return null;
        }

        return (
            <div className="w-full max-w-[1350px] mx-auto px-4 mt-4 mb-6">
                <MobileGridMenu
                    setPropType={setPropType}
                    setIsNew={setIsNew}
                    setAction={setAction}
                    onNavigate={(updatedFilters) => buildAndNavigateSearch(updatedFilters)}
                />
            </div>
        );
    } return (
        <div className="w-full max-w-[1350px] mx-auto  mt-4 md:mt-8 mb-12">
            <div className="bg-[#ffcc66] p-6 rounded-[4px]">
                {/* Main Filter Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Property Type */}
                    <div>
                        <span className={labelClasses}>Тип недвижимости</span>
                        <div className="relative">
                            <select
                                value={propType}
                                onChange={(e) => setPropType(e.target.value)}
                                className={inputClasses}
                            >
                                <option value="apartments">Квартиры</option>
                                <option value="villas">Дома / Виллы</option>
                                <option value="commercial">Коммерческая</option>
                                <option value="land">Участки</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                        </div>
                    </div>

                    {/* Rooms */}
                    <div>
                        <span className={labelClasses}>Кол-во комнат</span>
                        <div className="relative">
                            <select
                                value={rooms}
                                onChange={(e) => setRooms(e.target.value)}
                                className={inputClasses}
                            >
                                <option value="">Любая комнатность</option>
                                <option value="1">1-комнатные</option>
                                <option value="2">2-комнатные</option>
                                <option value="3">3-комнатные</option>
                                <option value="4">4-комнатные</option>
                                <option value="5+">5+</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <span className={labelClasses}>Цена (тг)</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="От"
                                value={priceFrom}
                                onChange={(e) => setPriceFrom(e.target.value)}
                                className={inputClasses}
                            />
                            <span className="text-[#333]">—</span>
                            <input
                                type="text"
                                placeholder="До"
                                value={priceTo}
                                onChange={(e) => setPriceTo(e.target.value)}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <span className={labelClasses}>Город или район</span>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Напр: Эр-Рияд"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                className={`${inputClasses} pr-10`}
                            />
                            <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f44336]" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Checkboxes & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0c040] pt-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <label className={checkboxLabel + " items-center justify-center flex"}>
                            <input
                                type="checkbox"
                                checked={hasPhoto}
                                onChange={(e) => setHasPhoto(e.target.checked)}
                                className="w-[18px] h-[18px] border-[#ccc] rounded-[2px]"
                            />
                            <span>есть фото</span>
                        </label>
                        <label className={checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={fromOwner}
                                onChange={(e) => setFromOwner(e.target.checked)}
                                className="w-[18px] h-[18px] border-[#ccc] rounded-[2px]"
                            />
                            <span>от хозяев</span>
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
                        <label className={checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isCommercial}
                                onChange={e => setIsCommercial(e.target.checked)}
                                className="w-[15px] h-[15px]"
                            />
                            <span className="ml-1">проверенные специалисты</span>
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/map')}
                            className="bg-white hover:bg-gray-50 text-[#333] h-[44px] px-6 rounded-[2px] text-[15px] font-bold border border-[#ccc] transition-all flex items-center gap-2 shadow-sm"
                        >
                            <MapPin size={18} className="text-[#f44336]" />
                            На карте
                        </button>
                        <button
                            onClick={onSearch}
                            className="bg-[#2a5885] hover:bg-[#244b72] text-white h-[44px] px-12 rounded-[2px] text-[16px] font-bold transition-all flex items-center gap-2 shadow-md"
                        >
                            <Search size={20} />
                            Найти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainForm;