import assert from 'assert';
import fs from 'fs';
import Moyasar from '../src/moyasar.js';

let config = JSON.parse(fs.readFileSync('./test.config.json'));
describe('Payment API', ()=>{

    let moyasar = new Moyasar(config.ApiKey)

    it('Get All Payments',done=>{

        moyasar.payment.fetchAll().then(payments=>{
            assert.equal(Array.isArray(payments),true);
            done();
        });
    });


    it('Make a payment',done=>{

        done(); // Comment this line to run the test

        moyasar.payment.attachSource({
            type:'creditcard',
            name:'Abdulaziz Nasser',
            number:4111111111111111,
            cvc:331,
            month:12,
            year:2017
        });

        moyasar.payment.pay({
            amount:700,
            currency:'SAR',
            description: "'bag payment'"
        }).then(p=>{
            assert.ok(p.id);
            done();
        });

    });

    it('Retreive a payment',done=>{
        moyasar.payment.fetch(config.test.paymentId).then(p=>{
            assert(p.id);
            done();
        });
    });

    it('Retreive a payment and refund it',done=>{
        done(); // Comment this line to run the test
        moyasar.payment.fetch(config.test.paymentId).then(p=>{
            return moyasar.payment.refund(p).then(r=>{
                assert(r.id);
                done();
                return r;
            });
        })
    })

});
