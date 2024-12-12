<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <!-- Previous gomb -->
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"
            :class="{ disabled: currentPage === 1 }">
            Previous
          </a>
        </li>
  
        <!-- Oldalszámok -->
        <li class="page-item" v-for="page in totalPages" :key="page">
          <a class="page-link" href="#" @click.prevent="changePage(page)"
            :class="{ active: currentPage === page }">
            {{ page }}
          </a>
        </li>
  
        <!-- Next gomb -->
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)"
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
      // Oldalváltás kezelése
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('page-changed', page); // Szülőnek jelezve az új oldalt
        }
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
  