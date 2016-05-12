import Payment from './payment.js';
import fs from 'fs';

export default class Moyasar {
    constructor(apiKey){
        this.apiKey = apiKey;
        let config = JSON.parse(fs.readFileSync('./request.config.json'));
        this.payment = new Payment(apiKey,config.hostname + config.namespace);
    }
}
