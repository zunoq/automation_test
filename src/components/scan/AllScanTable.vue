<template>
  <div>
    <q-table :columns="columns" :rows="rows" flat separator="none">
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
        <q-tr :props="props" class="cursor-pointer" @click="toScanDetails(props.row.id)">
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
              class="body2 text-light-primary"
            >
              {{ website.url }} <br />
            </span>
            <span v-if="props.row.websites.length >= 4" class="body2 text-light-primary">
              ...
            </span>
          </q-td>
          <q-td key="start_time" auto-width>
            <span class="body2 text-light-primary">
              {{ dateConvert(props.row.time_started) }}
            </span>
          </q-td>
          <q-td key="type" auto-width>
            <span class="body2 text-capitalize text-light-primary">
              {{ props.row.type }}
            </span>
          </q-td>
          <q-td key="status" auto-width class="">
            <div class="row justify-center">
              <q-chip
                :color="props.row.status"
                text-color="white"
                square
                class="col-auto"
              >
                <span class="body2 text-capitalize">
                  {{ props.row.status }}
                </span>
              </q-chip>
            </div>
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
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router'
import Services from 'src/services/rest.service';
import { Job } from 'src/models/scanner';
import {LocalStorage, QTableProps} from 'quasar';
import { dateConvert } from 'src/utils/fnc';
import {ScanRSTable} from 'src/models/scan_result';
interface Row {
  id: string;
  group_name: string;
  websites: string[];
  time_started: string;
  type: string;
  status: string;
}
const emit = defineEmits(['count']);
const router = useRouter()
const rows: Row[] = reactive([]);
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
    name: 'type',
    required: true,
    align: 'left',
    label: 'Type',
    field: (row) => row.type,
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    align: 'center',
    label: 'Status',
    field: (row) => row.status,
    sortable: true,
  },
  {
    name: 'action',
    required: true,
    label: '',
    align: 'center',
    field: (row) => row,
    sortable: false,
  },
];

const getScan = async function () {
  let finished = await Services.get('/api/v1/public/scan/results');
  console.log(finished)
  await finished.scans_rs.reverse().forEach((item: ScanRSTable) =>
    rows.push({
      id: item._id,
      group_name: item.group_name,
      websites: item.websites,
      time_started: item.time_started,
      type: item.type,
      status: item.status,
    }));
  let scheduled = await Services.get('/api/v1/public/scheduled/jobs');
  await scheduled.jobs.forEach((item: Job) => {
    rows.push({
      id: item.id,
      group_name: item.data.group_name,
      websites: item.data.websites,
      time_started: item.start_time,
      type: item.data.type,
      status: 'waiting',
    });
  });
  // ts-ignore
  let count: any = {
    all: rows.length,
    finished: 0,
    scanning: 0,
    waiting: 0,
    failed: 0,
  };
  rows.forEach(function (v) {
    count[v.status] = (count[v.status] || 0) + 1;
  });
  console.log(count);
  emit('count', count);
};

const toScanDetails = function(id:string) {
  console.log(id);
  LocalStorage.set('scan', id)
  router.push(`scan/${id}`)


}
onMounted(() => {
  getScan();
});
</script>
