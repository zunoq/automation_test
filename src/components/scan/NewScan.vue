<template>
  <q-dialog ref="dialogRef" class="q-py-none" full-height position="right" @hide="onDialogHide">
    <q-card class="q-dialog-plugin no-border-radius bg-light" style="width: 600px; max-width: 80vw;">
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
                     class="q-my-xs"
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
          <q-list v-else class="col-12 q-mt-sm" style="overflow: auto; max-height: 300px;">
            <div class="row">
              <q-item v-for="group in filteredGroups" :key="group.id" v-ripple class="col-6 radius-md" clickable
                      @click="newScan.group=group.id">
                <q-item-section class="q-pl-none" side>
                  <q-radio v-model="newScan.group" :val="group.id"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="subtitle2 text-light-primary">{{ group.name }}</q-item-label>
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
        <q-list
          bordered
          class="radius-md"
          style="overflow: auto; max-height: 300px"
        >
          <div v-if="emails.length > 0">
            <q-item
              v-for="(item, idx) in emails"
              :key="idx"
            >
              <q-item-section>
                <div class="row">
                  <div class="col-11 subtitle2 text-light-primary">
                    {{ item }}
                  </div>
                  <div class="col-1">
                    <q-btn
                      color="negative"
                      flat
                      icon="r_delete"
                      size="sm"
                      @click="deleteEmail(idx)"
                    />
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </div>
          <div v-else>
            <q-item>
              <q-item-section>
                <div class="body2 text-light-secondary">
                  No Emails has been added ...
                </div>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
        <div class=" q-mt-md row justify-between">
          <q-input
            v-model="email"
            class="col-9 body2 text-light-secondary"
            color="light-secondary"
            dense
            outlined
            placeholder="Subscribe an email"
          />
          <div class="col-2 flex flex-center">
            <q-btn class="radius-md" color="primary" label="Subscribe" no-caps style="height: 40px"
                   @click="addEmail" @keyup.enter="addEmail"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-toggle
          v-model="scanType"
          color="primary"
          label="Schedule"
          :disable="workerStatus === 'running'"
        >
          <q-tooltip v-if="workerStatus === 'running'" >
          Worker can't start right now because another process is already running
          </q-tooltip>
        </q-toggle>
      </q-card-section>
      <q-card-section v-if="scanType === true">
        <div class="text-light-secondary subtitle2 q-mb-md">Choosing time</div>
        <div>
          <q-input v-model="time" outlined>
            <template v-slot:prepend>
              <q-icon class="cursor-pointer" name="r_event">
                <q-popup-proxy cover transition-hide="scale" transition-show="scale">
                  <q-date v-model="time" mask="YYYY-MM-DD HH:mm:ss">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close"/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon class="cursor-pointer" name="r_access_time">
                <q-popup-proxy cover transition-hide="scale" transition-show="scale">
                  <q-time v-model="time" format24h mask="YYYY-MM-DD HH:mm:ss">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="primary" flat label="Close"/>
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="radius-md" color="primary" no-caps @click="submitNewScan">Apply</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>

import {date, Notify, useDialogPluginComponent} from 'quasar'
import {computed, onMounted, reactive,watch, Ref, ref} from 'vue'
import Services from 'src/services/rest.service'
import {TargetGroups} from 'src/models/target_groups';

defineEmits([
  ...useDialogPluginComponent.emits
])
const {formatDate} = date
let time:Ref<string> = ref(formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'))
const scanType: Ref<boolean> = ref(false)
const workerStatus:Ref<string> = ref('')
const email = ref('')
const emails: Ref<string[]> = ref([])
const search = ref('')
const groups: Ref<TargetGroups[]> = ref([])
const newScan = reactive({
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
const getWorkerStatus = async function () {
  let response = await Services.get('api/v1/public/worker/status')
  workerStatus.value = response.status

  if(response.status === 'running') {
    scanType.value = true
  }
}
const addEmail = function () {
  if (email.value) {
    emails.value.push(email.value);
    email.value = ''
  } else {
    Notify.create({
      message: 'Please enter a URL',
      color: 'negative',
      position: 'top',
    });
  }
}
const deleteEmail = function (idx: number) {
  emails.value.splice(idx, 1)
}
const submitNewScan = async function() {
  if(!scanType.value) {
    let response = await Services.post(
      '/api/v1/public/worker/start',
      {
        group_id: newScan.group,
        emails: emails.value,
      },
      this
    );
    if (response.status === 400) {
      Notify.create({
        message: response.data.message,
        color: 'negative',
        position: 'top',
      });
    }
    onOKClick();
  }
  else {
    let response = await Services.post('/api/v1/public/worker/auto',
      {
        group_id: newScan.group,
        start_time: time.value,
        email: emails.value
      },
      this
    )
    if (response.status === 400) {
      Notify.create({
        message: response.data.message,
        color: 'negative',
        position: 'top',
      });
    } else {
      // this.$refs.dialogRef.hide();
      onOKClick();
    }
  }
}
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

function onOKClick() {

  onDialogOK()
}
watch(time, (newTime) => {
  console.log(newTime)
})
onMounted(() => {
  getGroups()
  getWorkerStatus()
  console.log(time)
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
