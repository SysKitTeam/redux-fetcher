import { fetcher } from '../src/fetcher';
import * as $ from 'jquery';

/**
 * Dummy dispatch function that prints to console
 */
const dispatch = (obj: any) => {
    console.log('dispatching object: ', obj);
}

$(document).ready(() => {
    $('.btn').click(() => {
        console.log('clicked');

        // fetcher.fetch('http://martin-pc:7895/api/farms/discoveredFarms').then(resp => {
        //     resp.json().then(jsonResp => {
        //         console.log('response: ', jsonResp);
        //         $('.body_container').empty().text(jsonResp);
        //     });
        // });

        fetcher.handleRequestAction(dispatch, {
            actionName: 'FETCH_ACTION',
            url: 'http://martin-pc:7895/api/farms/discoveredFarms',
            jsonResponseExpected: true
        });
    });
});
