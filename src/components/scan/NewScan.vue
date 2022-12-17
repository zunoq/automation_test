<template>
  <q-dialog ref="dialogRef" class="q-py-none" full-height position="right" @hide="onDialogHide">
    <q-card class="q-dialog-plugin no-border-radius bg-light" style="width: 400px; max-width: 80vw;">
      <q-card-section class="row justify-between">
        <div class="col-auto h6 text-light-primary flex items-center">New scan</div>
        <div class="col-auto">
          <q-btn color="light-secondary"
                 flat
                 icon="r_close"
                 round
                 size="md"
                 @click="onDialogCancel"
          />
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="subtitle2 q-mb-md text-light-secondary">Target groups</div>
        <div class="row">
          <div class="col-12">
            <q-input v-model="search"
                     class="radius-lg q-my-sm"
                     color="light-secondary"
                     dense
                     outlined
                     placeholder="Search"
            >
              <template v-slot:append>
                <q-icon v-if="search !== ''" class="cursor-pointer" name="r_clear" @click="search = ''"/>
              </template>
            </q-input>
          </div>
          <div v-if="filteredGroups.length === 0 && search">
            No groups found
          </div>
          <div v-if="filteredGroups.length === 0 && search === ''">
            No groups has been created
          </div>
          <q-list v-else class="col-12 " style="overflow: auto; max-height: 300px;">
            <div class="row">
              <q-item v-for="group in filteredGroups" :key="group.id" v-ripple class="col-6 radius-md" clickable
                      @click="newScan.group=group.id">
                <q-item-section side>
                  <q-radio v-model="newScan.group" :val="group.id"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="body2 text-light-primary">{{ group.name }}</q-item-label>
                  <q-item-label v-if="group.description" caption class="body2 text-light-secondary">
                    {{ group.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-light-secondary subtitle2 q-mb-md">Subscribe an email</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="radius-lg" color="primary" no-caps @click="onOKClick">Apply</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>

import {useDialogPluginComponent} from 'quasar'
import {computed, onMounted, reactive, ref} from 'vue'
import Services from 'src/services/rest.service'
import {TargetGroups} from 'src/models/target_groups';

defineEmits([
  ...useDialogPluginComponent.emits
])
let search = ref('')
let groups: TargetGroups[] = ref([])
let newScan = reactive({
  group: '',
})
const filteredGroups = computed(() => {
  return groups.value.filter((group: TargetGroups) => {
    return group.name.toLowerCase().includes(search.value.toLowerCase())
  })
})
const getGroups = async function () {
  let response = await Services.get('/api/v1/public/target-groups')
  groups.value = response.groups
}
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

function onOKClick() {

  onDialogOK()
}

onMounted(() => {
  getGroups()
})
</script>
<style lang="scss">
.q-dialog__inner--minimized {
  padding: 0;

}

.q-card__section--vert {
  padding: 20px;
}
</style>
