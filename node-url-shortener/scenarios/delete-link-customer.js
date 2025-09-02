import { Trend, Rate } from "k6/metrics";
import http from 'k6/http';
import { sleep, check, fail } from "k6";

export let deleteCustomer = new Trend('delete_customer_duration');
export let deleteCustomerFail = new Rate('delete_customer_fail_rate');
export let deleteCustomerSucess = new Rate('delete_customer_sucess_rate');

export default function() {
    const res = http.del('http://localhost:3000/surl/link/11');

    deleteCustomer.add(res.timings.duration);
    deleteCustomerFail.add(res === 0 || res > 399);
    deleteCustomerSucess.add(res < 399);

    let durationMsg = 'MaxDuration $(1000/1000)'
    if(!check(res, {
        'max-duration' : (r) => r.timings.duration
    })) {
        fail(durationMsg);
    }

}