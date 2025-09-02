import { Trend, Rate } from "k6/metrics";
import http from 'k6/http';
import { sleep, check, fail } from "k6";

let putCustomerDuration = new Trend('put_customer_duration');
let putCustomerFail = new Rate('put_customer_fail_rate');
let putCustomerSucess = new Rate('put_customer');

export default function () {
    const payload = {Name: "Pedro Updated"};
    const params =  {headers: {'Content-Type' : 'application/json'}};
    const res = http.put('http://localhost:3000/surl/user/1',payload, params);
    putCustomerDuration.add(res.timings.duration);
    putCustomerFail.add(res === 0 || res > 399);
    putCustomerSucess.add(res > 399);

    let durationMsg = 'MaxDuration $(1000/1000)';
    if(!check(res, {
        'max-duration' : (r) => r.timings.duration < 1000
    })) {
        fail(durationMsg);
    }

    sleep(1);
}