import request from 'request';
import Service from './service.js';

export default class extends Service {
    fetchAll(){
        return this.sendRequest('payments',{}).then(res=>{
            return res.payments;
        });
    }
}
