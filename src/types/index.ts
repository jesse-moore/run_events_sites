import { Feature, LineString, Point, FeatureCollection } from 'geojson'

export interface MapBoxState {
    points?: FeatureCollection<Point>
    routePoints?: FeatureCollection<LineString>
    startPoint?: Marker
    endPoint?: Marker
}

export interface Marker extends Feature<Point> {
    properties: {
        type: string
        amenities: string
        id: string
    }
}
