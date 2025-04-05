<template>
    <div class="home-container">

        <h1 class="title">Pokédex</h1>

        <div class="pokemon-list">
            <PokemonCard 
                v-for="pokemon in pokemonList"
                :key="pokemon.name"
                :name="pokemon.name"
            />
        </div>
    </div>
</template>

<script>

import { fetchPokemonList } from '../../services/pokeapi';
import PokemonCard from '../../components/PokemonCard/PokemonCard.vue';

export default {
    components:{
        PokemonCard,
    },
    name: "HomeView",
    data() {
        return {
            pokemonList: [],
            totalCount: 0,
        };
    },

    async mounted() {
        const data = await fetchPokemonList(0, 20);
        if (data && data.results) {
            this.pokemonList = data.results;
            this.totalCount = data.count;
        }
    }


};

</script>

<style src="./homeview.css"></style>