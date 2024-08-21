<template>
    <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" placeholder="Select Cities">
        <template #header>
            <i class="remove--icon pi pi-times" v-if="selectedCities.length > 0" @click="clearSelect"></i>
        </template>
    </MultiSelect>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MultiSelect from 'primevue/multiselect';

interface Cities {
    name: string,
    code: string
}

const selectedCities = ref<Cities[]>([]);
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const clearSelect = (): void => {
    selectedCities.value = [];
}
</script>

<style scoped lang="scss">
.remove--icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}
</style>
