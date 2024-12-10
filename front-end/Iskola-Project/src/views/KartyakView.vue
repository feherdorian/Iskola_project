<template>
  <div>
    <h2>Diákok osztálynévsora</h2>

    <!-- Cards komponens, amely a táblázatot jeleníti meg -->
    <Cards :cards="paginatedRows" @card-clicked="openModal" />

    <!-- Paginator -->
    <Paginator 
      :totalItems="rows.length" 
      :itemsPerPage="itemsPerPage" 
      :currentPage="currentPage" 
      @page-changed="updatePage"
    />

    <!-- Modális ablak a kiválasztott diák adataihoz -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>{{ selectedCard.nev }}</h3>
        <p><strong>Osztály:</strong> {{ selectedCard.osztalyNev }}</p>
        <button @click="closeModal">Bezárás</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cards from '@/components/cards.vue';
import Paginator from '@/components/paginator.vue';

export default {
  components: {
    Cards,
    Paginator
  },
  data() {
    return {
      rows: [], // API-ból lekért diákok listája
      currentPage: 1, // Aktuális oldal
      itemsPerPage: 5, // Oldalonkénti diákok száma
      selectedCard: null, // A kiválasztott diák adatainak tárolása
      showModal: false // A modál láthatósága
    };
  },
  mounted() {
    this.getOsztalynevsor();  // Adatok betöltése komponens betöltésekor
  },
  methods: {
    async getOsztalynevsor() {
      try {
        const apiUrl = 'http://localhost:8000/api/queryOsztalynevsor'; // API URL
        const response = await axios.get(apiUrl); // Axios hívás
        this.rows = response.data;  // Az API válasz tárolása
      } catch (error) {
        console.error('Hiba történt az adatok betöltése közben:', error);
      }
    },
    updatePage(newPage) {
      this.currentPage = newPage; // Oldal frissítése
    },
    openModal(card) {
      this.selectedCard = card; // A kiválasztott diák adatainak beállítása
      this.showModal = true; // A modál megnyitása
    },
    closeModal() {
      this.showModal = false; // A modál bezárása
      this.selectedCard = null; // A kiválasztott adat törlése
    }
  },
  computed: {
    // Paginált adatok
    paginatedRows() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.rows.slice(startIndex, startIndex + this.itemsPerPage);
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #f4f4f4;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #ddd;
}
</style>
