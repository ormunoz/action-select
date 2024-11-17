<template>
    <div class="container">
        <!-- Card principal -->
        <div class="card text-white">
            <div class="card-body">
                <!-- Tabs -->
                <ul class="nav justify-content-center mb-3">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'resumen' }"
                            @click="handleOtherTab">Resumen</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: activeTab === 'detalle' }"
                            @click="activeTab = 'detalle'">Detalles</a>
                    </li>
                </ul>
                <!-- Mostrar contenido basado en la tab seleccionada -->
                <div v-if="activeTab === 'detalle'">
                    <div class="card-header d-flex justify-content-between border-bottom">
                        <span>Cotización</span>
                        <span>{{ priceData.askDatetime }}</span>
                    </div>
                    <!-- Tabla para organizar datos -->
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>MERCADO</td>
                                <td class="text-end">{{ infoData.marketName }}</td>
                            </tr>
                            <tr>
                                <td>APERTURA</td>
                                <td class="text-end">{{ priceData.openPrice }}</td>
                            </tr>
                            <tr>
                                <td>CIERRE ANTERIOR</td>
                                <td class="text-end">{{ priceData.closePrice }}</td>
                            </tr>
                            <tr>
                                <td>MÁXIMO DIARIO</td>
                                <td class="text-end">{{ priceData.maxDay }}</td>
                            </tr>
                            <tr>
                                <td>MÍNIMO DIARIO</td>
                                <td class="text-end">{{ priceData.minDay }}</td>
                            </tr>
                            <tr>
                                <td>MÁXIMO 52 SEMANAS</td>
                                <td class="text-end">{{ priceData.max52W }}</td>
                            </tr>
                            <tr>
                                <td>MÍNIMO 52 SEMANAS</td>
                                <td class="text-end">{{ priceData.min52W }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Variación -->
                    <div class="mt-3">
                        <table class="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>Variación**</td>
                                    <td class="text-end">%</td>
                                </tr>
                            </tbody>
                        </table>
                        <ul class="list-unstyled">
                            <li class="d-flex justify-content-between">
                                <span>1 MES</span>
                                <span class="text-success" :class="getClass(priceData.pct30D.toFixed(2))">
                                    {{ formatSign(priceData.pct30D) }}</span>
                            </li>
                            <li class="d-flex justify-content-between">
                                <span>1 AÑO</span>
                                <span class="text-success" :class="getClass(priceData.pctRelW52.toFixed(2))">
                                    {{ formatSign(priceData.pctRelW52) }}</span>
                            </li>
                            <li class="d-flex justify-content-between">
                                <span>AÑO A LA FECHA</span>
                                <span :class="getClass(priceData.pctRelCY)" class="text-success">
                                    {{ formatSign(priceData.pctRelCY) }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-else>
                    <p>No especificaron que mostrar aqui.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
    props: {
        summaryData: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const infoData = ref(props.summaryData.info);
        const priceData = ref(props.summaryData.price);
        const activeTab = ref('detalle');

        const updateData = () => {
            infoData.value = { ...props.summaryData.info };
            priceData.value = { ...props.summaryData.price };
        };

        watch(() => props.summaryData, updateData, { deep: true });

        const handleOtherTab = () => {
            activeTab.value = 'resumen';
        };

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

        return {
            infoData,
            priceData,
            activeTab,
            handleOtherTab,
            getClass,
            formatSign
        };
    }
});
</script>

<style scoped>
.nav {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.nav-item {
    margin: 0 2rem;
}

.nav-link {
    color: #5e5b5b;
    text-decoration: none;
    padding-bottom: 10px;
    transition: all 0.3s ease;
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

.positive {
    color: green;
}

.negative {
    color: red;
}

.neutral {
    color: white;
}
</style>
