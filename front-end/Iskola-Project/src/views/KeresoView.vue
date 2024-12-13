<template>
  <div class="d-flex flex-column container-flud my-border">
    <div class="d-flex justify-content-between mb-3 my-border">
      <!-- fej -->
      <h2>Keresés</h2>
    </div>

    <!-- Kereső mező -->
    <div class="search-bar mb-3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Keresés név alapján..."
        @input="filterData"
        class="form-control"
      />
    </div>

    <!-- kártyák -->
    <div class="my-cards-height overflow-auto my-border">
      <Cards :cards="filteredCards" />
    </div>
  </div>
</template>

<script>
import Cards from '@/components/cards.vue';
import axios from 'axios';

export default {
  components: {
    Cards
  },
  props: ["url"],
  data() {
    return {
      cards: [], // Diákok listája
      filteredCards: [], // Keresett kártyák
      searchQuery: '' // Keresési lekérdezés
    };
  },
  mounted() {
    this.getDiakKereses();  // Adatok lekérése az API-ból
  },
  methods: {
    // API hívás a kártyák adatainak lekéréséhez
    async getDiakKereses() {
      try {
        const url = `${this.url}/queryDiakKeres`;
        const response = await axios.get(url);
        console.log("API válasz:", response.data); // Naplózom a választ a konzolra
        if (response.data.message === "ok") {
          this.cards = response.data.data; // Adatok beállítása
          this.filterData(); // Keresési eredmények frissítése
        } else {
          console.error("Hiba történt a válasz feldolgozása során.");
        }
      } catch (error) {
        console.error("Hiba történt az API hívás során:", error);
      }
    },

    // Keresési logika
    filterData() {
      if (this.searchQuery) {
        this.filteredCards = this.cards.filter(card =>
          card.nev && card.nev.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredCards = this.cards;
      }
    }
  }
};
</script>

<style scoped>
.my-cards-height {
  height: calc(100vh - 200px); /* A kártyák megjelenítéséhez szükséges magasság beállítása */
}
</style>
