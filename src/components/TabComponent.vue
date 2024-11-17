<template>
  <div class="container-fluid ">
    <!-- Card principal -->
    <div class="card text-white">
      <div class="card-body">
        <!-- Tabs -->
        <ul class="nav  mb-3">
          <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
            <a class="nav-link" :class="{ active: activeTab === tab }" @click="handleTabClick(tab)">
              {{ tab }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(props, { emit }) {
    const activeTab = ref('IPSA')
    const tabs = ref(['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL'])

    const handleTabClick = (tab) => {
      activeTab.value = tab
      emit('searchTab', tab)
    }

    return {
      activeTab,
      tabs,
      handleTabClick
    }
  }
}
</script>


<style scoped>
.nav-item {
  margin: 0.6rem;
}

.nav-link {
  color: #5e5b5b;
  text-decoration: none;
  padding-bottom: 10px;
  transition: all 0.3s ease;
  cursor: pointer;

}

.nav-link.active {
  color: #ffffff;
  border-bottom: 3px solid #007bff;
}

.nav-link:hover {
  color: #ffffff;
  border-bottom: 3px solid #007bff;
}

.card-body .table td {
  color: #ffffff;
  background-color: #1F1F1F;
  padding: 1px;
}

.card {
  background-color: #1F1F1F;
  border: none;
}

.card-body .table td {
  color: white;
  background-color: #1F1F1F;
}

.table {
  margin-top: 20px;
}

.nav-link:not(.active) {
  border-bottom: none;
}
</style>
