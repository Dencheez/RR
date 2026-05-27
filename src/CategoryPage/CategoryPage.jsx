import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CategoryPage = () => {
    const navigate = useNavigate();
    // Состояние: 'buy' или 'rent'
    const [mode, setMode] = useState('buy');

    // Списки для разных режимов
    const categories = {
        buy: [
            { label: "Квартиру", value: "apartments" },
            { label: "Виллу", value: "villas" },
            { label: "Коммерческую недвижимость", value: "commercial" },
            { label: "Новостройки", value: "house" },

        ],
        rent: [
            { label: "Квартиру", value: "apartments" },
            { label: "Виллу", value: "villas" },
            { label: "Коммерческую недвижимость", value: "commercial" },
            { label: "Новостройки", value: "house" },

        ]

    };

    const handleCategoryClick = (typeValue) => {
        // Переход с учетом выбранного режима
        navigate(`/search?type=${typeValue}&action=${mode}`);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="p-4">
                <button onClick={() => navigate(-1)} className="text-[#c9a227] font-medium mb-4  flex items-center gap-2">
                    <ArrowLeft size={20} />
                    <h1 className="text-[24px] font-bold text-gray-900">
                        {mode === 'buy' ? 'Купить' : 'Арендовать'}
                    </h1>
                </button>
                {/* Переключатель табов */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
                    <button
                        onClick={() => setMode('buy')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'buy' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    >
                        Купить
                    </button>
                    <button
                        onClick={() => setMode('rent')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'rent' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                    >
                        Арендовать
                    </button>
                </div>
            </div>

            <div className="flex-grow divide-y divide-gray-100 px-4">
                {categories[mode].map((item) => (
                    <button
                        key={item.value}
                        onClick={() => handleCategoryClick(item.value)}
                        className="w-full flex items-center justify-between py-5 text-[16px] text-gray-800"
                    >
                        <span>{item.label}</span>
                        <span className="text-gray-400 text-[20px]"><ArrowRight size={20} /></span>
                    </button>
                ))}
            </div>
            <BottomNav />
        </div>
    );
};

export default CategoryPage;