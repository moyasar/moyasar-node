# moyasar-javascript
Moyasar Javascript wrapper lib

## Getting Started

### Setup Keys
```javascript

var Moyasar = require('moyasar-javascript');

var moyasar = new Moyasar.default('API KEY');


```

### Using payment gateway
#### Fetching payments
```javascript

moyasar.payment.fetchAll().then(function(paymentsList){
    // Your logic
});


moyasar.payment.fetch(id).then(function(payment){
    // Your logic
});

```


#### Making payment
```javascript

moyasar.payment.attachSource({
     type:'creditcard',
     name:'Abdulaziz Nasser',
     number:4111111111111111,
     cvc:331,
     month:12,
     year:2017
});

moyasar.payment.pay({
    amount:300,
    currency:"SAR",
    description: "EXAMPLE"
    }).then(function(payment){
    // Your Logic
        });

```


#### Refund a payment (Not supported yet)
```javascript

moyasar.payment.refund(id).then(function(payment){
    // Your logic
        });
// OR
moyasar.payment.refund(paymentObject).then(function(payment){
    // Your logic
        });

```


### Using invoices gateway
#### Fetching invoices
```javascript

moyasar.invoice.fetchAll().then(function(invoicesList){
    // Your logic
});


moyasar.invoice.fetch(id).then(function(invoice){
    // Your logic
});

```

#### Creating invoice
```javascript

moyasar.invoice.create({
     amount:60000,
     currency:"SAR",
     description:"kindle paperwhite"
  }).then(invoice=>{
    // Your logic
  });


```
