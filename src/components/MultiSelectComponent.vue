<template>
    <MultiSelect v-model="selectedCities" :options="groupedCities" optionLabel="label" optionGroupLabel="label"
        optionGroupChildren="items" display="chip" placeholder="Select Cities" class="w-full md:w-20rem">
        <template #optiongroup="slotProps">
            <div class="flex align-items-center">
                <img :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
                <div>{{ slotProps.option.label }}</div>
            </div>
        </template>
    </MultiSelect>
</template>

<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import { ref } from 'vue';

interface Cities {
    label: string;
    value: string
}

interface Countries {
    label: string;
    code: string;
    items: Cities[];
}

const selectedCities = ref<Countries>();
const groupedCities = ref<Countries[]>([
    {
        label: 'Germany',
        code: 'DE',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' }
        ]
    },
    {
        label: 'USA',
        code: 'US',
        items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' }
        ]
    },
    {
        label: 'Japan',
        code: 'JP',
        items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' }
        ]
    }
]);
</script>