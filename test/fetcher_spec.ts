import 'isomorphic-fetch';
import * as sinon from 'sinon';
import { fetcher } from '../src/fetcher';

const _fetch = (url: string) => {
    const res = new Response('{"message": hello"}', {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    });

    return Promise.resolve(res);
}

let _fetcher_backup = window.fetch;

describe('fetcher tests', () => {
    // beforeAll(() => {
    //     if (!window) {
    //         var window: any = {};
    //         window.fetch = _fetch;
    //     } else if (!(window as Window).fetch) {
    //         (window as Window).fetch = _fetch;
    //     } else {
    //         // _fetcher_backup = (window as Window).fetch;
    //         (window as Window).fetch = _fetch;
    //     }
    // });

    // afterAll

    // beforeEach(() => {
    //     sinon.stub(window, 'fetch');
    // })

    // afterEach(() => {
    //     (window as any).fetch.restore();
    // })

    beforeEach(() => {
        if (!window) {
            var window: any = {};
            window.fetch = _fetch;
        } else if (!(window as Window).fetch) {
            (window as Window).fetch = _fetch;
        } else {
            // _fetcher_backup = (window as Window).fetch;
            (window as Window).fetch = _fetch;
        }
    });

    // afterEach(() => {
    //     window.fetch = _fetcher_backup;
    // });

    it('gives right response', () => {
        fetcher.fetch('/foobar').then(resp => {
            resp.json().then(jsonResp => {
                expect(jsonResp).toBe('bla')
            });
        })
    });

    // it('formats response correctly', () => {
    //     fetcher.fetch('/foobar').then(resp => expect(resp.status).toBe(200));
    // });

    // describe('stubbing response', () => {
    //     const res = new Response('{"message": hello"}', {
    //         status: 200,
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     });

    //     (window as any).fetch.returns(Promise.resolve(res));
    // });

    // it('formats response correctly', () =>
    //     fetcher.fetch('/foobar')
    //         .then((response) => expect(response.status).toBe(200)));



    // describe('fetcher', () => {
    //     it('formats response correctly', () => {
    //         fetcher.fetch('/foobar').then(resp => expect(resp.status).toBe(200));
    //     });

    //     it('gives right response', () => {
    //         fetcher.fetch('/foobar').then(resp => {
    //             resp.json().then(jsonResp => {
    //                 expect(jsonResp).toBe({
    //                     message: 'Hello'
    //                 })
    //             });
    //         })
    //     });
    // })
});
