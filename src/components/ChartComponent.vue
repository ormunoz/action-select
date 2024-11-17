<template>
  <div class="container-fluid  mt-3">
    <!-- Gráfico -->
    <div class="chart-container mb-4">
      <canvas ref="chartCanvas"></canvas>
    </div>

    <!-- Nav Tabs -->
    <ul class="nav nav-tabs col-12">
      <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
        <button class="nav-link"
          :class="{ active: selectedTab === tab.value, firstTab: index === 0, lastTab: index === tabs.length - 1 }"
          @click="selectTab(tab.value)">
          {{ tab.label }}
        </button>
      </li>
    </ul>

  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { Chart, registerables } from "chart.js";
import Datepicker from '../../node_modules/vue3-datepicker/dist/vue3-datepicker.mjs';

export default defineComponent({
  name: "ChartWithTabs",
  components: {
    Datepicker
  },
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartCanvas = ref(null)
    let chartInstance = null
    const selectedDate = new Date()
    const chartEje = props.chartData.map(item => item.lastPrice)
    const minPrice = Math.min(...chartEje)
    const maxPrice = Math.max(...chartEje)
    const labels = props.chartData.map((item, index) => '')
    Chart.register(...registerables)

    const selectedTab = ref("1D")
    const tabs = [
      { label: "1D", value: "1D" },
      { label: "1S", value: "1S" },
      { label: "1M", value: "1M" },
      { label: "3M", value: "3M" },
      { label: "6M", value: "6M" },
      { label: "1A", value: "1A" },
      { label: "5A", value: "5A" },
    ];



    const openCalendar = () => {
      alert("Abrir selector de fecha")
    };

    const createChart = () => {
      if (chartCanvas.value) {
        chartCanvas.value.height = 300; // Ajusta el tamaño del canvas
        chartInstance = new Chart(chartCanvas.value, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Grafico",
                data: chartEje,
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: false,
                min: minPrice,
                max: maxPrice,
                stepSize: (maxPrice - minPrice) / 5,  // Define el número de intervalos en el gráfico
                callback: function (value) {
                  if (value >= minPrice && value <= maxPrice) {
                    return value;
                  }
                  return "";
                },
              },
            },
          },
        });
      }
    };

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    }

    const getDateRange = (range) => {
      const currentDate = new Date();
      let startDate;

      switch (range) {
        case "1D":  // 1 día
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 1)
          break;
        case "1S":  // 1 semana
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 7)
          break;
        case "1M":  // 1 mes
          startDate = new Date(currentDate);
          startDate.setMonth(currentDate.getMonth() - 1)
          break;
        case "3M":  // 3 meses
          startDate = new Date(currentDate);
          startDate.setMonth(currentDate.getMonth() - 3)
          break;
        case "6M":  // 6 meses
          startDate = new Date(currentDate);
          startDate.setMonth(currentDate.getMonth() - 6)
          break;
        case "1A":  // 1 año
          startDate = new Date(currentDate);
          startDate.setFullYear(currentDate.getFullYear() - 1)
          break;
        case "5A":  // 5 años
          startDate = new Date(currentDate);
          startDate.setFullYear(currentDate.getFullYear() - 5)
          break;
        default:
          startDate = new Date(currentDate);
          break;
      }

      return { startDate, endDate: currentDate };
    }

    const updateChart = (filteredData) => {
      const chartEje = filteredData.map(item => item.lastPrice);
      let minPrice, maxPrice
      if (chartEje.length > 0) {
        minPrice = Math.min(...chartEje);
        maxPrice = Math.max(...chartEje);
      } else {
        minPrice = 0
        maxPrice = 100
      }
      if (chartEje.length === 1) {
        minPrice = chartEje[0] - 100;
        maxPrice = chartEje[0] + 100;
      }
      const labels = filteredData.map(() => '')

      if (chartInstance) {
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = chartEje;
        chartInstance.options.scales.y.min = minPrice;
        chartInstance.options.scales.y.max = maxPrice;
        chartInstance.update();
      }
    };

    const selectTab = (value) => {
      selectedTab.value = value
      const { startDate, endDate } = getDateRange(value)
      const filteredData = props.chartData.filter(item => {
        const itemDate = new Date(item.datetimeLastPrice)
        return itemDate >= startDate && itemDate <= endDate
      })
      updateChart(filteredData)
    }

    onMounted(() => {
      createChart();
      window.addEventListener("resize", resizeChart);
    })

    onUnmounted(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      window.removeEventListener("resize", resizeChart);
    })

    return {
      chartCanvas,
      selectedTab,
      tabs,
      selectTab,
      openCalendar,
      selectedDate,
    };
  },
});
</script>

<style scoped>
.chart-container {
  max-width: 100%;
  height: auto;
}

canvas {
  width: 100%;
  height: 300px;
  /* Ajusta este valor según lo que necesites */
}

.nav-tabs .nav-link.active {
  background-color: #3683ee;
  color: rgb(19, 19, 19);
  font-weight: bold;
  /* Engrosar las letras */
}

.nav-tabs .nav-link {
  background-color: #2d2e2e;
  border: 1px solid rgb(95, 93, 93);
  /* Borde rojo */
  color: white;
  font-weight: bold;
  /* Engrosar las letras */
  border-radius: 0;
  /* Sin bordes redondeados por defecto */
}

.byutton-calendary {
  background-color: #2d2e2e;
  border: 1px solid rgb(95, 93, 93);
  /* Borde rojo */
  color: white;
  font-weight: bold;
  /* Engrosar las letras */
  border-radius: 5px;
  height: 43px;
  /* Sin bordes redondeados por defecto */
}

.nav-tabs .nav-link.firstTab {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  /* Puntas redondas en el primer botón */
}

.nav-tabs .nav-link.lastTab {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  /* Puntas redondas en el último botón */
}




.btn-dark {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-tabs {
  border-bottom: none;
  /* Elimina el subrayado general */
}

.nav-tabs .nav-link.active {
  border: #2d2e2e;
  /* Añade un borde inferior solo a la pestaña activa */
}
</style>
