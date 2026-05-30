import React, { useState } from 'react';
import { X, ChevronRight, Bell, Check } from 'lucide-react';

export const MobileFilterModal = ({
    onClose, resultsCount, handleClear,
    rooms, setRooms, priceFrom, setPriceFrom, priceTo, setPriceTo,
    floorFrom, setFloorFrom, floorTo, setFloorTo,
    notFirstFloor, setNotFirstFloor, notLastFloor, setNotLastFloor,
    hasPhoto, setHasPhoto, fromOwner, setFromOwner, isNew, setIsNew,
    houseType, setHouseType, totalAreaFrom, setTotalAreaFrom,
    totalAreaTo, setTotalAreaTo, kitchenAreaFrom, setKitchenAreaFrom,
    kitchenAreaTo, setKitchenAreaTo, bathroom, setBathroom,
    yearFrom, setYearFrom, yearTo, setYearTo
}) => {
    // Local fallback states for unconnected props
    const [_rooms, _setRooms] = useState('');
    const currentRooms = setRooms ? rooms : _rooms;
    const updateRooms = setRooms || _setRooms;

    const [activeModal, setActiveModal] = useState(null); // 'sort', 'region', null

    const sortOptions = ['Не выбрано', 'Новые', 'Дешевые', 'Дорогие'];
    const [sortBy, setSortBy] = useState('Не выбрано');

    const regionOptions = [
        'Эр-Рияд',
        'Все регионы',
        'Джидда',
        'Мекка',
        'Медина',
        'Даммам',
        'Аль-Хубар',
        'Абха',
        'Табук',
        'Хаиль',
        'Наджран'
    ];
    const [region, setRegion] = useState('Эр-Рияд');

    const ButtonGroup = ({ options, value, onChange }) => (
        <div className="flex flex-wrap gap-2">
            {options.map(opt => {
                const isSelected = value === opt;
                return (
                    <button
                        key={opt}
                        onClick={() => onChange(isSelected ? '' : opt)}
                        className={`px-4 py-2 rounded-lg border text-[14px] font-medium transition-colors ${isSelected
                            ? 'border-[#2a81dd] text-[#2a81dd] bg-[#2a81dd]/5'
                            : 'border-gray-200 text-gray-700 bg-white'
                            }`}
                    >
                        {opt}
                    </button>
                )
            })}
        </div>
    );

    const RangeInput = ({ label, fromVal, setFromVal, toVal, setToVal }) => (
        <div className="mb-4">
            {label && <div className="text-[15px] font-medium text-gray-900 mb-2">{label}</div>}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                <input
                    type="number"
                    placeholder="От"
                    value={fromVal}
                    onChange={e => setFromVal && setFromVal(e.target.value)}
                    className="w-1/2 p-3 text-[15px] outline-none placeholder:text-gray-400"
                />
                <div className="w-[1px] h-8 bg-gray-200"></div>
                <input
                    type="number"
                    placeholder="До"
                    value={toVal}
                    onChange={e => setToVal && setToVal(e.target.value)}
                    className="w-1/2 p-3 text-[15px] outline-none placeholder:text-gray-400"
                />
            </div>
        </div>
    );

    const CheckboxRow = ({ label, checked, onChange, hasBorder = true }) => (
        <label className={`flex items-center justify-between py-4 cursor-pointer ${hasBorder ? 'border-b border-gray-100' : ''}`}>
            <span className="text-[15px] text-gray-900">{label}</span>
            <div className="relative flex items-center justify-center w-[22px] h-[22px] border border-gray-300 rounded bg-white overflow-hidden">
                <input
                    type="checkbox"
                    checked={checked || false}
                    onChange={e => onChange && onChange(e.target.checked)}
                    className="appearance-none absolute inset-0 outline-none checked:bg-[#2a81dd] checked:border-[#2a81dd] transition-colors cursor-pointer"
                />
                {checked && <svg className="w-3.5 h-3.5 text-white z-10 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
        </label>
    );

    const SectionTitle = ({ title }) => (
        <h3 className="font-bold text-[18px] text-gray-900 mt-6 mb-4">{title}</h3>
    );

    const LinkRow = ({ label, value, onClick }) => (
        <button onClick={onClick} className="w-full flex items-center justify-between py-4 border-b border-gray-100">
            <span className="text-[15px] text-gray-900">{label}</span>
            <div className="flex items-center text-[#2a81dd] text-[15px]">
                {value} <ChevronRight size={18} className="ml-1 text-gray-400" />
            </div>
        </button>
    );

    if (activeModal === 'sort') {
        return (
            <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                    <span className="font-bold text-[17px] text-gray-900">Показать сначала</span>
                    <button onClick={() => setActiveModal(null)} className="p-1 -mr-1 text-gray-400"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {sortOptions.map(opt => (
                        <label key={opt} className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer">
                            <span className="text-[15px] text-gray-900">{opt}</span>
                            {sortBy === opt && <Check size={20} className="text-[#2a81dd]" />}
                            <input
                                type="radio"
                                name="sort"
                                value={opt}
                                checked={sortBy === opt}
                                onChange={() => { setSortBy(opt); setActiveModal(null); }}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    if (activeModal === 'region') {
        return (
            <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                    <span className="font-bold text-[17px] text-gray-900">Регион</span>
                    <button onClick={() => setActiveModal(null)} className="p-1 -mr-1 text-gray-400"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {regionOptions.map(opt => (
                        <label key={opt} className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer">
                            <span className="text-[15px] text-gray-900">{opt}</span>
                            {region === opt && <Check size={20} className="text-[#2a81dd]" />}
                            <input
                                type="radio"
                                name="region"
                                value={opt}
                                checked={region === opt}
                                onChange={() => { setRegion(opt); setActiveModal(null); }}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[99999] bg-white flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 shrink-0">
                <div className="flex items-center">
                    <button onClick={onClose} className="p-1 -ml-1 mr-2 text-gray-900"><X size={24} /></button>
                    <span className="font-bold text-[17px] text-gray-900">Фильтр</span>
                </div>
                <button onClick={handleClear} className="text-[#2a81dd] font-medium text-[15px]">Сбросить</button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-white px-4 pb-4">
                    <LinkRow label="Показать сначала" value={sortBy} onClick={() => setActiveModal('sort')} />
                    <LinkRow label="Регион" value={region} onClick={() => setActiveModal('region')} />

                    <div className="py-4">
                        <div className="text-[15px] font-medium text-gray-900 mb-3">Количество комнат</div>
                        <ButtonGroup
                            options={['1', '2', '3', '4', '5+']}
                            value={currentRooms}
                            onChange={updateRooms}
                        />
                    </div>

                    <RangeInput
                        label="Цена, ₸"
                        fromVal={priceFrom || ''} setFromVal={setPriceFrom}
                        toVal={priceTo || ''} setToVal={setPriceTo}
                    />

                    <div className="mt-2">
                        <CheckboxRow label="С фото" checked={hasPhoto} onChange={setHasPhoto} />
                        <CheckboxRow label="От хозяев" checked={fromOwner} onChange={setFromOwner} />
                        <CheckboxRow label="Новостройки" checked={isNew} onChange={setIsNew} />
                        <CheckboxRow label="От Крыша Агентов" checked={false} onChange={() => { }} hasBorder={false} />
                    </div>
                </div>

                <div className="bg-white px-4 pb-4 mt-2 border-t border-gray-100 pt-2">
                    <SectionTitle title="О доме" />
                    <RangeInput
                        label="Этаж"
                        fromVal={floorFrom || ''} setFromVal={setFloorFrom}
                        toVal={floorTo || ''} setToVal={setFloorTo}
                    />
                    <CheckboxRow label="Не первый этаж" checked={notFirstFloor} onChange={setNotFirstFloor} />

                    <div className="mt-4">
                        <RangeInput
                            label="Год постройки (сдачи в эксплуатацию)"
                            fromVal={yearFrom || ''} setFromVal={setYearFrom}
                            toVal={yearTo || ''} setToVal={setYearTo}
                        />
                    </div>

                    <CheckboxRow label="Не последний этаж" checked={notLastFloor} onChange={setNotLastFloor} />

                    <LinkRow label="Жилой комплекс" value="" onClick={() => { }} />

                    <div className="mt-4">
                        <RangeInput
                            label="Количество этажей"
                            fromVal={''} setFromVal={() => { }}
                            toVal={''} setToVal={() => { }}
                        />
                    </div>

                    <div className="mt-4 pb-4">
                        <div className="text-[15px] font-medium text-gray-900 mb-3">Тип строения</div>
                        <ButtonGroup
                            options={['Кирпичный', 'Панельный', 'Монолитный', 'Иной']}
                            value={houseType || ''}
                            onChange={setHouseType}
                        />
                    </div>
                </div>

                <div className="bg-white px-4 pb-4 mt-2 border-t border-gray-100 pt-2 mb-6">
                    <SectionTitle title="О квартире" />

                    <RangeInput
                        label="Общая площадь, м²"
                        fromVal={totalAreaFrom || ''} setFromVal={setTotalAreaFrom}
                        toVal={totalAreaTo || ''} setToVal={setTotalAreaTo}
                    />

                    <RangeInput
                        label="Площадь кухни, м²"
                        fromVal={kitchenAreaFrom || ''} setFromVal={setKitchenAreaFrom}
                        toVal={kitchenAreaTo || ''} setToVal={setKitchenAreaTo}
                    />

                    <div className="mt-4 border-b border-gray-100 pb-4">
                        <div className="text-[15px] font-medium text-gray-900 mb-3">Бывшее общежитие</div>
                        <ButtonGroup
                            options={['Да', 'Нет']}
                            value={''}
                            onChange={() => { }}
                        />
                    </div>

                    <CheckboxRow label="Возможен обмен" checked={false} onChange={() => { }} />

                    <div className="mt-4 border-b border-gray-100 pb-4">
                        <div className="text-[15px] font-medium text-gray-900 mb-3">В залоге</div>
                        <ButtonGroup
                            options={['Да', 'Нет']}
                            value={''}
                            onChange={() => { }}
                        />
                    </div>

                    <div className="mt-4 border-b border-gray-100 pb-4">
                        <div className="text-[15px] font-medium text-gray-900 mb-3">Санузел</div>
                        <ButtonGroup
                            options={['Раздельный', 'Совмещенный', '2 с/у и более', 'Нет']}
                            value={bathroom || ''}
                            onChange={setBathroom}
                        />
                    </div>

                    <div className="mt-4 border-b border-gray-100 pb-4">
                        <div className="text-[15px] font-medium text-gray-900 mb-3">Телефон</div>
                        <ButtonGroup
                            options={['Отдельный', 'Блокиратор', 'Есть возможность подключения', 'Нет']}
                            value={''}
                            onChange={() => { }}
                        />
                    </div>

                    <SectionTitle title="Текст в объявлениях" />
                    <input
                        type="text"
                        placeholder="Поиск по тексту в объявлениях"
                        className="w-full p-3 border border-gray-200 rounded-lg text-[15px] outline-none focus:border-[#2a81dd] placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-100 p-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] z-10 relative">
                <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center text-gray-700">
                        <Bell size={18} className="mr-2 text-gray-500" />
                        <span className="text-[15px]">Получать уведомления</span>
                    </div>
                    {/* Toggle Switch */}
                    <div className="relative inline-block w-11 h-6">
                        <input type="checkbox" className="peer sr-only" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2a81dd]"></div>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full bg-[#2a81dd] text-white py-3.5 rounded-xl font-bold text-[16px] active:bg-[#1d65b0] transition-colors"
                >
                    Показать {resultsCount > 0} объявлений
                </button>
            </div>
        </div>
    );
};
