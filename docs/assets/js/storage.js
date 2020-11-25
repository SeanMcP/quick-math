export const KEY = {
  count: "correct_count",
  total: "total_count",
  pass: "pass_key",
  fail: "fail_key",
};

export function get(item) {
  return JSON.parse(sessionStorage.getItem(item));
}

export function set(item, value) {
  sessionStorage.setItem(item, JSON.stringify(value));
}

export function getCorrectCount() {
  return get(KEY.count);
}

export function incrementCorrectCount() {
  set(KEY.count, (Number(get(KEY.count)) || 0) + 1);
}
