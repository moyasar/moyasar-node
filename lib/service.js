import request from 'request-promise';

export default class {
    constructor(apiKey,baseUrl){
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    sendRequest(subUrl, obj){
        let options =
            {
                url: this.baseUrl + subUrl,
                method: "GET",
                auth: {
                    user: this.apiKey
                },
                json: obj
            };

        return request(options);
    }
}
