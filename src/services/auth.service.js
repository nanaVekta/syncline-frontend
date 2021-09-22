/* eslint-disable class-methods-use-this */
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  /**
   * login - Login a user
   * @date 2021-09-22
   * @param {object} user
   * @returns {object}
   */
  login(user) {
    return axios.post(`${API_URL}signin`, user)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('synclineUser', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  /**
   * logout - Logout a user
   * @date 2021-09-22
   * @returns {any}
   */
  logout() {
    localStorage.removeItem('synclineUser');
  }

  /**
   * reigster - Register a user
   * @date 2021-09-22
   * @param {any} user
   * @returns {any}
   */
  register(user) {
    return axios.post(`${API_URL}signup`, user);
  }
}

export default new AuthService();
