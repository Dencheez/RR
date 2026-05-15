import React, { useState } from 'react';
import { Plus, Building, Users, Settings, Trash2, Edit2 } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import AddPropertyModal from '../components/AddPropertyModal';
import Header from '../components/header';
import Footer from '../components/Footer';

const AdminPage = () => {
  const { t } = useLanguage();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  const bg = "bg-[#f7f5f0]";
  const text = "text-[#1a1a1a]";
  const cardBg = "bg-white border-black/5";

  const mockProperties = [
    { id: 1, title: "The Palms Villa", price: "SAR 3.2M", location: "Al Malqa District", category: "Villas", date: "2026-05-01" },
    { id: 2, title: "Skyline Apartments", price: "SAR 1.5M", location: "KAFD", category: "Apartments", date: "2026-04-28" },
    { id: 3, title: "Al Narjis Heights", price: "SAR 2.6M", location: "Al Narjis", category: "Estates", date: "2026-04-15" },
  ];

  return (
    <div className={`min-h-screen ${bg} flex flex-col`}>
      <Header />

      <main className="flex-1 pt-40 pb-20 px-10 md:px-20 max-w-[1700px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${text}`}>
              {t('adminDashboard') || 'Admin Dashboard'}
            </h1>
            <p className="text-sm text-black/50">
              Manage your properties, users, and site settings.
            </p>
          </div>

          <button
            onClick={() => setIsAddPropertyOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest bg-[#c9a227] text-white shadow-[0_0_20px_rgba(201,162,39,0.3)]"
          >
            <Plus size={16} strokeWidth={3} />
            {t('addPropertyBtn') || 'Add Property'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Properties', value: '156', icon: <Building size={24} /> },
            { label: 'Active Users', value: '2,845', icon: <Users size={24} /> },
            { label: 'Total Revenue', value: 'SAR 45M', icon: <Settings size={24} /> }
          ].map((stat, i) => (
            <div key={i} className={`p-8 rounded-[32px] border ${cardBg} flex items-center justify-between`}>
              <div>
                <p className="text-xs font-black uppercase tracking-widest mb-2 text-black/50">{stat.label}</p>
                <p className={`text-3xl font-bold ${text}`}>{stat.value}</p>
              </div>
              <div className="p-4 rounded-full bg-black/5 text-[#c9a227]">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Properties Table */}
        <div className={`rounded-[32px] border ${cardBg} overflow-hidden`}>
          <div className="p-8 border-b border-inherit flex justify-between items-center">
            <h2 className={`text-xl font-bold ${text}`}>Recent Properties</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/5 bg-black/5">
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-black/50">Title</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-black/50">Location</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-black/50">Category</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-black/50">Price</th>
                  <th className="p-6 text-xs font-black uppercase tracking-widest text-black/50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProperties.map((prop) => (
                  <tr key={prop.id} className="border-b last:border-0 border-black/5 hover:bg-black/[0.02]">
                    <td className={`p-6 font-medium ${text}`}>{prop.title}</td>
                    <td className="p-6 text-sm text-black/70">{prop.location}</td>
                    <td className={`p-6`}>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/10 text-black">
                        {prop.category}
                      </span>
                    </td>
                    <td className={`p-6 font-bold text-[#c9a227]`}>{prop.price}</td>
                    <td className="p-6">
                      <div className="flex gap-3">
                        <button className="p-2 rounded-full text-black/50 hover:text-black">
                          <Edit2 size={16} />
                        </button>
                        <button className={`p-2 rounded-full text-red-500`}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
      <AddPropertyModal isOpen={isAddPropertyOpen} onClose={() => setIsAddPropertyOpen(false)} />
    </div>
  );
};

export default AdminPage;
