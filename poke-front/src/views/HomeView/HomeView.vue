<template>
    <div class="home-container">

        <h1 class="title">Pokédex</h1>

        <div class="pokemon-list">
            <div class="pokemon-item" v-for="pokemon in pokemonList" :key="pokemon.name">
                {{ pokemon.name }}

            </div>
        </div>
    </div>
</template>

<script>

import { fetchPokemonList } from '../../services/pokeapi';

export default {
    name: "HomeView",
    data() {
        return {
            pokemonList: [],
        };
    },

    async mounted() {
        const data = await fetchPokemonList(0, 100);
        if (data && data.results) {
            this.pokemonList = data.results;
        }
    }


};

</script>

<style src="./homeview.css"></style>