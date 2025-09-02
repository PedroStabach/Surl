import deleteLinkCustomer from "../../../scenarios/delete-link-customer.js";
import { group } from "k6";

export default function deleteCustomerLinkGroup() {
    group('endpoint Delete Link Customer - Controller Customer - OnionArchitecture.api', () => {
        deleteLinkCustomer();
    });
}