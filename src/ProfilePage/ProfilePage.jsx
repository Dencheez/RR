import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import ProfileSidebar from './ProfileSidebar';
import { Settings } from './Settings';
import PropertiesTab from './PropertiesTab';
import { SavedTab } from './Save';
import { MoveRight } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, updateUser } = useLanguage();

  // Инициализация активной вкладки на основе стейта навигации
  const [activeTab, setActiveTab] = useState(location.state?.initialTab || 'profile');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const fileInputRef = useRef(null);

  // Защита: если пользователь не залогинен, перенаправляем на главную
  if (!user) {
    navigate('/');
    return null;
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateUser({ avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Слушатель для переключения вкладок через BottomNav или другие компоненты
  useEffect(() => {
    if (location.state?.initialTab) {
      setActiveTab(location.state.initialTab);
      // Если переключили вкладку, на мобилке скрываем сайдбар, чтобы показать контент
      if (window.innerWidth < 1024) setIsSidebarVisible(false);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex bg-[#f7f5f0]">
      {/* Сайдбар: виден, когда isSidebarVisible === true */}
      {isSidebarVisible && (
        <ProfileSidebar
          user={user}
          activeTab={activeTab}
          onTabClick={(id) => {
            setActiveTab(id);
            if (window.innerWidth < 1024) setIsSidebarVisible(false);
          }}
          onLogout={() => { logout(); navigate('/'); }}
          fileInputRef={fileInputRef}
          onAvatarChange={handleAvatarChange}
          navigate={navigate}
        />
      )}

      {/* Основной контент: виден, когда сайдбар скрыт (на мобилке) или всегда (на десктопе) */}
      <div className={`${!isSidebarVisible ? 'flex' : 'hidden'} lg:flex flex-1 h-screen overflow-y-auto p-10 lg:p-20 flex-col`}>
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="lg:hidden mb-8 text-[#c9a227] font-black uppercase text-[10px]"
        >
          <MoveRight className="rotate-180 inline mr-2" /> Back to Menu
        </button>

        {/* Рендеринг активной вкладки */}
        {activeTab === 'profile' && <Settings user={user} />}
        {activeTab === 'properties' && (
          <PropertiesTab
            properties={[{ id: 1, name: "Al Narjis", price: "4.2M SAR", image: "..." }]}
            navigate={navigate}
          />
        )}
        {activeTab === 'saved' && <SavedTab navigate={navigate} />}

        {/* Можно добавить еще: */}
        {/* {activeTab === 'messages' && <MessagesTab />} */}
      </div>
    </div>
  );
};

export default ProfilePage;