<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-3 row">
      <div class="col-12 flex flex-center ">
        <q-avatar size="96px">
          <img src="../../assets/images/ic_password.png"/></q-avatar>
      </div>
      <div class="col-12 h3 text-light-primary text-center q-mt-xl q-mb-md">
        Forgot Password?
      </div>
      <div class="col-12 body1 text-light-primary text-center q-mb-lg">
        Please enter the email address associated with your account, and we'll email you a link to reset your password.
      </div>
      <div class="col-12 q-my-lg">
        <q-input
          v-model="mail"
          label="Email Address"
          outlined
          input-class="q-py-md body1 text-light-primary"
        />
      </div>
      <div class="col-12 q-mb-lg">
        <q-btn
          class="subtitle1 full-width radius-md btn-signup"
          color="primary"
          dark
          label="Reset password"
          no-caps
          padding="md"
          @click="resetPassword()"
        />
      </div>
      <div class="col-12 subtitle2 text-light-primary text-center">
        <q-icon
          class="q-mr-sm"
          color="light-primary"
          name="r_arrow_back_ios"
          size="14px"
        />
        <span class="cursor-pointer underline-hover" @click="this.$router.push('/login')">
          Return to sign in
        </span>

      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const mail = ref('')


function resetPassword() {
  console.log('Verifying')
}
</script>

<style scoped>

</style>
