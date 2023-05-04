<template>
  <div>
    <q-table
      :columns="columns"
      :rows="rows"
      flat
      separator="none"
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
        <q-tr :props="props">
          <q-td key="group_name" auto-width>
                  <span class="subtitle2 text-light-primary">
                    {{ props.row.group_name }}
                  </span>
          </q-td>
          <q-td key="websites" auto-width>
                  <span
                    v-for="website in props.row.websites.length >= 4
                      ? props.row.websites.slice(0, 3)
                      : props.row.websites"
                    :key="website.id"
                    class="body2"
                  >
                    {{ website.url }} <br/>
                  </span>
            <span
              v-if="props.row.websites.length >= 4"
              class="body2"
            >
                    ...
                  </span>
          </q-td>
          <q-td key="time_started" auto-width>
                  <span class="body2">
                    {{ dateConvert(props.row.time_started) }}
                  </span>
          </q-td>
          <q-td key="time_finished" auto-width>
                  <span class="body2">
                    {{ dateConvert(props.row.time_finished) }}
                  </span>
          </q-td>
          <q-td key="type" auto-width>
                  <span class="body2 text-capitalize">
                    {{ props.row.type }}
                  </span>
          </q-td>
          <q-td key="action" auto-width>
            <div class="float-right">

              <q-btn
                class="q-mx-sm"
                color="negative"
                flat
                icon="r_delete"
                round
                size="md"
              >
                <q-tooltip> Delete</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive,Ref, ref} from 'vue'
import Services from 'src/services/rest.service'
import {QTableProps} from 'quasar';
import {ScanRSTable} from 'src/models/scan_result';
import {sort,dateConvert} from 'src/utils/fnc'
const emit = defineEmits(['count'])
let rows: Ref<ScanRSTable[]>  = reactive(ref([]))
const columns: QTableProps['columns'] = [
  {
    name: 'group_name',
    required: true,
    align: 'left',
    label: 'Group',
    field: (row) => row.group_name,
    sortable: true,
  },
  {
    name: 'websites',
    required: true,
    align: 'left',
    label: 'Websites',
    field: (row) => row.websites,
    sortable: true,
  },
  {
    name: 'time_started',
    required: true,
    align: 'left',
    label: 'Time started',
    field: (row) => row.time_started,
    sortable: true,
  },
  {
    name: 'time_finished',
    required: true,
    align: 'left',
    label: 'Time finished',
    field: (row) => row.time_finished,
    sortable: true,
  },
  {
    name: 'type',
    required: true,
    align: 'left',
    label: 'Type',
    field: (row) => row.type,
    sortable: true,
  },
  {
    name: 'action',
    required: true,
    label: '',
    align: 'left',
    field: (row) => row,
    sortable: false,
  },
];
const getScan = async function () {
  let finished = await Services.get(
    '/api/v1/public/scan/results?result_status=scanning'
  )
  // rows = await finished.scans_rs.reverse()
  rows.value = [...finished.scans_rs.sort(sort('time_started', 'desc'))]
  emit('count', rows.value.length)
}
onMounted(() => {
  getScan()

})
</script>
