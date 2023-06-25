import { Payment } from '../entity/Payment';
import BaseService  from "./BaseService";

 export class PaymentsService extends BaseService {
    constructor(){
        super(Payment)
    }
}

export default new PaymentsService();