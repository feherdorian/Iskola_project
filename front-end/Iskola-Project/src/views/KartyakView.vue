<template>
  <div class="kartyak-view">
    <h2>Kártyák nézete</h2>

    <!-- Search bar for filtering cards -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Keresés..."
      class="search-bar"
    />

    <!-- Display cards -->
    <Cards :cards="filteredCards" @card-clicked="handleCardClick" />

    <!-- Paginator -->
    <Paginator
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :current-page="currentPage"
      @page-changed="fetchCards"
    />

    <!-- Modal for card details -->
    <div v-if="selectedCard" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h3>Diák adatai</h3>
        <p><strong>Név:</strong> {{ selectedCard.nev }}</p>
        <p><strong>Osztály:</strong> {{ selectedCard.osztalyNev }}</p>
        <button @click="closeModal">Bezárás</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "@/components/cards.vue";
import Paginator from "@/components/paginator.vue";
import axios from "axios";

export default {
  components: {
    Cards,
    Paginator,
  },
  data() {
    return {
      cards: [],
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
      selectedCard: null,
      searchTerm: "",
    };
  },
  computed: {
    filteredCards() {
      return this.cards.filter((card) =>
        card.nev.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    fetchCards(page = 1) {
      const apiUrl = `${this.$props.url}queryOsztalynevsor?page=${page}`;
      axios
        .get(apiUrl)
        .then((response) => {
          this.cards = response.data.data;
          this.totalItems = response.data.total;
          this.currentPage = response.data.current_page;
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        });
    },
    handleCardClick(card) {
      this.selectedCard = card;
    },
    closeModal() {
      this.selectedCard = null;
    },
  },
  mounted() {
    this.fetchCards();
  },
};
</script>

<style scoped>
.kartyak-view {
  padding: 20px;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
}

.modal h3 {
  margin-top: 0;
}

.modal button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #0056b3;
}
</style>