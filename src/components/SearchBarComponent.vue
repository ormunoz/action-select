<template>
    <div class="container-fluid">
        <form class="search-form">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                    <i class="bi bi-search"></i>
                </span>
                <input class="form-control" type="search" v-model="query" @focus="showDropdown = true"
                    @blur="handleBlur" placeholder="Busca un instrumento" aria-label="Search" />
            </div>
        </form>

        <ul v-if="showDropdown && filteredInstruments.length" class="dropdown-list">
            <li v-for="instrument in filteredInstruments" :key="instrument.codeInstrument"
                @click="selectInstrument(instrument.codeInstrument)" class="dropdown-item">
                {{ instrument.name }}
            </li>
        </ul>
        <p class="text-no-found" v-else-if="query && filteredInstruments.length === 0">
            No se encontraron resultados
        </p>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue' 
import { getAllInstrument } from '../services/indexServices' 

export default {
    setup(props, { emit }) {
        const query = ref('') 
        const showDropdown = ref(false) 
        const instrumentData = ref([]) 

        const init = async () => {
            try {
                const response = await getAllInstrument() 
                instrumentData.value = response 
            } catch (error) {
                console.error('Error al obtener los instrumentos:', error) 
            }
        } 

        onMounted(init)

        const filteredInstruments = computed(() => {
            if (!query.value || !Array.isArray(instrumentData.value)) {
                return [] 
            }
            return instrumentData.value.filter(instrument =>
                instrument.name.toLowerCase().includes(query.value.toLowerCase()) ||
                instrument.codeInstrument.toLowerCase().includes(query.value.toLowerCase())
            ) 
        }) 

        const handleBlur = () => {
            setTimeout(() => {
                showDropdown.value = false 
            }, 200) 
        } 

        const selectInstrument = (instrument) => {
            query.value = instrument 
            showDropdown.value = false 
            emit('searchData', query.value) 
        } 

        return {
            query,
            filteredInstruments,
            handleBlur,
            selectInstrument,
            showDropdown
        } 
    },
}
</script>

<style scoped>
.search-form {
    border-radius: 50%;
}

/* Estilos para la lista desplegable */
.dropdown-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    position: absolute;
    width: 100%;
    z-index: 10;
    background-color: white;
}

.dropdown-item {
    padding: 8px;
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}

.container-fluid {
    padding: 1rem;
}

.input-group-text {
    background-color: #303336;
    border: none;
    color: rgb(145, 142, 142);
}

.form-control {
    background-color: #303336;
    border: none;
    color: white;
}

.form-control::placeholder {
    color: rgb(145, 142, 142);
    opacity: 1;
}

.text-no-found {
    color: rgb(145, 142, 142);
}
</style>
