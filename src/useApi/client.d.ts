import { RequestConfig, Response, RequestError } from './types';
export declare const client: {
    actions: {
        cancel: () => void;
        isCancel: (error: RequestError) => boolean;
    };
    request: <T = any>(config: RequestConfig) => Promise<Response<T>>;
    get: <T_1>(url: string) => Promise<Response<T_1>>;
    post: (url: string, data: any) => Promise<Response<any>>;
    put: (url: string, data: any) => Promise<Response<any>>;
    delete: (url: string, data: any) => Promise<Response<any>>;
    patch: (url: string, data: any) => Promise<Response<any>>;
};
