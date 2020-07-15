import Service from './service.js';

export default class extends Service {
    list(options = {page: 1, per: 40}) {
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

    update(invoice){
      if (typeof invoice.id != "string") {
        throw new Error('Invoice object does not have id');
      }
      return this.sendRequest('invoices/'+ invoice.id ,'PUT',invoice).then(res=>{
          return res;
      })
    }

    cancel(invoice){
        if (typeof invoice.id != "string") {
            throw new Error('Invoice object does not have id');
        }
        return this.sendRequest('invoices/'+ invoice.id +'/cancel','PUT',invoice).then(res=>{
            return res;
        })
    }
}
