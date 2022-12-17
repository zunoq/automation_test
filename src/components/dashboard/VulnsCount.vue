<template>
  <q-card class="my-card shadow-1 ">
    <q-card-section class="row">
      <div class="col-12 h6 text-light-primary">Founded vulnerabilities</div>
      <div class="col-auto">

      </div>
      <v-chart :option="option" class="chart"/>
    </q-card-section>
  </q-card>


</template>
<script setup>
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {LegendComponent, TitleComponent, TooltipComponent,} from 'echarts/components';
import VChart from 'vue-echarts';
import {onBeforeMount, ref} from 'vue';
import Services from 'src/services/rest.service';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
const values = ref([])
const option = ref({
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
  },
  legend: {
    show: true,
    orient: 'horizontal',
    bottom: 0,
  },
  series: [
    {
      label: {
        show: false,
        position: 'inner'
      },
      type: 'pie',
      radius: '70%',
      color: ['#ff5630', '#ffab00', '#FFD100', '#36b37e', '#00b8d9'],
      center: ['50%', '50%'],
      data: values,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

const getAnalysis = async function () {
  let response = await Services.get('api/v1/public/statistic/cves');
  values.value.push(
    {
      value: response.critical,
      name: 'Critical'
    },
    {
      value: response.high,
      name: 'High'
    },
    {
      value: response.medium,
      name: 'Medium'
    },
    {
      value: response.low,
      name: 'Low'
    },
    {
      value: response.info,
      name: 'Info'
    },
  );
}
onBeforeMount(() => {
  getAnalysis(10)
})
</script>

<style scoped>
.chart {
  height: 340px;
}
</style>
