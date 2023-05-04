<template>
  <div>
    <q-table :columns="columns" :rows="rows" flat separator="none">
      <template #header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            <span class="text-bold text-grey">
              {{ col.label }}
            </span>
          </q-th>
        </q-tr>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td key="group_name" auto-width>
            <span class="text-body2 text-bold">
              {{ props.row.data.group_name }}
            </span>
          </q-td>
          <q-td key="start_time" auto-width>
            <span class="text-body2">
              {{ dateConvert(props.row.start_time) }}
            </span>
          </q-td>
          <q-td key="type" auto-width>
            <span class="text-body2 text-capitalize">
              {{ props.row.data.type }}
            </span>
          </q-td>
          <q-td key="action" auto-width>
            <div class="float-right">
              <q-btn
                class="q-mx-sm"
                color="info"
                flat
                icon="r_edit"
                round
                size="md"
              >
                <q-tooltip> Edit</q-tooltip>
              </q-btn>
              <q-btn
                class="q-mx-sm"
                color="negative"
                flat
                icon="r_cancel"
                round
                size="md"
              >
                <q-tooltip> Cancel</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from 'vue';
import Services from 'src/services/rest.service';
import { QTableProps } from 'quasar';
import { ScanRSTable } from 'src/models/scan_result';
import { sort, dateConvert } from 'src/utils/fnc';
let rows: Ref<ScanRSTable[]> = reactive(ref([]));
const columns: QTableProps['columns'] = [
  {
    name: 'group_name',
    required: true,
    align: 'left',
    label: 'Target group',
    field: (row) => row.group_name,
    sortable: true,
  },
  {
    name: 'start_time',
    required: true,
    align: 'left',
    label: 'Scheduled time',
    field: (row) => row.start_time,
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
    field: (row) => row,
    align: 'right',
    sortable: false,
  },
];
const getScan = async function () {
  let waiting = await Services.get('/api/v1/public/scheduled/jobs');
  // rows = await finished.scans_rs.reverse()
  rows.value = [...waiting.jobs.sort(sort('time_started', 'desc'))];
};
onMounted(() => {
  getScan();
});
</script>
