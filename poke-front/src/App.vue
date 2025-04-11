<template>
  <div id="app-container">
    <NavbarPoke :types="allTypes" @filter-change="handleFilterChange" />
    <main class="main-content">
      <router-view :key="$route.fullPath" :activeFilters="currentFilters" />
    </main>
  </div>
</template>

<script>
import NavbarPoke from '@/components/NavbarPoke/NavbarPoke.vue';
import { fetchAllTypes } from '@/services/pokeapi';

export default {
  name: 'App',
  components: {
    NavbarPoke,
  },
  data() {
    return {
      allTypes: [],
      currentFilters: {},
    };
  },
  async created() {
    try {
      const data = await fetchAllTypes();
      this.allTypes = data.results;
    } catch (error) {
      console.error("Erro ao buscar todos os tipos:", error);
    }
  },

  methods: {
    handleFilterChange(filters) {
      this.currentFilters = filters;
    }
  }
};
</script>
