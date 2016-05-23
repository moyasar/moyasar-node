# moyasar-javascript
Moyasar Javascript wrapper lib

## Getting Started

### Setup Keys
```javascript

var Moyasar = require('moyasar-javascript');

var moyasar = new Moyasar('API KEY');

// OR

var moyasar = new (require('moyasar-javascript'))('API KEY');

```

### Using payment gateway
#### Fetching payments
```javascript

let options = {
    page: Number,
    per: Number
}

moyasar.payment.fetchAll(options.page, options.per).then(function(paymentsList){
    // Your logic
});


moyasar.payment.fetch(id).then(function(payment){
    // Your logic
});

```


#### Making payment
```javascript

var source = {
     type:'creditcard',
     name:'Abdulaziz Nasser',
     number:4111111111111111,
     cvc:331,
     month:12,
     year:2017
};

moyasar.payment.pay({
    amount:300,
    currency:"SAR",
    description: "EXAMPLE"
    },source).then(function(payment){
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

let options = {
    page: Number,
    per: Number
}

moyasar.invoice.fetchAll(options.page, options.per).then(function(invoicesList){
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
  }).then(function(invoice){
    // Your logic
});


```
