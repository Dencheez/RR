import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Heart, Plus, Mail, User } from "lucide-react";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: "Главная", href: "/", icon: Home },
        { label: "Избранное", href: "/profile", icon: Heart, state: { initialTab: 'saved' } },
        { label: "Подать", href: "/add-property", icon: Plus, isPrimary: true },
        { label: "Сообщения", href: "/messages", icon: Mail },
        { label: "Кабинет", href: "/profile", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full h-[60px] bg-white border-t border-gray-200 z-[9999] flex justify-around items-center md:hidden">
            {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.href, { state: item.state })}
                        className={`flex flex-col items-center justify-center w-full h-full ${isActive ? "text-blue-600" : "text-gray-500"}`}
                    >
                        {item.isPrimary ? (
                            <div className="bg-blue-600 text-white p-3 rounded-xl -mt-8 shadow-lg">
                                <Icon size={24} />
                            </div>
                        ) : (
                            <>
                                <Icon size={22} />
                            </>
                        )}
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;