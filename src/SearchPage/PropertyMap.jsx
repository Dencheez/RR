import React, { useRef, useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMap, CircleMarker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import { Pen, Trash2, Map as MapIcon, Layers } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

// Custom Toolbar Component
const MapToolbar = ({ onDrawPolygon, onClear, hasPolygon }) => {
    const { isDark } = useLanguage();

    const btnBase = "w-10 h-10 flex items-center justify-center transition-all duration-200 border-b last:border-b-0";
    const bgClass = isDark ? "bg-[#1a1a1a] border-white/10" : "bg-white border-black/10";
    const iconColor = isDark ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black";
    const activeClass = "text-[#c9a227]";

    return (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/5">
            <button
                onClick={onDrawPolygon}
                className={`${btnBase} ${bgClass} ${iconColor} hover:bg-[#c9a227]/10 relative`}
                title="Нарисовать область"
            >
                <Pen size={20} className='absolute z-1' />
            </button>
            {hasPolygon && (
                <button
                    onClick={onClear}
                    className={`${btnBase} ${bgClass} ${iconColor} text-red-500/70 hover:text-red-500 hover:bg-red-500/10 relative`}
                    title="Очистить"
                >
                    <Trash2 size={20} className='absolute z-1' />
                </button>
            )}
        </div>
    );
};

function MapResizer() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
    return null;
}

export default function PropertyMap({ buildings, onPolygonChange }) {
    const featureGroupRef = useRef(null);
    const [hasPolygon, setHasPolygon] = useState(false);
    const { isDark } = useLanguage();
    const mapRef = useRef(null);

    const onCreated = (e) => {
        const layer = e.layer;
        const geojson = layer.toGeoJSON();

        const fg = featureGroupRef.current;
        fg.clearLayers();
        fg.addLayer(layer);

        setHasPolygon(true);
        onPolygonChange(geojson);
    };

    const onEdited = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            onPolygonChange(layer.toGeoJSON());
        });
    };

    const onDeleted = () => {
        setHasPolygon(false);
        onPolygonChange(null);
    };

    const handleDrawPolygon = () => {
        const drawButton = document.querySelector('.leaflet-draw-draw-polygon');
        if (drawButton) {
            drawButton.click();
        }
    };

    const handleClear = () => {
        const fg = featureGroupRef.current;
        if (fg) {
            fg.clearLayers();
            setHasPolygon(false);
            onPolygonChange(null);
        }
    };

    return (
        <div className="w-full h-full relative z-0">
            <style>
                {`
                .leaflet-draw-toolbar { display: none !important; }
                .leaflet-draw-actions { display: none !important; }
                .custom-popup .leaflet-popup-content-wrapper {
                    background: ${isDark ? '#1a1a1a' : 'white'};
                    color: ${isDark ? 'white' : 'black'};
                    border-radius: 16px;
                    padding: 0;
                }
                .custom-popup .leaflet-popup-tip {
                    background: ${isDark ? '#1a1a1a' : 'white'};
                }
                `}
            </style>

            <MapContainer
                center={[24.7136, 46.6753]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
            >
                <MapResizer />
                <TileLayer
                    url={isDark
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                    attribution='&copy; RiyadhRoof'
                />

                <MapToolbar
                    onDrawPolygon={handleDrawPolygon}
                    onClear={handleClear}
                    hasPolygon={hasPolygon}
                />

                <FeatureGroup ref={featureGroupRef}>
                    <EditControl
                        position="topright"
                        onCreated={onCreated}
                        onEdited={onEdited}
                        onDeleted={onDeleted}
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polyline: false,
                            polygon: {
                                allowIntersection: false,
                                shapeOptions: {
                                    color: '#c9a227',
                                    fillOpacity: 0.2,
                                    weight: 3
                                }
                            }
                        }}
                    />
                </FeatureGroup>

                {buildings.map(b => (
                    <CircleMarker
                        key={b.id}
                        center={b.coords || [24.7136, 46.6753]}
                        radius={12}
                        pathOptions={{
                            fillColor: '#c9a227',
                            fillOpacity: 0.9,
                            color: 'white',
                            weight: 3
                        }}
                    >
                        <Popup className="custom-popup">
                            <div className="font-sans p-2 min-w-[150px]">
                                <h3 className="font-bold text-sm mb-1">{b.name}</h3>
                                <p className="text-[#c9a227] font-extrabold text-sm mb-2">{b.price}M SAR</p>
                                <div className="flex gap-2 opacity-60 text-[10px] font-bold uppercase tracking-wider">
                                    <span>{b.bedrooms} Bed</span>
                                    <span>{b.area} m²</span>
                                </div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
}

