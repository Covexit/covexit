/// <reference types="googlemaps" />
import * as React from 'react';
export interface OverlayViewProps {
    mapPaneName: string;
    getPixelPositionOffset?: (offsetWidth: number, offsetHeight: number) => {
        x: number;
        y: number;
    };
    bounds?: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;
    position?: google.maps.LatLng | google.maps.LatLngLiteral;
    onLoad?: (overlayView: google.maps.OverlayView) => void;
    onUnmount?: (overlayView: google.maps.OverlayView) => void;
}
interface ContentMountHandlerProps {
    onLoad?: () => void;
}
declare class ContentMountHandler extends React.Component<ContentMountHandlerProps> {
    componentDidMount(): void;
    render(): React.ReactNode;
}
export default ContentMountHandler;
