import React, { useState } from 'react';
import { Search, ChevronDown, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { MapSearchForm } from "../SearchPage/MapSearchForm";


const Banner = () => {
  const navigate = useNavigate();
  const { t, isDark } = useLanguage();

  const [action, setAction] = useState('buy');
  const [propType, setPropType] = useState('');
  const [rooms, setRooms] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [fromOwner, setFromOwner] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);

  // Advanced search states (needed for MapSearchForm)
  const [houseType, setHouseType] = useState('any');
  const [floorFrom, setFloorFrom] = useState('');
  const [floorTo, setFloorTo] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [notFirstFloor, setNotFirstFloor] = useState(false);
  const [notLastFloor, setNotLastFloor] = useState(false);
  const [totalAreaFrom, setTotalAreaFrom] = useState('');
  const [totalAreaTo, setTotalAreaTo] = useState('');
  const [kitchenAreaFrom, setKitchenAreaFrom] = useState('');
  const [kitchenAreaTo, setKitchenAreaTo] = useState('');
  const [residentialComplex, setResidentialComplex] = useState('any');

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('action', action);
    if (propType) params.set('type', propType);
    if (rooms) params.set('rooms', rooms);
    if (priceFrom) params.set('priceFrom', priceFrom);
    if (priceTo) params.set('priceTo', priceTo);
    if (locationQuery) params.set('locationQuery', locationQuery);
    if (hasPhoto) params.set('hasPhoto', '1');
    if (isNew) params.set('new', '1');
    if (fromOwner) params.set('fromOwner', '1');
    if (isCommercial) params.set('commercial', '1');
    
    // Add advanced params
    if (houseType && houseType !== 'any') params.set('houseType', houseType);
    if (floorFrom) params.set('floorFrom', floorFrom);
    if (floorTo) params.set('floorTo', floorTo);
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (yearTo) params.set('yearTo', yearTo);
    if (notFirstFloor) params.set('notFirst', '1');
    if (notLastFloor) params.set('notLast', '1');
    if (totalAreaFrom) params.set('totalAreaFrom', totalAreaFrom);
    if (totalAreaTo) params.set('totalAreaTo', totalAreaTo);
    if (kitchenAreaFrom) params.set('kitchenAreaFrom', kitchenAreaFrom);
    if (kitchenAreaTo) params.set('kitchenAreaTo', kitchenAreaTo);
    if (residentialComplex && residentialComplex !== 'any') params.set('residentialComplex', residentialComplex);

    navigate(`/search?${params.toString()}`);
  };

  const handleMapSearch = () => {
    const params = new URLSearchParams();
    // Same as handleSearch but for map
    params.set('action', action);
    if (propType) params.set('type', propType);
    if (rooms) params.set('rooms', rooms);
    if (priceFrom) params.set('priceFrom', priceFrom);
    if (priceTo) params.set('priceTo', priceTo);
    if (locationQuery) params.set('locationQuery', locationQuery);
    if (hasPhoto) params.set('hasPhoto', '1');
    if (isNew) params.set('new', '1');
    if (fromOwner) params.set('fromOwner', '1');
    if (isCommercial) params.set('commercial', '1');
    
    // Add advanced params
    if (houseType && houseType !== 'any') params.set('houseType', houseType);
    if (floorFrom) params.set('floorFrom', floorFrom);
    if (floorTo) params.set('floorTo', floorTo);
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (yearTo) params.set('yearTo', yearTo);
    if (notFirstFloor) params.set('notFirst', '1');
    if (notLastFloor) params.set('notLast', '1');
    if (totalAreaFrom) params.set('totalAreaFrom', totalAreaFrom);
    if (totalAreaTo) params.set('totalAreaTo', totalAreaTo);
    if (kitchenAreaFrom) params.set('kitchenAreaFrom', kitchenAreaFrom);
    if (kitchenAreaTo) params.set('kitchenAreaTo', kitchenAreaTo);
    if (residentialComplex && residentialComplex !== 'any') params.set('residentialComplex', residentialComplex);

    navigate(`/map?${params.toString()}`);
  };

  return (
    <section
      className="w-full relative flex items-end"
      style={{
        paddingTop: '114px',
        minHeight: '340px',
      }}
    >
      <div className="absolute inset-0" />

      <div className="relative z-10 w-full px-4 md:px-8 pb-0 flex justify-center">
        <div className="w-full max-w-[1300px]">
          <MapSearchForm
            action={action} setAction={setAction}
            propType={propType} setPropType={setPropType}
            rooms={rooms} setRooms={setRooms}
            locationQuery={locationQuery} setLocationQuery={setLocationQuery}
            priceFrom={priceFrom} setPriceFrom={setPriceFrom}
            priceTo={priceTo} setPriceTo={setPriceTo}
            hasPhoto={hasPhoto} setHasPhoto={setHasPhoto}
            isNew={isNew} setIsNew={setIsNew}
            fromOwner={fromOwner} setFromOwner={setFromOwner}
            isCommercial={isCommercial} setIsCommercial={setIsCommercial}
            onSearch={handleSearch}
            isMapView={false}
            onToggleView={handleMapSearch}
            resultsCount={0}
            houseType={houseType} setHouseType={setHouseType}
            floorFrom={floorFrom} setFloorFrom={setFloorFrom}
            floorTo={floorTo} setFloorTo={setFloorTo}
            yearFrom={yearFrom} setYearFrom={setYearFrom}
            yearTo={yearTo} setYearTo={setYearTo}
            notFirstFloor={notFirstFloor} setNotFirstFloor={setNotFirstFloor}
            notLastFloor={notLastFloor} setNotLastFloor={setNotLastFloor}
            totalAreaFrom={totalAreaFrom} setTotalAreaFrom={setTotalAreaFrom}
            totalAreaTo={totalAreaTo} setTotalAreaTo={setTotalAreaTo}
            kitchenAreaFrom={kitchenAreaFrom} setKitchenAreaFrom={setKitchenAreaFrom}
            kitchenAreaTo={kitchenAreaTo} setKitchenAreaTo={setKitchenAreaTo}
            residentialComplex={residentialComplex} setResidentialComplex={setResidentialComplex}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;