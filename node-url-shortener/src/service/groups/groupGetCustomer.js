import { group } from "k6";
import getLinkCustomer from "../../../scenarios/get-link-customer.js";
import getCustomer from "../../../scenarios/get-customer.js";

export default function getCustomerGroup () {
    group( 'endpoint Get Link Customer - Controller Customer - onionArchitecture.api', () => {
        getLinkCustomer();
    });
    
}
