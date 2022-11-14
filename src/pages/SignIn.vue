<template>
  <q-page class="row q-pa-lg">
    <div class="col-9 flex flex-center">
      <img alt="images" src="../assets/images/illustration_dashboard.png">
    </div>
    <div class="col-3 flex flex-center">
      <div class="row q-pa-xl">
        <div class="col-12 h4 text-light-primary">Sign in to VAP</div>
        <div class="col-12 q-my-lg">New user?
          <q-btn class="q-pa-none text-weight-bold"
                 color="primary"
                 flat
                 label="Create an account"
                 no-caps
                 @click="this.$router.push('/signup')"
          />
        </div>
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
            :type="showPassword ? 'text' : 'password'"
            class="radius-md"
            label="Password"
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword? 'visibility_off': 'visibility'"
                class="cursor-pointer"
                color="text-light-secondary"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>
        <div class="col-12 flex justify-end q-mb-md">
          <q-btn flat
                 label="Forgot password?"

                 no-caps
                 @click="this.$router.push('/signin')"
          />
        </div>
        <div class="col-12">
          <q-btn
            class="subtitle1 full-width radius-sm"
            color="dark"
            dark
            label="Login"
            no-caps
            size="md"
            @click="login()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {Notify} from 'quasar'
import Services from 'src/services/user.service'
interface Account {
  email: string,
  password: string,
}
let showPassword = ref(false);
// let loading = ref(false);
const account: Account = reactive({
  email: '',
  password: '',
})

async function login() {
  if (!account.email) {
    Notify.create({
      message: 'Please enter username',
      color: 'negative',
      icon: 'warning',
      position: 'top-right'
    })
  } else if (!account.password) {
    Notify.create({
        message: 'Please enter password'
      }
    )
  }
  else {
    let response = await Services.login(account)
    console.log(response)
  }
}
</script>
