<template>
    <div class="home-container">

        <h1 class="title">Pokédex</h1>
        <FilterBar :types="allTypes" @filter-change="applyFilters" />

        <div class="pokemon-list">
            <PokemonCard v-for="pokemon in pokemonList" :key="pokemon.name" :name="pokemon.name"/>
        </div>
        <div v-if="isLoading" class="loading">
            Carregando mais Pokémon...
        </div>
    </div>
</template>

<script>

import { fetchPokemonList, fetchPokemonDetails, fetchPokemonByType } from '../../services/pokeapi';
import PokemonCard from '../../components/PokemonCard/PokemonCard.vue';
import FilterBar from '../../components/FilterBar/FilterBar.vue'


export default {
    components: {
        PokemonCard,
        FilterBar,
    },
    name: "HomeView",
    data() {
        return {
            pokemonList: [],
            totalCount: 0,
            offset: 0,
            limit: 40,
            isLoading: false,
            allTypes: ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
            
        };
    },

    mounted() {
        this.loadMorePokemons();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    methods: {
        async loadMorePokemons() {
            if (this.isLoading) return;

            this.isLoading = true;
            const data = await fetchPokemonList(this.offset, this.limit);
            if (data && data.results) {
                this.pokemonList.push(...data.results);
                this.totalCount = data.count;
                this.offset += this.limit;


            }
            this.isLoading = false;
        },

        handleScroll() {
            const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

            if (bottomReached && this.pokemonList.length < this.totalCount) {
                this.loadMorePokemons();
            }

        },

        async applyFilters({ nameOrId, type }) {
            console.log("applyFilters => nameOrId:", nameOrId, "type:", type);
            this.pokemonList = [];
            this.offset = 0;


            if (nameOrId) {
                const data = await fetchPokemonDetails(nameOrId.toLowerCase());
                if (data) {
                    this.pokemonList = [{ name: data.name }];
                    this.totalCount = 1;
                } else {
                    this.pokemonList = [];
                    this.totalCount = 0;
                }
                return;
            }


            if (type) {
                const data = await fetchPokemonByType(type);
                if (data && data.pokemon) {
                    const list = data.pokemon.map(p => p.pokemon);
                    this.pokemonList = list;
                    this.totalCount = list.length;
                } else {
                    this.pokemonList = [];
                    this.totalCount = 0;
                }
                return;
            }


            this.pokemonList = [];
            this.totalCount = 0;
            this.offset = 0;
            this.loadMorePokemons();
        },
    },


};

</script>

<style src="./homeview.css"></style>