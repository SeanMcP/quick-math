export const KEY = {
  count: "correct_count",
  fail: "fail_key",
  pass: "pass_key",
  satisfactory: "satisfactory",
};

export function get(item) {
  const fromStorage = sessionStorage.getItem(item);
  return fromStorage ? JSON.parse(fromStorage) : undefined;
}

export function set(item, value) {
  if (item && value) sessionStorage.setItem(item, JSON.stringify(value));
}

export function getCorrectCount() {
  return get(KEY.count);
}

export function incrementCorrectCount() {
  set(KEY.count, (Number(get(KEY.count)) || 0) + 1);
}

export function initializeCorrectCount() {
  set(KEY.count, 0);
}
