<template>
    <div class="pokemon-card" v-if="pokemon" @click="goToDetails">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        <h3> {{ pokemon.name }} </h3>
        <p class="pokemon-id"> #{{ pokemon.id.toString().padStart(4, '0') }}</p>
        <div class="types">
            <span v-for="type in pokemon.types" :key="type.type.name" class="type" :class="type.type.name">
                {{ type.type.name }}
            </span>
        </div>

    </div>
</template>

<script>

import { fetchPokemonDetails } from '../../services/pokeapi';

export default {
    name: 'PokemonCard',
    props: {
        name: {
            type: String,
            required: true,

        },

    },
    methods: {
        goToDetails() {
            this.$router.push(`/pokemon/${this.name}`)
        }
    },

    data() {
        return {
            pokemon: this.preloadedData || null,

        };
    },

    async mounted() {
        const data = await fetchPokemonDetails(this.name);
        this.pokemon = data;

    },
};

</script>

<style src="./pokemoncard.css"></style>