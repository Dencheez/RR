import React from 'react';
import { Home } from 'lucide-react';

const PropertiesTab = ({ navigate }) => (
    <div className="space-y-10">
        <h1 className="text-4xl font-black">My Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Твой список объектов */}
            <div onClick={() => navigate('/add-property')} className="border-2 border-dashed border-black/10 rounded-[32px] p-10 flex flex-col items-center cursor-pointer">
                <Home size={28} className="text-[#c9a227]" />
                <span className="text-[10px] font-black uppercase mt-4">List New Property</span>
            </div>
        </div>
    </div>
);
export default PropertiesTab;