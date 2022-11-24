import {defineStore} from 'pinia';
import {api} from 'boot/axios';
import {LocalStorage, Notify} from 'quasar';

interface Self {
  first_name: string;
  last_name: string;
  email: string;
  group: string;
  date_joined: string;
  id: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: LocalStorage.getItem('token'),
    self: {} as Self,
  }),
  actions: {
    async login(account: { email: string; password: string }) {
      const response = await api.post(
        'api/v1/private/token/auth',
        {
          email: account.email,
          password: account.password,
        },
        {headers: {'Content-Type': 'application/json'}}
      );
      this.token = response.data;
      await LocalStorage.set('token', response.data);
      if (this.token) {
        window.location.href = '/dashboard';
      }
      else {
        Notify.create({
          message: 'Invalid username or password',
          color: 'negative',
          position: 'top-right'
        })
      }
    },
    logout() {
      window.location.href = '/login';
      LocalStorage.remove('token');
      LocalStorage.remove('perm');
    },
  },
});
