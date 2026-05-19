"use client";

import { useEffect, useRef, useState } from "react";
import { Construction } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function DashboardPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (map.current) return;

        const loadMap = async () => {
            try {
                const mapboxgl = (await import("mapbox-gl")).default;

                const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

                if (!token) {
                    console.error('NEXT_PUBLIC_MAPBOX_TOKEN is not set');
                    if (mounted) setMapError(true);
                    return;
                }

                if (!mapContainer.current) {
                    console.error('Map container not available');
                    return;
                }

                // Wait a frame to ensure the container has dimensions after layout
                await new Promise((resolve) => requestAnimationFrame(resolve));

                if (!mounted || !mapContainer.current) return;

                mapContainer.current.innerHTML = '';

                mapboxgl.accessToken = token;

                map.current = new mapboxgl.Map({
                    container: mapContainer.current!,
                    style: "mapbox://styles/mapbox/light-v11",
                    center: [-0.1276, 51.5074], // London
                    zoom: 11,
                    attributionControl: false,
                });

                map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
                map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));

                map.current.on("load", () => {
                    if (mounted) {
                        map.current?.resize();
                        setMapLoaded(true);
                    }
                });

                map.current.on("error", (e) => {
                    console.error('Mapbox error:', e);
                });
            } catch (err) {
                console.error("Failed to load Mapbox:", err);
                if (mounted) setMapError(true);
            }
        };

        loadMap();

        return () => {
            mounted = false;
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    return (
        <div className="relative w-full" style={{ height: 'calc(100vh - 3.5rem)' }}>
            {/* Map container */}
            <div ref={mapContainer} className="absolute inset-0 z-0" />

            {/* WIP Banner */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full shadow-sm">
                    <Construction className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-700">
                        Dashboard — Work in Progress
                    </span>
                </div>
            </div>

            {/* Fallback when no Mapbox token */}
            {mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 z-20">
                    <div className="text-center space-y-4 max-w-md px-8">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                            <span className="text-3xl">🗺️</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-800">Map View</h3>
                        <p className="text-sm text-zinc-500">
                            Add your Mapbox access token to <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code> as <code className="bg-zinc-200 px-1.5 py-0.5 rounded text-xs font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> to enable the interactive map.
                        </p>
                    </div>
                </div>
            )}

            {/* Loading state */}
            {!mapLoaded && !mapError && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 z-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3" />
                        <p className="text-sm text-zinc-500">Loading map...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
