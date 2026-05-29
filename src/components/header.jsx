import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./language";
import { useLanguage } from "./LanguageContext";
import { User, CircleUserRound, Menu, X, Home, Key } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = () => {
  const { t, user } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authReason, setAuthReason] = useState(null);
  const base = import.meta.env.BASE_URL;

  const handlePostAdClick = () => {
    if (user) {
      navigate('/add-property');
    } else {
      setAuthReason('addProperty');
      setIsAuthOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchParams = new URLSearchParams(location.search);

  const bottomNavLinks = [
    { label: t('navSale') || 'Купить', href: '/buy', action: 'buy', icon: Home },
    { label: t('navRent') || 'Арендовать', href: '/rent', action: 'rent', icon: Key },
  ];

  const handleBottomLinkClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(link.href);
  };

  const topBg = isScrolled
    ? 'bg-white/97 bg-white border-b border-black/8'
    : 'bg-white/90 backdrop-blur-xl';

  const bottomBg = 'bg-white border-b border-black/8';
  const textColor = 'text-[#1a1a1a]';

  return (
    <>
      {/* ===== ВЕРХНЯЯ СТРОКА ===== */}
      <div className={`fixed top-0 left-0 w-full z-[100] ${topBg} transition-all duration-300`}>
        <div className="flex items-center justify-between max-w-[1700px] mx-auto px-4 md:px-8 h-[60px] md:h-[68px]">

          {/* Логотип */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src={`${base}RiyadhRoof_Logo.png`}
              alt="RiyadhRoof"
              className="w-14 md:w-[72px]"
            />
          </a>

          {/* Правая часть утилит */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Подать объявление (только ПК) */}
            <div className="hidden sm:block">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px] border border-black/15 bg-black/5 text-black hover:bg-black/10"
                onClick={handlePostAdClick}
              >
                {t('addPropertyBtn') || 'Подать объявление'}
              </button>
            </div>

            {/* Войти / Профиль (только ПК) */}
            <div className="hidden sm:block">
              {user ? (
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-[#c9a227]/50 bg-[#c9a227]/10 text-[#c9a227] hover:bg-[#c9a227] hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  <CircleUserRound size={18} />
                  {t('Profile') || 'Profile'}
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px] border border-black/15 bg-black/5 text-black hover:bg-black/10"
                >
                  <User size={18} />
                  {t('login') || 'Войти'}
                </button>
              )}
            </div>

            {/* Переключатель языка */}
            <div className="px-1">
              <LanguageSwitcher />
            </div>


          </div>
        </div>

        {/* ===== НИЖНЯЯ СТРОКА (Скрыта на мобилках через hidden md:block) ===== */}
        <div className={`hidden md:block ${bottomBg}`}>
          <div className="max-w-[1700px] mx-auto px-4 md:px-8">
            <nav className="flex items-center gap-1 h-[46px]">
              {bottomNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  location.pathname === link.href ||
                  ((location.pathname === '/search' || location.pathname === '/map') && searchParams.get('action') === link.action);

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleBottomLinkClick(e, link)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-medium min-h-[38px] whitespace-nowrap group transition-all
                      ${isActive
                        ? 'text-[#c9a227] bg-[#c9a227]/8'
                        : `${textColor} hover:text-[#c9a227] hover:bg-[#c9a227]/8`}`}
                  >
                    <Icon size={17} className={`shrink-0 transition-colors ${isActive ? 'text-[#c9a227]' : 'group-hover:text-[#c9a227]'}`} />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Адаптивный отступ под хедер (меньше на мобилках, больше на десктопе) */}
      <div className="h-[40px] md:h-[114px]" />

      {/* Модалка авторизации */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthReason(null);
        }}
        onSuccess={() => {
          if (authReason === 'addProperty') {
            navigate('/add-property');
          } else {
            navigate('/profile');
          }
          setAuthReason(null);
        }}
      />
    </>
  );
};

export default Header;