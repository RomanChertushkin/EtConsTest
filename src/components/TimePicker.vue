<template>
    <div>
        <Calendar v-model="internalValue" timeOnly iconDisplay="button" showIcon hourFormat="24">
            <template #footer>
                <hr />
                <div class="buttons--container">
                    <span @click="changeToToday">Сегодня</span>
                    <span @click="clearModel">Очистить</span>
                </div>
            </template>

        </Calendar>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps, onMounted } from 'vue';
import Calendar from 'primevue/calendar';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref<Date | null>(null);

watch(internalValue, (newValue: Date | null) => {
    if (internalValue.value == null) {
        emit('update:modelValue', null);
        return;
    }

    const hours = newValue?.getHours().toString().padStart(2, '0');
    const minutes = newValue?.getMinutes().toString().padStart(2, '0');

    emit('update:modelValue', `${hours}:${minutes}`);
});

const changeToToday = (): void => {
    internalValue.value = new Date();
}

const clearModel = (): void => {
    internalValue.value = null;
}

onMounted(() => {
    const date = new Date();
    const [hours, minutes] = props.modelValue.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    internalValue.value = date;
})
</script>

<style scoped lang="scss">
:global(.p-datepicker-panel) {
    padding: 0 !important;
}

:global(.p-datepicker-dropdown) {
    background-color: #294aa5 !important;
    color: white !important;
}

hr {
    border: solid 1px rgb(233, 225, 225);
}

.buttons--container {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    span {
        color: blue;
        font-weight: 600;
        cursor: pointer;
    }
}
</style>