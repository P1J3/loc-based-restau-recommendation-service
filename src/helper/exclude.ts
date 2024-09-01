// 객체에서 빼고 싶은 key값을 적으면 해당 value만 제외된 객체 return

export function exclude<Obj extends object, Key extends keyof Obj>(
  obj: Obj,
  keys: Key[],
): Omit<Obj, Key> {
  for (const key of keys) {
    delete obj[key];
  }

  return obj;
}
