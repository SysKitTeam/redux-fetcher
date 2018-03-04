import 'isomorphic-fetch';
import * as helpers from './helpers';
import * as sinon from 'sinon';
import { fetcher } from '../src/fetcher';

describe('.fetch', () => {
    let stubedFetch;

    beforeEach(() => {
        stubedFetch = sinon.stub(window, 'fetch');
        console.log(stubedFetch);
    });

    afterEach(() => {
        (window as any).fetch.restore();
    });

    it('formats response correctly', () => {
        console.log('stubed fetch: ', stubedFetch);

        const res = new Response('{"hello":"world"}', {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        });

        stubedFetch.returns(Promise.resolve(res));

        fetcher.fetch('/foobar')
            .then(resp => resp.json())
            .then(jsonResp => {
                console.log(jsonResp);
                expect(jsonResp.hello).toBe('world');
            });
    });

    it('displays error', () => {
        stubedFetch.returns(helpers.jsonError(500, {
            exception: 'An exception occured'
        }));

        fetcher.fetch('/foobar').then(resp => {
            console.log(resp.status);
            expect(resp.status).toBe(500);
            return resp.json();
        }).then(json => {
            console.log('error: ', json);
        });
    });
});
