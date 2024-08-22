<template>
    <div class="card">
        <DataTable scrollable scrollHeight="750px" :value="products" class="custom--table"
            tableStyle="min-width: 50rem">
            <template #header>
                <div class="table--header">
                    <div class="table--header--search">
                        <Button icon="pi pi-sliders-v" ref="button" class="table--header--search--btn"
                            @click="togglePopup" />

                        <ColumnsPopup v-model="searchParams" :isVisible="isPopupVisible" @hide="hidePopup()"
                            :buttonRef="buttonRef" />

                        <div class="table--header--search--input">
                            <InputText class="text" placeholder="Поиск.." v-model="search"
                                @keyup.enter="searchProducts" />
                            <i v-if="search ? search.length > 0 : false" @click="clearSearch"
                                class="pi pi-times icon"></i>
                        </div>
                        <Button label="Search" severity="info" class="table--header--search--btnSearch"
                            @click="searchProducts" />
                    </div>

                    <MultiSelect class="table--header--select" :modelValue="selectedColumns" @change="handleChange"
                        :options="columns" optionLabel="header" :showToggleAll="false" placeholder="Поля таблицы" />
                </div>
            </template>

            <Column v-for="item of selectedColumns" :key="item.field" :field="item.field" :sortable="item.sortable"
                :header="item.header">
                <template #body="slotProps">
                    <img v-if="item.header == 'Image'" class="table--image"
                        :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                        :alt="slotProps.data.image" />

                    <span v-else-if="item.header == 'Price'"> {{ formatCurrency(slotProps.data.price) }}</span>

                    <Rating v-else-if="item.header == 'Raiting'" :modelValue="slotProps.data.rating" readonly
                        :cancel="false" />

                    <span v-else>{{ slotProps.data[item.field] }}</span>
                </template>
            </Column>

            <template #footer> In total there are {{ products ? products.length : 0 }} products. </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Rating from 'primevue/rating';
import ColumnsPopup from '@/components/ColumnsPopup.vue';
import { type Product } from '@/services/productService';
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const search = ref<string | null>('');
const searchTemp = ref<string | null>('');

const isPopupVisible = ref(false);
const buttonRef = ref<HTMLElement | null>(null);

const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};

const hidePopup = () => {
    isPopupVisible.value = false;
    searchProducts();
}

const handleChange = (newValues: any): void => {
    console.log(newValues)
    selectedColumns.value = columns.value.filter(option => newValues.value.includes(option));
}

const searchParams: any[] = [
    {
        name: 'name',
        checked: true
    },
    {
        name: 'price',
        checked: true
    },
    {
        name: 'category',
        checked: true
    }
]

const products = ref<Product[]>();


const columns = ref([{
    field: 'name',
    header: 'Name',
    sortable: true,
},
{
    field: 'image',
    header: 'Image',
    sortable: false,
},
{
    field: 'price',
    header: 'Price',
    sortable: true,
},
{
    field: 'category',
    header: 'Category',
    sortable: true,
},
{
    field: 'rating',
    header: 'Raiting',
    sortable: true,
}
]);

const selectedColumns = ref(columns.value);

const formatCurrency = (value: any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const searchProducts = (): void => {
    searchTemp.value = search.value;
    products.value = store.getters.getProducts(searchParams, searchTemp.value);
}

const clearSearch = (): void => {
    search.value = '';
}

onMounted(async () => {
    await store.dispatch('commitProducts');
    products.value = store.getters.getProducts(searchParams, searchTemp.value);
    buttonRef.value = document.querySelector('button');
})

</script>

<style lang="scss" scoped>
.table--header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--title {
        font-weight: 800;
    }

    &--select {
        width: 20%;
        margin-left: 10px;
        height: 39px;
    }

    &--search {
        display: flex;
        width: 80%;

        &--btn {
            width: 4%;
            border-radius: 5px 0 0 5px;
        }

        &--input {
            width: 90%;
            position: relative;

            .text {
                width: 100%;
                border-radius: 0;
            }

            .icon {
                position: absolute;
                right: 10px;
                top: 12px;
                cursor: pointer;
            }
        }

        &--btnSearch {
            width: 6%;
            border-radius: 0 5px 5px 0;
        }
    }
}

.table--image {
    width: 100px;
}

.custom--table {
    thead {
        background-color: red;
    }
}

:global(.p-datatable .p-datatable-thead > tr > th) {
    background-color: rgb(247, 240, 240) !important;
}

:global(.p-datatable-header) {
    padding-left: 0;
    padding-right: 0;
}
</style>