import { check, sleep } from 'k6';
import http from 'k6/http';
import {Rate, Trend} from 'k6/metrics';

export let GetCustomerDuration = new Trend('get_customer_duration');
export let GetCustomerFailed = new Rate('get_customer_fail_rate');
export let GetCustomerSucess = new Rate('get_customer_sucess_rate');
export let GetCostumerReqs = new Rate('get_customer_reqs');

export default function () {
    let res = http.get('http://localhost:3000/surl:shortCode');

    GetCustomerDuration.add(res.timings.duration);
    GetCustomerFailed.add(res.status === 0 || res.status > 399);
    GetCustomerSucess.add(res.status < 399);

    let durationMsg = 'MaxDuration $(1000/1000)s';

    if(!check(res, {
        'max duration' : (r) => r.timings.duration < 1000
    })) {
        fail(durationMsg);
    }

    sleep(1);
} 