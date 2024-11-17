<template>
  <div class="container-fluid mt-3">
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
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue"
import { Chart, registerables } from "chart.js"

export default defineComponent({
  name: "ChartWithTabs",
  components: {},
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
    Chart.register(...registerables)
    const selectedTab = ref("All")

    const tabs = [
      { label: "All", value: "All" },
      { label: "1D", value: "1D" },
      { label: "1S", value: "1S" },
      { label: "1M", value: "1M" },
      { label: "3M", value: "3M" },
      { label: "6M", value: "6M" },
      { label: "1A", value: "1A" },
      { label: "5A", value: "5A" },
    ]

    const createChart = () => {
      if (chartCanvas.value) {
        chartCanvas.value.height = 300
        chartInstance = new Chart(chartCanvas.value, {
          type: "line",
          data: {
            labels: props.chartData.map(() => ''),
            datasets: [
              {
                label: "Grafico",
                data: props.chartData.map(item => item.lastPrice),
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
                min: Math.min(...props.chartData.map(item => item.lastPrice)),
                max: Math.max(...props.chartData.map(item => item.lastPrice)),
                stepSize: (Math.max(...props.chartData.map(item => item.lastPrice)) - Math.min(...props.chartData.map(item => item.lastPrice))) / 5,
              },
            },
          },
        })
      }
    }

    const updateChart = (filteredData) => {
      const chartEje = filteredData.map(item => item.lastPrice)
      const labels = filteredData.map(() => '')
      const minPrice = Math.min(...chartEje)
      const maxPrice = Math.max(...chartEje)

      if (chartInstance) {
        chartInstance.data.labels = labels
        chartInstance.data.datasets[0].data = chartEje
        chartInstance.options.scales.y.min = minPrice
        chartInstance.options.scales.y.max = maxPrice
        chartInstance.update()
      }
    }

    const getDateRange = (range) => {
      const currentDate = new Date()
      let startDate

      switch (range) {
        case "1D":
          startDate = new Date(currentDate)
          startDate.setDate(currentDate.getDate() - 1)
          break;
        case "1S":
          startDate = new Date(currentDate)
          startDate.setDate(currentDate.getDate() - 7)
          break;
        case "1M":
          startDate = new Date(currentDate)
          startDate.setMonth(currentDate.getMonth() - 1)
          break;
        case "3M":
          startDate = new Date(currentDate)
          startDate.setMonth(currentDate.getMonth() - 3)
          break;
        case "6M":
          startDate = new Date(currentDate)
          startDate.setMonth(currentDate.getMonth() - 6)
          break;
        case "1A":
          startDate = new Date(currentDate)
          startDate.setFullYear(currentDate.getFullYear() - 1)
          break;
        case "5A":
          startDate = new Date(currentDate)
          startDate.setFullYear(currentDate.getFullYear() - 5)
          break;
        default:
          startDate = new Date(currentDate)
          break;
      }

      return { startDate, endDate: currentDate }
    }

    const selectTab = (value) => {
      selectedTab.value = value
      if (value === "All") {
        updateChart(props.chartData)
        return
      }
      const { startDate, endDate } = getDateRange(value)
      const filteredData = props.chartData.filter(item => {
        const itemDate = new Date(item.datetimeLastPrice)
        return itemDate >= startDate && itemDate <= endDate
      })
      updateChart(filteredData)
    }

    watch(() => props.chartData, () => {
      selectTab(selectedTab.value)
    }, { deep: true })

    onMounted(() => {
      createChart()
    })

    onUnmounted(() => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    })

    return {
      chartCanvas,
      selectedTab,
      tabs,
      selectTab,
      selectedDate,
    }
  },
})
</script>

<style scoped>
.chart-container {
  max-width: 100%;
  height: auto;
}

canvas {
  width: 100%;
  height: 300px;
}

.nav-tabs .nav-link.active {
  background-color: #3683ee;
  color: rgb(19, 19, 19);
  font-weight: bold;
}

.nav-tabs .nav-link {
  background-color: #2d2e2e;
  border: 1px solid rgb(95, 93, 93);
  color: white;
  font-weight: bold;
  border-radius: 0;
}

.nav-tabs .nav-link.firstTab {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.nav-tabs .nav-link.lastTab {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.byutton-calendary {
  background-color: #2d2e2e;
  border: 1px solid rgb(95, 93, 93);
  color: white;
  font-weight: bold;
  border-radius: 5px;
  height: 43px;
}

.btn-dark {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-tabs {
  border-bottom: none;
}

.nav-tabs .nav-link.active {
  border: #2d2e2e;
}
</style>
