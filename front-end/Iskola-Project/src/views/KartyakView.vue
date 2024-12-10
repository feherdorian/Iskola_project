<template>
  <div>
    <h2>Kártyák</h2>
  </div>
</template>

<style></style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      urlApi: "http://localhost:8000/api/",
      rows:[],
    };
  },
  mounted(){
  this.getOsztalynevsor()
  },
  methods: {
    async getOsztalynevsor() {
      const url= '${this.url}/queryOsztalynevsor'
      const request = await fetch(url);
      this.rows = await request.json();
      console.log(this.rows);
      
    }
  },
};
</script>