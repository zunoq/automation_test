<template>
  <div class="fullscreen row flex flex-center">
    <div class="col-4 row">
      <div class="col-12 h3 text-light-primary text-center">500 Internal Server Error</div>
      <div class="col-12 body1 text-light-secondary text-center">There was an error, please try again later.
      </div>

    <div class="col-12 flex flex-center" style="padding: 80px 0">
      <img src="../../assets/images/illustration_500.png"/>
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
