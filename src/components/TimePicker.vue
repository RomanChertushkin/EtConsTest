<template>
    <Calendar v-model="templatedisplay" showIcon iconDisplay="button" timeOnly inputId="templatedisplay">
        <template #footer>
            <hr />
            <div class="buttons--container">
                <span @click="changeToToday">Сегодня</span>
                <span @click="clearModel">Очистить</span>
            </div>
        </template>
    </Calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calendar from 'primevue/calendar';

const templatedisplay = ref<string>('');

const changeToToday = (): void => {
    const now = new Date();
    const hours = now.getHours();
    let minutes = now.getMinutes();

    if (minutes < 10) {
        templatedisplay.value = `${hours}:0${minutes}`;
    } else {
        templatedisplay.value = `${hours}:${minutes}`;
    }
}

const clearModel = (): void => {
    templatedisplay.value = '00:00';
}
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