<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- Previous gomb -->
      <li class="page-item">
        <a class="page-link" href="#" @click="Prev()"
          :class="{ disabled: currentPage === 1 }">
          Previous
        </a>
      </li>

      <!-- Oldalszámok -->
      <li class="page-item" v-for="page in totalPages" :key="page">
        <a class="page-link" href="#" @click="goToPage(page)" :class="{ active: currentPage === page }">
          {{ page }}
        </a>
      </li>

      <!-- Next gomb -->
      <li class="page-item">
        <a class="page-link" href="#" @click="Next()"
          :class="{ disabled: currentPage === totalPages }">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: Number,  // Aktuális oldal
    totalPages: Number,   // Összes oldal
  },
  methods: {
    // Előző oldalra navigál
    Prev() {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1);
      }
    },
    // Következő oldalra navigál
    Next() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1);
      }
    },

    goToPage(page) {
      this.$emit('page-changed', page);
    }
  }
}
</script>

<style scoped>
.pagination .page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}

.pagination .page-item.active .page-link {
  font-weight: bold;
  background-color: #007bff;
  color: white;
}
</style>