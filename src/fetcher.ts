import 'isomorphic-fetch';
import guidGen = require('uuid');
import { IApiErrorResponse, Dictionary, Continuator, IRequestActionOptions } from './models';
import { ignoreContinuator, allowContinuator } from './continuator';

const defaultRequestActionOptions: IRequestActionOptions = {
    requestUrl: '',
    jsonResponseExpected: true,
    requestActionName: '',
    responseActionName: '',
    errorActionName: '',
    responsePayloadMapper: payload => payload,
    errorPayloadMapper: error => error
};

class Fetcher {
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

    public ignoreTemporaryRequests() {
        const keys = Object.keys(this.temporaryRequests);
        keys.forEach(key => {
            // za svaki temp request u dictionariju svih requestova postavi da se mora ubit
            this.ignoreRequest(key);
            this.removeTempRequest(key);
        });
    }

    private removeRequest(id: string) {
        delete this.allRequests[id];
    }

    private removeTempRequest(id: string) {
        delete this.temporaryRequests[id];
    }

    public fetch(url: RequestInfo, requestInit?: RequestInit) {
        const init = { ...this.init, ...requestInit };
        return fetch(url, init);
    }

    public handleRequestAction(
        dispatch: any,
        options: IRequestActionOptions,
        surviveTransition: boolean = false,  // svaki request ce biti ubijen na promjenu rute
        requestId: string = guidGen.v4()   // ako se ne preda izvana id, fetcher sam dodjeli jedan
    ): Promise<any> {
        options = { ...defaultRequestActionOptions, ...options };
        const init = { ...this.init, ...options.requestInit };

        this.allRequests[requestId] = false;

        // za sve koje ne zelimo da prezive tranziciju staviti u poseban dictionary
        if (!surviveTransition) {
            this.temporaryRequests[requestId] = false;
        }

        dispatch({
            type: options.requestActionName,
            payload: options.requestActionPayload
        });

        const successResolver = (response: Response): Promise<any> => {
            if (response.ok) {
                if (options.jsonResponseExpected) {
                    return response.json().then(jsonResponse => {
                        dispatch({
                            type: options.responseActionName,
                            payload: options.responsePayloadMapper(jsonResponse)
                        });
                        return Promise.resolve(jsonResponse);
                    });
                } else {
                    dispatch({
                        type: options.responseActionName,
                        payload: null
                    });
                    return Promise.resolve();
                }
            } else {
                let payload = { status: response.status, body: null };
                return response.json().then(errorResponse => {
                    payload = { ...payload, body: errorResponse };
                }).then(resp => {
                    return Promise.reject(payload);
                }).catch(err => Promise.reject(payload));
            }
        };

        const errorResolver = (error): Promise<any> => {
            this.removeRequest(requestId);
            if (error === null) {
                return null;
            }
            const payload = error.status !== undefined && error.body !== undefined && error || null;

            dispatch({
                type: options.errorActionName,
                payload: options.errorPayloadMapper(payload)
            });
            return Promise.reject(error);
        };

        // za sad kad se desi error to ne hvatamo, ignoriramo ga
        return fetch(options.requestUrl, init)
            .then(resp => {
                const continuator = this.shouldIgnoreResponse(requestId);
                this.removeRequest(requestId);
                return continuator(resp);
            })
            .then(successResolver)
            .catch(errorResolver);
    }
}

const fetcher = new Fetcher();

export default fetcher;
