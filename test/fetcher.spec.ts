// import 'isomorphic-fetch';
// import * as sinon from 'sinon';
// import { fetcher } from '../src/fetcher';

// describe('fetcher tests', () => {
//     beforeEach(() => {
//         sinon.stub(window, 'fetch');
//     });

//     describe('stubbing response', () => {
//         const res = new Response('{"message": hello"}', {
//             status: 200,
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         });

//         (window as any).fetch.returns(Promise.resolve(res));
//     });

//     it('formats response correctly', () =>
//         fetcher.fetch('/foobar')
//             .then((response) => expect(response.status).toBe(200)));
// });

const add = (x, y) => x + y;

describe('adding', () => {
    it('should add two numbers', () => {
        const result = add(1, 2);
        expect(result).toBe(3);
    });
});
