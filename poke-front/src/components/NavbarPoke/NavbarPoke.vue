<template>
  <header class="navbar">
    <h1 class="logo" @click="goHome">Pokédex</h1>

    <div class="filter-bar-desktop">
      <FilterBar :types="types" @filter-change="$emit('filter-change', $event)" />
    </div>

    <button class="menu-toggle-button" @click="toggleMenu" aria-label="Abrir filtros" :aria-expanded="isMenuOpen.toString()">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
    </button>

    <div
      v-if="isMenuOpen"
      class="menu-overlay"
      @click="closeMenu"
      aria-hidden="true"
    ></div>

    <div :class="['side-menu', { 'is-open': isMenuOpen }]" role="dialog" aria-modal="true" aria-labelledby="filter-menu-title">
       <div class="side-menu-header">
          <h2 id="filter-menu-title" class="side-menu-title">Filtros</h2>
          <button @click="closeMenu" class="close-menu-button" aria-label="Fechar filtros">×</button>
       </div>
       <FilterBar :types="types" @filter-change="handleFilterChange" />
    </div>

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
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
      this.closeMenu();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        document.body.style.overflow = '';
      }
    },
    handleFilterChange(event) {
        this.$emit('filter-change', event);
    }
  },
   watch: {
    '$route'() {
      this.closeMenu();
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style src="./navbar.css" scoped></style>