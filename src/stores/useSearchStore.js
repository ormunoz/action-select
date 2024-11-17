// stores/useSearchStore.js
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    indexName: '',
    instrumentName: '',
    searchType: null,
  }),
  actions: {
    setSearchIndexName(name) {
      this.indexName = name
    },
    setSearchInstrumentName(name) {
        this.instrumentName = name
      },
    setSearchType(type) {
      this.searchType = type
    },
  },
  persist: true, // Permitir persistencia si usas `pinia-plugin-persistedstate`
})
