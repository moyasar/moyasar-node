import Service from './service.js';

export default class extends Service {
    fetchAll(page = 1,per = 20){
        if (per < 1 || per > 100)
            throw new Error('Per must be between 1 and 100');
        return this.sendRequest(`payments?page=${page}&per=${per}`,'GET').then(res=>{
            return res.payments;
        });
    }

    fetch(id){
        return this.sendRequest('payments/'+id);
    }

    refund(receipt){
        let id;
        if (typeof receipt == "object" && receipt.id)
            id = receipt.id;
        else if (typeof receipt == "string")
            id = receipt;
        else 
            throw new Error("Please provide a valid payment object or payment id");
        
        return this.sendRequest('payments/'+id+'/refund','POST');
        
    }
    
    attachSource(source){
        this.source = source;
        this.source.number = String(this.source.number);
    }

    pay(receipt, source){
        source.number = String(source.number);
        receipt.source = source;
        return this.sendRequest('payments','POST',receipt).then(res=>{
            return res;
        })
    }
}
