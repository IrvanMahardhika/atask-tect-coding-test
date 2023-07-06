export const debounce = (fn: (value: string) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: void, ...args: [value: string]) {
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};
