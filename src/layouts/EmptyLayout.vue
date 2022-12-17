<template>
  <q-layout view="hHh lpR fFf">
      <q-btn class=" q-pa-sm btn-lang" round flat size="sm">
        <img alt="img" :src="require(`src/assets/images/${locale}.png`)" class="radius-xs"/>
        <q-menu anchor="bottom middle"
                self="top middle"
                transition-hide="flip-left"
                transition-show="flip-right"
        >
          <q-list class="radius-sm ">

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
    <q-page-container >

      <router-view class="text-page "/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import {useI18n} from 'vue-i18n';
import {LocalStorage} from 'quasar';
import {onMounted, watch} from 'vue';

const { locale} = useI18n({useScope: 'global'});
const lang = LocalStorage.getItem('lang')
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

function getLocale() {
  if (lang == null) {
    LocalStorage.set('lang', 'en-US');
    locale.value = 'en-US'
  } else {
    locale.value = lang
  }
}

watch(locale, (newLang) => {
  LocalStorage.set('lang', newLang);
})
onMounted(() => {
  getLocale()
})
</script>
<style>
.btn-lang {
  position:absolute;
  z-index:1;
  top: 8px;
  right: 48px;
}
</style>
