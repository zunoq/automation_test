<template>
  <q-layout view="lHh lpR fFf">

    <q-header class="bg-transparent text-dark" reveal reveal-offset="250">
      <q-toolbar style="height: 64px; padding: 0 40px">
        <q-space/>
        <q-btn
          class="q-ml-md"
          color="grey-9"
          flat
          icon="notifications"
          round
        />
        <q-btn
          class="q-ml-md"
          flat
          round
        >
          <q-avatar>
            <img alt="avatar" src="../assets/images/avatar.jpg">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 180px">
              <q-item>
                <q-item-section class="q-py-md">
                  <div class="text-bold text-body1">Long Vu</div>
                  <div class="text-subtitle1">admin@gmail.com</div>
                </q-item-section>
              </q-item>

              <q-separator/>

              <q-item v-close-popup clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>

              <q-item v-close-popup clickable>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section>Help &amp; Feedback</q-item-section>
              </q-item>
              <q-item v-close-popup clickable>
                <q-item-section>Sign out</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer class="q-px-md" show-if-above side="left" style="width: 280px; border-right: 1px dashed #ddd">
      <!-- drawer content -->
      <div class="q-my-md">
        <q-img
          :ratio="1"
          fit="contain"
          height="32px"
          no-spinner
          src='../assets/images/logo.png'
        />
      </div>
      <q-list class="">
        <q-item-label class="radius-md bg-grey-3 q-pa-lg">
          <div class="row q-col-gutter-lg">
            <div class="col-auto">
              <q-avatar size="40px">
                <img alt="avatar" src="../assets/images/avatar.jpg">
              </q-avatar>
            </div>
            <div class="col-auto">
              <div class="subtitle2 text-light-primary">Long Vu</div>
              <div class="body2 text-light-disable">admin</div>
            </div>
          </div>
        </q-item-label>
        <div v-for="(group,idx) in drawer" :key="idx">
          <div class="q-mt-md">


            <q-item-label class="text-uppercase text-caption text-weight-bold q-pt-lg q-pb-sm q-pl-md">
              {{ group.group }}
            </q-item-label>
          </div>

          <q-item v-for="page in group.page" :key="page.name" v-ripple :to="page.direct"
                  active-class="subtitle2 text-primary" class="radius-md body2 text-light-secondary" clickable>
            <div class="row q-col-gutter-md">
              <div class="col-auto flex items-center">
                <q-icon
                  :name="page.icon"
                  size="24px"
                />
              </div>
              <div class="col-auto flex items-center">{{ page.name }}</div>
            </div>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import Services from 'src/services/rest.service'

interface Drawer {
  group: string
  page: object
}

const drawer: Drawer = reactive([
  {
    group: 'general',
    page: [
      {
        icon: 'dashboard',
        name: 'Dashboard',
        direct: '/dashboard'
      },
      {
        icon: 'track_changes',
        name: 'Scan',
        direct: '/scan'
      },
      {
        icon: 'workspaces',
        name: 'Target Groups',
        direct: '/targetGroups'
      },
    ]
  },
  {
    group: 'Attack',
    page: [
      {
        icon: 'brightness_auto',
        name: 'Auto Attack',
        direct: '/attack'
      },
      {
        icon: 'looks_one',
        name: 'Single Attack',
        direct: '/singleAttack'
      },
      {
        icon: 'hdr_strong',
        name: 'Advanced Attack',
        direct: '/advancedAttack'
      },
    ]
  },
  {
    group: 'Manage',
    page: [
      {
        icon: 'account_box',
        name: 'User',
        direct: '/user'
      },
      {
        icon: 'group',
        name: 'User Groups',
        direct: '/userGroup'
      },
      {
        icon: 'local_police',
        name: 'Security',
        direct: '/security'
      },
      {
        icon: 'data_object',
        name: 'Parameter',
        direct: '/parameter'
      },
      {
        icon: 'more',
        name: 'About',
        direct: '/about'
      },
    ]
  },
]);

async function getSelf() {
  let response = await Services.get('/api/v1/private/self/info')
  console.log(response)
}

onMounted(() => {
  getSelf()
})
</script>
<style lang="scss" scoped>
.drawer {
  border: 2px solid black;
}
</style>
