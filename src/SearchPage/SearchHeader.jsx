import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "../components/language";
import { useLanguage } from "../components/LanguageContext";
import { Menu, X, Home, Key } from "lucide-react";

export const SearchHeader = ({ setModalType }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const headerBg = "bg-white/95 backdrop-blur-xl border-black/10";
  const bottomBg = 'bg-white border-t border-black/8';
  const textColor = 'text-[#1a1a1a]';

  const bottomNavLinks = [
    { icon: Home, label: t('navSale'), href: '/search?action=buy' },
    { icon: Key, label: t('navRent'), href: '/search?action=rent' },
  ];

  const handleBottomLinkClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (link.scroll) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.scroll);
          if (el) el.scrollIntoView({ block: 'start' });
        }, 300);
      } else {
        const el = document.getElementById(link.scroll);
        if (el) el.scrollIntoView({ block: 'start' });
      }
    } else {
      navigate(link.href);
    }
  };
  const base = import.meta.env.BASE_URL;

  return (
    <header className={` top-0 left-0 w-full z-[110] border-b ${headerBg}`}>
      <div className="max-w-[1700px] mx-auto px-4 md:px-10 h-[64px] md:h-[72px] flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src={`${base}RiyadhRoof_Logo.png`}
              alt="logo"
              className="w-12 brightness-1"
            />
          </Link>
        </div>

        {/* Right block with Language & Theme Toggle */}
        <div className="flex items-center gap-3 md:gap-4">

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Burger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-black/10 bg-black/5 text-black relative"
          >
            {isMobileMenuOpen ? <X size={20} className="absolute z-1" /> : <Menu size={20} className="absolute z-1" />}
          </button>
        </div>
      </div>

      {/* ===== НИЖНЯЯ СТРОКА (навигация-разделы) ===== */}
      <div className={`hidden xl:block ${bottomBg}`}>
        <div className="max-w-[1700px] mx-auto px-10">
          <nav className="flex items-center gap-1 h-[46px]">
            {bottomNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                location.pathname + location.search === link.href ||
                (location.pathname.includes('/map') && link.href.startsWith('/map'));

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleBottomLinkClick(e, link)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-medium min-h-[38px] whitespace-nowrap group
                    ${isActive
                      ? 'text-[#c9a227] bg-[#c9a227]/8'
                      : `${textColor} hover:text-[#c9a227] hover:bg-[#c9a227]/8`}`}
                >
                  <Icon size={17} className={`shrink-0 ${isActive ? 'text-[#c9a227]' : 'group-hover:text-[#c9a227]'}`} />
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] z-[100] md:hidden bg-white">
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
            {bottomNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                location.pathname + location.search === link.href ||
                (location.pathname.includes('/map') && link.href.startsWith('/map'));

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleBottomLinkClick(e, link)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[17px] font-medium min-h-[56px]
                    ${isActive
                      ? 'text-[#c9a227] bg-[#c9a227]/8'
                      : 'text-black/80 hover:text-[#c9a227] hover:bg-black/5'}`}
                >
                  <Icon size={22} className={`${isActive ? 'text-[#c9a227]' : 'text-[#c9a227]'} shrink-0`} />
                  {link.label}
                </a>
              );
            })}

            <div className="my-4 h-px bg-black/5" />

            <div className="pt-4 flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};