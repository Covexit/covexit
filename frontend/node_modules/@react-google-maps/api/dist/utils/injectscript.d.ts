interface InjectScriptArg {
    url: string;
    id: string;
}
export declare const injectScript: ({ url, id }: InjectScriptArg) => Promise<any>;
export {};
