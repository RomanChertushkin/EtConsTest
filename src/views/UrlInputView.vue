<script lang="ts" setup>
import { ref } from 'vue';
import EditableUrlInput from '../components/EditableUrlInput.vue';

const link = ref<string>('');
</script>

<template>
  <div>

  </div>

  <EditableUrlInput placeholder="https://" v-model="link" />

  <div class="alert--paddings" v-if="link != ''">Отработавший emit (v-model) компонена: {{ link }}</div>
</template>

<style scoped lang="scss">
.alert--paddings {
  margin-top: 10px;
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: var(--color-background-mute);
}
</style>