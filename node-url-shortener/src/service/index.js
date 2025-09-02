import { group, sleep } from "k6"
import getCustomer from "../../scenarios/get-customer.js"
import postCustomer from "../../scenarios/post-customer.js";

export default () => {
    group('endpoint Get Customer - Controller Customer - OnionArchitecture.api', () => {
        getCustomer();
    });
    //group('endpoint Post Customer - Controler Customer - OnionArchitecture.api', () => {
    //    postCustomer();
    //});

    sleep(1);
}