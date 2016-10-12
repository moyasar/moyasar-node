import assert from 'assert';
import {moyasar, fakeServer, basicAuth} from './helpers';

describe('Invoice API', () => {

  it('Get all invoices', done => {
    fakeServer.get('/invoices').query(true).basicAuth(basicAuth).reply(200, {
      "invoices": [
        {
          "id": "37a54bed-7d54-444c-a151-c287106da514",
          "status": "initiated",
          "amount": 1500000,
          "currency": "SAR",
          "description": "Versace bag",
          "amount_format": "15,000.00 SAR",
          "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
          "created_at": "2016-04-06T21:45:18.866Z",
          "updated_at": "2016-04-06T21:45:18.866Z"
        }, {
          "id": "c74022ba-64c1-4167-8b2d-76add643824f",
          "status": "initiated",
          "amount": 1000,
          "currency": "SAR",
          "description": "Installation service ",
          "amount_format": "10.00 SAR",
          "url": "http://dashboard.moyasar.com/invoices/c74022ba-64c1-4167-8b2d-76add643824f",
          "created_at": "2016-04-06T21:36:13.351Z",
          "updated_at": "2016-04-06T21:36:13.351Z"
        }, {
          "id": "bf94263c-68d3-5ee8-8e00-ef563422ee85",
          "status": "paid",
          "amount": 179696,
          "currency": "SAR",
          "description": "Burberry scarf",
          "amount_format": "1796.96 SAR",
          "url": "http://dashboard.moyasar.com/invoices/bf94263c-68d3-5ee8-8e00-ef563422ee85",
          "created_at": "2016-04-06T16:19:57.000Z",
          "updated_at": "2016-04-06T16:19:57.000Z"
        }
      ]
    });

    moyasar.invoice.list().then(invoice => {
      assert(Array.isArray(invoice));
      done();
      fakeServer.isDone();
    });
  });

  it('Get an invoice', done => {
    fakeServer.get('/invoices/37a54bed-7d54-444c-a151-c287106da514').basicAuth(basicAuth).reply(200, {
      "id": "37a54bed-7d54-444c-a151-c287106da514",
      "status": "initiated",
      "amount": 60000,
      "status": "initiated",
      "currency": "SAR",
      "description": "kindle paperwhite",
      "logo_url": "https://api.moyasar.com/system/entities/logos/1a0/f5e/12-/original/data?1460010062",
      "amount_format": "600.00 SAR",
      "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
      "created_at": "2016-04-06T21:45:18.866Z",
      "updated_at": "2016-04-06T21:45:18.866Z",
      "payments": []
    });
    moyasar.invoice.fetch('37a54bed-7d54-444c-a151-c287106da514').then(invoice => {
      assert(invoice.id);
      done();
      fakeServer.isDone();
    });
  });

  it('Create an invoice', done => {
    fakeServer.post('/invoices').basicAuth(basicAuth).reply(200, {
      "id": "37a54bed-7d54-444c-a151-c287106da514",
      "status": "initiated",
      "amount": 60000,
      "currency": "SAR",
      "description": "kindle paperwhite",
      "logo_url": "https://api.moyasar.com/system/entities/logos/1a0/f5e/12-/original/data?1460010062",
      "amount_format": "600.00 SAR",
      "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
      "created_at": "2016-04-06T21:45:18.866Z",
      "updated_at": "2016-04-06T21:45:18.866Z",
      "payments": []
    });
    moyasar.invoice.create({amount: 60000, currency: "SAR", description: "kindle paperwhite"}).then(invoice => {
      assert(invoice.id);
      done();
      fakeServer.isDone();
    });
  });

  it('Update an invoice with get', done => {
    fakeServer.get('/invoices/37a54bed-7d54-444c-a151-c287106da514').basicAuth(basicAuth).reply(200, {
      "id": "37a54bed-7d54-444c-a151-c287106da514",
      "status": "initiated",
      "amount": 60000,
      "status": "initiated",
      "currency": "SAR",
      "description": "kindle paperwhite",
      "logo_url": "https://api.moyasar.com/system/entities/logos/1a0/f5e/12-/original/data?1460010062",
      "amount_format": "600.00 SAR",
      "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
      "created_at": "2016-04-06T21:45:18.866Z",
      "updated_at": "2016-04-06T21:45:18.866Z",
      "payments": []
    });
    fakeServer.put('/invoices/37a54bed-7d54-444c-a151-c287106da514').basicAuth(basicAuth).reply(200, {
      "id": "37a54bed-7d54-444c-a151-c287106da514",
      "status": "initiated",
      "amount": 20000,
      "status": "initiated",
      "currency": "SAR",
      "description": "new description",
      "logo_url": "https://api.moyasar.com/system/entities/logos/1a0/f5e/12-/original/data?1460010062",
      "amount_format": "600.00 SAR",
      "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
      "created_at": "2016-04-06T21:45:18.866Z",
      "updated_at": "2016-04-06T21:45:18.866Z",
      "payments": []
    });
    moyasar.invoice.fetch('37a54bed-7d54-444c-a151-c287106da514').then(invoice => {
      moyasar.invoice.update({
        id: invoice.id,
        description: "new description",
      }).then(newInvoice => {
        assert.equal(newInvoice.description, "new description");
        done();
        fakeServer.isDone();
      });
    });
  });

  it('Throw error when update an invoice without id and with get', done => {
    fakeServer.get('/invoices/37a54bed-7d54-444c-a151-c287106da514').basicAuth(basicAuth).reply(200, {
      "id": "37a54bed-7d54-444c-a151-c287106da514",
      "status": "initiated",
      "amount": 60000,
      "status": "initiated",
      "currency": "SAR",
      "description": "kindle paperwhite",
      "logo_url": "https://api.moyasar.com/system/entities/logos/1a0/f5e/12-/original/data?1460010062",
      "amount_format": "600.00 SAR",
      "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
      "created_at": "2016-04-06T21:45:18.866Z",
      "updated_at": "2016-04-06T21:45:18.866Z",
      "payments": []
    });
    fakeServer.put('/invoices/37a54bed-7d54-444c-a151-c287106da514').basicAuth(basicAuth).reply(200, {
      "id": "37a54bed-7d54-444c-a151-c287106da514",
      "status": "initiated",
      "amount": 20000,
      "status": "initiated",
      "currency": "SAR",
      "description": "new description",
      "logo_url": "https://api.moyasar.com/system/entities/logos/1a0/f5e/12-/original/data?1460010062",
      "amount_format": "600.00 SAR",
      "url": "http://dashboard.moyasar.com/invoices/37a54bed-7d54-444c-a151-c287106da514",
      "created_at": "2016-04-06T21:45:18.866Z",
      "updated_at": "2016-04-06T21:45:18.866Z",
      "payments": []
    });
    moyasar.invoice.fetch('37a54bed-7d54-444c-a151-c287106da514').then(invoice => {
      assert.throws(() => {
        moyasar.invoice.update({
          description: "new description",
        });
      }, Error);
      done();
      fakeServer.isDone();
    });
  })
})
