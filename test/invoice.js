import assert from 'assert';
import fs from 'fs';
import Moyasar from './../src/moyasar.js';

let config = JSON.parse(fs.readFileSync('./test.config.json'));
describe('Invoice API',()=>{

    let moyasar = new Moyasar(config.ApiKey)

    it('Get all invoices',done=>{
        moyasar.invoice.list().then(invoice=>{
            assert(Array.isArray(invoice));
            done();
        });
    });

    it('Get an invoice',done=>{
        moyasar.invoice.fetch(config.test.invoiceId).then(invoice=>{
            assert(invoice.id);
            done();
        });
    });

    it('Create an invoice',done=>{
        moyasar.invoice.create({
            amount:60000,
            currency:"SAR",
            description:"kindle paperwhite"
        }).then(invoice=>{
            assert(invoice.id);
            done();
        });
    });
})

