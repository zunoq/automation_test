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
interface Token {
  refresh: string,
  access: string
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: '' as string,
    password: '' as string,
    token: LocalStorage.getItem('token') as Token,
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
      } else {
        Notify.create({
          message: 'Invalid username or password',
          color: 'negative',
          position: 'top-right'
        })
      }
    },

    async refresh() {
      const response = await api.post('api/v1/private/token/refresh',{refresh: this.token.refresh})
      this.token = response.data
      await LocalStorage.set('token', response.data);
      console.log(response.data)

    },
    logout() {
      window.location.href = '/login';
      LocalStorage.remove('token');
      LocalStorage.remove('perm');
    },
  },
});
