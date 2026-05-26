import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { useLanguage } from "../components/LanguageContext";
import {
    User,
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

const Usercheck = () => {
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

    // Category mapping
    const categories = {
        sell: {
            label: "Продать",
            items: [
                { id: "apartment", label: "Квартиру" },
                { id: "house", label: "Дом или дачу" },
                { id: "garage", label: "Гараж или паркинг" },
                { id: "land", label: "Участок" },
                { id: "commercial", label: "Коммерческую недвижимость" },
                { id: "business", label: "Бизнес" },
                { id: "industrial", label: "Промбазы и заводы" }
            ]
        },
        rent_out: {
            label: "Сдать в аренду",
            items: [
                { id: "apartment", label: "Квартиру" },
                { id: "room", label: "Комнату" },
                { id: "house", label: "Дом или дачу" },
                { id: "garage", label: "Гараж или паркинг" },
                { id: "commercial", label: "Коммерческую недвижимость" },
                { id: "industrial", label: "Промбазы и заводы" }
            ]
        },
        rent_in: {
            label: "Взять в аренду",
            items: [
                { id: "apartment", label: "Квартиру" },
                { id: "house", label: "Дом или дачу" },
                { id: "commercial", label: "Коммерческую недвижимость" }
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
        if (!formData.buildYear || isNaN(formData.buildYear) || Number(formData.buildYear) < 1900 || Number(formData.buildYear) > 2027) {
            errors.buildYear = "Укажите год постройки (1900-2027)";
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
                    <div className="max-w-md w-full text-center bg-white p-8 rounded-3xl shadow-xl border border-black/5">
                        <div className="w-16 h-16 bg-[#c9a227]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <User size={30} className="text-[#c9a227]" />
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-3">Потребуется авторизация</h2>
                        <p className="text-black/60 mb-6">Чтобы опубликовать объявление на RiyadhRoof, пожалуйста, войдите в свой личный кабинет или зарегистрируйтесь.</p>
                        <button
                            onClick={() => setIsAuthOpen(true)}
                            className="w-full py-4 bg-[#c9a227] hover:bg-[#b08d20] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-[#c9a227]/25"
                        >
                            Войти или зарегистрироваться
                        </button>
                    </div>
                </div>
                <Footer />
                <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            </div>
        );
    }
}

export default Usercheck;
