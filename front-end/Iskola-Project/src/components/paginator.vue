<template>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        Előző
      </button>
  
      <span>{{ currentPage }} / {{ totalPages }}</span>
  
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
        Következő
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      changePage(page) {
        this.$emit('page-changed', page);
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    padding: 5px 10px;
    margin: 0 10px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  