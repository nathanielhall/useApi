import { Response, RequestError } from './types';
declare type Query = <T>(url: string, body?: any) => Promise<Response<T>>;
declare type UseApi<T> = [
    {
        get: Query;
        post: Query;
        patch: Query;
        put: Query;
        delete: Query;
        loading: boolean;
        error: RequestError | undefined;
        abort: () => void;
    },
    Response<T> | undefined
];
export declare const useApi: <T>(url?: string) => UseApi<T>;
