<template>
  <q-page class="px-xl pb-xl">
    <div class="">
      <div class="h4 text-light-primary q-mb-sm">{{scanResult.group_name}}</div>
      <q-breadcrumbs
        active-color="light-disable"
        class="body2 text-light-primary"
        separator="-"
      >
        <q-breadcrumbs-el label="Scan"/>
        <q-breadcrumbs-el label="List" to="/scan"/>
        <q-breadcrumbs-el :to="`/scan/${scanID}`" :label="scanResult.group_name"/>

      </q-breadcrumbs>
    </div>
    <div class="row justify-between pt-xl">
      <div class="col-auto">
        <q-btn flat
               size="md"
               color="light-secondary"
               icon="r_star"
               round
               class="q-mr-sm"
        >
          <q-tooltip>
            Mark as favorite
          </q-tooltip>
        </q-btn>
        <q-btn flat
               size="md"
               color="light-secondary"
               icon="r_share"
               round
               class="q-mr-sm"
        >
          <q-tooltip>
            Share this report
          </q-tooltip>
        </q-btn>
        <q-btn flat
               size="md"
               color="negative"
               icon="r_delete"
               round
               class="q-mr-sm"
        >
          <q-tooltip>
            Delete this report
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-auto flex items-center">
        <q-btn
          class="radius-md"
          color="primary"
          icon="r_file_download"
          label="Download as pdf"
          no-caps
          size="md"
        />
      </div>
    </div>
    <div class="row pt-xl">
      <q-card class="col-12 pa-xl">
        <div class="row justify-between">
          <div class="col-auto">
            <img src="../../assets/images/logo2.png" alt="logo2" :height="24">
          </div>
          <div class="col-auto">
            <div>
              <q-chip
                :color="scanResult.status"
                text-color="white"
                square
                class="subtitle2 text-uppercase"
                :label="scanResult.status"
              />
            </div>
          </div>
        </div>
        <div class="row mt-xl">
          <div class="col-6">
            <div class="overline text-light-disable q-mb-md">Type</div>
            <div class="body2 text-capitalize text-light-primary">
              {{ scanResult.type }}
            </div>
          </div>
          <div class="col-6">
            <div class="overline text-light-disable q-mb-md">Founded vulnerabilities</div>
            <StatisticsChip :data="scanResult.statistics"/>
          </div>
          <div class="col-6 mt-xl">
            <div class="overline text-light-disable q-mb-md">Time started</div>
            <div class="body2 text-capitalize text-light-primary">
              {{ scanResult.time_started }}
            </div>
          </div>
          <div class="col-6 mt-xl">
            <div class="overline text-light-disable q-mb-md">Time finished</div>
            <div class="body2 text-capitalize text-light-primary">
              {{ scanResult.time_finished }}
            </div>
          </div>

          <q-table
            :columns="targetTable"
            :rows="targetResult"
            flat
            class="mt-xl col-12"
            hide-bottom

          >

            <template #header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <span class="text-light-secondary subtitle2">
              {{ col.label }}
            </span>
                </q-th>
              </q-tr>
            </template>
            <template #body="props">
              <q-tr :props="props" class="cursor-pointer" @click="toTargetResult(props.row._id)">
                <q-td key="website" auto-width>
                  <span class="subtitle2 text-light-primary">
                    {{ props.row.basic_information.website }}
                  </span>
                </q-td>
                <q-td key="status" auto-width>
                  <span class="subtitle2 text-capitalize text-light-primary">
                    {{ props.row.basic_information.status }}
                  </span>
                </q-td>
                <q-td key="status" auto-width>
                  <StatisticsChip :data="props.row.statistics.vuln"/>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import Service from 'src/services/rest.service'
import {onBeforeMount, reactive, ref, Ref} from 'vue'
import {LocalStorage, QTableProps} from 'quasar';
import {ScanRS, TargetRS} from 'src/models/scan_result';
import StatisticsChip from 'src/components/StatisticsChip.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const scanID = LocalStorage.getItem('scanID')
const scanResult: Ref<ScanRS> = ref(reactive({} as ScanRS))
const targetResult: Ref<TargetRS[]> = ref(reactive([] as TargetRS[]))

const targetTable: QTableProps['columns'] = [
  {
    name: 'websites',
    required: true,
    align: 'left',
    label: 'Websites',
    field: (row) => row.basic_information.websites,
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    align: 'left',
    label: 'Status',
    field: (row) => row.basic_information.status,
    sortable: true,
  },
  {
    name: 'statistics',
    required: true,
    align: 'left',
    label: 'Status',
    field: (row) => row.statistics.vuln,
    sortable: true,
  },
]
async function getScanResult() {
  let response = await Service.get(`api/v1/public/scan/result/${scanID}`)
  scanResult.value = response.scan_rs
  targetResult.value = response.targets_rs
  LocalStorage.set('groupName',scanResult.value.group_name )
}
function toTargetResult(id: string) {
  LocalStorage.set('reportID', id)
  router.push(`/scan/${scanID}/${id}`)
}

onBeforeMount(() => {
  getScanResult()
})
</script>
