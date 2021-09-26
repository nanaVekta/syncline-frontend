import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('slCart');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone
    });
  }
}

export default new AuthService();