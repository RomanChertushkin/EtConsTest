<template>
    <div>
        <span>Значение модели: {{ time }}</span>
    </div>
    <MultiSelectComponent v-model="time" />
</template>

<script setup lang="ts">
import MultiSelectComponent from '../components/MultiSelectComponent.vue';
import { ref } from 'vue';

const time = ref<string>('');
</script>