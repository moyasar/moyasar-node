import fs from 'fs';
import request from 'request';

export default class Dispatcher {
    constructor(apiKey, baseUrl){
        this.baseUrl = this.baseUrl;
        this.apiKey = apiKey;
    }

    sendRequest(verb,url,data){
        let options =
            {
                url: 'https://api.moyasar.com/v1/payments',
                auth: {
                    user: 'aKQA6BLRHTdgT6AmXvuHRtxr'
                }
            };
    }
}
