<template>
  <div class="fullscreen row flex flex-center">
    <div class="col-4 row">
      <div class="col-12 h3 text-light-primary text-center">Network Error</div>
      <div class="col-12 body1 text-light-secondary text-center">
        Please check your network connection and try again
      </div>

    <div class="col-12 flex flex-center" style="padding: 80px 0">
      <img src="../../assets/images/illustration_maintenance.png"/>
    </div>
    <div class="col-12 text-center flex flex-center">
      <q-btn
        class="radius-md q-pa-md body1"
        color="primary"
        label="Go to home"
        no-caps
        size="md"
        to="/login"
      />
    </div>
    </div>
  </div>
</template>
<script setup></script>
