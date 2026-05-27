import React, { useState } from "react";
import { House, Key, Building2, BriefcaseBusiness } from 'lucide-react';

export const MobileGridMenu = ({ onNavigate, setPropType, setIsNew }) => {
    const [currentView, setCurrentView] = useState("main"); // "main", "buy", "rent"

    // Рендер главного экрана (4 плитки)
    if (currentView === "main") {
        return (
            <div className="p-4 grid grid-cols-2 gap-3">
                <button onClick={() => setCurrentView("buy")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <House size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Купить</span>
                </button>
                <button onClick={() => setCurrentView("rent")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <Key size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Арендовать</span>
                </button>
                <button onClick={() => { setPropType("apartments"); setIsNew(true); onNavigate(); }} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <Building2 size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Новостройки</span>
                </button>
                <button onClick={() => { setPropType("commercial"); setIsNew(false); onNavigate(); }} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <BriefcaseBusiness size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Коммерческая</span>
                </button>
            </div>
        );
    }

    // Рендер подменю выбора категории
    return (
        <div className="p-4 bg-white min-h-[300px]">
            <div className="flex items-center mb-4">
                <button onClick={() => setCurrentView("main")} className="text-blue-600 font-medium text-[15px] mr-4">← Назад</button>
            </div>

            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                <button onClick={() => setCurrentView("buy")} className={`flex-1 py-2 text-sm font-bold rounded-lg ${currentView === "buy" ? "bg-white shadow-sm" : "text-gray-500"}`}>Купить</button>
                <button onClick={() => setCurrentView("rent")} className={`flex-1 py-2 text-sm font-bold rounded-lg ${currentView === "rent" ? "bg-white shadow-sm" : "text-gray-500"}`}>Арендовать</button>
            </div>

            <div className="divide-y divide-gray-100">
                {[
                    { label: "Квартиру", value: "apartments" },
                    { label: "Виллу", value: "villas" },
                    { label: "Коммерческую недвижимость", value: "commercial" }
                ].map((item) => (
                    <button key={item.value} onClick={() => { setPropType(item.value); onNavigate(); }} className="w-full flex items-center justify-between py-4 text-[15px] text-gray-700 active:bg-gray-50">
                        <span>{item.label}</span>
                        <span className="text-gray-400">›</span>
                    </button>
                ))}
            </div>
        </div>
    );
};