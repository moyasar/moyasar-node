import request from 'request-promise';

export default class {
    constructor(apiKey,baseUrl){
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    sendRequest(subUrl, verb, obj){

        let options =
            {
                url: this.baseUrl + subUrl,
                method: verb,
                auth: {
                    user: this.apiKey
                },
                json:obj?obj:{}
            };

            return request(options);
    }
}
