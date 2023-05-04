<template>
  <div class="row justify-between all container">
    <q-chip
      v-for="(vuln, idx) in vulns"
      :key="idx"
      class="vulns text-white text-center col q-mr-xs"
      :color="vuln"
      square
    >
      <div class="text-center text-white full-width">
        {{ number[idx] }}
      </div>
      <q-tooltip class="text-capitalize"> {{ vuln }}</q-tooltip>
    </q-chip>
  </div>
</template>
<script setup lang="ts">
import {computed, ref} from 'vue';
import {Statistics} from 'src/models/base_data';

const props: {data: Statistics} = defineProps({
  data: {}
})
const vulns = ref(['critical', 'high', 'medium', 'low', 'info'])

const number = computed(()=> {
  const {critical, high, medium, low, info} = props.data || {}
  return [critical, high, medium, low, info]
})

</script>
<style lang="scss" scoped>
.vulns {
  margin-left: 0;
}

.container {
  min-width: 120px;
  max-width: 300px;
}
</style>
