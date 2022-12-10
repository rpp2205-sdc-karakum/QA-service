import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    stress_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 500,
      maxVUs: 3000,
    },
  },
};

export default function getAnswers() {
  const res = http.get('http://localhost:3001/qa/questions/:question_id/answers', {
    question_id: 3000000
  });

  check(res, {
    'status was 201': (r) => r.status == 200
  });

  sleep(1);
};