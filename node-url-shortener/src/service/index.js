import {sleep} from "k6";
import deleteCustomerGroup from "./groups/groupDelCustomer.js";
import getCustomerGroup from "./groups/groupGetCustomer.js";
import postCustomerGroup from "./groups/groupPostCustomer.js";
import putCustomerGroup from "./groups/groupPutCustomer.js";
import deleteCustomerLinkGroup from "./groups/groupDelCustomerLink.js";
import postCustomerLinkGroup from "./groups/groupPostCustomerLink.js";
import getCustomerLinkGroup from "./groups/groupGetCustomerLink.js";

export default () => {
    getCustomerGroup();
    getCustomerLinkGroup();
    postCustomerGroup();
    postCustomerLinkGroup();
    putCustomerGroup();
    deleteCustomerGroup();
    deleteCustomerLinkGroup();
    sleep(1);
}