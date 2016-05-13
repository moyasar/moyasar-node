import Service from './service.js';

export default class extends Service {
    fetchAll(){
        return this.sendRequest('invoices','GET').then(res=>{
            console.log(res)
            return res.invoices;
        });
    }

    fetch(id){
        return this.sendRequest('invoices/'+id);
    }
    
    create(receipt){
        return this.sendRequest('invoices','POST',receipt).then(res=>{
            return res;
        })
    }
}
