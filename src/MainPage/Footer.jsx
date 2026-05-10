import React from "react";
import { Facebook, Instagram, Twitter } from "../components/Icons";
import { useLanguage } from "../components/LanguageContext";
import { motion } from 'framer-motion';


const Footer = () => {
  const { t, isDark } = useLanguage();
  const bg = isDark ? "bg-[#0d0d0d] text-white border-white/5" : "bg-white text-[#1a1a1a] border-black/8";
  const textMuted = isDark ? "text-gray-400" : "text-gray-600";
  const textSub = isDark ? "text-gray-300" : "text-gray-700";
  const borderDiv = isDark ? "border-white/5" : "border-black/8";
  const iconBorder = isDark ? "border-white/10 hover:border-[#c9a227]" : "border-black/10 hover:border-[#c9a227]";
  const bottomText = isDark ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-[#1a1a1a]";
  const base = import.meta.env.BASE_URL;

  return (
    <footer className={`pt-10 pb-10 px-4 md:px-20 border-t transition-colors duration-300 ${bg}`}>
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 md:mb-20 items-start md:items-center text-center md:text-left">

          {/* Первая колонка */}
          <div className="col-span-1 flex flex-col gap-4">
            <img
              src={`${base}RiyadhRoof_Logo.png`}
              alt="Logo"
              className={`w-[180px] md:w-[210px] h-auto object-contain mx-auto md:mx-0`}
            />
            <p className={`text-sm leading-relaxed ${textMuted}`}>
              {t('footerDescription')}
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="text-[#c9a227] font-bold mb-6 uppercase text-xs tracking-widest">{t('footerQuickLinks')}</h4>
            <ul className={`space-y-4 text-sm ${textSub}`}>
              <li className={`cursor-pointer transition-colors hover:text-[#c9a227]`}><a href="/">{t('footerHome')}</a></li>
              <li className={`cursor-pointer transition-colors hover:text-[#c9a227]`}><a href="/#special-offers">{t('specialOffers')}</a></li>
              <li className={`cursor-pointer transition-colors hover:text-[#c9a227]`}><a href="/search?action=rent">{t('navRent')}</a></li>
            </ul>
          </div>

          {/* Колонка 4: Контакты */}
          <div>
            <h4 className="text-[#c9a227] font-bold mb-6 uppercase text-xs tracking-widest">{t('footerContact')}</h4>
            <ul className={`space-y-4 text-sm ${textSub}`}>
              <li>920014659</li>
              <li>info@riyadhroof.sa</li>
              <li>Riyadh, Saudi Arabia</li>
            </ul>

          </div>

          <button className={`text-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-[#c9a227] text-white px-8 py-4 rounded-xl hover:bg-[#c9a227]/80 transition-colors`}>
            Download App
          </button>
        </div>



        {/* Нижняя панель */}
        <div className={`pt-10 border-t ${borderDiv} flex flex-col md:flex-row justify-between items-center gap-6`}>
          <div className={`text-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
            <span>{t('footerRights')}</span>
            <span className={`cursor-pointer transition-colors ${bottomText}`}>{t('footerPrivacy')}</span>
            <span className={`cursor-pointer transition-colors ${bottomText}`}>{t('footerTerms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;