import React from 'react';
import { useLanguage } from '../components/LanguageContext';
import { TrendingUp, Home, Key, Users, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import Footer from "../components/Footer";
import Header from "../components/header";

const AnalyticsSection = () => {
    const { t } = useLanguage();

    const cardBg = "bg-white border-black/5 shadow-sm";
    const textColor = "text-[#1a1a1a]";
    const textMuted = "text-gray-500";

    const stats = [
        { label: t('villaSales'), value: "1,284", change: "+12.5%", trend: "up", icon: Home },
        { label: t('villaRentals'), value: "856", change: "+8.2%", trend: "up", icon: Key },
        { label: t('averagePrice'), value: "3.2M SAR", change: "-2.4%", trend: "down", icon: TrendingUp },
        { label: t('activeBuyers'), value: "4,120", change: "+15.3%", trend: "up", icon: Users },
    ];

    const chartData = [
        { month: t('Jan') || "Jan", sales: 45, rentals: 30 },
        { month: t('Feb') || "Feb", sales: 52, rentals: 35 },
        { month: t('Mar') || "Mar", sales: 48, rentals: 42 },
        { month: t('Apr') || "Apr", sales: 61, rentals: 38 },
        { month: t('May') || "May", sales: 55, rentals: 45 },
        { month: t('Jun') || "Jun", sales: 67, rentals: 50 },
    ];

    return (
        <section id="Analytics" className="pt-32 pb-24 px-4 md:px-10 overflow-hidden min-h-screen">
            <Header />
            <div className="max-w-[1700px] mx-auto mt-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${textColor}`}>
                            {t('Analytics')}
                        </h2>
                        <p className={`text-lg ${textMuted}`}>
                            {t('priceAnalytics')} - {t('marketTrends')} in Riyadh (2024-2025)
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-full bg-[#c9a227]/10 text-[#c9a227] text-xs font-bold border border-[#c9a227]/20 flex items-center gap-2">
                            <Activity size={14} />
                            {t('liveData')}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className={`p-8 rounded-[32px] border ${cardBg} relative overflow-hidden group`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-4 rounded-2xl bg-black/5 group-hover:bg-[#c9a227] group-hover:text-white transition-all duration-500">
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                    {stat.change}
                                </div>
                            </div>
                            <p className={`text-sm font-bold uppercase tracking-widest ${textMuted} mb-1`}>{stat.label}</p>
                            <h3 className={`text-3xl font-black ${textColor}`}>{stat.value}</h3>

                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <stat.icon size={120} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className={`col-span-1 lg:col-span-8 p-10 rounded-[40px] border ${cardBg}`}>
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h4 className={`text-xl font-bold ${textColor}`}>{t('marketTrends')}</h4>
                                <p className={`text-sm ${textMuted}`}>{t('monthlyPerformance')}</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#c9a227]" />
                                    <span className={`text-xs font-bold ${textMuted}`}>{t('villaSales')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className={`text-xs font-bold ${textMuted}`}>{t('villaRentals')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px] relative flex items-end justify-between gap-2 md:gap-4 mt-8">
                            {/* Background Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                {[0, 1, 2, 3, 4].map((_, i) => (
                                    <div key={i} className="w-full border-t border-black/5 h-0" />
                                ))}
                            </div>

                            {/* Trend Line (SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
                                <path
                                    d="M 50 300 Q 200 250 400 280 T 800 150 T 1200 200 T 1600 100"
                                    fill="none"
                                    stroke="#c9a227"
                                    strokeWidth="2"
                                    strokeOpacity="0.3"
                                />
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                            </svg>

                            {chartData.map((data, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group z-10 h-full justify-end">
                                    <div className="w-full flex items-end justify-center gap-1 md:gap-2 h-full">
                                        <div
                                            style={{ height: `${data.sales}%` }}
                                            className="w-full max-w-[12px] md:max-w-[24px] bg-[#c9a227] rounded-t-md md:rounded-t-lg relative shadow-[0_0_20px_rgba(201,162,39,0.3)]"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 border border-white/10 shadow-2xl scale-75 group-hover:scale-100">
                                                {data.sales} {t('units')}
                                            </div>
                                        </div>
                                        <div
                                            style={{ height: `${data.rentals}%` }}
                                            className="w-full max-w-[12px] md:max-w-[24px] bg-blue-500 rounded-t-md md:rounded-t-lg relative shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 border border-white/10 shadow-2xl scale-75 group-hover:scale-100">
                                                {data.rentals} {t('units')}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-bold ${textMuted} mt-2`}>{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`col-span-1 lg:col-span-4 p-10 rounded-[40px] border ${cardBg} flex flex-col`}>
                        <h4 className={`text-xl font-bold ${textColor} mb-2`}>{t('yearlyGrowth')}</h4>
                        <p className={`text-sm ${textMuted} mb-8`}>{t('projectedGrowth')}</p>

                        <div className="flex-1 flex flex-col justify-center space-y-8">
                            {[
                                { label: t('formVilla'), progress: 85, color: "bg-[#c9a227]" },
                                { label: t('formApartment'), progress: 62, color: "bg-blue-500" },
                                { label: t('formCommercial'), progress: 45, color: "bg-emerald-500" },
                                { label: t('formLand'), progress: 30, color: "bg-rose-500" },
                            ].map((item, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className={`text-sm font-bold ${textColor}`}>{item.label}</span>
                                        <span className={`text-sm font-black text-[#c9a227]`}>{item.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-black/5 overflow-hidden">
                                        <div
                                            style={{ width: `${item.progress}%` }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 rounded-3xl bg-black/5 border border-[#c9a227]/20">
                            <p className={`text-xs font-bold leading-relaxed ${textMuted}`}>
                                {t('marketPrediction')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>

    );
};

export default AnalyticsSection;
