export const stringTransform = (value: string) => {
  const arr = value
    .split(/(?!^)(?=[A-Z])/)
    .map((item) => `${item.toLowerCase()} `);
  const str = arr.join(' ').trim();
  return str;
};
