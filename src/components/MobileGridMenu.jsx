import React, { useState } from "react";
import { House, Key, Building2, BriefcaseBusiness } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const MobileGridMenu = ({ onNavigate, setPropType, setIsNew }) => {
    const [currentView, setCurrentView] = useState("main"); // main, buy, rent
    const navigate = useNavigate();

    // 1. Главное меню (плитки)
    if (currentView === "main") {
        return (
            <div className="p-4 grid grid-cols-2 gap-3 md:hidden">
                <button onClick={() => navigate("/select-category")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <House size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Купить</span>
                </button>
                <button onClick={() => navigate("/select-category")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <Key size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Арендовать</span>
                </button>
                <button onClick={() => navigate("/select-category")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <Building2 size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Новостройки</span>
                </button>
                <button onClick={() => navigate("/select-category")} className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 border border-gray-100">
                    <BriefcaseBusiness size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Коммерческая</span>
                </button>
            </div>
        );
    }

    return (
        <CategoryPage />
    );


};

export default MobileGridMenu;