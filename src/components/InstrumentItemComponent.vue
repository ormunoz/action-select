<template>
  <tr @click="handleRowClick" class="clickable-row">
    <td>{{ instrument.shortName }}</td>
    <td class="text-end">{{ instrument.lastPrice }}</td>
    <td class="text-end">{{ (instrument.volumeMoney / 1000000).toFixed(2) }} </td>
    <td class="text-end" :class="getClass(instrument.pctDay)">{{ formatSign(instrument.pctDay) }}%</td>
    <td class="text-end" :class="getClass(instrument.pct30D)">{{ formatSign(instrument.pct30D) }}%</td>
    <td class="text-end" :class="getClass(instrument.pctCY)">{{ formatSign(instrument.pctCY) }}%</td>
    <td class="text-end" :class="getClass(instrument.pct1Y)">{{ formatSign(instrument.pct1Y) }}%</td>
  </tr>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    instrument: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const getClass = (value) => {
      if (value > 0) return 'positive';
      if (value < 0) return 'negative';
      return 'neutral';
    };

    const formatSign = (value) => {
      if (value > 0) return `+${value.toFixed(2)}`;
      if (value < 0) return `${value.toFixed(2)}`;
      return value.toFixed(2);
    };

    const handleRowClick = () => {
      emit('instrumentSelected', props.instrument.codeInstrument);
    };

    return {
      getClass,
      formatSign,
      handleRowClick
    };
  }
});
</script>

<style scoped>
.positive {
  color: green;
}

.negative {
  color: red;
}

.neutral {
  color: white;
}

td {
  color: white;
}

.clickable-row {
  cursor: pointer;
}

.clickable-row:hover {
  background-color: #3d3d3d;
}
</style>
