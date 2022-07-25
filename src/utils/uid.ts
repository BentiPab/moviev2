export const generateUID = () =>
  window.btoa(Date.now().toString() + Math.random().toString());
