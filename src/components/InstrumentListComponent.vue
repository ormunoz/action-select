<template>
  <div class="instrument-list">
    <table>
      <thead>
        <tr class="border-top border-bottom">
          <th @click="sort('name')" class="sortable1 col-name">
            Nombre
            <i class='bi bi-arrow-down-up'></i>
          </th>
          <th @click="sort('last')" class="sortable2 col-last">
            Último
            <i class='bi bi-arrow-down-up'></i>
          </th>
          <th @click="sort('monro')" class="sortable3 col-monto">
            Monto (MM)
            <i class='bi bi-arrow-down-up'></i>
          </th>
          <th @click="sort('dayVar')" class="sortable4 col-var-dia">
            Var. Día
            <i class='bi bi-arrow-down-up'></i>
          </th>
          <th @click="sort('monthVar')" class="sortable5 col-month">
            Var. 30d
            <i class='bi bi-arrow-down-up'></i>
          </th>
          <th @click="sort('yearVar')" class="sortable6 col-year">
            Año Actual
            <i class='bi bi-arrow-down-up'></i>
          </th>
          <th @click="sort('twelveMonthVar')" class="sortable7 col-12month">
            12 Meses
            <i class='bi bi-arrow-down-up'></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <InstrumentItemComponent 
          v-for="(instrument, index) in sortedInstruments" 
          :key="index"
          :instrument="instrument" 
          @instrumentSelected="handleInstrumentSelected" 
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, defineComponent } from 'vue';
import InstrumentItemComponent from './InstrumentItemComponent.vue';

export default defineComponent({
  name: 'InstrumentList',
  components: { InstrumentItemComponent },
  props: {
    instrumentData: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const instruments = ref([...props.instrumentData]);
    const sortKey = ref('name');
    const sortAsc = ref(true);

    // Computed para instrumentos ordenados
    const sortedInstruments = computed(() => {
      return instruments.value.slice().sort((a, b) => {
        if (!sortKey.value) return 0;

        const valueA = a[sortKey.value];
        const valueB = b[sortKey.value];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortAsc.value
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortAsc.value ? valueA - valueB : valueB - valueA;
      });
    });

    // Método para cambiar el orden
    const sort = (key) => {
      if (sortKey.value === key) {
        sortAsc.value = !sortAsc.value;
      } else {
        sortKey.value = key;
        sortAsc.value = true;
      }
    };

    // Emitir evento al padre
    const handleInstrumentSelected = (instrument) => {
      emit('searchData', instrument);
    };

    return {
      instruments,
      sortKey,
      sortAsc,
      sortedInstruments,
      sort,
      handleInstrumentSelected
    };
  }
});
</script>

<style scoped>
th,
td {
  padding: 5px;
  cursor: pointer;
  color: white;
}

th i {
  top: 50%;
  transform: translateY(-50%);
}

th.col-name {
  padding-right: 120px;
}

th.col-var-dia {
  padding-left: 50px;
}

th.col-var-dia,
th.col-month,
th.col-year,
th.col-12month {
  padding-right: 20px;
}
</style>
