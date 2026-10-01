const assert = require('assert');

// Test the rate limiting logic implemented in submitLead.ts
const MIN_INTERVAL_MS = 15 * 1000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 3;

class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, val) {
    this.store[key] = String(val);
  }
}

global.localStorage = new MockLocalStorage();
global.window = {};

// Simulate checking logic
function checkRateLimit(phoneClean, name, now) {
  const lastSubmitStr = localStorage.getItem('ck_lead_last_submit');
  if (lastSubmitStr) {
    const lastSubmitTime = parseInt(lastSubmitStr, 10);
    const diffMs = now - lastSubmitTime;
    if (!isNaN(lastSubmitTime) && diffMs < MIN_INTERVAL_MS) {
      return { allowed: false, reason: 'cooldown' };
    }
  }

  const rawTimestamps = localStorage.getItem('ck_lead_timestamps');
  let timestamps = [];
  if (rawTimestamps) {
    try {
      timestamps = JSON.parse(rawTimestamps);
    } catch {}
  }
  timestamps = timestamps.filter(t => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return { allowed: false, reason: 'window_limit' };
  }

  const lastHash = localStorage.getItem('ck_lead_last_payload');
  const currentHash = `${phoneClean}_${(name || '').trim().toLowerCase()}`;
  if (lastHash === currentHash && lastSubmitStr) {
    const lastTime = parseInt(lastSubmitStr, 10);
    if (!isNaN(lastTime) && now - lastTime < 5 * 60 * 1000) {
      return { allowed: false, reason: 'duplicate' };
    }
  }

  return { allowed: true };
}

function recordSubmission(phoneClean, name, now) {
  localStorage.setItem('ck_lead_last_submit', now.toString());
  localStorage.setItem('ck_lead_last_payload', `${phoneClean}_${(name || '').trim().toLowerCase()}`);

  const rawTimestamps = localStorage.getItem('ck_lead_timestamps');
  let timestamps = [];
  if (rawTimestamps) {
    try { timestamps = JSON.parse(rawTimestamps); } catch {}
  }
  timestamps = timestamps.filter(t => now - t < WINDOW_MS);
  timestamps.push(now);
  localStorage.setItem('ck_lead_timestamps', JSON.stringify(timestamps));
}

// 1. Initial request should be allowed
let now = 1000000;
let res = checkRateLimit('9147061161', 'Иван', now);
assert.strictEqual(res.allowed, true, '1st request allowed');
recordSubmission('9147061161', 'Иван', now);

// 2. Immediate 2nd request (rapid clicking, flood) must be BLOCKED by 15s cooldown
res = checkRateLimit('9147061161', 'Иван', now + 1000);
assert.strictEqual(res.allowed, false, 'Rapid click blocked');
assert.strictEqual(res.reason, 'cooldown');

// 3. Request after 16s with same phone is BLOCKED by duplicate prevention
res = checkRateLimit('9147061161', 'Иван', now + 16000);
assert.strictEqual(res.allowed, false, 'Duplicate phone within 5 min blocked');
assert.strictEqual(res.reason, 'duplicate');

// 4. Request after 16s with different phone (e.g. spouse) is ALLOWED
res = checkRateLimit('9147069999', 'Ольга', now + 16000);
assert.strictEqual(res.allowed, true, 'Different phone allowed after cooldown');
recordSubmission('9147069999', 'Ольга', now + 16000);

// 5. 3rd request after another 16s
res = checkRateLimit('9147068888', 'Сергей', now + 32000);
assert.strictEqual(res.allowed, true, '3rd lead allowed');
recordSubmission('9147068888', 'Сергей', now + 32000);

// 6. 4th request must be BLOCKED by 10-minute window limit (max 3)
res = checkRateLimit('9147067777', 'Анна', now + 48000);
assert.strictEqual(res.allowed, false, '4th request in window blocked');
assert.strictEqual(res.reason, 'window_limit');

console.log('ALL RATE LIMIT TESTS PASSED SUCCESSFULLY!');
