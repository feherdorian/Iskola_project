<template>
  <div class="kartyak-view">
    <h2>Kártyák</h2>

        <!-- Header: Kártyák és oldalméret beállítás -->
    <div class="d-flex justify-content-between mb-3">
      <h2>Kártyák</h2>
      <div>
        <div class="dropdown">
          Kártyák per oldal:
          <select
            class="form-select"
            v-model="cardsPerPage"
            @change="updateCardsPerPage"
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Kártyák megjelenítése -->
    <cards :cards="cards" />

    <!-- Lapozó komponens -->
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
      currentPage: 1, // Aktuális oldal
      totalPages: 1, // Összes oldal
      cardsPerPage: 1 // Egy oldalon hány kártya jelenik meg
    };
  },
  mounted() {
    this.getOsztalynevsor(); // Adatok lekérése az API-ból
  },
  methods: {
    // API hívás a kártyák adatainak lekéréséhez
    async getOsztalynevsor() {
      const url = `${this.url}/queryOsztalynevsorLimit/${this.currentPage}/${this.cardsPerPage}`;
      const response = await axios.get(url);
      this.cards = response.data.data; // Adatok beállítása
      this.totalPages = Math.ceil(response.data.total / this.cardsPerPage); // Összes oldal kiszámítása
    },

     // Az oldalméret frissítése, ha a select változik
     updateCardsPerPage() {
      this.currentPage = 1; // Visszaállítjuk az első oldalra
      this.getOsztalynevsor(); // Új oldalméret alapján új adatok lekérése
    },

    // Lapozás kezelése
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.getOsztalynevsor(); // Az új oldalszám alapján frissítjük az adatokat
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
