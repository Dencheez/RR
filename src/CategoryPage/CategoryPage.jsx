import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CategoryPage = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('buy');
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    const handleCategoryClick = (item) => {
        setSelectedCategory(item);
    };

    const handleBack = () => {
        if (selectedCategory) {
            setSelectedCategory(null);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <div className="p-4">
                <button onClick={handleBack} className="text-[#c9a227] font-medium mb-4 flex items-center gap-2">
                    <ArrowLeft size={20} />
                    <h1 className="text-[24px] font-bold text-gray-900">
                        {selectedCategory
                            ? `${mode === 'rent' ? 'Арендовать' : 'Купить'} ${selectedCategory.label.toLowerCase()}`
                            : (mode === 'buy' ? 'Купить' : 'Арендовать')}
                    </h1>
                </button>

                {!selectedCategory && (
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
                )}
            </div>

            <div className="flex-grow divide-y divide-gray-100 px-4">
                {selectedCategory ? (
                    <>
                        <button
                            onClick={() => navigate(`/search?type=${selectedCategory.value}&term=monthly&action=${mode}`)}
                            className="w-full flex items-center justify-between py-5 text-[16px] text-gray-800"
                        >
                            <span>Помесячно</span>
                            <ArrowRight size={20} className="text-gray-400" />
                        </button>
                        <button
                            onClick={() => navigate(`/search?type=${selectedCategory.value}&term=daily&action=${mode}`)}
                            className="w-full flex items-center justify-between py-5 text-[16px] text-gray-800"
                        >
                            <span>Посуточно</span>
                            <ArrowRight size={20} className="text-gray-400" />
                        </button>
                    </>
                ) : (
                    categories[mode].map((item) => (
                        <button
                            key={item.value}
                            onClick={() => handleCategoryClick(item)}
                            className="w-full flex items-center justify-between py-5 text-[16px] text-gray-800"
                        >
                            <span>{item.label}</span>
                            <ArrowRight size={20} className="text-gray-400" />
                        </button>
                    ))
                )}
            </div>
            <BottomNav />
        </div>
    );
};

export default CategoryPage;