import { Reducer } from 'react';
import { ActionUnion, Response, RequestError } from './types';
export declare const FETCHING = "[api] Fetching";
export declare const SUCCESS = "[api] Success";
export declare const ERROR = "[api] Error";
export declare const Actions: {
    fetching: () => {
        readonly type: "[api] Fetching";
    };
    success: (response: Response) => {
        readonly type: "[api] Success";
        readonly payload: Response<any>;
    };
    error: (error: RequestError) => {
        readonly type: "[api] Error";
        readonly payload: RequestError;
    };
};
export declare type Actions = ActionUnion<typeof Actions>;
export declare type ApiState<T> = {
    response?: Response<T>;
    loading: boolean;
    error?: RequestError;
};
export declare const initialState: {
    response: undefined;
    loading: boolean;
    error: undefined;
};
export declare const reducer: Reducer<ApiState<any>, Actions>;
