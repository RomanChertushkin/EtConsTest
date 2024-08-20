<script lang="ts" setup>
import RouterLinks from './components/RouterLinks.vue'
</script>

<template>
  <header>
    <RouterLinks />
  </header>

  <main class="page-container">
    <RouterView/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: green;
}

.page-container {
  margin: 10px;
}
</style>
