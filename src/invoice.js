import Service from './service.js';

export default class extends Service {
    fetchAll(options = {page:1,per:20}){
        if (options.per < 1 || options.per > 100)
            throw new Error('Per must be between 1 and 100');
        return this.sendRequest(`invoices?page=${options.page}&per=${options.per}`,'GET').then(res=>{
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
