import { Feature, LineString, FeatureCollection, Point } from 'geojson'
import mapboxgl, {
    GeoJSONSource,
    LngLatBounds,
    LngLatLike,
    Map,
} from 'mapbox-gl'
import { Marker, MapBoxState } from '../types'
import { onLoadHandler } from './onLoadHandler'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || ''

let map: Map | undefined
interface InitMapInterface {
    options: {
        center?: LngLatLike
        container: HTMLElement
        zoom?: number
        bounds?: LngLatBounds
    }
    state?: MapBoxState
}

export const initMap = ({ options, state }: InitMapInterface) => {
    if (map) return
    const { center = [0, 0], zoom = 10, container, bounds } = options

    map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
        bounds,
        fitBoundsOptions: {
            padding: 200,
        },
    })

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
    })

    map.on('mouseenter', 'points', function (e) {
        // Change the cursor style as a UI indicator.
        e.target.getCanvas().style.cursor = 'pointer'
        if (!e.features) return
        const coordinates = e.lngLat
        const feature = e.features[0].properties as Marker['properties']
        const { type, amenities } = feature
        let list = ''
        if (amenities) {
            const amenitiesList = amenities
                .split(',')
                .map((type) => {
                    return `<li>${type}</li>`
                })
                .join('')
            list = `<ul>${amenitiesList}</ul>`
        }

        const description = `<h3 class="text-lg">${type}</h3>${list}`

        popup.setLngLat(coordinates).setHTML(description).addTo(e.target)
    })

    map.on('mouseleave', 'points', function (e) {
        e.target.getCanvas().style.cursor = 'grab'
        popup.remove()
    })

    onLoadHandler(map, state)
    return map
}

export const setStartPoint = (marker: Marker) => {
    if (!map) return
    const pointSrc = map.getSource('startPoint') as GeoJSONSource
    if (!pointSrc) {
        map.once('load', (e) => {
            const pointSrc = e.target.getSource('startPoint') as GeoJSONSource
            if (!pointSrc) return
            pointSrc.setData({ type: 'FeatureCollection', features: [marker] })
        })
    } else {
        pointSrc.setData({ type: 'FeatureCollection', features: [marker] })
    }
}

export const setEndPoint = (marker: Marker) => {
    if (!map) return
    const pointSrc = map.getSource('endPoint') as GeoJSONSource
    if (!pointSrc) {
        map.once('load', (e) => {
            const pointSrc = e.target.getSource('endPoint') as GeoJSONSource
            if (!pointSrc) return
            pointSrc.setData({ type: 'FeatureCollection', features: [marker] })
        })
    } else {
        pointSrc.setData({ type: 'FeatureCollection', features: [marker] })
    }
}

export const setPoints = (points: FeatureCollection<Point>) => {
    if (!map) return
    const pointsSrc = map.getSource('points') as GeoJSONSource
    if (!pointsSrc) {
        map.once('load', (e) => {
            const pointsSrc = e.target.getSource('points') as GeoJSONSource
            if (!pointsSrc) return
            pointsSrc.setData(points)
        })
    } else {
        pointsSrc.setData(points)
    }
}

export const setRoutePoints = (routePoints: FeatureCollection<LineString>) => {
    if (!map) return
    const pointsSrc = map.getSource('route') as GeoJSONSource
    if (!pointsSrc) {
        map.once('load', (e) => {
            const pointsSrc = e.target.getSource('route') as GeoJSONSource
            if (!pointsSrc) return
            pointsSrc.setData(routePoints)
        })
    } else {
        pointsSrc.setData(routePoints)
    }
}

export const getBounds = (lineStringArr: Feature<LineString>[]) => {
    const coordinates: [number, number][] = []
    lineStringArr.forEach((feature) => {
        feature.geometry.coordinates.forEach((coord) => {
            const [lng, lat] = coord
            coordinates.push([lng, lat])
        })
    })
    const bounds = coordinates.reduce(function (bounds, position) {
        return bounds.extend(position)
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]))
    return bounds
}
export const isLoaded = (): boolean => {
    if (!map) return false
    return map.loaded()
}

export const setBounds = (bounds: mapboxgl.LngLatBounds) => {
    if (!map) return
    map.fitBounds(bounds, { padding: 200 })
}
