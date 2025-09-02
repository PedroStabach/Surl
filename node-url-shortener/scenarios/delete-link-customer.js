import { Trend, Rate } from "k6/metrics";
import http from 'k6/http';
import { sleep, check, fail } from "k6";

export let deleteCustomer = new Trend('delete_customer_duration');
export let deleteCustomerFail = new Rate('delete_customer_fail_rate');
export let deleteCustomerSucess = new Rate('delete_customer_sucess_rate');

export default function() {
    const shortCode = `010ab1f`
    const res = http.del(`http://localhost:3000/surl/${shortCode}`);

    deleteCustomer.add(res.timings.duration);

    const isSucess = (res.status === 200 || res.status === 204 || res.status === 404);
    deleteCustomerFail.add(!isSucess);
    deleteCustomerSucess.add(isSucess);

    let durationMsg = `MaxDuration ${res.timings.duration}s`;
    if(!check(res, {
        'max-duration' : (r) => r.timings.duration < 1000
    })) {
        fail(durationMsg);
    }

}