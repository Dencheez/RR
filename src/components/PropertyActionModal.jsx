import React, { useState } from "react";
import { X, Calendar, Phone, Mail, User, Info, CheckCircle2, Building2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const PropertyActionModal = ({ isOpen, onClose, type, property }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    moveInDate: "",
    duration: "1 Year",
    message: ""
  });

  if (!isOpen) return null;

  const bg = "bg-white border-black/10";
  const inputBg = "bg-black/5 border-black/10 text-[#1a1a1a]";
  const textMuted = "text-black/40";
  const titleColor = "text-[#1a1a1a]";

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Success state
    setTimeout(() => {
        // In a real app, send data here
    }, 1000);
  };

  return (
      <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6">
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <div
          className={`relative w-full max-w-[600px] max-h-[90vh] md:max-h-[85vh] rounded-t-[40px] md:rounded-[40px] border-t md:border shadow-2xl overflow-y-auto no-scrollbar pb-10 md:pb-0 ${bg}`}
        >
          {/* Mobile Handle */}
          <div className="w-full flex justify-center pt-4 pb-2 md:hidden">
            <div className="w-12 h-1.5 rounded-full bg-black/20" />
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-10 p-2 rounded-full hover:bg-black/10"
          >
            <X size={24} className={titleColor} />
          </button>

          {step === 1 ? (
            <div className="p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#c9a227] flex items-center justify-center text-white shadow-lg">
                  {type === 'buy' ? <Building2 size={24} /> : <Calendar size={24} />}
                </div>
                <div>
                  <h2 className={`text-3xl font-black tracking-tight ${titleColor}`}>
                    {type === 'buy' ? t('Buy Property') : t('Rent Property')}
                  </h2>
                  <p className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>{property?.title || 'Luxury Residence'}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${textMuted}`}>{t('fullName')}</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className={`w-full pl-12 pr-6 py-4 rounded-2xl border outline-none ${inputBg}`}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${textMuted}`}>{t('phone')}</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                      <input
                        required
                        type="tel"
                        placeholder="+966 --- --- ---"
                        className={`w-full pl-12 pr-6 py-4 rounded-2xl border outline-none ${inputBg}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${textMuted}`}>{t('email')}</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full pl-12 pr-6 py-4 rounded-2xl border outline-none ${inputBg}`}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {type === 'rent' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${textMuted}`}>{t('moveInDate')}</label>
                      <input
                        type="date"
                        className={`w-full px-6 py-4 rounded-2xl border outline-none ${inputBg}`}
                        value={formData.moveInDate}
                        onChange={(e) => setFormData({...formData, moveInDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${textMuted}`}>{t('duration')}</label>
                      <select 
                        className={`w-full px-6 py-4 rounded-2xl border outline-none appearance-none ${inputBg}`}
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      >
                        <option>6 Months</option>
                        <option>1 Year</option>
                        <option>2 Years</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ml-4 ${textMuted}`}>{t('message')} ({t('optional')})</label>
                  <textarea
                    rows="3"
                    className={`w-full px-6 py-4 rounded-2xl border outline-none resize-none ${inputBg}`}
                    placeholder="I am interested in this property..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <div className={`p-4 rounded-2xl bg-[#c9a227]/10 border border-[#c9a227]/20 flex gap-4 items-center mb-4`}>
                    <Info size={20} className="text-[#c9a227] shrink-0" />
                    <p className="text-[10px] font-bold leading-relaxed text-black/60">
                        {type === 'buy' 
                            ? "By submitting, you agree to our privacy policy. An agent will contact you within 24 hours to discuss financing and viewing options."
                            : "Rental terms subject to credit check. By submitting this request, you initiate a preliminary inquiry for the selected dates."
                        }
                    </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-[#c9a227] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#c9a227]/30"
                >
                  {type === 'buy' ? t('Submit Buy Request') : t('Submit Rent Request')}
                </button>
              </form>
            </div>
          ) : (
            <div className="p-20 text-center">
              <div
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-green-500/30"
              >
                <CheckCircle2 size={48} />
              </div>
              <h2 className={`text-4xl font-black tracking-tight mb-4 ${titleColor}`}>{t('Success')}!</h2>
              <p className={`text-lg mb-10 ${textMuted}`}>{t('requestReceivedMessage') || "Your request has been received. Our luxury concierge will reach out to you shortly."}</p>
              <button
                onClick={onClose}
                className="px-12 py-4 bg-[#c9a227] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl"
              >
                {t('Close')}
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default PropertyActionModal;
