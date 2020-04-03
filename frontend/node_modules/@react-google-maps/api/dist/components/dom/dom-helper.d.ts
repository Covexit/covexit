/// <reference types="googlemaps" />
export declare function getOffsetOverride(containerElement: HTMLElement, getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
} | {};
export declare const getLayoutStyles: (mapCanvasProjection: google.maps.MapCanvasProjection, offset: {
    x: number;
    y: number;
}, bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral | undefined, position?: google.maps.LatLng | google.maps.LatLngLiteral | undefined) => {
    left: string;
    top: string;
    width?: string | undefined;
    height?: string | undefined;
};
