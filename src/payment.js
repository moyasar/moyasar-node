import Service from './service.js';

export default class extends Service {
    fetchAll(){
        return this.sendRequest('payments','GET').then(res=>{
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

    pay(receipt){
        receipt.source = this.source;
        return this.sendRequest('payments','POST',receipt).then(res=>{
            return res;
        })
    }
}
