import React, { useState } from "react";
import { House, Key, Building2, BriefcaseBusiness } from 'lucide-react'// Импортируем useState, чтобы не было ReferenceError

export const MobileGridMenu = ({
    onNavigate,
    setPropType,
    setIsNew,
    // Если у тебя аренда/покупка управляется через отдельный стейт, прими нужный сеттер здесь, например:
    // setDealType 
}) => {
    // Внутренний стейт для переключения подменю (например, для "Купить" / "Арендовать")
    const [currentView, setCurrentView] = useState("main");

    // 1. Главное меню с 4 плитками
    if (currentView === "main") {
        return (
            <div className="p-4 grid grid-cols-2 gap-3 md:hidden">
                {/* Кнопка КУПИТЬ */}
                <button
                    onClick={() => setCurrentView("buy")}
                    className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 transition-colors border border-gray-100"
                >
                    <House size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Купить</span>
                </button>

                {/* Кнопка АРЕНДОВАТЬ */}
                <button
                    onClick={() => setCurrentView("rent")}
                    className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 transition-colors border border-gray-100"
                >
                    <Key size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Арендовать</span>
                </button>

                {/* Кнопка НОВОСТРОЙКИ */}
                <button
                    onClick={() => {
                        if (setPropType) setPropType("apartments"); // Обычно новостройки — это квартиры
                        if (setIsNew) setIsNew(true);
                        if (onNavigate) onNavigate(); // Переключаем экран на результаты поиска
                    }}
                    className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 transition-colors border border-gray-100"
                >
                    <Building2 size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Новостройки</span>
                </button>

                {/* Кнопка КОММЕРЧЕСКАЯ */}
                <button
                    onClick={() => {
                        if (setPropType) setPropType("commercial");
                        if (setIsNew) setIsNew(false);
                        if (onNavigate) onNavigate(); // Переключаем экран на результаты поиска
                    }}
                    className="flex flex-col items-center justify-center p-4 bg-[#f8f9fa] rounded-xl active:bg-gray-100 transition-colors border border-gray-100"
                >
                    <BriefcaseBusiness size={24} className="mb-1 text-[#c9a227]" />
                    <span className="text-[14px] font-medium text-gray-800">Коммерческая</span>
                </button>
            </div>
        );
    }

    // 2. Подменю для выбора типа недвижимости (Купить / Арендовать)
    const isRentSubmenu = currentView === "rent";

    return (
        <div className="p-4 md:hidden bg-white min-h-[300px]">
            {/* Шапка подменю с кнопкой Назад */}
            <div className="flex items-center gap-3 mb-4 pb-2 border-b">
                <button
                    onClick={() => setCurrentView("main")}
                    className="text-blue-600 font-medium text-[15px] flex items-center gap-1"
                >
                    ← Назад
                </button>
                <h3 className="font-bold text-[16px]">
                    {isRentSubmenu ? "Арендовать" : "Купить"}
                </h3>
            </div>

            {/* Список категорий */}
            <div className="divide-y divide-gray-100">
                {[
                    { label: "Квартиру", value: "apartments" },
                    { label: "Дом или дачу", value: "villas" },
                    { label: "Коммерческую недвижимость", value: "commercial" },
                    { label: "Участок", value: "land" }
                ].map((item) => (
                    <button
                        key={item.value}
                        onClick={() => {
                            // 1. Устанавливаем тип недвижимости в родительском стейте
                            if (setPropType) setPropType(item.value);
                            if (setIsNew) setIsNew(false);

                            // 2. Если у тебя есть стейт для Купить/Продать, дёргай его здесь:
                            // if (setDealType) setDealType(isRentSubmenu ? "rent" : "buy");

                            // 3. Уходим на страницу выдачи тайтлов/карточек
                            if (onNavigate) onNavigate();
                        }}
                        className="w-full flex items-center justify-between py-3.5 text-left text-[15px] text-gray-700 active:bg-gray-50"
                    >
                        <span>{item.label}</span>
                        <span className="text-gray-400 text-sm">➔</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Добавляем дефолтный экспорт, чтобы MainForm.jsx:6 не ругался!
export default MobileGridMenu;