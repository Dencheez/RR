import React from "react";
import { Facebook, Instagram, Twitter } from "./Icons";
import { useLanguage } from "./LanguageContext";



const Footer = () => {
  const { t } = useLanguage();
  const bg = "bg-white text-[#1a1a1a] border-black/8";
  const textMuted = "text-gray-600";
  const textSub = "text-gray-700";
  const borderDiv = "border-black/8";
  const iconBorder = "border-black/10 hover:border-[#c9a227]";
  const bottomText = "text-gray-500 hover:text-[#1a1a1a]";
  const base = import.meta.env.BASE_URL;

  return (
    <footer className={`pt-10 pb-10 px-4 md:px-20 border-t ${bg}`}>
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
               <li className="cursor-pointer hover:text-[#c9a227]"><a href="/">{t('footerHome')}</a></li>
              <li className={`cursor-pointer transition-colors hover:text-[#c9a227]`}><a href="/#special-offers">{t('specialOffers')}</a></li>
              <li className="cursor-pointer hover:text-[#c9a227]"><a href="/search?action=rent">{t('navRent')}</a></li>
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
        </div>



        {/* Нижняя панель */}
        <div className={`pt-10 border-t ${borderDiv} flex flex-col md:flex-row justify-between items-center gap-6`}>
          <div className={`text-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6`}>
            <span>{t('footerRights')}</span>
            <span className={`cursor-pointer ${bottomText}`}>{t('footerPrivacy')}</span>
            <span className={`cursor-pointer ${bottomText}`}>{t('footerTerms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;