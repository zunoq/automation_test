<template>
  <v-chart :option="option" class="chart"/>
</template>
<script setup>
import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart} from 'echarts/charts';
import {LegendComponent, TitleComponent, TooltipComponent,} from 'echarts/components';
import VChart from 'vue-echarts';
import {ref} from 'vue';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);
const option = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },

  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'right',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      label: {
        show: false,
        position: 'inner'
      },
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Ad Networks'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search Engines'},
      ],
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
</script>

<style scoped>
.chart {
  height: 500px;
}
</style>
