<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  data() {
    return {
      url: 'http://localhost:8000/api', // Backend URL
    };
  },
};
</script>

<template>
  <div class="container-fluid my-border my-container">
    <h1>Iskola</h1>
    <nav class="my-border p-4">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/kartyak">Kártyák</RouterLink> <!-- Kártyák link -->
    </nav>
    <div class="my-border p-2">
      <!-- A megjelenítendő oldalak -->
      <RouterView :url="url" />
    </div>
  </div>
</template>

<style scoped>
</style>
