import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";
import {
    CheckCircle2
} from "lucide-react";

// Helper component to capture map click events and place a marker
function MapEventsHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick([e.latlng.lat, e.latlng.lng]);
        }
    });
    return null;
}

const SubmitSuccess = () => {
    const { t, user } = useLanguage();
    const navigate = useNavigate();

    // Auth check modal state
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Form flow step state: 1 = category choice, 2 = details input
    const [step, setStep] = useState(1);
    const [chosenCategory, setChosenCategory] = useState("sell"); // sell, rent_out, rent_in
    const [chosenSubcategory, setChosenSubcategory] = useState(null); // e.g. apartment, house...

    // Form fields state


    // UI state
    const [districtSearch, setDistrictSearch] = useState("");
    const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const fileInputRef = useRef(null);

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

    // Form submission


    if (submitSuccess) {
        return (
            <div className="min-h-screen flex flex-col justify-between bg-[#fcfbfa]">
                <Header />
                <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 flex flex-col items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-black/5 text-center w-full">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-black mb-4">Объявление отправлено!</h1>
                        <p className="text-black/60 text-lg mb-8 max-w-md mx-auto">
                            Ваше объявление в категории <strong className="text-black font-semibold">"{categories[chosenCategory].label} &gt; {chosenSubcategory?.label}"</strong> успешно создано и будет находиться на сайте в течение 7 дней.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <button
                                onClick={() => navigate("/buy")}
                                className="flex-1 py-4 border border-black/10 hover:bg-black/5 font-semibold rounded-2xl transition-all duration-200"
                            >
                                К списку недвижимости
                            </button>
                            <button
                                onClick={resetAll}
                                className="flex-1 py-4 bg-[#c9a227] hover:bg-[#b08d20] text-white font-semibold rounded-2xl transition-all duration-200 shadow-md shadow-[#c9a227]/10"
                            >
                                Подать ещё одно
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitSuccess;
