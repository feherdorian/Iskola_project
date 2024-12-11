<template>
  <div class="kartyak-view">
    <h2>Kártyák</h2>

    <div class="cards-per-page">
      <label for="cardsPerPage">Kártyák oldalanként:</label>
      <select v-model="cardsPerPage" @change="handleCardsPerPageChange">
        <option v-for="option in [1, 2, 3, 5, 10, 25, 50, 100]" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <cards
      :cards="cards"
      :currentPage="currentPage"
      :cardsPerPage="cardsPerPage"
    />

    <paginator
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import Cards from '@/components/cards.vue';
import Paginator from '@/components/paginator.vue';
import axios from 'axios';

export default {
  components: {
    Cards,
    Paginator
  },
  data() {
    return {
      cards: [], 
      currentPage: 1,
      cardsPerPage: 10 
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.cards.length / this.cardsPerPage);
    }
  },
  mounted() {
    this.getOsztalynevsor(); 
  },
  methods: {
    getOsztalynevsor() {
      axios
        .get(`${this.$root.url}queryOsztalynevsor`)
        .then((response) => {
        
          this.cards = response.data.data; 
        })
        .catch((error) => {
          console.error('Hiba történt az API hívás során:', error);
        });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    handleCardsPerPageChange() {
      this.currentPage = 1; 
    }
  }
};
</script>

<style scoped>
.kartyak-view {
  text-align: center;
}

.cards-per-page {
  margin-bottom: 20px;
}

.cards-per-page label {
  margin-right: 10px;
}
</style>
