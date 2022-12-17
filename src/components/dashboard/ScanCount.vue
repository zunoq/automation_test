<template>
  <q-card class="my-card shadow-1 ">
      <q-card-section class="row">
          <div class="col-12 h6 text-light-primary">Number of scans</div>
        <div class="col-auto">
          <q-select
            v-model="subtract"
            :options="subtractOption"
            borderless
            class="subtract-selector text-light-disable"
            color="light-primary"
            dense
            options-dense
            emit-value
            map-options
            @update:model-value="getAnalysis(subtract)"
          />
        </div>
        <v-chart :option="option" class="chart"/>
      </q-card-section>
  </q-card>


</template>
<script setup>
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {BarChart} from 'echarts/charts';
import { TitleComponent,TooltipComponent,GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import {ref, reactive,onBeforeMount} from 'vue';
import Services from 'src/services/rest.service'
import {date, getCssVar} from 'quasar'
use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent
]);
const values = ref([])
const labels = ref([])
const option = reactive({
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b} : {c}',
  },
  grid: {
    left: '30px',
    top: '30px',
    right: '30px',
    bottom: '30px',
  },
  xAxis: {
    type: 'category',
    data: labels,
    offset: 5,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    minInterval: 1,
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      data: values,
      type: 'bar',
      color: getCssVar('primary'),
      barWidth: '30%',
      itemStyle: {
        borderRadius: [24, 24, 24, 24],
      }
    }
  ]
});

const subtract = ref(10)
const subtractOption = ref([
  { value: 7, label: 'Last 7 days' },
  { value: 10, label: 'Last 10 days' },
  { value: 15, label: 'Last 15 days' },
])

const getAnalysis = async function (subtract) {
  let startDate = date.formatDate(
    date.subtractFromDate(new Date(), { days: subtract }, 'MM/DD/YYYY'),
    'MM/DD/YYYY'
  );
  let endDate = date.formatDate(new Date(), 'MM/DD/YYYY');
  let response = await Services.get(
    `/api/v1/public/statistic/scans?start_date=${startDate}&end_date=${endDate}`
  );
  values.value = response.count;
  labels.value = response.days;
  console.log(option)
}
onBeforeMount(() => {
  getAnalysis(10)
})
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
