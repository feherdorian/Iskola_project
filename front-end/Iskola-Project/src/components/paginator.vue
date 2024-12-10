<template>
  <div class="paginator">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Előző</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Következő</button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.$emit("page-changed", page);
    },
  },
};
</script>

<style scoped>
.paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}
button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f0f0f0;
  font-size: 14px;
}
button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>
