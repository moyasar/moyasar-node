import assert from 'assert';
import {moyasar, fakeServer, basicAuth} from './helpers';

describe('Payment API', () => {

  it('Get All Payments', done => {
    fakeServer.get('/payments?page=1&per=20').basicAuth(basicAuth).reply(200, {
      "payments": [
        {
          "id": "04b1ff8a-03c6-5ab2-889b-4d264fda0853",
          "status": "authorized",
          "amount": 26174,
          "fee": 637,
          "currency": "SAR",
          "refunded": 0,
          "refunded_at": null,
          "description": null,
          "amount_format": "261.74 SAR",
          "fee_format": "6.37 SAR",
          "invoice_id": null,
          "ip": null,
          "created_at": "2016-03-21T19:20:42.000Z",
          "updated_at": "2016-03-21T19:20:44.614Z",
          "source": {
            "type": "sadad",
            "username": "sadad35",
            "error_code": null,
            "message": null,
            "transaction_url": "http://api.moyasar.com/v1/sadad/redirect"
          }
        }, {
          "id": "48ca549c-da12-5e5a-b758-e59003992024",
          "status": "authorized",
          "amount": 35374,
          "fee": 3388,
          "currency": "SAR",
          "refunded": 0,
          "refunded_at": null,
          "description": null,
          "amount_format": "353.74 SAR",
          "fee_format": "33.88 SAR",
          "invoice_id": null,
          "ip": null,
          "created_at": "2016-03-20T19:20:42.000Z",
          "updated_at": "2016-03-21T19:20:44.614Z",
          "source": {
            "type": "creditcard",
            "company": "visa",
            "name": "Hazim Saleh",
            "number": "XXXX-XXXX-XXXX-8431",
            "message": null
          }
        }
      ],
      "meta": {
        "current_page": 1,
        "next_page": 2,
        "prev_page": null,
        "total_pages": 51,
        "total_count": 1001
      }
    })

    moyasar.payment.list().then(payments => {
      assert.equal(Array.isArray(payments), true);
      done();
    });
  });

  it('Make a payment', done => {
    fakeServer.post('/payments').basicAuth(basicAuth).reply(200, {
      "id": "27607a32-c968-40f3-9eb9-7838d906f791",
      "status": "paid",
      "amount": 7000,
      "fee": 0,
      "currency": "SAR",
      "refunded": 0,
      "refunded_at": null,
      "description": "bag payment",
      "amount_format": "70.00 SAR",
      "fee_format": "0.00 SAR",
      "invoice_id": null,
      "ip": null,
      "created_at": "2016-03-21T19:25:35.093Z",
      "updated_at": "2016-03-21T19:25:35.093Z",
      "source": {
        "type": "creditcard",
        "company": "visa",
        "name": "Abdulaziz Nasser",
        "number": "XXXX-XXXX-XXXX-1111",
        "message": null
      }
    });
    moyasar.payment.create({
      amount: 7000,
      currency: 'SAR',
      description: 'bag payment',
      source: {
        type: "creditcard",
        company: "visa",
        name: "Abdulaziz Nasser",
        number: "XXXX-XXXX-XXXX-1111",
        message: null
      }
    }).then(p => {
      assert.ok(p.id);
      done();
    });

  });

  it('Retreive a payment ', done => {
    fakeServer.get('/payments/d256ac99-ada1-5ef3-ab00-8e837b54ad5f').basicAuth(basicAuth).reply(200, {
      "id": "d256ac99-ada1-5ef3-ab00-8e837b54ad5f",
      "status": "paid",
      "amount": 23097,
      "fee": 0,
      "currency": "SAR",
      "refunded": 0,
      "refunded_at": null,
      "description": null,
      "amount_format": "230.97 SAR",
      "fee_format": "0.00 SAR",
      "invoice_id": "495e3cfd-abe1-5c48-bb05-aeb009548830",
      "ip": null,
      "created_at": "2016-03-21T19:25:35.093Z",
      "updated_at": "2016-03-21T19:25:35.093Z",
      "source": {
        "type": "creditcard",
        "company": "visa",
        "name": "Abdulaziz AlShetwi",
        "number": "XXXX-XXXX-XXXX-1111",
        "message": null
      }
    })
    moyasar.payment.fetch("d256ac99-ada1-5ef3-ab00-8e837b54ad5f").then(p => {
      assert(p.id);
      done();
    });
  });

  it('Retreive a payment and refund it', done => {
    fakeServer.get('/payments/d256ac99-ada1-5ef3-ab00-8e837b54ad5f').basicAuth(basicAuth).reply(200, {
      "id": "d256ac99-ada1-5ef3-ab00-8e837b54ad5f",
      "status": "paid",
      "amount": 23097,
      "fee": 0,
      "currency": "SAR",
      "refunded": 0,
      "refunded_at": null,
      "description": null,
      "amount_format": "230.97 SAR",
      "fee_format": "0.00 SAR",
      "invoice_id": "495e3cfd-abe1-5c48-bb05-aeb009548830",
      "ip": null,
      "created_at": "2016-03-21T19:25:35.093Z",
      "updated_at": "2016-03-21T19:25:35.093Z",
      "source": {
        "type": "creditcard",
        "company": "visa",
        "name": "Abdulaziz AlShetwi",
        "number": "XXXX-XXXX-XXXX-1111",
        "message": null
      }
    });
    fakeServer.post('/payments/d256ac99-ada1-5ef3-ab00-8e837b54ad5f/refund').basicAuth(basicAuth).reply(200, {
      id: '0ef3c537-9266-4433-a6be-4a8ffc5cdea4',
      status: 'refunded',
      amount: 300,
      fee: 0,
      currency: 'SAR',
      refunded: 300,
      refunded_at: '2016-06-25T22:09:52.467Z',
      description: null,
      amount_format: '3.00 SAR',
      fee_format: '0.00 SAR',
      invoice_id: null,
      ip: '',
      created_at: '2016-06-25T21:36:47.972Z',
      updated_at: '2016-06-25T22:09:52.468Z',
      source: {
        type: 'creditcard',
        company: 'visa',
        name: 'Abdulaziz Nasser',
        number: 'XXXX-XXXX-XXXX-1111',
        message: 'Succeeded!'
      }
    });
    moyasar.payment.fetch("d256ac99-ada1-5ef3-ab00-8e837b54ad5f").then(p => {
      return moyasar.payment.refund(p).then(r => {
        assert(r.id);
        assert(r.refunded); // not zero
        done();
        return r;
      });
    })
  })

});
