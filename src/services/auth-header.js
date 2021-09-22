/**
 * add auth header to request
 * @date 2021-09-22
 * @returns {any}
 */
export default function authHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('synclineUser'));

  if (user && user.token) {
    return { 'x-access-token': user.accessToken };
  }
  return {};
}
