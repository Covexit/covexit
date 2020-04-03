export interface LoadScriptUrlOptions {
    googleMapsApiKey?: string;
    googleMapsClientId?: string;
    version?: string;
    language?: string;
    region?: string;
    libraries?: string[];
    channel?: string;
}
export declare function makeLoadScriptUrl({ googleMapsApiKey, googleMapsClientId, version, language, region, libraries, channel, }: LoadScriptUrlOptions): string;
