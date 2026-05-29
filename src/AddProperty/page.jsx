import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import Usercheck from "./Usercheck";
import AuthModal from "../components/AuthModal";
import SubmitSuccess from "./SubmitSuccess";

import { useLanguage } from "../components/LanguageContext";
import {
  User, Check, ChevronRight, MapPin, Building, Calendar, Layers, X,
  ArrowLeft, Upload, Trash2, CheckCircle2, AlertCircle, Info, ChevronDown
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Helper component to capture map click events and place a marker
function MapEventsHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    }
  });
  return null;
}

const AddProperty = () => {
  const { t, user } = useLanguage();
  const navigate = useNavigate();

  // Auth check modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Form flow step state: 1 = category choice, 2 = details input
  const [step, setStep] = useState(1);
  const [chosenCategory, setChosenCategory] = useState("sell"); // sell, rent_out, rent_in
  const [chosenSubcategory, setChosenSubcategory] = useState(null); // e.g. apartment, house...

  // Form fields state
  const [formData, setFormData] = useState({
    rooms: "2",
    price: "",
    pledged: "Нет",
    buildingType: "Монолитный",
    buildYear: "",
    floor: "",
    totalFloors: "",
    areaTotal: "",
    areaKitchen: "",
    dormitory: "Нет",
    district: "",
    complex: "",
    street: "",
    houseNumber: "",
    intersection: "",
    hideHouseNumber: false,
    coords: [24.7136, 46.6753],
    description: "",
    images: [],
    condition: "",
    phone: "",
    internet: "",
    bathroom: "",
    balcony: "",
    balconyGlazed: "",
    door: "",
    parking: "",
    furnished: "",
    flooring: "",
    ceilingHeight: "",
    security: [],
    misc: [],
    contactType: "owner",
    contactName: "",
    exchange: "Нет",
    phones: ["+966"],
    agreeRules: false
  });

  // UI state
  const [districtSearch, setDistrictSearch] = useState("");
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // List of Riyadh districts for the "Страна, город *" field
  const riyadhDistricts = [
    "Эр-Рияд, Al Malqa (Аль-Малька)",
    "Эр-Рияд, KAFD (Финансовый район короля Абдаллы)",
    "Эр-Рияд, Al Narjis (Ан-Нарджис)",
    "Эр-Рияд, Al Aqiq (Аль-Акик)",
    "Эр-Рияд, Hittin (Хиттин)",
    "Эр-Рияд, Al Yasmin (Аль-Ясмин)",
    "Эр-Рияд, Al Wadi (Аль-Вади)",
    "Эр-Рияд, Diplomatic Quarter (Дипломатический квартал)",
    "Эр-Рияд, Al Olaya (Аль-Олая)",
    "Эр-Рияд, Al Sulaimaniyah (Аль-Сулеймания)",
    "Эр-Рияд, Al Mursalat (Аль-Мурсалат)"
  ];

  // Category mapping
  const categories = {
    sell: {
      label: "Продать",
      items: [
        { id: "apartment", label: "Квартиру" },
        { id: "villas", label: "Дом/Вилла" },
        { id: "land", label: "Участок" },
        { id: "commercial", label: "Коммерческую недвижимость" },
      ]
    },
    rent_out: {
      label: "Сдать в аренду",
      items: [
        { id: "apartment", label: "Квартиру" },
        { id: "villas", label: "Дом/Вилла" },
        { id: "commercial", label: "Коммерческую недвижимость" },
      ]
    }
  };

  // Helper text strings
  const sideBannerTitle = "Поля со звездочкой * — обязательные";
  const sideBannerText = "Срок жизни объявления на сайте — 7 дней. Продлить можно бесплатно в личном кабинете.";

  // Handle district selection
  const selectDistrict = (dist) => {
    setFormData(prev => ({ ...prev, district: dist }));
    setDistrictSearch(dist);
    setIsDistrictDropdownOpen(false);
    if (formErrors.district) {
      setFormErrors(prev => {
        const copy = { ...prev };
        delete copy.district;
        return copy;
      });
    }
  };

  // Image Upload handler
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { file, previewUrl: reader.result, id: Date.now() + Math.random() }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  // Field validation
  const validateForm = () => {
    const errors = {};
    if (!formData.rooms) errors.rooms = "Укажите количество комнат";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = "Укажите корректную цену";
    }
    if (!formData.buildYear || isNaN(formData.buildYear) || Number(formData.buildYear) < 2000 || Number(formData.buildYear) > 2030) {
      errors.buildYear = "Укажите год постройки (2000-2030)";
    }
    if (!formData.areaTotal || isNaN(formData.areaTotal) || Number(formData.areaTotal) <= 0) {
      errors.areaTotal = "Укажите общую площадь";
    }
    if (!formData.district) errors.district = "Выберите город и район";
    if (!formData.street.trim()) errors.street = "Укажите улицу";
    if (!formData.houseNumber.trim()) errors.houseNumber = "Укажите номер дома";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorEl = document.querySelector(".text-red-500");
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    // Mock API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1800);
  };

  // Reset form to place another property
  const resetAll = () => {
    setStep(1);
    setChosenSubcategory(null);
    setFormData({
      rooms: "2",
      price: "",
      pledged: "Нет",
      buildingType: "Монолитный",
      buildYear: "",
      floor: "",
      totalFloors: "",
      areaTotal: "",
      areaKitchen: "",
      dormitory: "Нет",
      district: "",
      complex: "",
      street: "",
      houseNumber: "",
      intersection: "",
      hideHouseNumber: false,
      coords: [24.7136, 46.6753],
      description: "",
      images: [],
      condition: "",
      phone: "",
      internet: "",
      bathroom: "",
      balcony: "",
      balconyGlazed: "",
      door: "",
      parking: "",
      furnished: "",
      flooring: "",
      ceilingHeight: "",
      security: [],
      misc: [],
      contactType: "owner",
      contactName: "",
      exchange: "Нет",
      phones: ["+966"],
      agreeRules: false
    });
    setDistrictSearch("");
    setSubmitSuccess(false);
    setFormErrors({});
  };

  // Filtered districts
  const filteredDistricts = riyadhDistricts.filter(dist =>
    dist.toLowerCase().includes(districtSearch.toLowerCase())
  );

  // If user is not logged in, render authentication wall
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#fcfbfa]">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
          <Usercheck />
        </div>
        <Footer />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  // If submission was successful
  if (submitSuccess) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-[#fcfbfa]">
        <Header />
        <SubmitSuccess
          categories={categories}
          chosenCategory={chosenCategory}
          chosenSubcategory={chosenSubcategory}
          resetAll={resetAll}
        />
        <Footer />
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-black mb-8 leading-tight">Подать объявление</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Main Workspace (Left 3 columns) */}
          <div className="lg:col-span-3 space-y-6">

            {/* STEP 1: CATEGORY SELECTION */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-black/80 mb-4">Выберите категорию</h3>

                  {/* Two-column responsive category lists */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Column 1: Main actions */}
                    <div className="border border-black/5 rounded-2xl overflow-hidden bg-gray-50/50">
                      {Object.keys(categories).map((catKey) => {
                        const isSelected = chosenCategory === catKey;
                        return (
                          <button
                            key={catKey}
                            onClick={() => {
                              setChosenCategory(catKey);
                              setChosenSubcategory(null);
                            }}
                            className={`w-full flex items-center justify-between px-5 py-4 text-left font-semibold border-b border-black/5 last:border-0 transition-all duration-200 ${isSelected
                              ? "bg-[#c9a227]/10 text-black border-l-4 border-l-[#c9a227]"
                              : "text-black/70 hover:bg-black/5 hover:text-black"
                              }`}
                          >
                            <span>{categories[catKey].label}</span>
                            {isSelected && <Check size={18} className="text-[#c9a227] stroke-[3px]" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Column 2: Subcategories based on column 1 */}
                    <div className="border border-black/5 rounded-2xl overflow-hidden bg-white">
                      {categories[chosenCategory].items.map((subItem) => {
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setChosenSubcategory(subItem);
                              setStep(2); // Jump to Details form
                            }}
                            className="w-full flex items-center justify-between px-5 py-4 text-left text-black/80 font-medium hover:bg-black/5 hover:text-black border-b border-black/5 last:border-0 transition-all duration-200"
                          >
                            <span>{subItem.label}</span>
                            <ChevronRight size={16} className="opacity-40" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: FULL DETAIL FORM */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Category Breadcrumbs with modification option */}
                <div className="bg-white rounded-2xl p-4 border border-black/5 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-black/50">Выберите категорию:</span>
                    <span className="text-[#c9a227] font-bold">
                      {categories[chosenCategory].label}
                    </span>
                    <ChevronRight size={14} className="text-black/30" />
                    <span className="text-black font-bold">
                      {chosenSubcategory?.label}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#c9a227] hover:underline font-bold flex items-center gap-1"
                  >
                    Изменить
                  </button>
                </div>

                {/* Characteristics block */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold border-b border-black/5 pb-4 mb-4">Характеристики недвижимости</h3>

                  {/* Rooms quantity selection */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Количество комнат *</label>
                    <div className="flex gap-2">
                      {["1", "2", "3", "4", "5+"].map((r) => {
                        const isSelected = formData.rooms === r;
                        return (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, rooms: r }))}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${isSelected
                              ? "bg-[#c9a227] border-[#c9a227] text-white shadow-md shadow-[#c9a227]/20"
                              : "border-black/10 text-black/75 hover:bg-black/5 hover:border-black/20"
                              }`}
                          >
                            {r}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price input field */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-1">Цена *</label>
                    <div className="flex items-center gap-3">
                      <div className="relative max-w-xs w-full">
                        <input
                          type="text"
                          required
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="Например, 1 200 000"
                          className="w-full pl-4 pr-12 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] outline-none font-medium transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-black/40">
                          SAR
                        </span>
                      </div>
                      <span className="text-sm font-medium text-black/50">риалов</span>
                    </div>
                    {formErrors.price && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.price}</p>}
                  </div>

                  {/* Pledged block */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">В залоге</label>
                    <div className="flex gap-2">
                      {["Да", "Нет"].map((opt) => {
                        const isSelected = formData.pledged === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, pledged: opt }))}
                            className={`px-8 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${isSelected
                              ? "bg-[#c9a227] border-[#c9a227] text-white shadow-md shadow-[#c9a227]/20"
                              : "border-black/10 text-black/75 hover:bg-black/5 hover:border-black/20"
                              }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Building Type and Year Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-2">Год постройки (сдачи в эксплуатацию) *</label>
                      <input
                        type="text"
                        required
                        value={formData.buildYear}
                        onChange={(e) => setFormData(prev => ({ ...prev, buildYear: e.target.value }))}
                        placeholder="2024"
                        className="w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                      {formErrors.buildYear && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.buildYear}</p>}
                    </div>
                  </div>

                  {/* Floor and Total floors */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Этаж</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formData.floor}
                        onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                        placeholder="3"
                        className="w-20 text-center py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                      <span className="text-sm font-medium text-black/40">из</span>
                      <input
                        type="text"
                        value={formData.totalFloors}
                        onChange={(e) => setFormData(prev => ({ ...prev, totalFloors: e.target.value }))}
                        placeholder="9"
                        className="w-20 text-center py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                      <span className="text-sm font-medium text-black/50">этажей</span>
                    </div>
                  </div>

                  {/* Area input fields */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Площадь, м² *</label>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-black/50">Общая *</span>
                        <input
                          type="text"
                          required
                          value={formData.areaTotal}
                          onChange={(e) => setFormData(prev => ({ ...prev, areaTotal: e.target.value }))}
                          placeholder="75"
                          className="w-24 text-center py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-black/50">Кухня</span>
                        <input
                          type="text"
                          value={formData.areaKitchen}
                          onChange={(e) => setFormData(prev => ({ ...prev, areaKitchen: e.target.value }))}
                          placeholder="12"
                          className="w-24 text-center py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                        />
                      </div>
                    </div>
                    {formErrors.areaTotal && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.areaTotal}</p>}
                  </div>

                  {/* Dormitory selection */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Бывшее общежитие</label>
                    <div className="flex gap-2">
                      {["Да", "Нет"].map((opt) => {
                        const isSelected = formData.dormitory === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, dormitory: opt }))}
                            className={`px-8 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${isSelected
                              ? "bg-[#c9a227] border-[#c9a227] text-white shadow-md shadow-[#c9a227]/20"
                              : "border-black/10 text-black/75 hover:bg-black/5 hover:border-black/20"
                              }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Location block */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold border-b border-black/5 pb-4 mb-4">Расположение</h3>

                  {/* District select */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-black/80 mb-2">Страна, город *</label>
                    <div className="relative max-w-md">
                      <input
                        type="text"
                        required
                        value={districtSearch}
                        onChange={(e) => {
                          setDistrictSearch(e.target.value);
                          setIsDistrictDropdownOpen(true);
                          setFormData(prev => ({ ...prev, district: e.target.value }));
                        }}
                        onFocus={() => setIsDistrictDropdownOpen(true)}
                        placeholder="Поиск по городу, району, микрорайону"
                        className="w-full pl-4 pr-10 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" />

                      {/* Districts Autocomplete Dropdown */}
                      {isDistrictDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-black/5 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                          {filteredDistricts.length > 0 ? (
                            filteredDistricts.map((dist, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => selectDistrict(dist)}
                                className="w-full px-5 py-3.5 text-left text-sm text-black/80 font-medium hover:bg-[#c9a227]/10 transition-colors border-b border-black/5 last:border-b-0"
                              >
                                {dist}
                              </button>
                            ))
                          ) : (
                            <p className="p-4 text-sm text-black/40 text-center font-medium">Ничего не найдено</p>
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.district && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.district}</p>}
                  </div>

                  {/* Complex field */}
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Жилой комплекс</label>
                    <select
                      value={formData.complex}
                      onChange={(e) => setFormData(prev => ({ ...prev, complex: e.target.value }))}
                      className="max-w-md w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium text-black"
                    >
                      <option value="">Город не выбран</option>
                      <option value="Malkar Heights">Malkar Heights (Ан-Нарджис)</option>
                      <option value="Damac Esclusiva">Damac Esclusiva (Аль-Олая)</option>
                      <option value="Riyadh Residence">Riyadh Residence (Аль-Малька)</option>
                    </select>
                  </div>

                  {/* Street & house number */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-2">Улица или микрорайон *</label>
                      <input
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                        placeholder="мкр Тастак-2"
                        className="w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                      {formErrors.street && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.street}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-2">№ дома *</label>
                      <input
                        type="text"
                        required
                        value={formData.houseNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, houseNumber: e.target.value }))}
                        placeholder="14Б"
                        className="w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                      {formErrors.houseNumber && <p className="text-red-500 text-xs mt-1 font-semibold">{formErrors.houseNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black/80 mb-2">Пересечение с</label>
                      <input
                        type="text"
                        value={formData.intersection}
                        onChange={(e) => setFormData(prev => ({ ...prev, intersection: e.target.value }))}
                        placeholder="Находится возле..."
                        className="w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Hide house number checkbox */}
                  <label className="flex items-center gap-3 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hideHouseNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, hideHouseNumber: e.target.checked }))}
                      className="w-5 h-5 rounded border-black/10 text-[#c9a227] focus:ring-[#c9a227] cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-black/75">Скрыть номер дома</span>
                  </label>

                  {/* Map marker choice section */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 text-black/80">
                      <Info size={16} className="text-[#c9a227] shrink-0 mt-0.5" />
                      <div className="text-sm font-semibold">
                        Обязательно укажите расположение на карте
                        <span className="block text-xs text-black/40 mt-0.5 font-normal">
                          Более 1 миллиона раз в месяц наши посетители пользуются поиском по карте
                        </span>
                      </div>
                    </div>

                    {/* Leaflet Live Map wrapper */}
                    <div className="w-full h-80 rounded-2xl overflow-hidden border border-black/10 shadow-inner relative z-0">
                      <MapContainer
                        center={formData.coords}
                        zoom={12}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <MapEventsHandler
                          onMapClick={(coords) => setFormData(prev => ({ ...prev, coords }))}
                        />
                        <Marker position={formData.coords} />
                      </MapContainer>
                    </div>
                    <div className="text-xs text-black/40 font-semibold flex items-center gap-1.5 justify-end">
                      <MapPin size={12} />
                      Координаты: {formData.coords[0].toFixed(5)}, {formData.coords[1].toFixed(5)}
                    </div>
                  </div>
                </div>

                {/* Photos block */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold border-b border-black/5 pb-4 mb-4">Фотографии</h3>
                  <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-black/10 hover:border-[#c9a227]/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 hover:bg-[#c9a227]/5 transition-all duration-300 group">
                    <Upload size={36} className="text-black/30 group-hover:text-[#c9a227] transition-colors mb-3" />
                    <span className="text-sm font-bold text-black/80">Выберите файлы или перетащите их сюда</span>
                    <span className="text-xs text-black/40 mt-1 font-semibold">JPEG, PNG до 10 МБ</span>
                    <input type="file" multiple ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                  </div>
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                      {formData.images.map((img) => (
                        <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden group border border-black/5 shadow-sm">
                          <img src={img.previewUrl} alt="preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(img.id)} className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"><Trash2 size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600"><Check size={16} />Добавьте минимум одно фото зала, спальни или детской комнаты</div>
                    <div className="flex items-center gap-2 text-red-500"><X size={16} />Не добавляйте скриншоты, картинки, фотоколлажи</div>
                    <div className="flex items-center gap-2 text-red-500"><X size={16} />Проследите, чтобы на фото не было логотипов, контактных данных и ссылок</div>
                  </div>
                </div>

                {/* Характеристики block */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-0">
                  <h3 className="text-xl font-bold border-b border-black/5 pb-4 mb-2">Характеристики</h3>
                  {/* Each row is label + options */}
                  {[
                    { label: "Состояние", field: "condition", options: ["Свежий ремонт", "Не новый, но аккуратный ремонт", "Требует ремонта", "Свободная планировка", "Черновая отделка"] },
                    { label: "Телефон", field: "phone", options: ["Отдельный", "Блокиратор", "Есть возможность подключения", "Нет"] },
                    { label: "Интернет", field: "internet", options: ["ADSL", "Через TV кабель", "Проводной", "Оптика"] },
                    { label: "Санузел", field: "bathroom", options: ["Раздельный", "Совмещенный", "2 с/у и более", "Нет"] },
                    { label: "Балкон", field: "balcony", options: ["Балкон", "Лоджия", "Балкон и лоджия", "Несколько балконов или лоджий"] },
                    { label: "Балкон остеклён", field: "balconyGlazed", options: ["Нет", "Да"] },
                    { label: "Дверь", field: "door", options: ["Деревянная", "Металлическая", "Бронированная"] },
                    { label: "Парковка", field: "parking", options: ["Паркинг", "Гараж", "Рядом охраняемая стоянка"] },
                    { label: "Квартира меблирована", field: "furnished", options: ["Полностью", "Частично", "Без мебели"] },
                    { label: "Пол", field: "flooring", options: ["Линолеум", "Паркет", "Ламинат", "Дерево", "Ковролан", "Плитка", "Пробковый"] },
                  ].map((row) => (
                    <div key={row.field} className="grid grid-cols-[180px_1fr] gap-4 py-4 border-b border-black/5 last:border-0 items-start">
                      <span className="text-sm font-semibold text-black/70 pt-1">{row.label}</span>
                      <div className="flex flex-wrap gap-2">
                        {row.options.map((opt) => (
                          <button key={opt} type="button" onClick={() => setFormData(prev => ({ ...prev, [row.field]: prev[row.field] === opt ? "" : opt }))}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${formData[row.field] === opt ? "bg-[#c9a227] border-[#c9a227] text-white shadow-sm" : "border-black/10 text-[#c9a227] hover:bg-black/5"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Ceiling height */}
                  <div className="grid grid-cols-[180px_1fr] gap-4 py-4 border-b border-black/5 items-center">
                    <span className="text-sm font-semibold text-black/70">Высота потолков, м</span>
                    <input type="text" value={formData.ceilingHeight} onChange={(e) => setFormData(prev => ({ ...prev, ceilingHeight: e.target.value }))} placeholder="2.7" className="w-24 text-center py-2.5 rounded-xl border border-black/10 focus:border-[#c9a227] outline-none font-medium" />
                  </div>

                  {/* Security checkboxes */}
                  <div className="grid grid-cols-[180px_1fr] gap-4 py-4 border-b border-black/5 items-start">
                    <span className="text-sm font-semibold text-black/70 pt-1">Безопасность</span>
                    <div className="grid grid-cols-2 gap-3">
                      {["Решетки на окнах", "Охрана", "Домофон", "Кодовый замок", "Сигнализация", "Видеонаблюдение", "Видеодомофон", "Консьерж"].map((item) => (
                        <label key={item} className="flex items-center gap-2.5 cursor-pointer select-none">
                          <input type="checkbox" checked={formData.security.includes(item)} onChange={() => setFormData(prev => ({ ...prev, security: prev.security.includes(item) ? prev.security.filter(s => s !== item) : [...prev.security, item] }))} className="w-4.5 h-4.5 rounded border-black/15 text-[#c9a227] focus:ring-[#c9a227]" />
                          <span className="text-sm text-black/80">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Misc checkboxes */}
                  <div className="grid grid-cols-[180px_1fr] gap-4 py-4 items-start">
                    <span className="text-sm font-semibold text-black/70 pt-1">Разное</span>
                    <div className="grid grid-cols-2 gap-3">
                      {["Пластиковые окна", "Неугловая", "Улучшенная", "Комнаты изолированы", "Кухня-студия", "Встроенная кухня", "Новая сантехника", "Кладовка", "Счётчики", "Тихий двор", "Кондиционер", "Удобно под коммерцию"].map((item) => (
                        <label key={item} className="flex items-center gap-2.5 cursor-pointer select-none">
                          <input type="checkbox" checked={formData.misc.includes(item)} onChange={() => setFormData(prev => ({ ...prev, misc: prev.misc.includes(item) ? prev.misc.filter(s => s !== item) : [...prev.misc, item] }))} className="w-4.5 h-4.5 rounded border-black/15 text-[#c9a227] focus:ring-[#c9a227]" />
                          <span className="text-sm text-black/80">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Текст объявления */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-4">
                  <h3 className="text-xl font-bold border-b border-black/5 pb-4 mb-2">Текст объявления</h3>
                  <textarea rows={6} maxLength={2000} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} placeholder="Расскажите подробнее о вашей недвижимости: состояние ремонта, удобства, инфраструктура поблизости..." className="w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium resize-y" />
                  <p className="text-xs text-[#c9a227] font-semibold">Осталось {2000 - formData.description.length} символов</p>
                </div>

                {/* Контактная информация */}
                <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold border-b border-black/5 pb-4 mb-2">Контактная информация</h3>
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-3">От чьего имени вы хотите подавать объявления? <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-3 gap-4">
                      {[{ id: "owner", label: "Хозяин", desc: "Для владельцев недвижимости" }, { id: "specialist", label: "Специалист", desc: "Для профессионалов" }, { id: "company", label: "Компания", desc: "Для агентств недвижимости" }].map((ct) => (
                        <label key={ct.id} className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${formData.contactType === ct.id ? "border-[#c9a227] bg-[#c9a227]/5" : "border-black/10 hover:border-black/20"}`}>
                          <input type="radio" name="contactType" value={ct.id} checked={formData.contactType === ct.id} onChange={() => setFormData(prev => ({ ...prev, contactType: ct.id }))} className="sr-only" />
                          <span className={`text-base font-bold mb-1 ${formData.contactType === ct.id ? "text-[#c9a227]" : "text-black"}`}>{ct.label}</span>
                          <span className="text-xs text-black/50 text-center">{ct.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Имя в личных сообщениях <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.contactName} onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))} placeholder={user?.fullName || "Ваше имя"} className="max-w-md w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Возможен обмен</label>
                    <div className="flex gap-2">
                      {["Да", "Нет"].map((opt) => (
                        <button key={opt} type="button" onClick={() => setFormData(prev => ({ ...prev, exchange: opt }))} className={`px-8 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${formData.exchange === opt ? "bg-[#c9a227] border-[#c9a227] text-white shadow-sm" : "border-black/10 text-[#c9a227] hover:bg-black/5"}`}>{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black/80 mb-2">Телефоны <span className="text-red-500">*</span></label>
                    {formData.phones.map((ph, idx) => (
                      <div key={idx} className="flex items-center gap-3 mb-2">
                        <input type="tel" value={ph} onChange={(e) => { const newPhones = [...formData.phones]; newPhones[idx] = e.target.value; setFormData(prev => ({ ...prev, phones: newPhones })); }} placeholder="+966 50 123 4567" className="max-w-xs w-full px-4 py-3 rounded-2xl border border-black/10 focus:border-[#c9a227] outline-none font-medium" />
                        {formData.phones.length > 1 && <button type="button" onClick={() => setFormData(prev => ({ ...prev, phones: prev.phones.filter((_, i) => i !== idx) }))} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>}
                      </div>
                    ))}
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, phones: [...prev.phones, "+966"] }))} className="text-sm text-[#c9a227] font-semibold hover:underline mt-1">+ Добавить ещё телефоны</button>
                  </div>
                  <label className="flex items-center gap-3 select-none cursor-pointer">
                    <input type="checkbox" checked={formData.agreeRules} onChange={(e) => setFormData(prev => ({ ...prev, agreeRules: e.target.checked }))} className="w-5 h-5 rounded border-black/10 text-[#c9a227] focus:ring-[#c9a227] cursor-pointer" />
                    <span className="text-sm font-medium text-black/80">Согласен с <a href="#" className="text-[#c9a227] hover:underline">правилами размещения объявлений</a></span>
                  </label>
                </div>

                {/* Submit buttons */}
                <div className="flex items-center gap-4">
                  <button type="submit" disabled={isSubmitting} className="px-10 py-4 bg-[#c9a227] hover:bg-[#1d4ed8] text-white font-extrabold rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 min-h-[56px]">
                    {isSubmitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Публикуем...</>) : "Продолжить"}
                  </button>
                  <button type="button" onClick={resetAll} className="px-6 py-4 border border-black/10 hover:bg-black/5 font-semibold rounded-2xl transition-all duration-200 min-h-[56px] text-black/60">Предварительный просмотр</button>
                </div>
              </form>
            )}
          </div>

          {/* Right Sidebar banner (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border-l-4 border-l-[#c9a227] bg-[#c9a227]/5 p-5 rounded-r-2xl shadow-sm space-y-3">
              <h4 className="text-sm font-extrabold text-[#b08d20] flex items-center gap-2">
                <AlertCircle size={16} />
                {sideBannerTitle}
              </h4>
              <p className="text-xs text-black/70 leading-relaxed font-semibold">
                {sideBannerText}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm space-y-3 text-xs text-black/60 font-semibold leading-relaxed">
              <p> Мы рекомендуем указывать точный адрес и ориентиры. Это поможет потенциальным покупателям быстрее найти ваше объявление.</p>
              <p> Объявления с качественными реальными фотографиями получают в среднем на 80% больше просмотров и откликов.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddProperty;