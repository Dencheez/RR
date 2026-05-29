import React from 'react';
import { MoveRight, User, Camera, LogOut, Home, Bookmark } from 'lucide-react';

const ProfileSidebar = ({ user, activeTab, onTabClick, onLogout, fileInputRef, onAvatarChange, navigate }) => {
    const tabs = [
        { id: 'profile', label: 'Profile Settings', icon: <User size={18} /> },
        { id: 'properties', label: 'My Listed Properties', icon: <Home size={18} /> },
        { id: 'saved', label: 'Saved Listings', icon: <Bookmark size={18} /> },
    ];

    return (
        <div className="w-full lg:w-[350px] shrink-0 border-r border-black/10 bg-white h-screen sticky top-0 overflow-y-auto flex-col flex z-20">

            {/* Кнопка назад */}
            <button onClick={() => navigate('/')} className="px-8 py-6 text-xs font-black uppercase tracking-widest flex items-center hover:text-[#c9a227]">
                <MoveRight size={16} className="rotate-180 mr-4" /> Back to Home
            </button>

            {/* Аватар */}
            <div className="p-8 border-b border-black/10 flex flex-col items-center text-center">
                <div className="relative mb-6 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onAvatarChange} />
                    <div className="w-28 h-28 rounded-full border-2 border-[#c9a227] p-1 flex items-center justify-center overflow-hidden bg-black/5">
                        {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover " /> : <User size={48} className="text-[#c9a227] mt-4 ml-6" />}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-[#c9a227] p-2 rounded-full text-white"><Camera size={16} /></div>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-[#1a1a1a]">{user?.fullName || 'User'}</h2>
            </div>

            {/* Меню навигации */}
            <div className="p-4 flex-1 flex flex-col gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabClick(tab.id)}
                        className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold w-full text-left transition-colors ${activeTab === tab.id ? 'bg-[#c9a227] text-white' : 'hover:bg-black/5 text-black/50 hover:text-[#c9a227]'}`}
                    >
                        <div className={activeTab === tab.id ? 'text-white' : 'text-[#c9a227]'}>{tab.icon}</div>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Футер с кнопкой Logout */}
            <div className="p-6 border-t border-black/10 mt-auto">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileSidebar;