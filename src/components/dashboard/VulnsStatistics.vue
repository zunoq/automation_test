<template>
  <div class="row q-col-gutter-lg items-stretch">
    <div v-for="(level, idx) in levels" :key="idx" class="col">
      <q-card class="vulns-card radius-md shadow-1">
        <q-card-section class="row justify-between">
          <div class="col-auto">
            <q-avatar
              :color="level"
              class="shadow-2"
              icon="r_priority_high"
              rounded
              text-color="white"
            />
          </div>
          <div class="col-auto">
            <div class="row body2 text-capitalize">{{ level }}</div>
            <div class="row text-bold h6 justify-end">
              {{ cves?.[level] }}
            </div>
          </div>
        </q-card-section>
        <q-separator inset/>
        <q-card-section class="row">
          <div class="col-12 caption text-weight-bold text-light-secondary">
            Most founded vulnerabilities
          </div>
          <div class="col-12">
            <q-list v-if="topCves?.[level]?.length > 0">
              <q-item
                v-for="cve in topCves?.[level]"
                :key="cve.id"
                dense
                class="q-px-none"
              >
                <q-item-section>
                  <div class="row justify-between">
                    <q-tooltip>
                      {{ cve.name }}
                    </q-tooltip>
                    <div class="col-auto">
                      {{ $splitString(cve.name, 25) }}
                    </div>
                    <div class="col-auto text-weight-bold body1">
                      {{ cve.count }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
            <div v-else class="text-center text-grey">
              No {{ level }} vulnerabilities has been founded ...
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {date} from 'quasar'
import Services from 'src/services/rest.service'

interface Cves {
  critical: number,
  high: number,
  medium: number,
  low: number,
  info: number,
}

interface TopCves {
  critical: {
    name: string,
    count: number,
  },
  high: {
    name: string,
    count: number,
  },
  medium: {
    name: string,
    count: number,
  },
  low: {
    name: string,
    count: number,
  },
  info: {
    name: string,
    count: number,
  },

}

const levels = ref(['critical', 'high', 'medium', 'low', 'info']);
let cves:Cves = ref();
let topCves:TopCves = ref();

async function getCves() {
  let startDate = date.formatDate(
    date.subtractFromDate(new Date(), {days: 7}, 'MM/DD/YYYY'),
    'MM/DD/YYYY'
  );
  let endDate = date.formatDate(new Date(), 'MM/DD/YYYY');
  cves.value = await Services.get('api/v1/public/statistic/cves')
  topCves.value = await Services.get(`api/v1/public/statistic/top-cves?limit=3&start_date=${startDate}&end_date=${endDate}`)
}

onMounted(() => {
  getCves()
})
</script>
<style>
.vulns-card {
  height: 230px;
}
</style>
