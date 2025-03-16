export const encodeBase64 = (data: Blob) => {
  const file = URL.createObjectURL(data);
  const dataEncoded = window.btoa(file);
  return dataEncoded;
};
export const decodeBase64 = (data: string) => {
  const decode = window.atob(data);
  return decode;
};
