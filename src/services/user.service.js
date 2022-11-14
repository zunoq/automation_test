import { api } from 'boot/axios';
import {LocalStorage} from 'quasar';
import {useAuthStore} from 'stores/auth';

const auth = useAuthStore()
function authHeader() {
  let token = LocalStorage.getItem('token');
  if (token) {
    return {
      Authorization: 'Bearer ' + token.access,
      'Content-Type': 'application/json',
    };
  } else {
    return {};
  }
}
class userService {
  async login(user) {
    try {
      await api
        .post(
          'api/v1/private/token/auth',
          {
            email: user.email,
            password: user.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => {
            LocalStorage.set('token', response.data);
            auth.$patch.token = response.data;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async getSelf() {
    try {
      await api.get('/users', { headers: authHeader() }).then((response) => {
        LocalStorage.set('perm', response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
    window.location.href = '/login';
    LocalStorage.remove('token');
    LocalStorage.remove('perm');
  }
}

export default new userService();
