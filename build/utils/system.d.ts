export declare function unixTimeStampNow(): number;
export declare function createSlug(name: string): string;
export declare function unslug(slug: string, capitalize?: boolean): string;
export declare function strEnum<T extends string>(o: Array<T>): {
    [K in T]: K;
};
