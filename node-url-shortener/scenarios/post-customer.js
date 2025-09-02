import { Trend, Rate } from "k6/metrics";
import http from 'k6/http';
import { sleep, check, fail } from "k6";

export let setCustomerDuration = new Trend('post_customer_duration');
export let setCustomerFail = new Rate('post_customer_fail_rate');
export let setCustomerSucess = new Rate('post_customer_sucess_rate');
export let setCustomerRate = new Rate('post_customer_reqs');

export default function () {
    const payload = JSON.stringify({
        Name: "Pedro",
        Email: "Pedro@pedro"
    });
    const params = {headers: {'Content-Type' : 'application/json'}};

    let res = http.post('http://localhost:3000/surl/users', payload, params);

    setCustomerDuration.add(res.timings.duration);
    setCustomerFail.add(res === 0 || res > 399);
    setCustomerSucess.add(res < 399);

    let durationMsg = 'MaxDuration $(1000/1000)s';

    if(!check(res, {
        'max-duration' : (r) => r.timings.duration < 1000
    })) {
        fail(durationMsg);
    }

    sleep(1);
}