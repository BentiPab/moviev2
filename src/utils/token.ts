export const isTokenExpired = (expiringDate: string) => {
  const expireDate = new Date(expiringDate).getTime();
  const now = new Date().getTime();
  return expireDate - now <= 0;
};
