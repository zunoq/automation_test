<template>
  <q-page class="row overlay">
    <div class="col-8 flex flex-center blur">
      <img alt="images" src="../../assets/images/signin_background.png"/>
    </div>
    <div class="col-4 flex flex-center bg-white">
      <div class="row q-pa-xl q-col-gutter-md">
        <div class="col-12 h4 text-light-primary">{{ $t('register.signup') }}</div>
        <div class="col-12 subtitle2 text-light-primary">
          Already have account?
          <span class="subtitle2 text-primary cursor-pointer underline-hover"
                @click="this.$router.push('/login')"
          >
            Sign In
          </span>
        </div>

        <q-form class="col-12 row q-col-gutter-md q-mt-sm">
          <div class="col-6 ">
            <q-input
              v-model="account.first_name"
              class="radius-md"
              label="First name"
              outlined
              type="text"
            />
          </div>
          <div class="col-6 ">
            <q-input
              v-model="account.last_name"
              class="radius-md"
              label="Last name"
              outlined
              type="text"
            />
          </div>
          <div class="col-12 ">
            <q-input
              v-model="account.email"
              class="radius-md"
              label="Email"
              outlined
              type="text"
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="account.password"
              :type="showPassword ? 'text' : 'password'"
              class="radius-md"
              label="Password"
              outlined
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'r_visibility_off' : 'r_visibility'"
                  class="cursor-pointer"
                  color="text-light-secondary"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              class="radius-md"
              label="Confirm password"
              outlined
            >
            </q-input>
          </div>
          <div class="col-12">
            <q-btn
              class="subtitle1 full-width radius-md btn-signup"
              color="dark"
              dark
              label="Create account"
              no-caps
              padding="sm"
              type="submit"
            />
          </div>
        </q-form>
        <div class="col-12 caption text-center text-light-secondary">
          By signing up, i agree to
          <span class="underline text-light-primary">Term of Use</span> and
          <span class="underline text-light-primary"> Privacy Policy </span>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
// import { Notify } from 'quasar';
// import Services from "src/services/user.service"

let showPassword = ref(false);
// let loading = ref(false);
const account = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
})
const confirmPassword = ref('');


</script>

<style lang="scss" scoped>
.btn-signup {
  height: 48px;
}

.text-with-link {

}
</style>
