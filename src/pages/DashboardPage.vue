<template>
  <q-page class="container pa-xl">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <vulns-statistics />
      </div>
      <div class="col-8">
        <scan-count />
      </div>
      <div class="col-4">
        <vulns-count />
      </div>
    </div>

  </q-page>
</template>

<script lang="ts" setup>
import VulnsStatistics from 'src/components/dashboard/VulnsStatistics.vue'
import ScanCount from 'src/components/dashboard/ScanCount.vue'
import VulnsCount from 'src/components/dashboard/VulnsCount.vue'
</script>
<style>

</style>
