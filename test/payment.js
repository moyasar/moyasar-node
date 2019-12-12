import assert from 'assert';
import {moyasar, fakeServer, basicAuth} from './helpers';

describe('Payment API', () => {

  it('Get All Payments', done => {
    fakeServer.get('/payments').query(true).basicAuth(basicAuth).reply(200, {
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
      fakeServer.isDone();
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
      fakeServer.isDone();
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
      id: 'd256ac99-ada1-5ef3-ab00-8e837b54ad5f',
      status: 'refunded',
      amount: 23097,
      fee: 0,
      currency: "SAR",
      refunded: 300,
      refunded_at: '2016-06-25T22:09:52.467Z',
      description: null,
      amount_format: "230.97 SAR",
      fee_format: "0.00 SAR",
      invoice_id: "495e3cfd-abe1-5c48-bb05-aeb009548830",
      ip: null,
      created_at: "2016-03-21T19:25:35.093Z",
      updated_at: "2016-03-21T19:25:35.093Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "Abdulaziz AlShetwi",
        number: "XXXX-XXXX-XXXX-1111",
        message: null
      }
    });
    moyasar.payment.fetch("d256ac99-ada1-5ef3-ab00-8e837b54ad5f").then(p => {
      return moyasar.payment.refund(p).then(r => {
        assert(r.id);
        assert(r.refunded); // not zero
        done();
        fakeServer.isDone();
        return r;
      });
    })
  })

  it('Retreive a payment and refund it partially', done => {
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
    fakeServer.post('/payments/d256ac99-ada1-5ef3-ab00-8e837b54ad5f/refund', { amount: 300 }).basicAuth(basicAuth).reply(200, {
      id: 'd256ac99-ada1-5ef3-ab00-8e837b54ad5f',
      status: 'refunded',
      amount: 23097,
      fee: 0,
      currency: "SAR",
      refunded: 300,
      refunded_at: '2016-06-25T22:09:52.467Z',
      description: null,
      amount_format: "230.97 SAR",
      fee_format: "0.00 SAR",
      invoice_id: "495e3cfd-abe1-5c48-bb05-aeb009548830",
      ip: null,
      created_at: "2016-03-21T19:25:35.093Z",
      updated_at: "2016-03-21T19:25:35.093Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "Abdulaziz AlShetwi",
        number: "XXXX-XXXX-XXXX-1111",
        message: null
      }
    });
    moyasar.payment.fetch("d256ac99-ada1-5ef3-ab00-8e837b54ad5f").then(p => {
      return moyasar.payment.refund(p, { amount: 300 }).then(r => {
        assert(r.id);
        assert(r.refunded); // not zero
        done();
        fakeServer.isDone();
        return r;
      });
    })
  })

  it('Fetch and update payment', done => {
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
    fakeServer.put('/payments/d256ac99-ada1-5ef3-ab00-8e837b54ad5f').basicAuth(basicAuth).reply(200, {
      id: 'd256ac99-ada1-5ef3-ab00-8e837b54ad5f',
      status: 'refunded',
      amount: 50000,
      fee: 0,
      currency: "SAR",
      refunded: 300,
      refunded_at: '2016-06-25T22:09:52.467Z',
      description: "new description",
      amount_format: "230.97 SAR",
      fee_format: "0.00 SAR",
      invoice_id: "495e3cfd-abe1-5c48-bb05-aeb009548830",
      ip: null,
      created_at: "2016-03-21T19:25:35.093Z",
      updated_at: "2016-03-21T19:25:35.093Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "Abdulaziz AlShetwi",
        number: "XXXX-XXXX-XXXX-1111",
        message: null
      }
    });
    moyasar.payment.fetch("d256ac99-ada1-5ef3-ab00-8e837b54ad5f").then(p => {
      return moyasar.payment.update({id: p.id, description: "new description"}).then(r => {
        assert(r.id);
        assert.notEqual(r.amount, p.amount); // not zero
        done();
        fakeServer.isDone();
        return r;
      });
    })
  })

  it('Throw error when fetch and update payment without id', done => {
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
    fakeServer.put('/payments/d256ac99-ada1-5ef3-ab00-8e837b54ad5f').basicAuth(basicAuth).reply(200, {
      id: 'd256ac99-ada1-5ef3-ab00-8e837b54ad5f',
      status: 'refunded',
      amount: 50000,
      fee: 0,
      currency: "SAR",
      refunded: 300,
      refunded_at: '2016-06-25T22:09:52.467Z',
      description: null,
      amount_format: "230.97 SAR",
      fee_format: "0.00 SAR",
      invoice_id: "495e3cfd-abe1-5c48-bb05-aeb009548830",
      ip: null,
      created_at: "2016-03-21T19:25:35.093Z",
      updated_at: "2016-03-21T19:25:35.093Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "Abdulaziz AlShetwi",
        number: "XXXX-XXXX-XXXX-1111",
        message: null
      }
    });
    moyasar.payment.fetch("d256ac99-ada1-5ef3-ab00-8e837b54ad5f").then(p => {

      assert.throws(() => {
        moyasar.payment.update({description: "new description"})
      }, Error);
      done();
      fakeServer.isDone();
    })
  })

  it('Fetch and capture payment', done => {
    fakeServer.get('/payments/c66b4f66-9c85-4173-9ef5-797c31553174').basicAuth(basicAuth).reply(200, {
      "id": "c66b4f66-9c85-4173-9ef5-797c31553174",
      "status": "authorized",
      "amount": 800,
      "fee": 0,
      "currency": "SAR",
      "refunded": 0,
      "refunded_at": null,
      "captured": 0,
      "captured_at": null,
      "voided_at": null,
      "description": null,
      "amount_format": "8.00 SAR",
      "fee_format": "0.00 SAR",
      "refunded_format": "0.00 SAR",
      "captured_format": "0.00 SAR",
      "invoice_id": null,
      "ip": null,
      "callback_url": "https://www.example.com/site/payment_callback",
      "created_at": "2019-12-12T07:21:27.309Z",
      "updated_at": "2019-12-12T07:21:45.345Z",
      "source": {
        "type": "creditcard",
        "company": "visa",
        "name": "authcapt test",
        "number": "XXXX-XXXX-XXXX-1111",
        "message": "Succeeded!",
        "transaction_url": "https://api.moyasar.com/v1/transaction_auths/5d76f380-4062-4ba3-86e2-7034fa5899a1/form"
      }
    });
    fakeServer.post('/payments/c66b4f66-9c85-4173-9ef5-797c31553174/capture').basicAuth(basicAuth).reply(200, {
      id: "c66b4f66-9c85-4173-9ef5-797c31553174",
      status: "captured",
      amount: 800,
      fee: 0,
      currency: "SAR",
      refunded: 0,
      refunded_at: null,
      captured: 800,
      captured_at: "2019-12-12T07:23:47.839Z",
      voided_at: null,
      description: null,
      amount_format: "8.00 SAR",
      fee_format: "0.00 SAR",
      refunded_format: "0.00 SAR",
      captured_format: "8.00 SAR",
      invoice_id: null,
      ip: null,
      callback_url: "https://www.example.com/site/payment_callback",
      created_at: "2019-12-12T07:21:27.309Z",
      updated_at: "2019-12-12T07:23:47.841Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "authcapt test",
        number: "XXXX-XXXX-XXXX-1111",
        message: "Succeeded!",
        transaction_url: "https://api.moyasar.com/v1/transaction_auths/5d76f380-4062-4ba3-86e2-7034fa5899a1/form"
      }
    });
    moyasar.payment.fetch("c66b4f66-9c85-4173-9ef5-797c31553174").then(p => {
      return moyasar.payment.capture(p).then(r => {
        assert(r.id);
        assert(r.captured); // not zero
        done();
        fakeServer.isDone();
        return r;
      });
    })
  })

  it('Fetch and capture payment partially', done => {
    fakeServer.get('/payments/c66b4f66-9c85-4173-9ef5-797c31553174').basicAuth(basicAuth).reply(200, {
      "id": "c66b4f66-9c85-4173-9ef5-797c31553174",
      "status": "authorized",
      "amount": 800,
      "fee": 0,
      "currency": "SAR",
      "refunded": 0,
      "refunded_at": null,
      "captured": 0,
      "captured_at": null,
      "voided_at": null,
      "description": null,
      "amount_format": "8.00 SAR",
      "fee_format": "0.00 SAR",
      "refunded_format": "0.00 SAR",
      "captured_format": "0.00 SAR",
      "invoice_id": null,
      "ip": null,
      "callback_url": "https://www.example.com/site/payment_callback",
      "created_at": "2019-12-12T07:21:27.309Z",
      "updated_at": "2019-12-12T07:21:45.345Z",
      "source": {
        "type": "creditcard",
        "company": "visa",
        "name": "authcapt test",
        "number": "XXXX-XXXX-XXXX-1111",
        "message": "Succeeded!",
        "transaction_url": "https://api.moyasar.com/v1/transaction_auths/5d76f380-4062-4ba3-86e2-7034fa5899a1/form"
      }
    });
    fakeServer.post('/payments/c66b4f66-9c85-4173-9ef5-797c31553174/capture').basicAuth(basicAuth).reply(200, {
      id: "c66b4f66-9c85-4173-9ef5-797c31553174",
      status: "captured",
      amount: 800,
      fee: 0,
      currency: "SAR",
      refunded: 0,
      refunded_at: null,
      captured: 500,
      captured_at: "2019-12-12T07:23:47.839Z",
      voided_at: null,
      description: null,
      amount_format: "8.00 SAR",
      fee_format: "0.00 SAR",
      refunded_format: "0.00 SAR",
      captured_format: "5.00 SAR",
      invoice_id: null,
      ip: null,
      callback_url: "https://www.example.com/site/payment_callback",
      created_at: "2019-12-12T07:21:27.309Z",
      updated_at: "2019-12-12T07:23:47.841Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "authcapt test",
        number: "XXXX-XXXX-XXXX-1111",
        message: "Succeeded!",
        transaction_url: "https://api.moyasar.com/v1/transaction_auths/5d76f380-4062-4ba3-86e2-7034fa5899a1/form"
      }
    });
    moyasar.payment.fetch("c66b4f66-9c85-4173-9ef5-797c31553174").then(p => {
      return moyasar.payment.capture(p, { amount: 500 }).then(r => {
        assert(r.id);
        assert(r.captured); // not zero
        done();
        fakeServer.isDone();
        return r;
      });
    })
  })

  it('Fetch and void payment', done => {
    fakeServer.get('/payments/c66b4f66-9c85-4173-9ef5-797c31553174').basicAuth(basicAuth).reply(200, {
      "id": "c66b4f66-9c85-4173-9ef5-797c31553174",
      "status": "captured",
      "amount": 800,
      "fee": 0,
      "currency": "SAR",
      "refunded": 0,
      "refunded_at": null,
      "captured": 800,
      "captured_at": "2019-12-12T07:23:47.839Z",
      "voided_at": null,
      "description": null,
      "amount_format": "8.00 SAR",
      "fee_format": "0.00 SAR",
      "refunded_format": "0.00 SAR",
      "captured_format": "8.00 SAR",
      "invoice_id": null,
      "ip": null,
      "callback_url": "https://www.example.com/site/payment_callback",
      "created_at": "2019-12-12T07:21:27.309Z",
      "updated_at": "2019-12-12T07:21:45.345Z",
      "source": {
        "type": "creditcard",
        "company": "visa",
        "name": "authcapt test",
        "number": "XXXX-XXXX-XXXX-1111",
        "message": "Succeeded!",
        "transaction_url": "https://api.moyasar.com/v1/transaction_auths/5d76f380-4062-4ba3-86e2-7034fa5899a1/form"
      }
    });
    fakeServer.post('/payments/c66b4f66-9c85-4173-9ef5-797c31553174/void').basicAuth(basicAuth).reply(200, {
      id: "c66b4f66-9c85-4173-9ef5-797c31553174",
      status: "voided",
      amount: 800,
      fee: 0,
      currency: "SAR",
      refunded: 0,
      refunded_at: null,
      captured: 800,
      captured_at: "2019-12-12T07:23:47.839Z",
      voided_at: "2019-12-12T07:35:47.409Z",
      description: null,
      amount_format: "8.00 SAR",
      fee_format: "0.00 SAR",
      refunded_format: "0.00 SAR",
      captured_format: "8.00 SAR",
      invoice_id: null,
      ip: null,
      callback_url: "https://www.example.com/site/payment_callback",
      created_at: "2019-12-12T07:21:27.309Z",
      updated_at: "2019-12-12T07:23:47.841Z",
      source: {
        type: "creditcard",
        company: "visa",
        name: "authcapt test",
        number: "XXXX-XXXX-XXXX-1111",
        message: "Succeeded!",
        transaction_url: "https://api.moyasar.com/v1/transaction_auths/5d76f380-4062-4ba3-86e2-7034fa5899a1/form"
      }
    });
    moyasar.payment.fetch("c66b4f66-9c85-4173-9ef5-797c31553174").then(p => {
      return moyasar.payment.void(p).then(r => {
        assert(r.id);
        done();
        fakeServer.isDone();
        return r;
      });
    })
  })

});
