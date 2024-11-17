<template>
    <div class="container-fluid col-12">
        <h3 class="mb-3">{{ info.name }}, {{ info.countryName }}</h3>
        <p>Índice </p>
        <div class="d-flex border-top border-bottom pt-2 pb-2">
            <p class="mb-0 me-3">
                Valor Actual: <strong>{{ charDetail.lastPrice }}</strong>
            </p>
            <p class="mb-0 me-3">
                Var.% Actual: <span :class="getClass(charDetail.performanceRelative)"><strong>{{
                    charDetail.performanceRelative }}</strong></span>
            </p>
            <p class="mb-0">
                Var. Puntos Actual: <span :class="getClass(charDetail.performanceAbsolute)"><strong>{{
                    charDetail.performanceAbsolute }}</strong></span>
            </p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, defineComponent, watch } from 'vue'

export default defineComponent({
    props: {
        headerData: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit }) {
        const info = ref({})
        const charDetail = ref({})

        const init = async () => {
            try {
                info.value = props.headerData.info.details
                charDetail.value = props.headerData.info.historyIpsaData
            } catch (error) {
                console.error('Error al obtener los instrumentos:', error)
            }
        }

        onMounted(init)  // Cargar los datos cuando el componente se monte
        const getClass = (value) => {
            if (value > 0) return 'positive';
            if (value < 0) return 'negative';
            return 'neutral';
        };
        return {
            info,
            charDetail,
            getClass
        }
    },
})
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

</style>
