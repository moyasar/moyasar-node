import Service from './service.js';

export default class extends Service {
    fetchAll(page = 1,per = 20){
        if (per < 1 || per > 100)
            throw new Error('Per must be between 1 and 100');
        return this.sendRequest(`invoices?page=${page}&per=${per}`,'GET').then(res=>{
            return res.invoices;
        });
    }

    fetch(id){
        return this.sendRequest('invoices/' +id);
    }
    
    create(receipt){
        return this.sendRequest('invoices','POST',receipt).then(res=>{
            return res;
        })
    }
}
