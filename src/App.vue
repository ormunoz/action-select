<template>
  <div class="app-container container-fluid">
    <SearchBarComponent @searchData="handleSearchInstrument" />
    <main class="row">
      <!-- HeaderComponent y SummaryComponent en la misma fila -->
      <div class="col-lg-9">
        <HeaderComponent v-if="itsActive" :headerData="headerData" />
        <!-- AreaChart debajo de HeaderComponent -->
        <AreaChart v-if="itsActive" class="mt-4" :chartData="chartData" />
      </div>
      <!-- SummaryComponent ocupa toda su altura al lado derecho -->
      <div class="col-lg-3">
        <SummaryComponent v-if="itsActive" :summaryData="summaryData" />
      </div>
      <div class="col-12">
        <TabComponent @searchTab="handleSearchIndex" />
      </div>
      <!-- División en dos columnas para las tablas -->
      <div class="col-lg-6 col-12">
        <InstrumentListComponent v-if="itsActive" :instrumentData="instrumentData1"
          @searchData="handleSearchInstrument" />
      </div>
      <div class="col-lg-6 col-12">
        <InstrumentListComponent v-if="itsActive" :instrumentData="instrumentData2"
          @searchData="handleSearchInstrument" />
      </div>
    </main>
  </div>
</template>

<script>
import { ref, nextTick, onMounted, defineComponent } from 'vue'
import SearchBarComponent from './components/SearchBarComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
import SummaryComponent from './components/SummaryComponent.vue'
import AreaChart from './components/ChartComponent.vue'
import TabComponent from './components/TabComponent.vue'
import InstrumentListComponent from './components/InstrumentListComponent.vue'
import { getOneIndexName, getNameChart, getNameSummary, getAllData } from './services/indexServices'
import { getHistoryDetails, getChartIntrument, getDetailsInstrument } from './services/intrumentServices'
import { useSearchStore } from './stores/useSearchStore'

export default defineComponent({
  components: {
    SearchBarComponent,
    HeaderComponent,
    SummaryComponent,
    AreaChart,
    TabComponent,
    InstrumentListComponent
  },
  setup() {
    const headerData = ref({})
    const chartData = ref([])
    const summaryData = ref({})
    const instrumentData1 = ref([])
    const instrumentData2 = ref([])
    const itsActive = ref(false)
    const searchStore = useSearchStore()

    const init = async () => {
      if (searchStore.searchType === 1) {
        await handleSearchInstrument(searchStore.instrumentName);
        await tableFunction(searchStore.indexName)
      } else if (searchStore.searchType === 2) {
        await handleSearchIndex(searchStore.indexName);
      } else {
        await handleSearchIndex('IPSA');
      }
    };

    onMounted(init)

    const handleSearchInstrument = async (data) => {
      try {
        searchStore.setSearchInstrumentName(data)
        searchStore.setSearchType(1)
        chartData.value = await getChartIntrument(data)
        summaryData.value = await getDetailsInstrument(data)
        headerData.value = await getHistoryDetails(data)
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error)
      }
    };

    const handleSearchIndex = async (data) => {
      try {
        searchStore.setSearchIndexName(data)
        searchStore.setSearchType(2)
        // Lógica de búsqueda
        chartData.value = await getNameChart(data)
        summaryData.value = await getNameSummary(data)
        await tableFunction(data)
        headerData.value = await getOneIndexName(data)
        itsActive.value = Object.keys(headerData.value).length > 0
        await nextTick()
      } catch (error) {
        console.error('Error al obtener los instrumentos:', error)
      }
    };

    const tableFunction = async (data) => {
      const { dataPart1, dataPart2 } = await getAllData(data)
      instrumentData1.value = dataPart1
      instrumentData2.value = dataPart2
      itsActive.value = Object.keys(headerData.value).length > 0;
    }

    return {
      handleSearchInstrument,
      handleSearchIndex,
      headerData,
      chartData,
      summaryData,
      itsActive,
      instrumentData1,
      instrumentData2
    };
  },
});
</script>



<style>
body {
  background-color: #1F1F1F;
  color: white;
}

header {
  padding: 1rem;
}
</style>
