import { group, sleep } from "k6"
import getCustomer from "../../scenarios/get-customer.js"
import postCustomer from "../../scenarios/post-customer.js";
import putCustomer from "../../scenarios/put-customer.js";
import deleteCustomer from "../../scenarios/delete-customer.js";

export default () => {
    group('endpoint Get Customer - Controller Customer - OnionArchitecture.api', () => {
        getCustomer();
    });
    group('endpoint Post Customer - Controler Customer - OnionArchitecture.api', () => {
        postCustomer();
    });
    group('endpoint Put Customer - Controler Customer - OnionArchitecture.api', () => {
        putCustomer();
    });
    group('endpoint Delete Customer - Controler Customer - OnionArchitecture.api', () => {
        deleteCustomer();
    })
    sleep(1);
}