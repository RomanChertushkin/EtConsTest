<template>
    <div>
        <span>Значение модели: {{ time }}</span>
    </div>
    <TimePicker v-model="time" />
</template>

<script setup lang="ts">
import TimePicker from '../components/TimePicker.vue';
import { ref } from 'vue';

const time = ref<string>('13:00');
</script>