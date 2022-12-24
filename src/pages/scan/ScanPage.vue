<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-md justify-between">
      <div class="col-auto">
        <div class="h4 text-light-primary q-mb-sm">Scan List</div>
        <q-breadcrumbs active-color="light-disable" class="body2 text-light-primary" separator="-">
          <q-breadcrumbs-el label="Scan" to="/"/>
          <q-breadcrumbs-el label="List" to="/scan"/>
        </q-breadcrumbs>
      </div>
      <div class="col-auto flex items-center">
        <q-btn
          class="radius-md"
          color="primary"
          icon="r_add"
          label="New Scan"
          no-caps
          size="md"
          @click="handleNewScan"
        />
      </div>
    </div>
    <div class="row q-mt-xl">
      <q-card class="my-card col-12 shadow-transition">
        <q-card-section class="row">
          <div class="col separator-dashed">
            <div class="row q-col-gutter-lg justify-center">
              <div class="col-auto ">
                <q-icon
                  class="circle-secondary q-pa-md"
                  color="secondary"
                  name="r_article"
                  size="24px"

                />
              </div>
              <div class="col-auto">
                <div class="h6 text-light-primary">Total scan</div>
                <div class="h4 text-secondary">{{ count.all }}</div>
              </div>
            </div>
          </div>
          <div class="col separator-dashed">
            <div class="row q-col-gutter-md justify-center">
              <div class="col-auto ">
                <q-icon
                  class="circle-positive q-pa-md"
                  color="positive"
                  name="r_check_circle"
                  size="24px"

                />
              </div>
              <div class="col-auto">
                <div class="h6 text-light-primary">Finished</div>
                <div class="h4 text-positive">{{ count.finished }}</div>
              </div>
            </div>
          </div>
          <div class="col separator-dashed">
            <div class="row q-col-gutter-md justify-center">
              <div class="col-auto ">
                <q-icon
                  class="circle-info q-pa-md"
                  color="info"
                  name="r_track_changes"
                  size="24px"

                />
              </div>
              <div class="col-auto">
                <div class="h6 text-light-info">Scanning</div>
                <div class="h4 text-info">{{ count.scanning }}</div>
              </div>
            </div>
          </div>
          <div class="col separator-dashed">
            <div class="row q-col-gutter-md justify-center">
              <div class="col-auto ">
                <q-icon
                  class="circle-warning q-pa-md"
                  color="warning"
                  name="r_watch_later"
                  size="24px"

                />
              </div>
              <div class="col-auto">
                <div class="h6 text-light-primary">Waiting</div>
                <div class="h4 text-warning">{{ count.waiting }}</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="row q-col-gutter-md justify-center">
              <div class="col-auto ">
                <q-icon
                  class="circle-negative q-pa-md"
                  color="negative"
                  name="r_error"
                  size="24px"

                />
              </div>
              <div class="col-auto flex items-center row">
                <div class="col-12 h6 text-light-primary">Failed</div>
                <div class="col-12 h4 text-negative">{{ count.failed }}</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-mt-xl">
      <q-card class="my-card col-12">
        <div>
          <q-tabs
            v-model="tab"
            active-color="primary"
            align="left"
            class="bg-grey-2"
            dense
            inline-label
            no-caps
          >
            <q-tab name="all">
              <q-chip
                class="caption"
                color="secondary"
                dense
                square
                text-color="white"
              >
                {{ count.all }}
              </q-chip>
              <span class="subtitle2 text-light-primary q-px-xs">All</span>
            </q-tab>
            <q-tab name="finished">
              <q-chip
                class="caption"
                color="positive"
                dense
                square
                text-color="white"
              >
                {{ count.finished }}
              </q-chip>
              <span class="subtitle2 text-light-primary q-px-xs">Finished</span>
            </q-tab>
            <q-tab name="scanning">
              <q-chip
                class="caption"
                color="info"
                dense
                square
                text-color="white"
              >
                {{ count.scanning }}
              </q-chip>
              <span class="subtitle2 text-light-primary q-px-xs">Scanning</span>
            </q-tab>
            <q-tab name="waiting">
              <q-chip
                class="caption"
                color="warning"
                dense
                square
                text-color="white"
              >
                {{ count.waiting }}
              </q-chip>
              <span class="subtitle2 text-light-primary q-px-xs">Waiting</span>
            </q-tab>
            <q-tab name="failed">
              <q-chip
                class="caption"
                color="negative"
                dense
                square
                text-color="white"
              >
                {{ count.failed }}
              </q-chip>
              <span class="subtitle2 text-light-primary q-px-xs">Failed</span>
            </q-tab>
          </q-tabs>
          <q-separator/>
        </div>
        <q-card-section>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="all">
              <AllScanTable @count="handleCount"/>
            </q-tab-panel>
            <q-tab-panel name="finished">
              <FinishedScanTable/>
            </q-tab-panel>
            <q-tab-panel name="scanning">
              <ScanningTable/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<script lang="ts" setup>
import {Ref, ref} from 'vue'
import AllScanTable from 'components/scan/AllScanTable.vue'
import ScanningTable from 'components/scan/ScanningTable.vue'
import NewScan from 'components/scan/NewScan.vue'
import {useQuasar} from 'quasar';
import FinishedScanTable from 'components/scan/FinishedScanTable.vue'
const tab = ref('all')
const count:Ref = ref({
  all: 0,
  finished: 0,
  scanning: 0,
  waiting: 0,
  failed: 0

})
const $q = useQuasar()
const handleNewScan = function () {
  $q.dialog({
    component: NewScan,
    componentProps: {}
  }).onOk(() => {
    console.log('OK')
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
const handleCount = function (e: object) {
  count.value = e
  console.log(count.value.all)
}
</script>
<style lang="scss" scoped>
.tab-header {
  border-radius: 16px 16px 0 0;
}

.separator-dashed {
  border-right: 1px dashed #919EAB
}

.circle-secondary {
  border-radius: 50%;
  border: 4px solid $secondary-lighter;
}

.circle-info {
  border-radius: 50%;
  border: 4px solid $info-lighter;
}

.circle-positive {
  border-radius: 50%;
  border: 4px solid $positive-lighter;
}

.circle-negative {
  border-radius: 50%;
  border: 4px solid $negative-lighter;
}

.circle-warning {
  border-radius: 50%;
  border: 4px solid $warning-lighter;
}
</style>
