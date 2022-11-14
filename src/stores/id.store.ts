import { defineStore } from 'pinia';
export const useStore = defineStore('id', {

  state: () => ({
    scanID: '',
    groupID: '',
    targetID: '',
  }),

  actions: {
  },
});
