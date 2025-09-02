import postLinkCustomer from "../../../scenarios/post-link-customer.js";
import { group } from "k6";
export default function postCustomerLinkGroup (){
    group('endpoint Post Link Customer - Controler Customer - OnionArchitecture.api', () => {
        postLinkCustomer();
    });
}