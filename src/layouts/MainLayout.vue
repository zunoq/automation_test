<template>
  <q-layout view="lhh Lpr lff">
    <q-header :reveal-offset="250" class="bg-transparent text-dark">
      <q-toolbar style="height: 88px; padding: 0 40px">
        <q-space/>
        <q-btn class="q-ml-md q-pa-none radius-xs" flat size="sm">
          <img :src="require(`src/assets/images/${locale}.png`)" alt="locale" class="radius-xs"/>
          <q-menu anchor="bottom middle"
                  self="top middle"
                  transition-hide="flip-left"
                  transition-show="flip-right"
          >
            <q-list class="radius-sm">
              <q-item
                v-for="(item,idx) in language"
                :key="idx"
                v-close-popup
                class="radius-sm"
                clickable
                @click="$i18n.locale = item.name"
              >
                <q-item-section avatar>
                  <img :alt="item.label" :src="require(`src/assets/images/${item.name}.png`)" class="radius-xs"/>
                </q-item-section>
                <q-item-section class="body2 text-light-primary">{{ item.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn class="q-ml-md" color="grey-9" flat icon="r_notifications" round/>
        <q-btn class="q-ml-md" flat round>
          <q-avatar>
            <img alt="avatar" src="../assets/images/avatar.jpg"/>
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 250px">
              <q-item>
                <q-item-section class="q-py-md">
                  <div class="text-weight-bold text-body1">{{ authStore.self.first_name }} {{
                      authStore.self.last_name
                    }}
                  </div>
                  <div class="text-subtitle1">{{ authStore.self.email }}</div>
                </q-item-section>
              </q-item>

              <q-separator/>

              <q-item
                v-for="(item,idx) in menu"
                :key="idx"
                v-close-popup
                :to="item.direct"
                clickable
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" color="light-primary"/>
                </q-item-section>
                <q-item-section>{{ item.name }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="q-px-md"
      show-if-above
      side="left"
      style="width: 280px; border-right: 1px dashed #919EAB"
    >
      <!-- drawer content -->
      <div class="q-my-md">
        <q-img
          :ratio="1"
          fit="contain"
          height="56px"
          no-spinner
          src="../assets/images/logo.png"
        />
      </div>
      <q-list class="">
        <q-item-label class="radius-lg self-info">
          <div class="row q-col-gutter-lg">
            <div class="col-auto">
              <q-avatar size="40px">
                <img alt="avatar" src="../assets/images/avatar.jpg"/>
              </q-avatar>
            </div>
            <div class="col-auto">
              <div class="subtitle2 text-light-primary">
                {{ authStore.self.first_name }} {{ authStore.self.last_name }}
              </div>
              <div class="text-light-disable">{{ authStore.self.email }}</div>
            </div>
          </div>
        </q-item-label>
        <div v-for="(group, idx) in drawer" :key="idx">
          <div class="q-mt-md">
            <q-item-label
              class="overline text-light-secondary q-pt-lg q-pb-sm q-pl-md"
            >
              {{ group.group }}
            </q-item-label>
          </div>

          <q-item
            v-for="page in group.page"
            :key="page.name"
            v-ripple
            :to="page.direct"
            active-class="subtitle2 active-item"
            class="radius-md body2 text-light-secondary"
            clickable
          >
            <div class="row q-col-gutter-md">
              <div class="col-auto flex items-center">
                <q-icon :name="page.icon" size="24px"/>
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

import {onMounted, reactive, watch} from 'vue';
import {LocalStorage} from 'quasar';
import {useAuthStore} from 'stores/auth';
import {useI18n} from 'vue-i18n';
import Services from 'src/services/rest.service'

const authStore = useAuthStore();
const drawer = reactive([
  {
    group: 'general',
    page: [
      {
        icon: 'r_dashboard',
        name: 'Dashboard',
        direct: '/dashboard',
      },
      {
        icon: 'r_track_changes',
        name: 'Scan',
        direct: '/scan',
      },
      {
        icon: 'r_workspaces',
        name: 'Target Groups',
        direct: '/targetGroups',
      },
    ],
  },
  {
    group: 'Attack',
    page: [
      {
        icon: 'r_brightness_auto',
        name: 'Auto Attack',
        direct: '/attack',
      },
      {
        icon: 'r_looks_one',
        name: 'Single Attack',
        direct: '/singleAttack',
      },
      {
        icon: 'r_hdr_strong',
        name: 'Advanced Attack',
        direct: '/advancedAttack',
      },
    ],
  },
  {
    group: 'Manage',
    page: [
      {
        icon: 'r_account_box',
        name: 'User',
        direct: '/user',
      },
      {
        icon: 'r_group',
        name: 'User Groups',
        direct: '/userGroup',
      },
      {
        icon: 'r_local_police',
        name: 'Security',
        direct: '/security',
      },
      {
        icon: 'r_data_object',
        name: 'Parameter',
        direct: '/parameter',
      },
      {
        icon: 'r_more',
        name: 'About',
        direct: '/about',
      },
    ],
  },
]);
const menu = reactive([
  {
    name: 'Profile',
    direct: '/profile',
    icon: 'r_person'
  },
  {
    name: 'Settings',
    direct: '/settings',
    icon: 'r_settings'
  },
  {
    name: 'Help & Feedback',
    direct: '/help_and_feedback',
    icon: 'r_live_help'
  },
  {
    name: 'Sign out',
    direct: '/login',
    icon: 'r_logout'
  }
]);
const {locale} = useI18n({useScope: 'global'});
const language = [
  {
    label: 'English',
    name: 'en-US'
  },
  {
    label: 'Vietnamese',
    name: 'vi-VN'
  }
];
const lang = LocalStorage.getItem('lang')

async function getSelf() {
  authStore.self = await Services.get('/api/v1/private/self/info')

}

function getLocale() {
  if (lang == null) {
    LocalStorage.set('lang', 'en-US');
    locale.value = 'en-US'
  } else {
    locale.value = lang
  }
}

watch(locale, newLocale => {
  LocalStorage.set('lang', newLocale)
})
onMounted(() => {
  getSelf()
  getLocale()
  setInterval(()=> {
    authStore.refresh()
  },1800000)

});
</script>
<style lang="scss" scoped>
.drawer {
  border: 2px solid black;
  overflow-y: auto;

}

.self-info {
  background-color: rgba(145, 158, 171, 0.08);
  padding: 16px 20px;
  gap: 16px;
}
.active-item {
  background-color: #00ab5514;
  color: $primary !important;
}
</style>
