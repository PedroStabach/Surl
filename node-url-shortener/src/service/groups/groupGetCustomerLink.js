import { group } from "k6";
import getLinkCustomer from "../../../scenarios/get-link-customer.js";

export default function getCustomerLinkGroup () {
    group( 'endpoint Get Link Customer - Controller Customer - onionArchitecture.api', () => {
        getLinkCustomer();
    });
    
}
