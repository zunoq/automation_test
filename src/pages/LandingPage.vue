<template>
  <q-page class="row">
    <div class="col-8 flex flex-center">
      <q-btn
          size="md"
          color="primary"
          label="Sign in"
          @click="this.$router.push('/login')"
      />
    </div>
    <div class="col-4 view-height">
      <div class="row">
        <div class="col-12"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>
