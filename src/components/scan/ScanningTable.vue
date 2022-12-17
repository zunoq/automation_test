<template>
  <div>
    <q-table
        title="Treats"
        row-key="name"
        dark
        color="amber"
    />
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
onMounted(() => {
  console.log('scanning table')
})
</script>
