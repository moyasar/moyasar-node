import Service from './service.js';

export default class extends Service {
    list(options = {page : 1,per : 20}){
        if (options.per < 1 || options.per > 100)
            throw new Error('Per must be between 1 and 100');
        return this.sendRequest(`payments?page=${options.page}&per=${options.per}`,'GET').then(res=>{
            return res.payments;
        });
    }

    fetch(id){
        return this.sendRequest('payments/'+id);
    }

    refund(receipt, option){
        let id;
        let params = {};
        if (typeof receipt == "object" && receipt.id)
            id = receipt.id;
        else if (typeof receipt == "string")
            id = receipt;
        else
            throw new Error("Please provide a valid payment object or payment id");
        if (option && option.amount) {
          if (!isNaN(parseFloat(option.amount)) && isFinite(option.amount)) {
            params = {
              amount: option.amount,
            };
          } else {
            throw new Error("Please provide a valid amount"); 
          }
        }
        return this.sendRequest('payments/'+id+'/refund','POST', params);

    }

    update(payment){
      if (typeof payment.id != "string") {
        throw new Error('Payment object does not have id');
      }
      return this.sendRequest('payments/'+ payment.id ,'PUT',payment).then(res=>{
          return res;
      })
    }

    capture(payment, option){
      let id;
      let params = {};
      if (typeof payment == "object" && payment.id)
        id = payment.id;
      else if (typeof payment == "string")
        id = payment;
      else
        throw new Error("Please provide a valid payment object or payment id");
      if (option && option.amount) {
        if (!isNaN(parseFloat(option.amount)) && isFinite(option.amount)) {
          params = {
            amount: option.amount,
          };
        } else {
          throw new Error("Please provide a valid amount"); 
        }
      }
      return this.sendRequest('payments/'+id+'/capture','POST', params);
    }

    void(payment){
      if (typeof payment.id != "string") {
        throw new Error('Payment object does not have id');
      }
      return this.sendRequest('payments/'+ payment.id +'/void','POST',payment).then(res=>{
        return res;
      })
    }
}
