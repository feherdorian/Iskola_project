<template>
  <div class="d-flex flex-column container-fluid">
    <div class="d-flex justify-content-center mb-3">
      <h2>Kártyák</h2>
      <div class="dropdown d-flex align-items-center">
        Kártyák per oldal:
        <select class="form-select" v-model="cardsPerPage" @change="updateCardsPerPage">
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>

    <!-- Kártyák megjelenítése -->
    <div class="my-cards-height overflow-auto">
      <cards :cards="cards" />
    </div>

    <!-- Lapozó komponens -->
    <paginator :currentPage="currentPage" :totalPages="totalPages" @page-changed="handlePageChange" />
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
      currentPage: 1, // Aktuális oldal
      totalPages: 1, // Összes oldal
      cardsPerPage: 1 // Egy oldalon hány kártya jelenik meg
    };
  },
  mounted() {
    this.getOsztalynevsor();
    this.getTotalPages();  // Adatok lekérése az API-ból
  },
  watch: {
    // Az oldalméret frissítése, ha a select változik
    cardsPerPage() {
      this.currentPage = 1;
      this.getOsztalynevsor(); // Az új oldalszám alapján frissítjük az adatokat
      this.getTotalPages(); // Adatok lekéréséhez
    },
  },
  methods: {
    // API hívás a kártyák adatainak lekéréséhez
    async getOsztalynevsor() {
      const url = `${this.url}/queryOsztalynevsorLimit/${this.currentPage}/${this.cardsPerPage}`;
      const response = await axios.get(url);
      this.cards = response.data.data; // Adatok beállítása
    },



    // Lapozás kezelése


    async getTotalPages() {
      const url = `${this.url}/queryHanyOldalVan/${this.cardsPerPage}`;
      const response = await axios.get(url);
      this.totalPages = response.data.data.oldalszam; // Adatok beállítása
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getOsztalynevsor();
    }
  }
};
</script>

<style scoped>
.my-cards-height {
  height: calc(100vh - 300px);
}
</style>
