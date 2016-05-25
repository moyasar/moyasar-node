import Payment from './payment.js';
import Invoice from './invoice.js';
import fs from 'fs';

export default class Moyasar {
    constructor(apiKey){
        this.apiKey = apiKey;
        let config = JSON.parse(fs.readFileSync('./request.config.json'));
        let baseUrl = config.hostname + config.namespace
        this.payment = new Payment(apiKey,baseUrl);
        this.invoice = new Invoice(apiKey,baseUrl);
    }
}
