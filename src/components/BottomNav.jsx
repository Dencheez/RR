import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, Plus, Mail, User } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const BottomNav = ({ setIsAuthOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useLanguage();



    const handleNav = (item) => {
        if (item.protected && !user) {
            // Проверяем наличие функции перед вызовом
            if (typeof setIsAuthOpen === 'function') {
                setIsAuthOpen(true);
            } else {
                console.error("Функция setIsAuthOpen не передана в BottomNav!");
            }
        } else {
            navigate(item.href, { state: item.state });
        }
    };

    const menuItems = [
        { label: "Главная", href: "/", icon: Home },
        { label: "Избранное", href: "/profile", icon: Heart, state: { initialTab: 'saved' }, protected: true },
        { label: "Подать", href: "/add-property", icon: Plus, isPrimary: true, protected: true },
        { label: "Сообщения", href: "/profile", icon: Mail, state: { initialTab: 'messages' }, protected: true },
        { label: "Кабинет", href: "/profile", icon: User, protected: true },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 z-[9999] flex justify-around items-center md:hidden">
            {menuItems.map((item) => {
                const isActive = location.pathname === item.href && (!item.state || location.state?.initialTab === item.state?.initialTab);
                const Icon = item.icon;
                return (
                    <button key={item.label} onClick={() => handleNav(item)} className={`flex flex-col items-center justify-center w-full h-full ${isActive ? "text-[#c9a227]" : "text-gray-500"}`}>
                        {item.isPrimary ? <div className="bg-[#c9a227] text-white p-3 rounded-full"><Icon size={24} /></div> : <Icon size={22} />}
                    </button>
                );
            })}
        </div>
    );
};
export default BottomNav;