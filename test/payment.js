import assert from 'assert';
import fs from 'fs';
import Moyasar from '../lib/moyasar.js';

let config = JSON.parse(fs.readFileSync('./test.config.json'));
describe('Payment API', ()=>{
    let moyasar = new Moyasar(config.ApiKey)
    it('Get All Payments',done=>{
        moyasar.payment.fetchAll().then(payments=>{
            assert.equal(Array.isArray(payments),true);
            done();
        })
    });
});
