<template>
    <MultiSelect class="multi--select" v-model="selectedCities" :options="cities" optionLabel="name"
        :showToggleAll="false" placeholder="Select Cities">
        <template #header>
            <div class="p-multiselect-header">
                <Checkbox v-model="checked" @update:modelValue="checkedAll" :binary="true" />
                <button type="button" class="p-multiselect-close" v-show="selectedCities.length > 0"
                    @click="clearSelect">
                    <span class="pi pi-times"></span>
                </button>
            </div>
        </template>
    </MultiSelect>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MultiSelect from 'primevue/multiselect';
import Checkbox from 'primevue/checkbox';

interface Cities {
    name: string,
    code: string
}

const checked = ref<boolean>(false);

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
    checked.value = false;
}

const checkedAll = (): void => {
    if (checked.value) {
        selectedCities.value = cities.value;
    } else {
        clearSelect()
    }
}
</script>

<style scoped lang="scss">
.hidden--timesbtn {
    display: hidden;
}

.multi--select {
    width: 200px;
}
</style>
