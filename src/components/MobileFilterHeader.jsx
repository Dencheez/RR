import React from "react";
import { MapPin, SlidersHorizontal, List } from "lucide-react";

export const MobileFilterHeader = ({
    isMapView,
    onToggleView,
    onOpenFilters,
    activeFiltersCount = 0
}) => {
    return (
        <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-stretch h-11">
                {/* На карте / Списком — переключается */}
                <button
                    onClick={onToggleView}
                    className="flex-1 flex items-center justify-center gap-1.5 text-[14px] font-medium active:bg-gray-50 transition-colors text-[#c9a227]"
                >
                    {isMapView ? (
                        <>
                            <List size={16} className="text-[#c9a227]" />
                            <span>Списком</span>
                        </>
                    ) : (
                        <>
                            <MapPin size={16} className="text-[#c9a227]" />
                            <span>На карте</span>
                        </>
                    )}
                </button>

                {/* Разделитель */}
                <div className="w-[1px] bg-gray-200 self-stretch" />

                {/* Фильтр */}
                <button
                    onClick={onOpenFilters}
                    className="flex-1 flex items-center justify-center gap-1.5 text-[14px] font-medium active:bg-gray-50 transition-colors text-[#c9a227]"
                >
                    <div className="relative flex items-center">
                        <SlidersHorizontal size={16} className="text-[#c9a227]" />
                        {activeFiltersCount > 0 && (
                            <span className="absolute -top-2 -right-2.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                                {activeFiltersCount}
                            </span>
                        )}
                    </div>
                    <span>Фильтр</span>
                </button>
            </div>
        </div>
    );
};