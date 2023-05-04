<template>
  <q-page class="row overlay">
    <div class="col-9 flex flex-center blur">
      <img alt="images" src="../../assets/images/signin_background.png"
           style="width: 720px; height: 540px"

      />
    </div>
    <div class="col-3 flex flex-center bg-white">
      <div class="row q-pa-xl">
        <div class="col-12 h4 text-light-primary">{{ $t('login.login') }}</div>
        <div class="col-12 q-my-lg subtitle2 text-light-primary">
          New user?
          <span class="subtitle2 text-primary cursor-pointer underline-hover"
                @click="routerPage('register')"
          >
            Create an account
          </span>
        </div>

        <q-form class="full-width" @submit="login()">
          <div class="col-12 q-mb-md">
            <q-input
              v-model="account.email"
              class="radius-md"
              label="Email"
              outlined
              type="text"
            />
          </div>
          <div class="col-12 q-mb-md">
            <q-input
              v-model="account.password"
              :type="visibility"
              class="radius-md"
              label="Password"
              outlined
            >
              <template v-slot:append>
                <q-icon
                  :name="changeIcon"
                  class="cursor-pointer"
                  color="text-light-secondary"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>

          <div class="col-12 flex justify-end q-mb-md">
            <q-btn
              flat
              label="Forgot password?"
              no-caps
              @click="routerPage('forgot-password')"
            />
          </div>
          <div class="col-12">
            <q-btn
              :loading="loading"
              class="subtitle1 full-width radius-md btn-signin"
              color="dark"
              dark
              label="Sign in"
              no-caps
              padding="sm"
              type="submit"
            />
          </div>
        </q-form>
      </div>
      <q-btn flat
          size="md"
          color="primary"

          label="OK"
             @click="routerPage('verify')"
      />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {reactive, ref, computed} from 'vue';
import { useRouter } from 'vue-router'
import {Notify} from 'quasar';
import {useAuthStore} from 'stores/auth'

interface Account {
  email: string;
  password: string;
}
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false);
const showPassword = ref(false)
const account: Account = reactive({
  email: '',
  password: '',
});
const visibility =  computed(()=>{
  return showPassword.value ? 'text' : 'password'
})
const changeIcon = computed(
  ()=>{
    return showPassword.value ? 'r_visibility_off' : 'r_visibility'
  }
)

const routerPage = (path:string) => {
  router.push(`/${path}`)
}

async function login() {
  loading.value = true;
  try {
    if (!account.email) {
      loading.value = false
      Notify.create({
        message: 'Please enter username',
        color: 'negative',
        icon: 'r_warning',
        position: 'top-right',
      });
    } else if (!account.password) {
      loading.value = false
      Notify.create({
        message: 'Please enter password',
        color: 'negative',
        icon: 'r_warning',

      });
    } else {
      await authStore.login(account);
    }
  } catch (error) {
    loading.value = false
    account.email = ''
    account.password = ''
    Notify.create({
      message: 'Invalid username or password',
      color: 'negative',
      icon: 'r_warning',

    });
  }
}


</script>
<style lang="scss" scoped>
.btn-signin {
  height: 48px;
}
</style>
