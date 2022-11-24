<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-3 row">
      <div class="col-12 flex flex-center ">
        <q-avatar size="96px">
          <img src="../../assets/images/ic_email_inbox.png"/></q-avatar>
      </div>
      <div class="col-12 h3 text-light-primary text-center q-mt-xl q-mb-md">
        Please check your email!
      </div>
      <div class="col-12 body1 text-light-primary text-center q-mb-lg">
        We've emailed a 6-digit confirmation code to {{ registerMail }}, please enter the code in below box to verify
        your email.
      </div>
      <div class="col-12 q-my-md">
        <OTP @digitsChange="logChange"/>
      </div>
      <div class="col-12 q-mb-lg">
        <q-btn
          class="subtitle1 full-width radius-md btn-signup"
          color="primary"
          dark
          label="Verify"
          no-caps
          padding="sm"
          @click="verify()"
        />
      </div>
      <div class="col-12 body2 text-light-primary text-center q-mb-lg"> Don't have code?
        <span class="subtitle2 text-primary cursor-pointer underline-hover" @click="resendOTP()">Resend code
        </span>
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
import OTP from 'components/OTP.vue'

const registerMail = ref('admin@admin.com')

function logChange(val) {
  console.log(val.join(''))
}

function verify() {
  console.log('Verifying')
}

function resendOTP() {
  console.log('resendOTP')
}
</script>

<style scoped>

</style>
