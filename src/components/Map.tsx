import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

import {
    initMap,
    getBounds,
    setPoints,
    setStartPoint,
    setEndPoint,
    setRoutePoints,
    setBounds,
} from '../mapbox-gl'
import { Route } from '../graphql/event'
import { Legend } from './Legend'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ''

export const Map = ({ route }: { route: Route }) => {
    const {
        points,
        route: routePoints,
        routeEndMarker,
        routeStartMarker,
    } = route
    const mapContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapContainer.current) return
        let bounds: mapboxgl.LngLatBounds | undefined = undefined
        if (routePoints.features.length) {
            bounds = getBounds(routePoints.features)
        }
        initMap({
            options: {
                center: [0, 0],
                container: mapContainer.current,
                zoom: 14,
                bounds,
            },
            state: {
                points,
                routePoints,
                startPoint: routeStartMarker || undefined,
                endPoint: routeEndMarker || undefined,
            },
        })
    }, [])

    useEffect(() => {
        setPoints(points)
        setRoutePoints(routePoints)
        if (routeStartMarker) setStartPoint(routeStartMarker)
        if (routeEndMarker) setEndPoint(routeEndMarker)
        let bounds: mapboxgl.LngLatBounds | undefined = undefined
        if (routePoints.features.length) {
            bounds = getBounds(routePoints.features)
            setBounds(bounds)
        }
    }, [route])

    return (
        <div className="relative mt-4">
            <div className="h-500 w-full relative">
                <div className="relative h-full w-full" ref={mapContainer} />
            </div>
            <Legend />
        </div>
    )
}
