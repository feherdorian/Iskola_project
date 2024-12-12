<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" v-for="(card, i) in cards" :key="i">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ card.nev }}</h5>
          <p class="card-text">{{ card.osztalyNev }}</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ["cards"],
};
</script>
<style></style>