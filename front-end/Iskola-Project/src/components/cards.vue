<template>
    <div class="cards-container">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Neve</th>
            <th>Osztály</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in displayedCards" :key="person.nev">
            <td>{{ person.nev }}</td>
            <td>{{ person.osztalyNev || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cards: {
        type: Array,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      cardsPerPage: {
        type: Number,
        default: 10
      }
    },
    computed: {
      totalPages() {
        return Math.ceil(this.cards.length / this.cardsPerPage);
      },
      displayedCards() {
        const startIndex = (this.currentPage - 1) * this.cardsPerPage;
        const endIndex = startIndex + this.cardsPerPage;
        return this.cards.slice(startIndex, endIndex);
      }
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin: 0 auto;
    text-align: left;
  }
  
  .table th, .table td {
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>
  