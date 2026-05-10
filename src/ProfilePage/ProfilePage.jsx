import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import LanguageSwitcher from '../components/language';
import {
  User, Home, Bookmark, MoveRight, LogOut, Camera,
  ChevronRight, Sun, Moon, MapPin, BedDouble, Bath, Maximize2
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t, isDark, toggleTheme, user, logout, updateUser } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const bg = isDark ? "bg-[#0a0a0a]" : "bg-[#f7f5f0]";
  const text = isDark ? "text-white" : "text-[#1a1a1a]";
  const textMuted = isDark ? "text-white/50" : "text-black/50";
  const border = isDark ? "border-white/10" : "border-black/10";
  const cardBg = isDark ? "bg-white/5" : "bg-white";
  const inputBg = isDark ? "bg-white/5 border-white/10 text-white focus:border-[#c9a227]" : "bg-black/5 border-black/10 text-black focus:border-[#c9a227]";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: <User size={18} /> },
    { id: 'properties', label: 'My Listed Properties', icon: <Home size={18} /> },
    { id: 'saved', label: 'Saved Listings', icon: <Bookmark size={18} /> },
  ];

  const dummyProperties = [
    { id: 1, name: "Al Narjis Modern", price: "4.2M SAR", status: "Active", type: "Modern Villa", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500&auto=format&fit=crop" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (window.innerWidth < 1024) {
      setIsSidebarVisible(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${bg} transition-colors duration-300`}>
      {/* Sidebar */}
      <motion.div
        className={`${isSidebarVisible ? 'flex' : 'hidden'} lg:flex w-full lg:w-[350px] shrink-0 border-r ${border} ${cardBg} h-screen sticky top-0 overflow-y-auto flex-col no-scrollbar z-20`}
      >
        {/* User Info Header */}
        <button onClick={() => navigate('/')} className="transition-transform active:scale-95 px-8 py-6 text-xs font-black uppercase tracking-widest flex items-center hover:text-[#c9a227] transition-all">
           <MoveRight size={16} className="rotate-180 mr-4" />
           Back to Home
        </button>
        
        <div className={`p-8 border-b ${border} flex flex-col items-center text-center`}>
          <div className="relative mb-6 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
            <div className={`w-28 h-28 rounded-full border-2 border-[#c9a227] p-1 flex items-center justify-center overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="w-full h-full rounded-full overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-[#c9a227] mt-4 ml-6" />
                )}
              </div>
            </div>
            <div className="absolute bottom-1 right-1 bg-[#c9a227] p-2 rounded-full text-white shadow-lg">
              <Camera size={16} />
            </div>
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${text}`}>{user.fullName || 'User'}</h2>
          <p className={`text-xs mt-2 font-medium ${textMuted}`}>{user.email}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 flex-1 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all w-full text-left ${activeTab === tab.id
                ? "bg-[#c9a227] text-white shadow-[0_10px_30px_rgba(201,162,39,0.2)] scale-[1.02]"
                : `hover:bg-black/5 dark:hover:bg-white/5 ${textMuted} hover:text-[#c9a227]`
                }`}
            >
              <div className={`${activeTab === tab.id ? 'text-white' : 'text-[#c9a227]'}`}>
                {tab.icon}
              </div>
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className={`p-6 border-t ${border} flex flex-col gap-4 bg-transparent`}>
          <div className="flex items-center justify-between px-2">
            <span className={`text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Settings</span>
            <div className="flex items-center gap-3">
                <button onClick={toggleTheme} className={`p-2 rounded-lg border ${border} ${text}`}>
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <LanguageSwitcher />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className={`${!isSidebarVisible ? 'flex' : 'hidden'} lg:flex flex-1 h-screen overflow-y-auto p-6 md:p-10 lg:p-20 flex-col no-scrollbar`}
      >
        {/* Mobile Back Button */}
        <button 
            onClick={() => setIsSidebarVisible(true)}
            className="lg:hidden flex items-center gap-2 text-[#c9a227] font-black uppercase tracking-widest text-[10px] mb-8"
        >
            <MoveRight size={16} className="rotate-180" />
            Back to Menu
        </button>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl space-y-10"
            >
              <div>
                <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-3 ${text}`}>Profile Settings</h1>
                <p className={`text-sm md:text-base ${textMuted}`}>Manage your personal information and how we can reach you.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className={`block text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Full Name</label>
                  <input type="text" defaultValue={user.fullName || ''} className={`w-full rounded-2xl border px-6 py-5 text-sm font-bold outline-none transition-all ${inputBg}`} />
                </div>
                <div className="space-y-3">
                  <label className={`block text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Phone Number</label>
                  <input type="tel" placeholder="+966 50 000 0000" className={`w-full rounded-2xl border px-6 py-5 text-sm font-bold outline-none transition-all ${inputBg}`} />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className={`block text-[10px] font-black uppercase tracking-widest ${textMuted}`}>Email Address</label>
                  <input type="email" readOnly defaultValue={user.email} className={`w-full rounded-2xl border px-6 py-5 text-sm font-bold outline-none transition-all opacity-60 cursor-not-allowed ${inputBg}`} />
                </div>
              </div>

              <div className={`pt-10 border-t ${border}`}>
                <button className="bg-[#c9a227] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#c9a227]/20">
                  Save All Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'properties' && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div>
                <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-3 ${text}`}>My Properties</h1>
                <p className={`text-sm md:text-base ${textMuted}`}>You have 1 active property listed on the platform.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {dummyProperties.map(prop => (
                  <div key={prop.id} className={`rounded-[32px] overflow-hidden border ${border} ${cardBg} group shadow-xl`}>
                    <div className="h-56 relative overflow-hidden">
                      <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {prop.status}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`text-lg font-bold mb-1 truncate ${text}`}>{prop.name}</h3>
                      <p className="text-[#c9a227] text-2xl font-black tracking-tight mb-6">{prop.price}</p>
                      <div className="flex gap-3">
                        <button className="flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-[#c9a227] text-[#c9a227] hover:bg-[#c9a227] hover:text-white transition-all">Edit</button>
                        <button className="flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Property Card Placeholder */}
                <div 
                    onClick={() => navigate('/#map-section')}
                    className={`rounded-[32px] border-2 border-dashed ${border} flex flex-col items-center justify-center p-10 cursor-pointer hover:border-[#c9a227] transition-all group ${cardBg}`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#c9a227]/10 flex items-center justify-center mb-6 text-[#c9a227] group-hover:scale-110 transition-transform">
                    <Home size={28} />
                  </div>
                  <span className="font-black uppercase tracking-widest text-[10px] text-center px-4 leading-relaxed ${textMuted}">List Your New Property</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[50vh] text-center"
            >
              <div className={`w-32 h-32 rounded-full border ${border} flex items-center justify-center mb-8 bg-[#c9a227]/5`}>
                <Bookmark size={48} className="text-[#c9a227]/30" />
              </div>
              <h3 className={`text-2xl font-black mb-3 ${text}`}>No Collections Yet</h3>
              <p className={`text-sm max-w-[320px] leading-relaxed ${textMuted}`}>Save properties you like and they will appear here for quick access later.</p>
              <button onClick={() => navigate('/')} className="mt-10 bg-[#c9a227] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#c9a227]/20">
                Browse Properties
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
