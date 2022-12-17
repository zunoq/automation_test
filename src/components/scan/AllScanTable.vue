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
          <q-td key="start_time" auto-width>
                  <span class="body2">
                    {{ $dateConvert(props.row.time_started) }}
                  </span>
          </q-td>
          <q-td key="type" auto-width>
                  <span class="body2 text-capitalize">
                    {{ props.row.type }}
                  </span>
          </q-td>
          <q-td key="status" auto-width>
            <q-chip
              :color=" props.row.status"
              text-color="white"
            >
            <span class="body2 text-capitalize">
                    {{ props.row.status }}
                  </span>
            </q-chip>

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
import {onMounted, reactive} from 'vue'
import Services from 'src/services/rest.service'
import {ScanRs} from 'src/models/statistic';
import {Job} from 'src/models/scanner'
import {QTableProps} from 'quasar';

const emit = defineEmits(['count'])
const rows: QTableProps['rows'] = reactive([])
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
    align: 'left',
    label: 'Status',
    field: (row) => row.status,
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
    '/api/v1/public/scan/results'
  );
  await finished.scans_rs.reverse().forEach((item: ScanRs) => {
    rows.push(
      {
        group_name: item.group_name,
        websites: item.websites,
        time_started: item.time_started,
        type: item.type,
        status: item.status
      }
    )
  })
  let scheduled = await Services.get('/api/v1/public/scheduled/jobs');
  await scheduled.jobs.forEach((item: Job) => {
    rows.push(
      {
        group_name: item.data.group_name,
        websites: item.data.websites,
        time_started: item.start_time,
        type: item.data.type,
        status: 'waiting'
      }
    )
  })
  emit('count', rows.length)
}
onMounted(() => {
  getScan()

})
</script>
