<template>
  <div class="fullscreen row flex flex-center">
    <div class="col-4 row">
      <div class="col-12 h3 text-light-primary text-center">No permission</div>
      <div class="col-12 body1 text-light-secondary text-center">The page you're trying access has restricted access. Please refer to your system administrator
      </div>

    <div class="col-12 flex flex-center" style="padding: 80px 0">
      <img src="../../assets/images/illustration_403.png"/>
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
