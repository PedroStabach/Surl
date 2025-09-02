import deleteCustomer from "../../../scenarios/delete-customer.js";
import { group } from "k6";

export default function deleteCustomerGroup() {
    group('endpoint Delete Customer - Controler Customer - OnionArchitecture.api', () => {
        deleteCustomer();
    });
}