<template>
    <div class="cards-container">
      <div v-for="card in paginatedCards" :key="card.nev" class="card">
        <h3>{{ card.nev }}</h3>
        <p>Osztály: {{ card.osztalyNev }}</p>
      </div>
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
        required: true
      }
    },
    computed: {
      paginatedCards() {
        const start = (this.currentPage - 1) * this.cardsPerPage;
        const end = start + this.cardsPerPage;
        return this.cards.slice(start, end);
      }
    }
  };
  </script>
  
  <style scoped>
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 15px;
    width: 200px;
    text-align: center;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .card h3 {
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  
  .card p {
    margin: 0;
    font-size: 1em;
    color: #555;
  }
  </style>
  