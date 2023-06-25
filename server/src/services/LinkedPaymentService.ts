import { LinkPayment } from '../entity/LinkPayment';
import BaseService  from "./BaseService";

 export class LinkedPaymentService extends BaseService {
    constructor(){
        super(LinkPayment)
    }
}

export default new LinkedPaymentService();