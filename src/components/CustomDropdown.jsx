import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function CustomDropdown({ options, value, onChange, placeholder, className = "", label = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const bg = "bg-white border-black/10";
  const hoverBg = "hover:bg-black/5";
  const textColor = "text-[#1a1a1a]";
  const placeholderColor = "text-black/50";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] px-4 rounded-lg border flex items-center justify-between ${bg} ${textColor}`}
      >
        <div className="flex items-center gap-1 overflow-hidden">
          {label && <span className="text-[13px] opacity-60 mr-1 shrink-0">{label}</span>}
          <span className={`text-[15px] font-medium truncate ${!selectedOption ? placeholderColor : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown size={16} className={`shrink-0 ${isOpen ? "rotate-180" : ""} opacity-60`} />
      </button>

        {isOpen && (
          <div
            className={`absolute z-[100] top-full left-0 w-full mt-2 rounded-lg border shadow-xl overflow-hidden ${bg}`}
          >
            <div className="max-h-[250px] overflow-y-auto custom-scrollbar py-1">
              {/* Optional Empty Value */}
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-[15px] ${value === opt.value ? "bg-[#c9a227] text-white" : hoverBg} ${value === opt.value ? "" : textColor}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
