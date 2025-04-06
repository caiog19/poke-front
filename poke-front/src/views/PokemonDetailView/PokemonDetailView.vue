<template>
    <div class="detail-container" v-if="pokemon && species">
        <h1>{{ pokemon.name }} (#{{ pokemon.id.toString().padStart(4, '0') }})</h1>

        <div class="sprites">
            <img v-for="(img, name) in allSprites" :src="img" :alt="name" :key="name" />
        </div>

        <h3>Tipos</h3>
        <ul>
            <li v-for="t in pokemon.types" :key="t.type.name">{{ t.type.name }}</li>
        </ul>

        <h3>Movimentos</h3>
        <ul>
            <li v-for="m in pokemon.moves" :key="m.move.name">{{ m.move.name }}</li>
        </ul>

        <h3>Games</h3>
        <ul>
            <li v-for="g in pokemon.game_indices" :key="g.version.name">
                {{ g.version.name }}
            </li>
        </ul>

        <h3>Evolução </h3>
        <ul>
            <li v-for="e in evolutionChain" :key="e">{{ e }}</li>
        </ul>
    </div>
</template>

<script>
import {
    fetchPokemonDetails,
    fetchPokemonSpecies,
    fetchEvolutionChain,
} from '@/services/pokeapi';

export default {
    name: 'PokemonDetailView',
    data() {
        return {
            pokemon: null,
            species: null,
            evolutionChain: [],
        };
    },
    computed: {
        allSprites() {
            if (!this.pokemon || !this.pokemon.sprites) return {};
            const { sprites } = this.pokemon;
            return Object.entries(sprites)
                .reduce((obj, [key, value]) => {
                    if (typeof value === 'string' && value.endsWith('.png')) {
                        obj[key] = value;
                    }
                    return obj;
                }, {});
        }
    },

    async created() {
        const id = this.$route.params.id;

        const details = await fetchPokemonDetails(id);
        this.pokemon = details;

        const speciesData = await fetchPokemonSpecies(id);
        this.species = speciesData;

        if (speciesData && speciesData.evolution_chain) {
            const evoData = await fetchEvolutionChain(
                speciesData.evolution_chain.url
            );
            this.evolutionChain = this.parseEvolutionChain(evoData.chain);
        }
    },
    methods: {
        parseEvolutionChain(chain) {
            const result = [];
            let current = chain;
            while (current) {
                result.push(current.species.name);
                current = current.evolves_to[0];
            }
            return result;
        },
    },
};
</script>

<style src="./pokemondetailview.css"></style>