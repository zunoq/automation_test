<template>
  <q-page class="px-xl pb-xl">
    <div class="">
      <div class="h4 text-light-primary q-mb-sm">{{ scanResult.group_name }}</div>
      <q-breadcrumbs
        active-color="light-disable"
        class="body2 text-light-primary"
        separator="-"
      >
        <q-breadcrumbs-el label="Scan"/>
        <q-breadcrumbs-el label="List" to="/scan"/>
        <q-breadcrumbs-el :to="`/scan/${scanID}`" :label="groupName"/>
        <q-breadcrumbs-el :to="`/scan/${scanID}/${targetID}`" label="target.vn"/>
      </q-breadcrumbs>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import Service from 'src/services/rest.service'
import {onBeforeMount, reactive, ref, Ref} from 'vue'
import {LocalStorage} from 'quasar';
import {ScanRS, TargetRS} from 'src/models/scan_result';
const targetID = LocalStorage.getItem('targetID')
const scanID = LocalStorage.getItem('scanID')
const groupName = LocalStorage.getItem('groupName')
const scanResult: Ref<ScanRS> = ref(reactive({} as ScanRS))
const targetResult: Ref<TargetRS[]> = ref(reactive([] as TargetRS[]))


async function getTargetResult() {
  let response = await Service.get( `/api/v1/public/target/result/${targetID}`)
}
onBeforeMount(() => {
  getTargetResult()
})
</script>
