export interface IApiErrorResponse {
    message: string;
    exceptionMessage: string;
    exceptionType: string;
    stackTrace: string;
}

export type Dictionary<V> = {
    [key: string]: V
};

export type Continuator = (response: Response) => Promise<any>;

export interface IRequestActionOptions {
    url: string;
    actionName?: string;
    actionPayload?: any;
    requestInit?: RequestInit;
    jsonResponseExpected?: boolean;
    responsePayloadMapper?(payload: any);
    errorPayloadMapper?(error: IApiErrorResponse);
}
