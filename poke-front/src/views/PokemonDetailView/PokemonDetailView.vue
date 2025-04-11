<template>
    <div class="detail-container" v-if="pokemon && species">
        <h1 class="pokemon-name-id">{{ pokemon.name }} (#{{ pokemon.id.toString().padStart(4, '0') }})</h1>

        <div class="sprites-container">
            <img v-for="(img, name) in allSprites" :src="img" :alt="name" :key="name" class="sprite-image"/>
        </div>

        <section class="detail-section">
            <h3>Tipos</h3>
            <ul class="details-list types-list">
                <li v-for="t in pokemon.types" :key="t.type.name" class="type" :class="t.type.name">
                  {{ t.type.name }}
                </li>
            </ul>
        </section>

        <section class="detail-section">
            <h3>Movimentos</h3>
            <ul class="details-list moves-list">
                <li v-for="m in pokemon.moves" :key="m.move.name">{{ m.move.name }}</li>
            </ul>
        </section>

        <section class="detail-section">
            <h3>Games</h3>
            <ul class="details-list games-list">
                <li v-for="g in pokemon.game_indices" :key="g.version.name">
                    {{ g.version.name }}
                </li>
            </ul>
        </section>

        <section class="detail-section">
            <h3>Evolução</h3>
            <div class="evolution-list">
                <div class="evo" v-for="(evo, index) in evolutionChain" :key="evo.name">
                    <div class="evo-stage">
                        <img :src="evo.sprite" :alt="evo.name" class="evo-sprite" />
                        <p class="evo-name">{{ evo.name }}</p>
                    </div>
                    <span v-if="index < evolutionChain.length - 1" class="evo-arrow">></span>
                </div>
            </div>
        </section>

    </div>
    <div v-else class="loading-state">
      Carregando detalhes do Pokémon...
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
            const desiredSprites = {
                front_default: sprites.front_default,
                back_default: sprites.back_default,
                front_shiny: sprites.front_shiny,
                back_shiny: sprites.back_shiny,
            };
            return Object.entries(desiredSprites)
                .filter(([value]) => typeof value === 'string' && value)
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});
        }
    },
    async created() {
        const nameOrId = this.$route.params.id;
        try {
          const details = await fetchPokemonDetails(nameOrId);
          this.pokemon = details;

          if (details) {
            const speciesData = await fetchPokemonSpecies(details.id);
            this.species = speciesData;

            if (speciesData && speciesData.evolution_chain) {
              const evoData = await fetchEvolutionChain(speciesData.evolution_chain.url);
              if (evoData && evoData.chain) {
                this.evolutionChain = await this.parseEvolutionChain(evoData.chain);
              }
            }
          }
        } catch (error) {
          console.error("Erro ao buscar detalhes do Pokémon:", error);
        }
    },
    methods: {
        async parseEvolutionChain(chain) {
            const result = [];
            let current = chain;
            while (current) {
                const name = current.species.name;
                let sprite = '';
                if (this.pokemon && this.pokemon.name === name) {
                    sprite = this.pokemon.sprites?.front_default || '';
                } else {
                    try {
                        const details = await fetchPokemonDetails(name);
                        sprite = details?.sprites?.front_default || '';
                    } catch (error) {
                        console.warn(`Não foi possível buscar sprite para ${name}:`, error);
                    }
                }
                result.push({ name, sprite });
                if (current.evolves_to.length > 0) {
                   current = current.evolves_to[0];
                } else {
                   current = null;
                }
            }
            return result;
        }
    }
};
</script>

<style scoped src="./pokemondetailview.css"></style>