import React, { useState } from 'react';
import { X, CheckCircle, Upload, Home, MapPin, DollarSign, Ruler, LayoutGrid } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useLanguage } from './LanguageContext';

const AddPropertyModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    area: '',
    category: 'Villas',
    image: null
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 2 seconds and close
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          title: '',
          price: '',
          location: '',
          beds: '',
          baths: '',
          area: '',
          category: 'Villas',
          image: null
        });
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const bg = "bg-white";
  const text = "text-[#1a1a1a]";
  const inputBg = "bg-black/5 border-black/10 text-black";
  const overlayBg = "bg-white/60";

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-sm ${overlayBg}`}
      />

      <div
        className={`relative w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-t-[32px] md:rounded-[32px] border-t md:border border-black/10 ${bg} shadow-2xl no-scrollbar z-10 pb-10 md:pb-0`}
      >
        {/* Mobile Handle */}
        <div className="w-full flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 rounded-full bg-black/20" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full p-2 text-black/50"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          {!isSuccess ? (
            <div>
              <div className="mb-8 text-center">
                <h2 className={`mb-2 text-3xl font-bold tracking-tight ${text}`}>
                  {t('Add Property Title') || 'Add New Property'}
                </h2>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div className="group w-full rounded-[24px] border-2 border-dashed border-black/20 bg-black/5 p-10 text-center cursor-pointer relative overflow-hidden">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="rounded-full p-4 bg-black/5 text-black/50">
                      <Upload size={24} />
                    </div>
                    <div>
                      <p className={`font-bold ${text}`}>
                        {formData.image ? formData.image.name : (t('Upload Image') || 'Upload Property Image')}
                      </p>
                      <p className="text-xs text-black/50">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                      {t('Property Title') || 'Property Title'}
                    </label>
                    <div className="relative">
                      <Home size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                      <input
                        required
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Al Narjis Modern"
                        className={`w-full rounded-2xl border pl-12 pr-5 py-4 text-sm outline-none ${inputBg}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                      {t('Property Price') || 'Price (SAR)'}
                    </label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                      <input
                        required
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g. 4.2M"
                        className={`w-full rounded-2xl border pl-12 pr-5 py-4 text-sm outline-none ${inputBg}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                    {t('Property Location') || 'Location'}
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                    <input
                      required
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Al Narjis, Riyadh"
                      className={`w-full rounded-2xl border pl-12 pr-5 py-4 text-sm outline-none ${inputBg}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                      {t('Bedrooms') || 'Beds'}
                    </label>
                    <input
                      required
                      type="number"
                      name="beds"
                      value={formData.beds}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none ${inputBg}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                      {t('Bathrooms') || 'Baths'}
                    </label>
                    <input
                      required
                      type="number"
                      name="baths"
                      value={formData.baths}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none ${inputBg}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                      {t('Area (m²)') || 'm²'}
                    </label>
                    <div className="relative">
                      <Ruler size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#c9a227]/50" />
                      <input
                        required
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className={`w-full rounded-2xl border pl-5 pr-12 py-4 text-sm outline-none ${inputBg}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/40">
                    {t('Property Category') || 'Category'}
                  </label>
                  <div className="relative">
                    <LayoutGrid size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c9a227]" />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full rounded-2xl border pl-12 pr-5 py-4 text-sm outline-none ${inputBg} appearance-none cursor-pointer`}
                    >
                      <option value="Villas">Villas</option>
                      <option value="Apartments">Apartments</option>
                      <option value="Estates">Estates</option>
                      <option value="Penthouses">Penthouses</option>
                      <option value="Townhouses">Townhouses</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-[#c9a227] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-[#c9a227]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (t('submitProperty') || 'Publish Listing')}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-green-500" />
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${text}`}>Success!</h2>
              <p className="text-sm max-w-[300px] leading-relaxed text-black/50">
                Your property <strong>{formData.title}</strong> has been successfully submitted for review.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddPropertyModal;
