<template>
    <table class="table">
      <thead>
        <tr>
          <th>Diák Név</th>
          <th>Osztály</th>
        </tr>
      </thead>
      <tbody>
        <!-- Diákok adatainak megjelenítése táblázatban -->
        <tr v-for="(card, index) in cards" :key="index" @click="handleCardClick(card)">
          <td>{{ card.nev }}</td>
          <td>{{ card.osztalyNev }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    props: {
      cards: {
        type: Array,
        required: true
      }
    },
    methods: {
      handleCardClick(card) {
        // Emitáljuk a kiválasztott kártya adatait a szülőnek
        this.$emit('card-clicked', card);
      }
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  tr:hover {
    background-color: #f4f4f4;
    cursor: pointer;
  }
  </style>
  