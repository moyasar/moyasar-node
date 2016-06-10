import Payment from './payment.js';
import Invoice from './invoice.js';

export default class Moyasar {
    constructor(apiKey){
        this.apiKey = apiKey;
        let config = {
            "hostname":"https://api.moyasar.com/",
            "namespace":"v1/"
        };
        let baseUrl = config.hostname + config.namespace
        this.payment = new Payment(apiKey,baseUrl);
        this.invoice = new Invoice(apiKey,baseUrl);
    }
}
