import 'isomorphic-fetch';
import { v4 } from 'uuid';
import { IApiErrorResponse, Dictionary, Continuator, IRequestActionOptions } from './models';
import { ignoreContinuator, allowContinuator } from './continuator';

const defaultRequestActionOptions: IRequestActionOptions = {
    url: '',
    jsonResponseExpected: true,
    actionName: '',
    responsePayloadMapper: payload => payload,
    errorPayloadMapper: error => error
};

export class Fetcher {
    private readonly init: RequestInit = {
        mode: 'cors',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    private allRequests: Dictionary<boolean> = {};
    private temporaryRequests: Dictionary<boolean> = {};

    private shouldIgnoreResponse = (id: string): Continuator => this.allRequests[id] ? ignoreContinuator : allowContinuator;

    public ignoreRequest(requestId: string) {
        if (this.allRequests.hasOwnProperty(requestId)) {
            this.allRequests[requestId] = true;
        }
    }

    public ignoreTemporaryRequests = () => Object.keys(this.temporaryRequests).forEach(key => {
        this.ignoreRequest(key);
        this.removeTempRequest(key);
    })

    private removeRequest = (id: string) => delete this.allRequests[id];

    private removeTempRequest = (id: string) => delete this.temporaryRequests[id];

    public fetch(url: RequestInfo, requestInit?: RequestInit) {
        const init = { ...this.init, ...requestInit };
        return fetch(url, init);
    }

    public handleRequestAction(
        dispatch: any,
        options: IRequestActionOptions,
        surviveTransition: boolean = false,
        requestId: string = v4()
    ): Promise<any> {
        options = { ...defaultRequestActionOptions, ...options };
        const init = { ...this.init, ...options.requestInit };

        this.allRequests[requestId] = false;

        if (!surviveTransition) {
            this.temporaryRequests[requestId] = false;
        }

        const requestAction = `${options.actionName}_REQUEST`;
        const responseAction = `${options.actionName}_RESPONSE`;
        const errorAction = `${options.actionName}_ERROR`;

        dispatch({
            type: requestAction,
            payload: options.actionPayload
        });

        const successResolver = (response: Response): Promise<any> => {
            if (response.ok) {
                let responsePayload = null;

                response.json().then(jsonResponse => responsePayload = jsonResponse).catch(err => responsePayload = null);

                dispatch({
                    type: responseAction,
                    payload: options.responsePayloadMapper(responsePayload)
                });

                return Promise.resolve(responsePayload);
            } else {
                let payload = { status: response.status, body: null };
                return (
                    response.json()
                        .then(errorResponse => payload = { ...payload, body: errorResponse })
                        .then(resp => Promise.reject(payload)).catch(err => Promise.reject(payload))
                );
            }
        };

        const errorResolver = (error): Promise<any> => {
            this.removeRequest(requestId);
            if (error === null) {
                return null;
            }
            const payload = error.status !== undefined && error.body !== undefined && error || null;

            dispatch({
                type: errorAction,
                payload: options.errorPayloadMapper(payload)
            });
            return Promise.reject(error);
        };

        return (
            fetch(options.url, init)
                .then(resp => {
                    const continuator = this.shouldIgnoreResponse(requestId);
                    this.removeRequest(requestId);
                    return continuator(resp);
                })
                .then(successResolver)
                .catch(errorResolver)
        );
    }
}

export const fetcher = new Fetcher();
