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

            return request(options).catch(r=>{
                if (r.statusCode >= 400 && r.statusCode < 500)
                    {
                        if (r.error.errors)
                            console.error(...r.error.errors);
                        r.message = r.error.message;
                        throw r;
                    }
                else if (r.statusCode >= 500 && r.statusCode < 600)
                    {
                        let msg = '***** Please re-create the error and post it in issues page in SDK repository "https://github.com/moyasar/moyasar-node/issues  "';
                        r.message = `Problem in the server`;
                        console.error(msg);
                        throw r;
                    }
                else {
                    throw r;
                }
            });
    }
}
