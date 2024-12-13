<template>
  <div class="d-flex flex-column container-flud my-border">
    <div class="d-flex justify-content-between mb-3 my-border">
      <!-- fej -->
      <h2>Kártyák</h2>
      <div class="dropdown d-flex align-items-center">
        <span class="me-2"> kártya/odal: </span>
        <select class="form-select" aria-label="Default select example" v-model="cardsPerPage">
          <option v-for="cardsNumber of cardsPerPageList" :key="cardsNumber" :value="cardsNumber">
            {{ cardsNumber }}
          </option>
        </select>
      </div>
    </div>

    <!-- kártyák -->
    <div class="my-cards-height overflow-auto my-border">
      <Cards :cards="cards" />
    </div>

    <!-- paginátor -->
    <Paginator :currentPage="currentPage" :totalPages="totalPages" @page-changed="handlePageChange" />
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
      cardsPerPage: 1, // Egy oldalon hány kártya jelenik meg
      cardsPerPageList: [1, 3, 5, 10, 50, 100]
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
