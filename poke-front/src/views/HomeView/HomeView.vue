<template>
    <div class="home-container">

        <h1 class="title">Pokédex</h1>
        <FilterBar :types="allTypes" @filter-change="applyFilters" />

        <div class="pokemon-list">
            <PokemonCard v-for="pokemon in pokemonList" :key="pokemon.name" :name="pokemon.name" />
        </div>
        <div v-if="isLoading" class="loading">
            Carregando mais Pokémon...
        </div>
    </div>
</template>

<script>

import { fetchPokemonList } from '../../services/pokeapi';
import PokemonCard from '../../components/PokemonCard/PokemonCard.vue';
import FilterBar from '../../components/FilterBar/FilterBar.vue'


export default {
    components:{
        PokemonCard,
        FilterBar,
    },
    name: "HomeView",
    data() {
        return {
            pokemonList: [],
            totalCount: 0,
            offset: 0,
            limit: 20,
            isLoading: false,
            allTypes: ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
        };
    },

    mounted() {
        this.loadMorePokemons();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        async loadMorePokemons() {
            if(this.isLoading) return;

            this.isLoading = true;
            const data = await fetchPokemonList(this.offset, this.limit);
            if(data && data.results){
                this.pokemonList.push(...data.results);
                this.totalCount = data.count;
                this.offset += this.limit;


            }
            this.isLoading =false;
        },

        handleScroll() {
            const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight -10;

            if (bottomReached && this.pokemonList.length <this.totalCount){
                this.loadMorePokemons();
            }

        },

        applyFilters({ nameOrId, type}) {
            console.log('Aplicando filtro: ', nameOrId, type);
        },
    },


};

</script>

<style src="./homeview.css"></style>