import postCustomer from "../../../scenarios/post-customer.js";
import { group } from "k6";
export default function postCustomerGroup (){ 
    group('endpoint Post Customer - Controler Customer - OnionArchitecture.api', () => {
        postCustomer();
    });
}