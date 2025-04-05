<template>
    <div class="pokemon-card" v-if="pokemon">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        <h3> {{ pokemon.name }} </h3>
        <p class="pokemon-id"> #{{ pokemon.id.toString().padStart(4, '0') }}</p>
        <div class="types">
            <span v-for="type in pokemon.types" :key="type.type.name">
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

    data() {
        return {
            pokemon: null,

        };
    },

    async mounted() {
        const data = await fetchPokemonDetails(this.name);
        this.pokemon = data;

    },
};

</script>

<style src="./pokemontcard.css"></style>