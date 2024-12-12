<template>
  <div class="kartyak-view">
    <h2>Kártyák</h2>

   
    <cards
      :cards="cards"
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
  props: ["url"],
  data() {
    return {
      cards: [], // Diákok listája
      currentPage: 1, // melyik oldalon vagyunk
      cardsPerPage: 3 // Egy oldalon hány kártya jelenik meg
    };
  },
 
  mounted() {
    this.getOsztalynevsor(); // API hívás a diákok adatainak lekéréséhez
  },
  methods: {
     async getOsztalynevsor() {
      const url = `${this.url}/queryOsztalynevsorLimit/${this.currentPage}/${this.cardsPerPage}`
     const response = await axios.get(url);
      this.cards = response.data.data; 
      console.log(this.cards);
      // A backend válaszából a data tömb
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
