<script lang="ts" setup>
import { ref } from 'vue';
import EditableUrlInput from '../components/EditableUrlInput.vue';

const link = ref<string>('');
</script>

<template>
  <EditableUrlInput placeholder="https://" v-model="link"/>

  <span v-if="link != ''">Отработавший emit (v-model) компонена: {{ link }}</span>
</template>