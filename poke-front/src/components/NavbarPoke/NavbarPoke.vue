<template>
    <header class="navbar">
      <h1 class="logo" @click="goHome">Pokédex</h1>
      <FilterBar :types="types" @filter-change="$emit('filter-change', $event)" />
    </header>
  </template>
  
  <script>
  import FilterBar from '../FilterBar/FilterBar.vue';
  
  export default {
    name: 'NavbarPoke',
    components: { FilterBar },
    props: {
      types: Array,
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style src="./navbar.css"></style>
  