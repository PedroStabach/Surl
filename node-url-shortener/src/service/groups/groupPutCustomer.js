import { group } from "k6";
import putCustomer from "../../../scenarios/put-customer.js";

export default function putCustomerGroup () {
    group('endpoint Put Customer - Controler Customer - OnionArchitecture.api', () => {
    putCustomer();
})
}